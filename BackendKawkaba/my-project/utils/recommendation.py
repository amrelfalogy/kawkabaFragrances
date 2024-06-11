import json
import sys
import pandas as pd 
from sklearn.feature_extraction.text import TfidfVectorizer 
from sklearn.neighbors import NearestNeighbors 
from sklearn.metrics.pairwise import cosine_similarity 
from nltk.corpus import stopwords 
from nltk.tokenize import word_tokenize 
from nltk.stem import WordNetLemmatizer 
import string
import nltk 
import chardet 

# Download NLTK resources
nltk.download('punkt', quiet=True)
nltk.download('stopwords', quiet=True)
nltk.download('wordnet', quiet=True)

# Absolute path to data.csv
data_file_path = 'F:/Projects/Kawkaba-/BackendKawkaba/my-project/utils/data.csv'

# Step 1: Data Preprocessing
with open(data_file_path, 'rb') as f:
    encoding = chardet.detect(f.read())['encoding']

# Load dataset
df = pd.read_csv(data_file_path, encoding=encoding)
# Combine perfume components into a single column
df['components'] = df['main_accords'] + ' ' + df['top notes'] + ' ' + df['middle notes'] + ' ' + df['base notes']
df['attributes'] = df['for_gender'] 

# Text preprocessing function
def preprocess_text(text):
    # Tokenize text
    tokens = word_tokenize(text.lower())
    # Remove stopwords and punctuation
    stop_words = set(stopwords.words('english'))
    tokens = [token for token in tokens if token not in stop_words and token not in string.punctuation]
    # Lemmatize tokens
    lemmatizer = WordNetLemmatizer()
    tokens = [lemmatizer.lemmatize(token) for token in tokens]
    return ' '.join(tokens)

# Apply text preprocessing
df['components'] = df['components'].apply(preprocess_text)
df['attributes'] = df['attributes'].apply(preprocess_text)

# Concatenate components and attributes with adjusted weights
weight_factor = 2
df['combined_notes'] = df['components'] + ' ' + (df['attributes'] + ' ') * weight_factor

# Step 2: Feature Extraction
tfidf_vectorizer = TfidfVectorizer(max_df=0.8, min_df=5, ngram_range=(1, 2))
X = tfidf_vectorizer.fit_transform(df['combined_notes'])

# Step 3: Model Training
k = 10  # Choose the number of neighbors
knn_model = NearestNeighbors(n_neighbors=k, metric='cosine')
knn_model.fit(X)

# Step 4: Recommendation Function
def recommend_similar_perfumes(query_perfume):
    # Check if query perfume is in the dataframe
    if query_perfume not in df['name'].values:
        print(f"Query perfume '{query_perfume}' not found in the dataset.")
        return []

    # Get the components and attributes of the query perfume from the dataframe
    query_row = df[df['name'] == query_perfume].iloc[0]
    query_components = query_row['components']
    query_attributes = query_row['attributes']

    query_combined = query_components + ' ' + (query_attributes + ' ') * weight_factor  # Combine with weight

    query_vector = tfidf_vectorizer.transform([query_combined])
    distances, indices = knn_model.kneighbors(query_vector)

    similar_perfumes_indices = indices[0]
    similar_perfumes_data = df.iloc[similar_perfumes_indices][['name', 'company', 'image', 'for_gender', 'season', 'rating']]

    cosine_similarities = cosine_similarity(query_vector, X[similar_perfumes_indices]).flatten()
    similar_perfumes_info = similar_perfumes_data.values.tolist()

    recommendations = []
    for i, perfume in enumerate(similar_perfumes_info):
        recommendations.append({
            "name": perfume[0],
            "company": perfume[1],
            "image": perfume[2],
            "for_gender": perfume[3],
            "season": perfume[4],
            "rating": perfume[5],
            "Similarity Percentage": round(cosine_similarities[i] * 100, 2)
        })

    return recommendations

# Get perfume name from command line arguments
if len(sys.argv) > 1:
    query_perfume = sys.argv[1]
    recommended_perfumes = recommend_similar_perfumes(query_perfume)
    print(json.dumps(recommended_perfumes, indent=4))
else:
    print(json.dumps([]))


# Example usage
# query_perfume = "Angels' Share"
# recommended_perfumes = recommend_similar_perfumes(query_perfume)
# print("Recommended perfumes:")
# for perfume in recommended_perfumes:
#     print("Perfume Name:", perfume[0])
#     print("For Gender:", perfume[1])
#     print("Season:", perfume[2])
#     print("Similarity Percentage:", f"{perfume[3]:.2f}%")