/* """
https://inventwithpython.com/chapter15.html

Othello is played as follows: Each Othello piece is white on one side and black on the other.
When a piece is surrounded by its opponents on both the left and right sides, or both the top and
bottom, it is said to be captured and its color is flipped. On your turn, you must capture at
least one of your opponent's pieces. The game ends when either user has no more valid moves. The
win is assigned to the person with the most pieces. Implement the object-oriented design for
Othello.

""" */

type Tile = 'X' | 'O' | ' ';
type Board = Tile[][];

function drawBoard(board: Board): void {
  // Function implementation
}

function resetBoard(board: Board): void {
  // Function implementation
}

function getNewBoard(): Board {
  // Function implementation
  return [];
}

function isValidMove(board: Board, tile: Tile, xstart: number, ystart: number): boolean | [number, number][] {
  // Function implementation
  return false;
}

function isOnBoard(x: number, y: number): boolean {
  // Function implementation
  return false;
}

function getValidMoves(board: Board, tile: Tile): [number, number][] {
  // Function implementation
  return [];
}

function getScoreOfBoard(board: Board): { [key in Tile]: number } {
  // Function implementation
  return { 'X': 0, 'O': 0, ' ': 0 };
}

function enterPlayerTile(): [Tile, Tile] {
  // Function implementation
  return ['X', 'O'];
}

function whoGoesFirst(): 'player' | 'computer' {
  // Function implementation
  return 'player';
}

function playAgain(): boolean {
  // Function implementation
  return false;
}

function makeMove(board: Board, tile: Tile, xstart: number, ystart: number): boolean {
  // Function implementation
  return false;
}

function getBoardCopy(board: Board): Board {
  // Function implementation
  return [];
}

function isOnCorner(x: number, y: number): boolean {
  // Function implementation
  return false;
}

function getPlayerMove(board: Board, playerTile: Tile): [number, number] | 'quit' | 'hints' {
  // Function implementation
  return [0, 0];
}

function getComputerMove(board: Board, computerTile: Tile): [number, number] {
  // Function implementation
  return [0, 0];
}

function showPoints(playerTile: Tile, computerTile: Tile): void {
  // Function implementation
}

function getBoardWithValidMoves(board: Board, tile: Tile): Board {
  // Function implementation
  return [];
}

// Main Game Loop
console.log('Welcome to Reversi!');

while (true) {
  // Game setup
  let mainBoard: Board = getNewBoard();
  resetBoard(mainBoard);
  const [playerTile, computerTile] = enterPlayerTile();
  let showHints: boolean = false;
  let turn: 'player' | 'computer' = whoGoesFirst();
  console.log(`The ${turn} will go first.`);

  // Main Game
  while (true) {
    if (turn === 'player') {
      // Player's turn
      if (showHints) {
        const validMovesBoard: Board = getBoardWithValidMoves(mainBoard, playerTile);
        drawBoard(validMovesBoard);
      } else {
        drawBoard(mainBoard);
      }
      showPoints(playerTile, computerTile);
      const move = getPlayerMove(mainBoard, playerTile);

      if (move === 'quit') {
        console.log('Thanks for playing!');
        process.exit(); // Terminate the program
      } else if (move === 'hints') {
        showHints = !showHints;
        continue;
      } else {
        const [x, y] = move;
        const isValid = makeMove(mainBoard, playerTile, x, y);

        if (!isValid) {
          console.log('Invalid move. Try again.');
          continue;
        }

        if (getValidMoves(mainBoard, computerTile).length === 0) {
          break;
        } else {
          turn = 'computer';
        }
      }
    } else {
      // Computer's turn
      drawBoard(mainBoard);
      showPoints(playerTile, computerTile);
      console.log('Press Enter to see the computer\'s move.');
      const [x, y] = getComputerMove(mainBoard, computerTile);
      makeMove(mainBoard, computerTile, x, y);

      if (getValidMoves(mainBoard, playerTile).length === 0) {
        break;
      } else {
        turn = 'player';
      }
    }
  }

  // Display the final score
  drawBoard(mainBoard);
  const scores = getScoreOfBoard(mainBoard);
  console.log(`X scored ${scores['X']} points. O scored ${scores['O']} points.`);

  if (scores[playerTile] > scores[computerTile]) {
    console.log(`You beat the computer by ${scores[playerTile] - scores[computerTile]} points! Congratulations!`);
  } else if (scores[playerTile] < scores[computerTile]) {
    console.log(`You lost. The computer beat you by ${scores[computerTile] - scores[playerTile]} points.`);
  } else {
    console.log('The game was a tie!');
  }

  if (!playAgain()) {
    break;
  }
}
