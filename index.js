window.onload = function () {
  const glitchingElems = document.querySelectorAll('.glitching-letters');
  const glitchingElemsOnce = document.querySelectorAll('.glitching-letters.-once');
  glitchingElems.forEach((item) => {
    item.onmouseover = (e) => bindGlitchingLetters(e);
  });

  glitchingElemsOnce.forEach((item) => {
    item.onmouseover = (e) => bindGlitchingLetters(e, true);
  });
};

function bindGlitchingLetters(event, runOnce) {
  const alphabetLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const originalText = event.target.innerText;
  let iterations = 0;

  if (event.target.hasAttribute('data-running')) return;

  if (runOnce) {
    if (event.target.hasAttribute('data-glitch-runned')) return;
    event.target.setAttribute('data-glitch-runned', true);
  }

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
