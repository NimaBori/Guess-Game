const startGameBtn = document.getElementById('start-btn')
const modeBtns = document.querySelectorAll('.modes-btns-container button')
const guessBtn = document.getElementById('guess-btn')
const inputEl = document.querySelector('.game-player input')
const resultEl = document.querySelector('.result-section')
const quitBtn = document.getElementById('quit-btn')

let gameMode
let correctGuess
let lifes = 0


//Controllers
startGameBtn.addEventListener('click', () => {  
  if (gameMode === undefined) {
    alert('Please select a game mode firstly!')
  } else {
    document.querySelector('.start-game').style['display'] = 'none'
    document.querySelector('.game-player').style['display'] = 'flex'
    if (gameMode === 'easy') {lifes = 3 }
    else if (gameMode === 'medium') {lifes = 5}
    else {lifes = 7}
    lifesLeft()  
  } 
  
})

guessBtn.addEventListener('click', () => { 
  lifes-- 
  lifesLeft()
  const playerGuess = parseInt(inputEl.value)
  if (lifes !== 0 && playerGuess !== correctGuess) {        
    hintHandler(playerGuess)  
    guessBtn.innerText = 'Guess Again'     
  } else if (lifes >= 0 && playerGuess === correctGuess) {
    result('WON', "Happy")    
  }0
  if (lifes <= 0 && playerGuess !== correctGuess) {
    result('LOST', "Cry")
  }
})

quitBtn.addEventListener('click', () => {
  resultEl.classList.remove('result-section-show')
  document.querySelector('.start-game').style['display'] = 'flex'
  inputEl.value = '00'
  modeBtns.forEach(btn => {
    btn.classList.remove('clicked')
  })
})

//View
function guideHandler(max) {
  const guideEl = document.querySelector('.guide-container')
  guideEl.innerHTML = `
      <div class="minimum">MIN guess = 1</div>
      <div class="maximum">MAX guess = ${max}</div>
  `
  correctGuess = Math.floor(Math.random() * max) + 1  
}

function hintHandler(playerGuess) {
  const hintEl = document.querySelector('.hint')
  if (parseInt(playerGuess) > parseInt(correctGuess)) {
    hintEl.textContent = 'Enter lesser number'
  } else {hintEl.textContent = 'Enter greater number'}
}

function result(status, srcImg) {
  document.querySelector('.game-player').style['display'] = 'none'
  resultEl.classList.add('result-section-show')
  document.querySelector('.finish-icon').innerHTML = `<img src="/${srcImg}-face.png" >`
  document.querySelector('.result').textContent = `You ${status}`
  document.querySelector('.final-left-lifes').textContent = `Left Lifes ${lifes}`    
}

function lifesLeft() {
  document.querySelector('.left-lifes').textContent = `
  left lifes ${lifes}
  `  
}

//Model
modeBtns.forEach(btn => {    
  btn.addEventListener('click', () => {    
    if (btn.id === 'easy') {
      gameMode = 'easy'        
      guideHandler(10) 
    } else if (btn.id === 'medium') {
      gameMode = 'medium'
      guideHandler(50)
    } else {
      gameMode = 'hard'
      guideHandler(100)
    } 
    modeBtns.forEach(btn => {
      if (btn.id === gameMode && !btn.classList.contains('clicked') ) {
        btn.classList.add('clicked')
        } else {btn.classList.remove('clicked')}
      })
   }) 
})


