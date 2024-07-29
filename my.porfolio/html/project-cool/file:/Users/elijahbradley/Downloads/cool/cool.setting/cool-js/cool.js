const keys = [
  'c-key', 'd-key', 'e-key', 'f-key', 'g-key', 'a-key', 'b-key', 
  'high-c-key', 'c-sharp-key', 'd-sharp-key', 'f-sharp-key', 
  'g-sharp-key', 'a-sharp-key'
];

keys.forEach(function(key) {
  const keyElement = document.getElementById(key);
  keyElement.addEventListener('mousedown', function() {
    playSound(key);
    keyElement.style.backgroundColor = '#6df0c2';
  });
  keyElement.addEventListener('mouseup', function() {
    keyElement.style.backgroundColor = '';
  });
});

function playSound(key) {
  fetch('/play_sound', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ key: key })
  });
}

// Existing code for lyrics and buttons
// ...

