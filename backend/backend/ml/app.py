from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load trained model
model = pickle.load(open("model.pkl", "rb"))

@app.route("/predict", methods=["POST"])
def predict():
    data = request.json

    features = np.array([[
        data["score"],
        data["time_taken"],
        data["accuracy"],
        data["attempts"],
        data["topic_perf"]
    ]])

    prediction = model.predict(features)

    return jsonify({"level": prediction[0]})

if __name__ == "__main__":
    app.run(port=5001)
