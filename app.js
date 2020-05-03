const playButton = document.getElementById('play');
const playerData1 = document.getElementById('playerData1');
const playerData2 = document.getElementById('playerData2');
const proceedButton1 = document.getElementById('proceed1');
const proceedButton2 = document.getElementById('proceed2');
const gameField = document.getElementById('game');
const takeButtons = document.getElementsByClassName('take');
const playerMessage1 = document.getElementById('playerMessage1');
const playerMessage2 = document.getElementById('playerMessage2');
const playerTakeButtons1 = document.getElementById('playerTakeButtons1');
const playerTakeButtons2 = document.getElementById('playerTakeButtons2');

let playerGameField1 = document.getElementById('player1');
let playerGameField2 = document.getElementById('player2');
let playerName1 = document.getElementById('playerName1');
let playerName2 = document.getElementById('playerName2');
let stones = document.getElementById('stones');
let wonLabel = document.createElement('span');

wonLabel.innerText = 'WON';
wonLabel.className = 'wonLabel';

let allMovesCount = 0;
let allExpectedMovesCount = 0;
let playerMovesCount1 = 0;
let playerMovesCount2 = 0;
let playerExpectedMovesCount1 = 0;
let playerExpectedMovesCount2 = 0;
let stonesCount = 10;

playButton.addEventListener('click', start);
proceedButton1.addEventListener('click', proceed1);
proceedButton2.addEventListener('click', proceed2);

playButton.style.visibility = 'visible';

function start() {
        playerData1.style.visibility = 'visible';
        playButton.remove();
}

function play() {
    playerData2.remove();
    gameField.style.visibility = 'visible';

    let circle = document.createElement('div');

    let playerNameLabel1 = document.getElementById('playerNameLabel1');
    let playerNameLabel2 = document.getElementById('playerNameLabel2');

    playerNameLabel1.innerText = playerName1;
    playerNameLabel2.innerText = playerName2;

    for (let takeButton of takeButtons){
        let currentPlayer = takeButton.dataset.player;
        let currentValue = takeButton.dataset.value;
        takeButton.addEventListener('click', function () {
            if (currentPlayer == 1) {
                ++playerMovesCount1;
                ++playerExpectedMovesCount2;
            } else if (currentPlayer == 2){
                ++playerMovesCount2;
                ++playerExpectedMovesCount1;
            }
            ++allMovesCount;
            ++allExpectedMovesCount;
            stonesCount = stonesCount - currentValue;
            syncStones(stonesCount);
            syncMoves(
                allMovesCount,
                allExpectedMovesCount,
                playerMovesCount1,
                playerMovesCount2,
                playerExpectedMovesCount1,
                playerExpectedMovesCount2,
                stonesCount,
                playerNameLabel1,
                playerNameLabel2,
                wonLabel
            );
        });
    }

    syncStones(stonesCount);

    if (getRandomInt(2) === 0){
        ++playerExpectedMovesCount1;
    } else {
        ++playerExpectedMovesCount2;
    }

    ++allExpectedMovesCount;

    syncMoves(
        allMovesCount,
        allExpectedMovesCount,
        playerMovesCount1,
        playerMovesCount2,
        playerExpectedMovesCount1,
        playerExpectedMovesCount2,
        stonesCount,
        playerNameLabel1,
        playerNameLabel2,
        wonLabel
    );

}

function syncMoves(
    allMovesCount,
    allExpectedMovesCount,
    playerMovesCount1,
    playerMovesCount2,
    playerExpectedMovesCount1,
    playerExpectedMovesCount2,
    stonesCount,
    playerNameLabel1,
    playerNameLabel2,
    wonLabel
    ) {
    console.log(stonesCount);
    if (!isFinal(playerMovesCount1, playerMovesCount2, stonesCount, playerNameLabel1, playerNameLabel2, wonLabel)){
        if (allMovesCount !== allExpectedMovesCount){
            if (playerMovesCount1 !== playerExpectedMovesCount1){
                clearGameFieldClasses();
                playerGameField1.classList.add('active');
                playerGameField2.classList.add('disabled');
                playerTakeButtons1.style.visibility = 'visible';
                playerTakeButtons2.style.visibility = 'hidden';
                playerMessage1.style.visibility = 'hidden';
                playerMessage2.style.visibility = 'visible';
            } else if(playerMovesCount2 !== playerExpectedMovesCount2){
                clearGameFieldClasses();
                playerGameField1.classList.add('disabled');
                playerGameField2.classList.add('active');
                playerTakeButtons1.style.visibility = 'hidden';
                playerTakeButtons2.style.visibility = 'visible';
                playerMessage1.style.visibility = 'visible';
                playerMessage2.style.visibility = 'hidden';
            }
        }
    }
}

function deleteStones() {
    let existingStones = document.querySelectorAll('div.stone');
    for (let item of existingStones){
        item.remove();
    }
}

function isFinal(playerMovesCount1, playerMovesCount2, stonesCount, playerNameLabel1, playerNameLabel2, wonLabel) {
    if (stonesCount === 1){
        if (playerMovesCount1 > playerMovesCount2){
            clearGameFieldClasses();
            playerGameField2.remove();
            playerMessage1.remove();
            playerTakeButtons1.remove();
            stones.remove();
            wonLabel.classList.add('forPlayer1');
            playerGameField1.append(wonLabel);
            playerGameField1.classList.add('won');
            playerNameLabel1.classList.add('wonName');
            return true;
        } else if (playerMovesCount1 < playerMovesCount2) {
            clearGameFieldClasses();
            playerGameField1.remove();
            playerMessage2.remove();
            playerTakeButtons2.remove();
            stones.remove();
            wonLabel.classList.add('forPlayer2');
            playerGameField2.append(wonLabel);
            playerGameField2.classList.add('won');
            playerNameLabel1.classList.add('wonName');
            return true;
        }
    } else if (stonesCount <= 0){
        if (playerMovesCount1 > playerMovesCount2){
            clearGameFieldClasses();
            playerGameField1.remove();
            playerMessage2.remove();
            playerTakeButtons2.remove();
            stones.remove();
            wonLabel.classList.add('forPlayer2');
            playerGameField2.append(wonLabel);
            playerGameField2.classList.add('won');
            playerNameLabel1.classList.add('wonName');
            return true;
        } else if (playerMovesCount1 < playerMovesCount2) {
            clearGameFieldClasses();
            playerGameField2.remove();
            playerMessage1.remove();
            playerTakeButtons1.remove();
            stones.remove();
            wonLabel.classList.add('forPlayer1');
            playerGameField1.append(wonLabel);
            playerGameField1.classList.add('won');
            playerNameLabel1.classList.add('wonName');
            return true;
        }
    } else {
        return false;
    }
}

function syncStones(stonesCount){
    deleteStones();
    for (let i = 0; i < stonesCount; ++i){
        let stone = document.createElement('div');
        stone.className = 'stone';
        stones.append(stone);
    }
}

function clearGameFieldClasses() {
    playerGameField1.classList.remove('active');
    playerGameField1.classList.remove('disabled');
    playerGameField2.classList.remove('active');
    playerGameField2.classList.remove('disabled');
}

function take(player, value) {
    console.log(player, value)
}

function next() {
    playerData1.remove();
    playerData2.style.visibility = 'visible';
}

function proceed1() {
    if (!playerName1.innerText) {
        playerName1 = playerName1.value;
        next();
    } else {
        const message1 = document.getElementById('message1');
        message1.innerText = 'Entry anything to proceed';
        proceedButton1.style.marginTop = '33px';
        message1.style.visibility = 'visible';
    }
}

function proceed2() {
    if (!playerName2.innerText) {
        playerName2 = playerName2.value;
        play();
    } else {
        const message2 = document.getElementById('message2');
        message2.innerText = 'Entry anything to proceed';
        proceedButton2.style.marginTop = '33px';
        message2.style.visibility = 'visible';
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}