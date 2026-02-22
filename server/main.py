from flask import Flask, request, jsonify
import joblib
import os
import pandas as pd
import numpy as np

app = Flask(__name__)

# Constants
MODEL_DIR = "models"
MODEL_PATH = os.path.join(MODEL_DIR, "model.pkl")
SCALER_PATH = os.path.join(MODEL_DIR, "scaler.pkl")
ENCODER_PATH = os.path.join(MODEL_DIR, "encoder.pkl")
FEATURES_PATH = os.path.join(MODEL_DIR, "feature_names.pkl")

# Load model components
try:
    if os.path.exists(MODEL_PATH) and os.path.exists(SCALER_PATH) and os.path.exists(ENCODER_PATH):
        model = joblib.load(MODEL_PATH)
        scaler = joblib.load(SCALER_PATH)
        encoder = joblib.load(ENCODER_PATH)
        # Load features if they exist, otherwise fallback to standard order
        if os.path.exists(FEATURES_PATH):
            feature_names = joblib.load(FEATURES_PATH)
        else:
            feature_names = None
        print("Model components loaded successfully.")
    else:
        print("Warning: Model files not found in 'models/'. API will start but predictions will fail until models are trained.")
        model, scaler, encoder, feature_names = None, None, None, None
except Exception as e:
    print(f"Error loading model components: {e}")
    model, scaler, encoder, feature_names = None, None, None, None

@app.route("/")
def home():
    return jsonify({
        "status": "online",
        "message": "Loan Default Prediction API is Running!"
    })

@app.route("/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded. Train the model using app.ipynb first."}), 500
        
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "No data provided"}), 400
            
        # Create DataFrame from input
        df_input = pd.DataFrame([data])
        
        # 1. Align Columns with training order (CRITICAL for ColumnTransformer + StandardScaler)
        if feature_names:
            # Add missing columns with default/NaN if necessary, and reorder
            for col in feature_names:
                if col not in df_input.columns:
                    df_input[col] = np.nan # Or appropriate default
            df_input = df_input[feature_names]
        
        # 2. Map Binary Columns
        binary_cols = ['HasMortgage', 'HasDependents', 'HasCoSigner']
        mapping = {'Yes': 1, 'No': 0, '1': 1, '0': 0, 1: 1, 0: 0}
        for col in binary_cols:
            if col in df_input.columns:
                df_input[col] = df_input[col].map(mapping)
        
        # 3. Preprocess
        # ColumnTransformer uses column names, but the order of remainder columns matters!
        encoded = encoder.transform(df_input)
        scaled = scaler.transform(encoded)
        
        # 4. Predict
        pred = model.predict(scaled)[0]
        proba = model.predict_proba(scaled)[0][1]
        
        return jsonify({
            "prediction": int(pred),
            "default_probability": round(float(proba), 4),
            "status": "success",
            "threshold": 0.5
        })
    except Exception as e:
        import traceback
        print(traceback.format_exc())
        return jsonify({
            "status": "error",
            "message": str(e)
        }), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
