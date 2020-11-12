let textarea = document.getElementById("textarea");
if (localStorage.getItem('TEXT_VALUE')) {
    textarea.value = localStorage.getItem('TEXT_VALUE');
}

const trackText = e => {
    let words = e.target.value.split(/\s/g);
    if (words[words.length - 1] === '') {
        words.pop();
    }

    document.getElementById('words').innerHTML = words.length;
    document.getElementById('chars').innerHTML = e.target.value.replace(/\s/g, '').length;
    document.getElementById('chars-whitespace').innerHTML = e.target.value.length;

    localStorage.setItem('TEXT_VALUE', e.target.value)
}

textarea.addEventListener('input', trackText);

