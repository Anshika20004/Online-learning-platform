import pandas as pd
import pickle
from sklearn.ensemble import RandomForestClassifier

# Load dataset
df = pd.read_csv("../data/student_data.csv")

# Features
X = df[["score", "time_taken", "accuracy", "attempts", "topic_perf"]]

# Target
y = df["level"]

# Train model
model = RandomForestClassifier()
model.fit(X, y)

# Save model
pickle.dump(model, open("model.pkl", "wb"))

print("Model trained successfully!")