# How to play
To play Minesweeper, we will create instances of MineSweeperGame in command line.

## For example:
1. In the command line, navigate to the lib directory and run `node`
1. Run `.load game.js` to load the contents of this file.
1. Then create a Game instance and run commands like so:
```
let game = new Game(3, 3, 3);
game.playMove(0, 1);
game.playMove(1, 2);
```
1. When done run `.exit`

## How to make updates to repo
1. make changes in /src
1. npm run build

## Todos:
- auto-rebuild to /lib on /src save
- one step new game
- use bash prompts to make it easier to make moves
- winning or losing should start a new game automatically
