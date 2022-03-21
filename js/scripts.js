let textarea = document.getElementById('textarea');
if (localStorage.getItem('textValue')) {
    textarea.value = localStorage.getItem('textValue');
};

const trackText = e => {
    let words = e.target.value.split(/\s/g);
    if (words[words.length - 1] === '') {
        words.pop();
    }
    document.getElementById('words').innerHTML = words.length;
    document.getElementById('chars').innerHTML = e.target.value.replace(/\s/g, '').length;
    document.getElementById('charsWhitespace').innerHTML = e.target.value.length;
    localStorage.setItem('textValue', e.target.value)
};

textarea.addEventListener('input', trackText);

// from https://codepen.io/balasubramanim/pen/xypRMP

window.readingTime = ev => {
  const wordsPerMinute = 215;
  let result;
  let textLength = ev.value.split(' ').length;
  if(textLength > 0){
    let value = Math.ceil(textLength / wordsPerMinute);
    result = `${value} min`;
  }
    document.getElementById('readingTime').innerText = result;
};

// toggle monospaced font
document.getElementById('toggleFont').addEventListener('change', function() {
    if (this.checked) {
        document.getElementById('textarea').classList.add('monospace');
    } else {
        document.getElementById('textarea').classList.remove('monospace');
    }
});