from flask import Flask, send_from_directory, request, jsonify
import pygame
import requests
import os

app = Flask(__name__)

# Initialize pygame mixer
pygame.mixer.init()

# Directory to store downloaded audio files
AUDIO_CACHE_DIR = 'audio_cache'

# Ensure the cache directory exists
os.makedirs(AUDIO_CACHE_DIR, exist_ok=True)

# Map of key IDs to their corresponding URLs
key_to_url = {
 'c-key': 'https://archive.org/download/24-piano-keys/key19.mp3',
'd-key': 'https://archive.org/download/24-piano-keys/key14.mp3',
'e-key': 'https://archive.org/download/24-piano-keys/key17.mp3',
 'f-key': 'https://archive.org/download/24-piano-keys/key16.mp3',
 'g-key': 'https://archive.org/download/24-piano-keys/key12.mp3',
 'a-key': 'https://archive.org/download/24-piano-keys/key14.mp3',
 'b-key': 'https://archive.org/download/24-piano-keys/key17.mp3', 
'high-c-key': 'https://archive.org/download/24-piano-keys/key19.mp3', 
  'c-sharp-key': 'https://archive.org/download/24-piano-keys/key13.mp3',
  'd-sharp-key': 'https://archive.org/download/24-piano-keys/key15.mp3',
  'f-sharp-key': 'https://archive.org/download/24-piano-keys/key18.mp3',
  'g-sharp-key': 'https://archive.org/download/24-piano-keys/key20.mp3',
  'a-sharp-key': 'https://archive.org/download/24-piano-keys/key19.mp3',
}

@app.route('/')
def index():
    return send_from_directory('.', 'project-cool.txt.htm')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory('.', path)

@app.route('/play_sound', methods=['POST'])
def play_sound():
    data = request.json
    key = data.get('key')
    
    if key not in key_to_url:
        return jsonify({'error': 'Invalid key'}), 400

    url = key_to_url[key]
    local_filename = os.path.join(AUDIO_CACHE_DIR, f'{key}.mp3')

    # Download the file if it doesn't exist locally
    if not os.path.isfile(local_filename):
        try:
            response = requests.get(url)
            response.raise_for_status()  # Check if the request was successful
            with open(local_filename, 'wb') as f:
                f.write(response.content)
        except requests.exceptions.RequestException as e:
            return jsonify({'error': 'Failed to download file', 'details': str(e)}), 500

    # Play the sound using pygame
    pygame.mixer.music.load(local_filename)
    pygame.mixer.music.play()
    
    return 'OK', 200

if __name__ == '__main__':
    app.run(debug=True)
