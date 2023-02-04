window.onload = function () {
  const alphabetLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const glitchingElems = document.querySelectorAll('.glitching-letters');

  glitchingElems.forEach((item) => {
    item.onmouseover = (e) => bindGlitchingLetters(e);
  });

  function bindGlitchingLetters(event) {
    const originalText = event.target.innerText;
    let iterations = 0;

    if (event.target.hasAttribute('data-running')) return;

    event.target.setAttribute('data-running', true);

    let interval = setInterval(() => {
      event.target.innerText = event.target.innerText
        .split('')
        .map((letter, index) => {
          if (index >= iterations) {
            return alphabetLetters[Math.floor(Math.random() * 26)];
          }

          return originalText[index];
        })
        .join('');
      if (iterations > originalText.length) {
        clearInterval(interval);
        event.target.removeAttribute('data-running');
      }
      iterations += 1 / 3;
    }, 30);
  }
};
