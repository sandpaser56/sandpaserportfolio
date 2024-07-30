const keys = [
  'c-key', 'd-key', 'e-key', 'f-key', 'g-key', 'a-key', 'b-key',
  'high-c-key', 'c-sharp-key', 'd-sharp-key', 'f-sharp-key',
  'g-sharp-key', 'a-sharp-key'
];

// Map of key IDs to their corresponding URLs
const keyToURL = {
  'c-key': 'https://archive.org/download/24-piano-keys/key12.mp3', // low C
  'd-key': 'https://archive.org/download/24-piano-keys/key14.mp3',
  'e-key': 'https://archive.org/download/24-piano-keys/key17.mp3',
  'f-key': 'https://archive.org/download/24-piano-keys/key16.mp3',
  'g-key': 'https://archive.org/download/24-piano-keys/key12.mp3',
  'a-key': 'https://archive.org/download/24-piano-keys/key14.mp3',
  'b-key': 'https://archive.org/download/24-piano-keys/key17.mp3',
  'high-c-key': 'https://archive.org/download/24-piano-keys/key19.mp3', // high C
  'c-sharp-key': 'https://archive.org/download/24-piano-keys/key13.mp3',
  'd-sharp-key': 'https://archive.org/download/24-piano-keys/key15.mp3',
  'f-sharp-key': 'https://archive.org/download/24-piano-keys/key18.mp3',
  'g-sharp-key': 'https://archive.org/download/24-piano-keys/key20.mp3',
  'a-sharp-key': 'https://archive.org/download/24-piano-keys/key19.mp3',
};

keys.forEach(function(key) {
  const keyElement = document.getElementById(key);
  
  keyElement.addEventListener('mousedown', function() {
    playSound(keyToURL[key]);
    keyElement.style.backgroundColor = '#6df0c2';
  });

  keyElement.addEventListener('mouseup', function() {
    keyElement.style.backgroundColor = '';
  });
});

function playSound(url) {
  const audio = new Audio(url);
  audio.play().catch(error => console.error('Error playing sound:', error));
}
