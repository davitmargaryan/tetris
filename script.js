let rowCount;
let collCount;
let currentItem;
let currentIndexes;
let speed = 1000;
let moveDownTimerId;
askBoardSizes();
const topMiddle = Math.floor(collCount/2);
const allItems = [
    {pieceL: [topMiddle, topMiddle + collCount, topMiddle + 2 * collCount, topMiddle + 2 * collCount + 1]},
    {pieceJ: [topMiddle, topMiddle + collCount, topMiddle + 2 * collCount, topMiddle + 2 * collCount - 1]},
    {pieceI: [topMiddle, topMiddle + collCount, topMiddle + 2 * collCount, topMiddle + 3 * collCount]},
    {pieceO: [topMiddle, topMiddle + collCount, topMiddle + 1, topMiddle + 1 + collCount]},
    {pieceS: [topMiddle, topMiddle + collCount, topMiddle + 1 + collCount, topMiddle + 1 + 2 * collCount ]},
    {pieceZ: [topMiddle, topMiddle + collCount, topMiddle - 1 + collCount, topMiddle - 1 + 2 * collCount ]},
    {pieceT: [topMiddle, topMiddle + 1, topMiddle -1, topMiddle + collCount ]},
];
function askBoardSizes() {
    rowCount = +prompt('Please enter rows count (10-20)', 20);
    collCount = +prompt('Please enter columns count (5-20)', 10);
    if(rowCount < 10 || rowCount > 20 || collCount < 5 || collCount > 20){
        alert('Please input valid numbers');
        askBoardSizes();
    } else {
        createBoard()
    }
}
function createBoard() {
    const mainBoard = document.getElementById('main-board');
    mainBoard.style.width = collCount * 30 + 'px';
    mainBoard.style.height = rowCount * 30 + 'px';
    for(let i = 0; i < rowCount * collCount; i ++){
        let box = document.createElement('div');
        box.classList.add('tetris-box');
        box.dataset.coordinates = i;
        box.id = i;
        // if(i === 5){
        //     currentIndex = i;
        //     currentItem = box;
        //     box.classList.add('current-item');
        // }
        mainBoard.appendChild(box);
    };
}
document.addEventListener('keydown', onKeyPress);
function onKeyPress(e) {
    const code = e.which;
    switch (code) {
        case 40:
            move('down');
            break;
        case 37:
            move('left');
            break;
        case 39:
            move('right');
            break;
        case 38:
            rotate();
            break;
    }
}
function rotate() {
    
}
function move(direction) {
    if(!canMove(direction))return;
    currentItem.classList.remove('current-item');
    switch (direction) {
        case 'left':
            currentIndex --;
            break;
        case 'right':
            currentIndex ++;
            break;
        case 'down':
            currentIndex += collCount;
            break;
    }
    currentItem = document.getElementById(currentIndex+'');
    currentItem.classList.add('current-item');
}
function canMove(direction) {
    switch (direction) {
        case 'left':
            return currentIndex % collCount !== 0;
        case 'right':
            return (currentIndex +1) % collCount !== 0;
        case 'down':
            return (currentIndex + collCount) < rowCount * collCount;
        default:
            return false;
    }
}
function onStartBtnClick(){
    currentItem = getNewItem();
    drawCurrentItem();
    moveDownTimerId = setInterval(()=>move('down'), speed);
}
function getNewItem() {
    const random = Math.floor(Math.random() * 7);
    return allItems[random];
}
function drawCurrentItem (){
    currentIndexes = currentItem[Object.keys(currentItem)[0]];
    for(let i = 0; i < currentIndexes.length; i++) {
        const el = document.getElementById(currentIndexes[i] +'');
        el.classList.add('current-item');
    }
}