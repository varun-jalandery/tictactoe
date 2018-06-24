# Tit Tac Toe Game
### This solution is generic and can be used to play tic tac toe game on any board size.
### The size of the winning streak is always 2 irrespective of the board size.
### I have also included the .git metadata so which would give the commit history.
### master branch is the main branch on which the complete code is present.

## Author Varun Jalandery <varun.jalandery@gmail.com>


This game solution is done in nodejs and is tested in v8.11.3 LTS version of node.

You can run the below command to install nodejs and npm.
To install the nodejs and npm, run the below command.
```sh
$ ./install_node.sh
```

To build the solution, run the below command.
```sh
$ ./build.sh
```

To run the code in interactive terminal mode, run the below command.
```sh
$ ./tictactoe
```

mocha and chai packages are used for unit tests.
Packages are managed and installed via NPM.

The solution is tested in v8.11.3 LTS version of node.

To install the npm packages run the below command
```sh
$ npm install
```

To run the test, run the below command
```sh
$ npm test
```


### Components

-- **board/Board** A board class represents game board having cells. If board size is n then
board would have 'n x n' number of cells. Fresh Board class object would have
cells whose value is number in serial manner.

-- **Cell** Cell class represents placeholders where players can mark the X and O symbols.
A player can mark any cell (which is not marked before) by their respective symbol.

-- **Player** Player class represents the player playing the game. Each player would 
have symbol, number and name. Player 1 would have symbol x and Player 2 would have symbol y.

-- **Game** Game class represents the tic tac toe game. A tic tac toe game has 
two players and a board. Game class has below properties
- Board : Board class object
- Player1 : Player class object with symbol x
- Player2 : Player class object with symbol o
- currentPlayer : current player whose move is pending
- winner :  winner of the game, if some player has won
- isGameComplete : boolean property, true if board has been completely filled, 
    or some player has won, otherwise false
    
-- **GameManager** GameManager class represents the current game and provides easy interface for
other classes to get Game Object. It maintains the game state

-- **commands/EnterBoardSize** This class represents the command enter board size. Player is
supposed to enter the board size. This is a non-recurrent command, which means, if user has
entered the valid input, then next command will be executed.

- prompt: prompt property of the command represents the text which user would see on the 
terminal before entering the input.

-- **commands/EnterPlayerName** This command is used for getting the player name on the terminal.
This command is  non-recurrent.

-- **command/MarkCell** This command asks the player on which cell they want to mark their 
symbol. This command is recurrent and on valid inputs it will again ask the input for the
next player, until game is complete or someone has won.

-- **GameFlow** GameFlow class represents the flow of the game. Game flow is composed of 
sequence of command objects to play the game in desired manner. Game flow contains 
command sequence as EnterPlayerName(for player 1)-->EnterPlayerName(for player 2)-->
EnterBoardSize-->MarkCell(for marking symbols)

- EnterPlayerName1 : Asks the player one to input his/her name
- EnterPlayerName2 : Asks the player one to input his/her name
- EnterBoardSize   : Asks the player to input board size
- MarkCell         : Asks the player to mark cells with their symbols alternately, till
one of the payer has won or board is completely filled.

-- **src/Board/StreakCheckStraight** This class is responsible for checking the winning streaks in the board in
horizontal and vertical manner. This class checks for the winning streak around the given coordinate.
For horizontal, it checks for three combinations
- given cell | one left to given cell | two left to give cell
- given cell | one right to given cell | two right to give cell
- one right to given cell | given cell | one left to give cell

Similarly, for vertical streaks above these combinations are checked.

-- **src/Board/StreakCheckDiagonal** This class is responsible for checking the winning streaks in diagonal
manner. Two diagonals are possible to check around a given cell.
Diagonal One - Slanting Downward and Diagonal Two slanting upwards.

Diagonal One would have below three possible steak checks
- given cell | one right-bottom to given cell | two right-bottom to given cell
- given cell | one left-top to given cell | two left-top to given cell
- one right-bottom to given cell | given cell | one left-top to given cell
-- **io/Input** This class maintains the input output streams for the game. For inputs, reading is done on the 
terminal using the readline interface, for output, text is being sent to stdout (terminal).

