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

/**
 * Calculate byte size of a text snippet
 * @author Lea Verou
 * MIT License
 */

(function(){

var crlf = /(\r?\n|\r)/g,
    whitespace = /(\r?\n|\r|\s+)/g;

window.ByteSize = {
    count: function(text, options) {
        // Set option defaults
        options = options || {};
        options.lineBreaks = options.lineBreaks || 1;
        options.ignoreWhitespace = options.ignoreWhitespace || false;
        
        var length = text.length,
            nonAscii = length - text.replace(/[\u0100-\uFFFF]/g, '').length,
            lineBreaks = length - text.replace(crlf, '').length; 
        
        if (options.ignoreWhitespace) {
            // Strip whitespace
            text = text.replace(whitespace, '');
            
            return text.length + nonAscii;
        }
        else {
            return length + nonAscii + Math.max(0, options.lineBreaks * (lineBreaks - 1));
        }
    },
    
    format: function(count, plainText) {
        var level = 0;
        
        while (count > 1024) {
            count /= 1024;
            level++;
        }
    
        // Round to 2 decimals
        count = Math.round(count*100)/100;
    
        level = ['', 'K', 'M', 'G', 'T'][level];
    
        return (plainText? count : count) + ' ' + level + 'B';
    }
};

})();

var isWin = navigator.platform.indexOf('Win') === 0,
    $ = function(id) {
        return document.getElementById(id);
    },
    $attach = function(obj, props, agressive) {
        for (var prop in props) {
            if (agressive || !(prop in obj) || obj[prop] === undefined) {
                obj[prop] = props[prop];
            }
        }
        
        return obj;
    };

updateCount = function() {
  
  var text = textarea.value;
  var results = document.getElementById('results');
  var sizeUnix = ByteSize.format(ByteSize.count(text)),
          sizeWin = ByteSize.format(ByteSize.count(text, {
            lineBreaks: 2
          }));

        results.innerHTML = (isWin? sizeWin : sizeUnix);
};

textarea.oninput =  function(evt){
    updateCount();
    return false;
};
