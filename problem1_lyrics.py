import numpy as np
import pandas as pd
import re

df = pd.read_csv("song_lyrics.csv")

print("Available columns:", df.columns.tolist())

def clean_lyrics(text):
    text = str(text).lower()
    text = re.sub(r"[^\w\s]", "", text)
    return text.strip()

if "lyrics" not in df.columns:
    raise ValueError("CSV must contain a column named 'lyrics'.")

lyrics = df["lyrics"].dropna().apply(clean_lyrics)
lyrics = lyrics[lyrics != ""]

lyrics_array = lyrics.to_numpy()

print("\nTotal usable lyrics:", len(lyrics_array))

if len(lyrics_array) >= 10:
    rng = np.random.default_rng(seed=42)
    indices = rng.choice(len(lyrics_array), size=10, replace=False)

    print("\nRandom Sample of 10 Cleaned Lyrics:")
    for number, index in enumerate(indices, start=1):
        print(f"{number}. {lyrics_array[index]}")
else:
    print("Please add at least 10 lyrics to song_lyrics.csv.")

pd.DataFrame({"lyrics": lyrics_array}).to_csv(
    "cleaned_lyrics.csv", index=False
)

print("\nCleaned lyrics saved to cleaned_lyrics.csv")