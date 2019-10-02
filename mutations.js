// prototypes
HTMLElement.prototype.empty = function () {
  while (this.firstChild) {
    this.removeChild(this.firstChild)
  }
}

Array.prototype.shuffle = function () {
  var input = this

  for (var i = input.length - 1; i >= 0; i--) {
    var randomIndex = Math.floor(Math.random() * (i + 1))
    var itemAtIndex = input[randomIndex]

    input[randomIndex] = input[i]
    input[i] = itemAtIndex
  }
  return input
}
// end prototypes

// dom constants
const boardDom = document.querySelector('.board')
const displayedWordDom = document.querySelector('.displayed-word')
const answersDom = document.querySelector('.answers')
const scoreDom = document.querySelector('.result')
const timerDom = document.querySelector('.timer')
const successDom = document.querySelector('.success')
//end dom constants

successDom.addEventListener("transitionend", () => {
  if (successDom.classList.contains("shown")) {
      successDom.classList.replace("shown", "hidden");
  }
})

const mutations = {
  adoucissante: {
    after: [
      'a',
      'da',
      '2',
      'dindan',
      'diwar',
      'war',
      'dre',
      'e (possessif)',
      'eme',
      'en em',
      'en ur',
      'gwall',
      'hanter',
      'holl',
      'na',
      'ne',
      'pa',
      'pe',
      're',
      'seul',
      'tra',
      'war'
    ],
    letters: {
      k: 'g',
      t: 'd',
      p: 'b',
      g: "c'h",
      gw: 'w',
      b: 'v',
      m: 'v',
      d: 'z'
    }
  },
  mixte: {
    after: ['e', 'o (particule verbale)', 'ma (différent du possessif)'],
    letters: {
      g: "c'h",
      gw: 'w',
      d: 't',
      b: 'v',
      m: 'v'
    }
  },
  durcissante: {
    after: ['ho', "d'az", 'ez'],
    letters: {
      g: 'k',
      gw: 'kw',
      d: 't',
      b: 'p'
    }
  },
  spirante: {
    after: ['ma (possessif)', 'he (possessif)', 'o (possessif)', '3', '4', '9'],
    letters: {
      k: "c'h",
      t: 'z',
      p: 'f'
    }
  }
}

let score = 0;
let mutationsList = ["adoucissante", "mixte", "durcissante", "spirante"];


function rollBoard() {
  mutationsList.shuffle();
  answersDom.empty();

  let previousWords = mutations[mutationsList[0]].after;
  let word = previousWords[Math.floor(Math.random()*previousWords.length)]

  displayedWordDom.innerHTML = 'Quelle mutation après : <u>' + word + '</u> ?';
  
  mutationsList.forEach(mutation => {
    let singleMutation = createItem(mutation);
    singleMutation.addEventListener("click", () => earnPoint(mutation === mutationsList[0]));
  });
}

function earnPoint(bool) {
  score += bool ? 1 : score - 2 <= 0 ? - score : - 2;
  scoreDom.innerHTML = score;
  displaySuccess(bool);
  rollBoard();
}

function createItem(word) {
  let item = document.createElement("div");
  item.className = "item";

  item.innerHTML = word;
  answersDom.appendChild(item);
  return item;
}

function startTimer(duration, display) {
  var timer = duration, minutes, seconds;
  var refreshIntervalId = setInterval(function () {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;

      display.textContent = minutes + ":" + seconds;

      if (--timer < 0) {
          if (confirm("Kont en holl : " + score + ". Adkrogiñ ? Recommencer ?")) {
              timer = duration;
              score = 0;
          } else {
              clearInterval(refreshIntervalId);
          }
          
      }
  }, 1000);
}

function displaySuccess(bool) {
  successDom.empty();
  successDom.classList.replace("hidden", "shown");
  let el = document.createElement("div");
  el.className = bool ? "success-confirm" : "success-fail";
  el.innerHTML = bool ? "Mat eo" : "C'hwitet eo";
  successDom.appendChild(el);
}

window.onload = function () {
  startTimer(120, timerDom);
};

rollBoard();