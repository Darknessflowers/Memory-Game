const cards = document.querySelectorAll('.card');
let score = 0;
let scoreDisplay = document.querySelector('.score');
let cardsTurnedNum = 0;
let cardsTurned =[];
let lockBoard = false;
const refreshPage = document.querySelector('.refreshPage');
const closeWinnerBox = document.querySelector('.closeWinner');
const winnerBox = document.querySelector('.winner');
let startTime, endTime;
let finalTime = document.querySelector('.finalTime');

let pairs = [
  {
    id: 1,
    frontFace: 'img/jonti-blanket.jpg',
    found: false,
  },
  {
    id: 2 ,
    frontFace: 'img/jonti-blanket.jpg',
    found: false,
  },
  {
    id: 3 ,
    frontFace: 'img/jonti-couch.jpg',
    found: false,
  },
  {
    id: 4 ,
    frontFace: 'img/jonti-couch.jpg',
    found: false,
  },
  {
    id: 5 ,
    frontFace: 'img/jonti-grass.jpg',
    found: false,
  },
  {
    id: 6 ,
    frontFace: 'img/jonti-grass.jpg',
    found: false,
  },
  {
    id: 7 ,
    frontFace: 'img/jonti-happy.jpg',
    found: false,
  },
  {
    id: 8 ,
    frontFace: 'img/jonti-happy.jpg',
    found: false,
  },
  {
    id: 9 ,
    frontFace: 'img/jonti-roar.jpg',
    found: false,
  },
  {
    id: 10 ,
    frontFace: 'img/jonti-roar.jpg',
    found: false,
  },
  {
    id: 11 ,
    frontFace: 'img/jonti-smile.jpg',
    found: false,
  },
  {
    id: 12 ,
    frontFace: 'img/jonti-smile.jpg',
    found: false,
  },
  {
    id: 13 ,
    frontFace: 'img/jonti-stern.jpg',
    found: false,
  },
  {
    id: 14 ,
    frontFace: 'img/jonti-stern.jpg',
    found: false,
  },
  {
    id: 15 ,
    frontFace: 'img/jonti-tongue.jpg',
    found: false,
  },
  {
    id: 16 ,
    frontFace: 'img/jonti-tongue.jpg',
    found: false,
  },
  {
    id: 17 ,
    frontFace: 'img/jonti-upsidedown.jpg',
    found: false,
  },
  {
    id: 18 ,
    frontFace: 'img/jonti-upsidedown.jpg',
    found: false,
  },
  {
    id: 19 ,
    frontFace: 'img/jonti-wtf.jpg',
    found: false,
  },
  {
    id: 20 ,
    frontFace: 'img/jonti-wtf.jpg',
    found: false,
  },
];

let shuffledArray = shuffleArray(pairs); //will mutate original array

function shuffleArray(array) {
  for(let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i+1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
    // return temp;
  }
return array;
}
let firstCard, secondCard;
let hasBeenFlipped = false;

function flipCard(e) {
  if (lockBoard) return;

  if(!hasBeenFlipped) {
    firstCard = this;
    console.log(firstCard);
    hasBeenFlipped = true;
  } else {
    if(this.lastElementChild.id !== firstCard.lastElementChild.id) {
      secondCard = this;
    } else {
      return;
    }
    console.log(secondCard);
    hasBeenFlipped = false;
    // return;
  }
  this.classList.add('flip');
  this.lastElementChild.classList.remove('hidden');
  this.firstElementChild.classList.add('hidden');

  cardsTurned.push(this.lastElementChild.src);
  // console.log(cardsTurned);
  if(cardsTurned.length === 2) {
    if (lockBoard) return;
    if(firstCard.lastElementChild.src === secondCard.lastElementChild.src && firstCard.lastElementChild.id !== secondCard.lastElementChild.id) {
      increaseScore();
      cardsTurned = [];
      firstCard.classList.add('permaFlip');
      secondCard.classList.add('permaFlip');
    } else {
      console.log('flipping back');
      cardsTurned = [];
      lockBoard = true;
      setTimeout(function() {
        cards.forEach((card) => {
          card.classList.remove('flip');
          card.firstElementChild.classList.remove('hidden');
          card.lastElementChild.classList.add('hidden');
          lockBoard = false;
        });
      },1000);
    }
  }
}
function addImage() {
  //loop through array of cards and attach image from corresponding index of shuffled array
  cards.forEach((card,index) => { 
    card.lastElementChild.src = shuffledArray[index].frontFace;
    card.lastChild.id = shuffledArray[index].id;
  });
}
function increaseScore() {
  score++;
  scoreDisplay.innerHTML = `${score}/10`;
  if(score === 10) {
    //stopTimer
    endTimer();
    setTimeout(() => {
      winnerBox.classList.add('open');
    },300);
  }
}

function startTimer() {
  startTime = performance.now();
};

function endTimer() {
  endTime = performance.now();
  let timeDiff = endTime - startTime; //in ms 
  // strip the ms 
  timeDiff /= 1000; 
  
  // get seconds 
  let seconds = Math.round(timeDiff);
  finalTime.innerText = `${seconds} seconds`;
  console.log(seconds + " seconds");
}
//add all images to random cards on load
addImage();
startTimer();
//add event listener for clicking of cards
cards.forEach(card => card.addEventListener('click', flipCard));
refreshPage.addEventListener('click', () => {
  window.location.reload();
});
closeWinnerBox.addEventListener('click', () => {
  winnerBox.classList.remove('open');
});
