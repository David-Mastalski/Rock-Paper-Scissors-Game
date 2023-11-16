const score = document.querySelector('.all-points')
const optionArea = document.querySelector('.option')
const changeSizeArea = document.querySelector('.changeSize')
const fightArea = document.querySelector('.fight')
const resultInfo = document.querySelector('.result__info')

const allBtn = document.querySelectorAll('.button')
const playAgainBtn = document.querySelector('.playAgainBtn')

let points

if(JSON.parse(localStorage.getItem('userScore')) === null){
    points = 0
}else{
    points = JSON.parse(localStorage.getItem('userScore'))
}

const createRandomPick = () => {
    const random = Math.floor(Math.random()*3 + 1)
    let houseBtn = document.createElement('button')

    switch(random){
        case 1: 
            houseBtn.setAttribute('id', 'scissors')
            houseBtn.classList.add('button', 'button--scissors')
            houseBtn.innerHTML = `
            <div class="buttonImageContainer">
                <img src="images/icon-scissors.svg" alt="scissors">
            </div>
            `
        break;
        case 2:
            houseBtn.setAttribute('id', 'paper')
            houseBtn.classList.add('button', 'button--paper')
            houseBtn.innerHTML = `
            <div class="buttonImageContainer">
                <img src="images/icon-paper.svg" alt="paper">
            </div>
            `
        break;
        case 3:
            houseBtn.setAttribute('id', 'rock')
            houseBtn.classList.add('button', 'button--rock')
            houseBtn.innerHTML = `
            <div class="buttonImageContainer">
                <img src="images/icon-rock.svg" alt="rock">
            </div>
            `
        break;
        default: 
            houseBtn.classList.add('button', 'button--scissors')
            houseBtn.innerHTML = `
            <div class="buttonImageContainer">
                <img src="images/icon-scissors.svg" alt="scissors">
            </div>
            `
    }

    return houseBtn
}

const showPoints = () => {
    score.innerHTML = points
}

const addPoint = (resultInfo) => {
    if(resultInfo.textContent == 'you win'){
        points++
        localStorage.setItem('userScore', JSON.stringify(points));
        showPoints()
    }
}

const toggleDisplay = () => {
    optionArea.classList.toggle('dn')
    fightArea.classList.toggle('dn')
}

const showResult = (myPick, housePick) => {

    switch(myPick.id){
        case 'scissors':
            if(housePick.id == 'paper'){
                resultInfo.textContent = 'you win'
            }else if(housePick.id === 'rock'){
                resultInfo.textContent = 'you lose'
            }else{
                resultInfo.textContent = 'dead-heat'
            }
        break;
        case 'paper':
            if(housePick.id == 'rock'){
                resultInfo.textContent = 'you win'
            }else if(housePick.id === 'scissors'){
                resultInfo.textContent = 'you lose'
            }else{
                resultInfo.textContent = 'dead-heat'
            }
        break;
        case 'rock':
            if(housePick.id == 'scissors'){
                resultInfo.textContent = 'you win'
            }else if(housePick.id === 'paper'){
                resultInfo.textContent = 'you lose'
            }else{
                resultInfo.textContent = 'dead-heat'
            }
        break;
    }

    changeSizeArea.classList.add('changeSizeContainer')
    addPoint(resultInfo)
}

const showPick = (myPick) => {
    const myPickArea = document.querySelector('.pick__btnContainer--myPick')
    const randomPickArea = document.querySelector('.pick__btnContainer--housePick')
    const housePick = createRandomPick()

    myPickArea.append(myPick)

    setTimeout(() => {
        showResult(myPick, housePick)
     },1500)

    setTimeout(() => {
        document.querySelector('.housePickShadow').style.display = 'none'
        randomPickArea.append(housePick)
    },1000)
}

showPoints()
allBtn.forEach(button => button.addEventListener('click', () => {
    const myPick = button
    toggleDisplay()
    showPick(myPick)
}))

playAgainBtn.addEventListener('click', () => {
    window.location.reload()
})