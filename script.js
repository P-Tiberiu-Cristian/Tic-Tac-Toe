//CONSTANTS
const btnStart = document.getElementById('start-new-game');
const btnReset = document.getElementById('reset-btn');
const ttt = document.getElementById('ttt');
const box1 = document.getElementById('box1');
const box2 = document.getElementById('box2');
const box3 = document.getElementById('box3');
const box4 = document.getElementById('box4');
const box5 = document.getElementById('box5');
const box6 = document.getElementById('box6');
const box7 = document.getElementById('box7');
const box8 = document.getElementById('box8');
const box9 = document.getElementById('box9');
const player1 = document.getElementById('player_1');
const player2 = document.getElementById('player_2');
const result = document.getElementById('result');
const symbols = ['X', 'O'];


//Colors
const limeGreen = 'lime';
const red = 'red';

//Logic variables
let player1Move = true;
let player2Move = false;
let newGameExecuted = false;
let hWin = false;
let vWin = false;
let dWin = false;
let populated = false;

//Score vars and interval id
let interval;
let xScore = document.getElementById('x-score');
let oScore = document.getElementById('o-score');
let xWins = 1;
let oWins = 1;

//Board
let board = [
    [box1, box2, box3],
    [box4, box5, box6],
    [box7, box8, box9]
];

//Board matrix(random numbers to deter false wins)
let boardMatrix = [
    [10, 20, 30],
    [40, 50, 60],
    [70, 80, 90]
]

//Board matrix length
const m_length = boardMatrix.length;

//Hide result label and grid on page load
result.style.visibility = 'hidden';
ttt.style.visibility = 'hidden';

//Start game function
function newGame(){
    newGameExecuted = true;

    animateGrid();
    
    boardMatrix = [
        [10, 20, 30],
        [40, 50, 60],
        [70, 80, 90]
    ]

    populated = false;
    result.innerText = 'Result:';
    result.style.visibility = 'hidden';
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board.length; j++){
                board[i][j].setAttribute('onclick', 'whoPlays()');
                board[i][j].innerText = '';
                board[i][j].style.pointerEvents = 'auto';
                board[i][j].style.backgroundColor = '';
                $(board[i][j]).removeClass('blink-1');
                $(board[i][j]).removeClass('swing-in-top-fwd');
        }
    }
    disableReset();
    whoPlays();
    clearInterval(interval);
    interval = setInterval(checkWin, 50);
}

//Function to animate grid on new game
function animateGrid(){
    if(!newGameExecuted){
        if($(ttt).hasClass('animate__animated animate__bounceInDown')){
            $(ttt).removeClass('animate__animated animate__bounceInDown');
        }  
        setTimeout(() => {
            ttt.style.visibility = 'visible';
            $(ttt).addClass('animate__animated animate__bounceInDown');
        }, 50);
    }

    ttt.classList = '';
    setTimeout(() => {
        $(ttt).addClass('animate__animated animate__rubberBand');
    }, 50);

}

//Function to test win conditions
function testWin(){

    vWin = false;
    hWin = false;
    dWin = false;

    //Check vertical
    for(let i = 0; i < 1; i++){
        for(let j = 0; j < m_length; j++){
            if(boardMatrix[i][j] === boardMatrix[i+1][j] && boardMatrix[i+1][j] === boardMatrix[i+2][j]){
                let x_or_o = boardMatrix[i][j];

                board[i][j].style.backgroundColor = limeGreen;
                board[i+1][j].style.backgroundColor = limeGreen;
                board[i+2][j].style.backgroundColor = limeGreen;

                $(board[i][j]).addClass('blink-1');
                $(board[i+1][j]).addClass('blink-1');
                $(board[i+2][j]).addClass('blink-1');

                $(board[i][j]).removeClass('swing-in-top-fwd');
                $(board[i+1][j]).removeClass('swing-in-top-fwd');
                $(board[i+2][j]).removeClass('swing-in-top-fwd');

                if(x_or_o === 1){
                    result.innerHTML = 'X Wins';
                }else if(x_or_o === 2){
                    result.innerHTML = 'O Wins';
                };

                vWin = true;
                gameOver();
                resetColors();
            }
        }
    }

    //Check horizontal
    for(let i = 0; i < m_length; i++){
        for(let j = 0; j < 1; j++){
            if(boardMatrix[i][j] === boardMatrix[i][j+1] && boardMatrix[i][j+1] === boardMatrix[i][j+2]){
                let x_or_o = boardMatrix[i][j];

                board[i][j].style.backgroundColor = limeGreen;
                board[i][j+1].style.backgroundColor = limeGreen;
                board[i][j+2].style.backgroundColor = limeGreen;

                $(board[i][j]).addClass('blink-1');
                $(board[i][j+1]).addClass('blink-1');
                $(board[i][j+2]).addClass('blink-1');

                $(board[i][j]).removeClass('swing-in-top-fwd');
                $(board[i][j+1]).removeClass('swing-in-top-fwd');
                $(board[i][j+2]).removeClass('swing-in-top-fwd');

                if(x_or_o === 1){
                    result.innerHTML = 'X Wins';
                }else if(x_or_o === 2){
                    result.innerHTML = 'O Wins';
                }

                hWin = true;
                gameOver();
                resetColors();
            }
        }
    }

    //Check diagonals(Primary)
    for(let i = 0; i < 1; i++){
        if(boardMatrix[i][i] === boardMatrix[i+1][i+1] && boardMatrix[i+1][i+1] === boardMatrix[i+2][i+2]){

            let x_or_o = boardMatrix[i][i];

            board[i][i].style.backgroundColor = limeGreen;
            board[i+1][i+1].style.backgroundColor = limeGreen;
            board[i+2][i+2].style.backgroundColor = limeGreen;

            $(board[i][i]).addClass('blink-1');
            $(board[i+1][i+1]).addClass('blink-1');
            $(board[i+2][i+2]).addClass('blink-1');

            $(board[i][i]).removeClass('swing-in-top-fwd');
            $(board[i+1][i+1]).removeClass('swing-in-top-fwd');
            $(board[i+2][i+2]).removeClass('swing-in-top-fwd');

            if(x_or_o === 1){
                    result.innerHTML = 'X Wins';
            }else if(x_or_o === 2){
                result.innerHTML = 'O Wins';
            }

            dWin = true;
            gameOver();
            resetColors();
            
    //(Secondary)
        }else if(boardMatrix[i][m_length -1 -i] === boardMatrix[i+1][m_length -1 -(i+1)] 
        && boardMatrix[i+1][m_length -1 -(i+1)] === boardMatrix[i+2][m_length -1 -(i+2)]){

            let x_or_o = boardMatrix[i][m_length -1 -i];

            board[i][m_length -1 -i].style.backgroundColor = limeGreen;
            board[i+1][m_length -1 -(i+1)].style.backgroundColor = limeGreen;
            board[i+2][m_length -1 -(i+2)].style.backgroundColor = limeGreen;

            $(board[i][m_length -1 -i]).addClass('blink-1');
            $(board[i+1][m_length -1 -(i+1)]).addClass('blink-1');
            $(board[i+2][m_length -1 -(i+2)]).addClass('blink-1');

            $(board[i][m_length -1 -i]).removeClass('swing-in-top-fwd');
            $(board[i+1][m_length -1 -(i+1)]).removeClass('swing-in-top-fwd');
            $(board[i+2][m_length -1 -(i+2)]).removeClass('swing-in-top-fwd');

            if(x_or_o === 1){
                    result.innerHTML = 'X Wins';
            }else if(x_or_o === 2){
                result.innerHTML = 'O Wins';
            }

            dWin = true;
            gameOver();
            resetColors();
        }
    }
}

//Check for tie
function checkTie(){
    if(box1.innerHTML != '' && box2.innerHTML != '' && box3.innerHTML != '' 
    && box4.innerHTML != '' && box5.innerHTML != '' && box6.innerHTML != '' 
    && box7.innerHTML != '' && box8.innerHTML != '' && box9.innerHTML != ''){
        populated = true;
    }
    if(populated){
        gameOver();
        resetColors();
        enableReset();
        if(!hWin && !vWin && !dWin){
            result.innerText = 'Tie!';
    }
}
}

//Toggle players turn
function whoPlays(){
    
    if(player1Move === true){
        playerMove(1);
    }
    else if(player2Move === true){
        playerMove(2);  
    }
}

//Function to add X and O in the boxes
function playerMove(player){
    if(player == 1){
        player1.style.color = 'red';
        player2.style.color = 'white';
        $(player1).addClass('jello-horizontal');
        $(player2).removeClass('jello-horizontal');
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board.length; j++){
                if(board[i][j].innerText === ''){
                    board[i][j].addEventListener('click', function(){
                        boardMatrix[i][j] = 1;
                        board[i][j].setAttribute('onclick', '');
                        board[i][j].innerText = symbols[0];
                        board[i][j].style.pointerEvents = 'none';
                        $(board[i][j]).addClass('swing-in-top-fwd');
                    })
                }
            }
        }
        player1Move = false;
        player2Move = true;
    }
    else if(player == 2){
        player2.style.color = 'red';
        player1.style.color = 'white';
        $(player2).addClass('jello-horizontal');
        $(player1).removeClass('jello-horizontal');
        for(let i = 0; i < board.length; i++){
            for(let j = 0; j < board.length; j++){
                if(board[i][j].innerText === ''){
                    board[i][j].addEventListener('click', function(){
                        boardMatrix[i][j] = 2;
                        board[i][j].setAttribute('onclick', '');
                        board[i][j].innerText = symbols[1];
                        board[i][j].style.pointerEvents = 'none';
                        $(board[i][j]).addClass('swing-in-top-fwd');
                    })
                }
            }
        }
        player2Move = false;
        player1Move = true;
    }
}

//Function to end the game
function gameOver(){
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board.length; j++){
            board[i][j].style.pointerEvents = 'none';
        }
    }
    clearInterval(interval);
    score();
    enableReset();
    newGameExecuted = false;
}

//Function to reset X and O labels color
function resetColors(){
    player1.style.color = 'white';
    player2.style.color = 'white';
    result.style.visibility = 'visible';
}

//Function to check for win
function checkWin(){
    testWin();
    checkTie();
}

//Function to keep the score
function score(){
    if(result.innerHTML === 'X Wins'){
        if(hWin && vWin || vWin && dWin || hWin && dWin){
            xWins--;
        }
        xScore.innerHTML = 'X: ' + xWins++;
    } 
    if(result.innerHTML === 'O Wins'){
        if(hWin && vWin || vWin && dWin || hWin && dWin){
            oWins--;
        }
        oScore.innerHTML = 'O: ' + oWins++;
    }
}

//Function to reset the score
function resetScore(){
    $(xScore).addClass('animate__animated animate__flash');
    $(oScore).addClass('animate__animated animate__flash');
    setTimeout(() => {
        $(xScore).removeClass('animate__animated animate__flash');
        $(oScore).removeClass('animate__animated animate__flash');
    }, 1000);
    xWins = 1;
    oWins = 1;
    xScore.innerHTML = 'X: 0';
    oScore.innerHTML = 'O: 0';
}

//Function to disable the reset button
function disableReset(){
    btnReset.style.opacity = '50%';
    btnReset.style.pointerEvents = 'none';
}

//Function to enable the reset button
function enableReset(){
    btnReset.style.opacity = '100%';
    btnReset.style.pointerEvents = 'auto';
}

//Function to shake start button if no new game was started
function alertNoGameStarted(){
    if(!newGameExecuted){
        $(btnStart).addClass('animate__animated animate__headShake');
        setTimeout(() => {
            $(btnStart).removeClass('animate__animated animate__headShake'); 
        }, 500);
    }
}