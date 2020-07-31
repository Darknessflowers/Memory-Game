const cards = document.querySelectorAll('.tiles');
let pairs = [
  {
    id: 1,
    frontFace: 'img/jonti1.jpg',
    backFace: 'img/cat.svg',
    found: false,
  },
  {
    id: 2 ,
    url: 'img/jonti2.jpg',
    found: false,
  },
];
function flipCard(e) {
  console.log('flip');
  // console.log(this);
  this.classList.add('flip');
}
function addImage() {
  let frontImg = pairs[0].backFace;
  let frontFace = document.querySelector('#frontFace');
  frontFace.src = frontImg;
}
cards.forEach(card => addImage());
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
