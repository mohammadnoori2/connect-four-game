var player1 = prompt("Enter Your Name, You will be blue");
var player1Color = 'rgb(86, 151, 255)';

var player2 = prompt("Enter Your Name, You will be red")
var player2Color = 'rgb(275, 45, 73)';


var game_on = true;
var table = $('table tr');

function reportWin(rowNum, ColNum){
    console.log("You won starting at this row, col");
    console.log(rowNum);
    console.log(ColNum)

}


function changeColor(rowIndex, colIndex, color){
return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color', color);
}


function returnColor(rowIndex, colIndex){
    return table.eq(rowIndex).find('td').eq(colIndex).find('button').css('background-color');
}


function checkButton(colIndex){
    var colorReport = returnColor(5, colIndex);
    console.log(colorReport);
    for (var row =5; row>-1;row--){
        colorReport = returnColor(row, colIndex);
        if (colorReport=== 'rgb(128, 128, 128)'){
            return row; 
        }
    }
}


function colorMatchCheck(one, two, three, four) {
    return (
        one !== 'rgb(128, 128, 128)' &&
        one !== undefined &&
        one === two &&
        one === three &&
        one === four
    );
}
function disableButtons() {
    $('.board button').prop('disabled', true);
}

// horizontal win check
function horizontalWinCheck(){
    for (var row = 0; row<6; row++){
        for (var col = 0; col<4; col++){
            if(colorMatchCheck(returnColor(row,col), returnColor(row, col+1),returnColor(row, col+2), returnColor(row, col+3))) {
                console.log('horiz');
                reportWin(row, col);
                return true;

            }
            else {
                continue;
            }
        }

    }
}

// vertical win check
function verticalWinCheck(){
    for (var col = 0; col<7; col++){
        for (var row = 0; row<3; row++){
            if(colorMatchCheck(returnColor(row,col), returnColor(row+1, col),returnColor(row+2, col), returnColor(row+3, col))) {
                console.log('vertical');
                reportWin(row, col);
                return true;

            }
            else {
                continue;
            }
        }

    }
}

// Diagonal win check
function diagonalWinCheck(){
    for (var col = 0; col<5; col++){
        for (var row = 0; row<7; row++){
            if(colorMatchCheck(returnColor(row,col), returnColor(row+1, col+1),returnColor(row+2, col+2), returnColor(row+3, col+3 ))) {
                console.log('diag');
                reportWin(row, col);
                return true;

            }
            else if(colorMatchCheck(returnColor(row,col), returnColor(row-1, col+1),returnColor(row-2, col+2), returnColor(row-3, col+3))) {
                console.log('diag');
                reportWin(row, col);
                return true;

            }
            else {
                continue;
            }
        }

    }
}

// Game Logic
// start with player 1
var currentPlayer = 1;
var currentName = player1;
var currentColor = player1Color;

$('h3').text(player1 + ' It is your turn,  pick a column to drop in!');

var colCount = [0, 0, 0, 0, 0, 0, 0];
var totalMoves = 0;
$('.board button').on('click', function(){
    totalMoves++;
    var col = $(this).closest('td').index();
    if (colCount[col] >= 6) {
        alert('Column is full. Please choose another column.');
        totalMoves--; // Decrement the totalMoves if the column is full
        return;
    }
    var buttomAvail = checkButton(col);
    changeColor(buttomAvail, col, currentColor);
    colCount[col]++;
    
    if(horizontalWinCheck() || verticalWinCheck() || diagonalWinCheck()) {
        $('h1').text(currentName + " You have won!");
        $('h3').fadeOut('fast');
        $('h2').fadeOut('fast');
        disableButtons();
    }
    else if (totalMoves === 42) { // Check for a draw when all cells are filled
        $('h1').text("It's a draw! Play again.");
        $('h3').fadeOut('fast');
        $('h2').fadeOut('fast');
        disableButtons();
    } else {
        currentPlayer = currentPlayer * -1;
    
        if (currentPlayer === 1) {
            currentName = player1;
            $('h3').text(currentName + " it is your turn.");
            currentColor = player1Color;
        } else {
            currentName = player2;
            $('h3').text(currentName + " it is your turn");
            currentColor = player2Color;
        }
    }
});
$('#restartBtn').on('click', function() {
    // Reset the game board
    $('.board button').css('background-color', 'rgb(128, 128, 128)').prop('disabled', false);
    
    // Reset column counts
    colCount = [0, 0, 0, 0, 0, 0, 0];
    
    // Reset totalMoves counter
    totalMoves = 0;
    
    // Reset game status
    game_on = true;
    
    currentPlayer = 1;
    currentName = player1;
    currentColor = player1Color;
    
    $('h1').text("Connect Four Game");
    $('h3').text(currentName + ' it is your turn, pick a column to drop in!');
    
    // Enable buttons on board
    $('.board button').prop('disabled', false);
});

// Modify your existing game end conditions to include the restart functionality:
if (horizontalWinCheck(), verticalWinCheck(), diagonalWinCheck()) {
    $('h1').text(currentName + " You have won!");
    $('h3').fadeOut('fast');
    $('h2').fadeOut('fast');
    
    disableButtons();
} else if (totalMoves === 42) {
    $('h1').text("It's a draw! Play again.");
    disableButtons();
}
