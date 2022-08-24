const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const colors = ['#dfc246','#DF7B48','#6adf48','#e154da','#54b3e1','#54e169']
let time = 0
let score = 0
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
// const restart = document.querySelector('#restart')
// var buttonRest = createElement('button');

startBtn.addEventListener('click', (event)=>{
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', event => {
    if(event.target.classList.contains('time-btn')){
        time = parseInt(event.target.getAttribute('data-time'))
        startGame()
    }
})

function setColor(circle){
    const color = getRandomColor()
    circle.style.background = color
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`
}
function getRandomColor(){
    const index =  Math.floor(Math.random() * colors.length)
    return colors[index]
 }


board.addEventListener('click', event =>{
    if (event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
} )

function startGame(){
    screens[1].classList.add('up')
    setInterval(decreaseTime, 1000)
    setTime(time)
    createRandomCircle()
}




function decreaseTime(){
    if(time === 0){
        finishGame()
    }
    else{
        let current = --time
  
    if (current < 10){
        current = `0${current}`
    }
    setTime(current)
    }

    
}

function setTime(value){
    timeEl.innerHTML = `00:${value}`
}




function createRandomCircle(){
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)
    
    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    setColor(circle)
    
    board.append(circle)

}

function getRandomNumber(min, max){
    return Math.round(Math.random() * (max-min) + min)

}

function finishGame (){
    timeEl.parentNode.remove()

    board.innerHTML = `<h1>Ваш счет: <span class="primary">${score}</span></h1>`
    
}