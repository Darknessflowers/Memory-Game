const cards = document.querySelectorAll('.card');
let score = 0;
let scoreDisplay = document.querySelector('.score');
let cardsTurnedNum = 0;
let cardsTurned =[];
let lockBoard = false;

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
  //fix bug with back image
  //fix bug where matched cards get flipped back when cards are looped through. May have to store more info about flipped cards.
  
  //IDEA: nested array. [[id,src], [id,src]];
  //push images to array when flipped 
  //if not a match then reset array
  //if 2 srcs match then loop through cards and find ID (querySelector?) of ID1 || ID2 and add permaMatch class that keeps it visible even when flipped is removed
  console.log('flip');
  if (lockBoard) return;

  if(!hasBeenFlipped) {
    firstCard = this;

    hasBeenFlipped = true;
  } else {
    secondCard = this;
    hasBeenFlipped = false;
    // return;
  }
  console.log(`This first card stored is ${firstCard}`);
  console.log(`This second card stored is ${secondCard}`);
  this.classList.add('flip');
  this.lastElementChild.classList.remove('hidden');
  this.firstElementChild.classList.add('hidden');

  cardsTurned.push(this.lastElementChild.src);
  // console.log(cardsTurned);
  if(cardsTurned.length >= 2) {
    console.log('2 turned');
    if(firstCard.lastElementChild.src === secondCard.lastElementChild.src) {
      increaseScore();
      cardsTurned = [];
      firstCard.classList.add('permaFlip');
      secondCard.classList.add('permaFlip');
      //hide cards
    } else {
      lockBoard = true;
      // cards.forEach(card => console.log(card));
      console.log('flipping back');
      cardsTurned = [];

      setTimeout(function() {
        cards.forEach((card) => {
          // console.log(card.lastElementChild);
          card.classList.remove('flip');
          card.firstElementChild.classList.remove('hidden');
          card.lastElementChild.classList.add('hidden');
          lockBoard = false;
        });
      },1000);
      // setTimeout(function() {
      //   cards.forEach(card => {
      //     console.log(card.lastElementChild);
      //     // card.classList.remove('flip'));
      //   }
      // }, 2000);
      
      //turn cards back
    }
  }
}
function addImage() {
  //loop through array of cards and attach image from corresponding index of shuffled array
  cards.forEach((card,index) => { 
    card.lastElementChild.src = shuffledArray[index].frontFace;
  });
}
function increaseScore() {
  score++;
  scoreDisplay.innerHTML = `${score}/10`;
  if(score === 10) {
    alert('You won');
  }
}
//add all images to random cards on load
addImage();
//add event listener for clicking of cards
cards.forEach(card => card.addEventListener('click', flipCard));

// function flipCard(e) {
//   console.log(e.currentTarget);
// }
//TO DO
//populate pairs array with all 10 Jonti Images
//populate grid with all the jonti images
//get images loading in a random order
//by default have back of card showing 
//if clicked on show front
//if only one card is clicked then keep showing
//if it is the second card turned then if a match add to score and keep on 
// otherwise turn both cards back
//once all 10 matches are found pop up a you won! screen

// cards.addEventListener('click', function(e) {
//   console.log(e.currentTarget);
// });

// cards.addEventListener('click', e => {
//   console.log(e.currentTarget);
//   console.log(this);
// });
