# Project One: Tetris
A vanilla JavaScript game

## Overview
Tetris is a classic computer game created by Alexey Pajitnov in 1985.

In the game blocks fall from the top of a 10 x 20 grid one at a time. The player can move the falling blocks left and right, and also rotate them.
The player's goal is to sort them such that he or she forms a continuous horizontal line, which will then clear, and then 
the next block above will fall. The player earn points for clearing a line and can earn bonus points for clearing multiple lines with a single block. 
For example, clearing four such lines yield a tetris. As the game progresses, the blocks fall faster, making organisation more difficult.

The ultimate goal is to complete as many lines as possible. The game ends when the blocks reach the top of the screen preventing
any new blocks from falling.

This was the first project of General Assembly's Software Engineering Immersive course.

## Brief
* Create a grid-based game area.
* Create the seven block variations and their rotations.
* Design game logic for rotating the blocks and clearing completed lines.
* Include separate HTML / CSS / JavaScript files.
* Use Javascript for DOM manipulation.
* Deploy the game online, using Github Pages, where the rest of the world can access it.
* Use semantic markup for HTML and CSS.

## Technologies used
* HTML5
* CSS3
* JavaScript (ES6)
* Git
* GitHub
* Google Fonts

## Approach taken
### Grid layout & displaying blocks on-screen
The game area was created using an array of divs contained inside a flex-box. Each div was assigned an appropriate
CSS class to represent its state. Divs are either empty, displaying an active square or displaying a locked square.

With the array in place blocks can be moved using their index position. -1/1 moves a square horizontally one position left or
right. Incrementing a square's position by 10 (the width of the grid) drops it one position towards the bottom of the playing
area. setInterval is used to drop each block one row at a time by toggling the appropriate CSS classes on and off. 

Each block pattern was stored in nested arrays to display the positions of the block for each 90 degree rotation. The
user could then cycle through each position on keydown creating the rotation effect.

The edges of the playing area were detected using modulus and the active block's index position to avoid blocks moving onto the
line above or below through the walls. 

Completed lines were removed from the game area using splice. Their CSS styling was toggled off then the remaining game area
was joined onto the end of the spliced lines to create the effect of the remaining game area moving down to fill the void of
the completed lines.

## Sample Snippets & Screenshots
### Sample Block
Each block was stored as an array mapping its configuration at each 90 degree rotation.
```Javascript
    const shapeT = [
      [width, width+1, width+2, 1],
      [0, width, 2*width, 1+width],
      [2+width, 1+width, width, 2*width+1],
      [2*width+1, 1+width, 1, width]
    ]
```
### Block Movement
On pressing the 'left' arrow the code checks for the edge of the grid and blocks already in place, if clear the block will
move one square to the left.
```JavaScript
    switch(e.keyCode) {
      // Moving left
      case 37:
        if((currentBlock.some(index => (currentPosition + index) % width === 0)) || collisionLeft()) {
          break
        } else if(currentPosition % width !== 0) currentPosition -= 1
        break
```        
### Clear Lines & Redraw Grid
When the user completes a line the function takes the array index at the start of the row and removed that line, strips it of
any CSS styling then appends the remaining game grid onto the cleared line.
```Javascript
  function spliceLine(start) {
    const removedLine = squares.splice(start, width)
    removedLine.forEach(element => {
      element.classList.remove('block')
      element.classList.remove('locked')
    })
    squares = removedLine.concat(squares)
    squares.forEach(element => grid.appendChild(element))
  }
```


## Wins & Blockers
It was great to put the JavaScript experience of the preceding three weeks into practice.

By far the biggest challenge was preventing blocks from moving off the screen when the user performed rotations on the edge
of the playing area. These problems still persist.

There are also issues with the timing of the program detecting collisions between locked and active 
blocks. If the user spams the movement keys the active block has a short window of time to travel through existing blocks
before locking into place.

## Future Features
* Fix collision detection and rotation issues.
* Add levels to speed up the rate at which blocks fall.
* Improve the scoring system to reward the player for completing multiple lines simultaneously and lines at higher difficulty
levels.
