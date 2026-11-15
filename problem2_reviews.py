
import pandas as pd
import matplotlib.pyplot as plt
import re
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.decomposition import TruncatedSVD

df = pd.read_csv("customer_reviews.csv")
df.columns = df.columns.str.strip().str.lower()

print("Available columns:", df.columns.tolist())

if "review" not in df.columns or "sentiment" not in df.columns:
    raise ValueError("CSV must contain review and sentiment columns.")

df = df.dropna(subset=["review", "sentiment"]).copy()
df["sentiment"] = df["sentiment"].astype(str).str.lower().str.strip()
df = df[df["sentiment"].isin(["positive", "negative"])].copy()

def clean_review(text):
    text = str(text).lower()
    text = re.sub(r"[^\w\s]", "", text)
    return text.strip()

df["cleaned_review"] = df["review"].apply(clean_review)
df = df[df["cleaned_review"] != ""].copy()
df = df.reset_index(drop=True)
df["word_count"] = df["cleaned_review"].apply(
    lambda text: len(text.split())
)

print("\nTotal reviews:", len(df))
print("\nAverage word count by sentiment:")
print(df.groupby("sentiment")["word_count"].mean().round(2))

plt.figure(figsize=(8, 5))

for sentiment in ["positive", "negative"]:
    values = df.loc[df["sentiment"] == sentiment, "word_count"]
    if not values.empty:
        plt.hist(values, bins=10, alpha=0.6, label=sentiment)

plt.title("Word Count Distribution by Sentiment")
plt.xlabel("Number of Words")
plt.ylabel("Number of Reviews")
plt.legend()
plt.tight_layout()
plt.show()

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(df["cleaned_review"])

if X.shape[0] < 2 or X.shape[1] < 2:
    raise ValueError("Not enough review text to create a 2D plot.")

svd = TruncatedSVD(n_components=2, random_state=42)
coordinates = svd.fit_transform(X)

plt.figure(figsize=(9, 6))

for sentiment, color in [("positive", "green"), ("negative", "red")]:
    mask = df["sentiment"].to_numpy() == sentiment
    plt.scatter(
        coordinates[mask, 0],
        coordinates[mask, 1],
        color=color,
        label=sentiment,
        alpha=0.7
    )

positive_indices = df.index[df["sentiment"] == "positive"].tolist()

if positive_indices:
    index = positive_indices[0]
    plt.scatter(
        coordinates[index, 0],
        coordinates[index, 1],
        color="blue",
        marker="*",
        s=250,
        label="Highlighted positive review"
    )
    print("\nHighlighted positive review:")
    print(df.iloc[index]["review"])

plt.title("Customer Review Sentiment Visualization")
plt.xlabel("Text Component 1")
plt.ylabel("Text Component 2")
plt.legend()
plt.tight_layout()
plt.show()

df.to_csv("cleaned_customer_reviews.csv", index=False)
print("\nCleaned data saved to cleaned_customer_reviews.csv")
