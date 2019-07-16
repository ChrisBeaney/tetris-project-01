// Variables
const width = 10
const height = 20
const squares = []
const tetrominoArray = []
let currentBlock = null
let currentPosition = 4
let timerId = null
let score = 0

document.addEventListener('DOMContentLoaded',() => {
  // 0. Create DOM variables
  const grid = document.querySelector('.game-grid')

  // 1. Create Grid
  // Create grid of 200 divs.
  function createGrid() {
    for (let i=0; i<width * height; i++) {
      const square = document.createElement('div')
      square.classList.add('square')
      square.innerText = i
      grid.appendChild(square)
      squares.push(square)
    }
  }

  // 2. Create Blocks
  function createTetrominos () {
    const shapeO = [0, 1, width, 1 + width]
    const shapeI = [
      [0, 1, 2, 3],
      [0,1*width,2*width,3*width]
    ]
    const shapeT = [0, 1, 2, 1 + width]
    const shapeL = [0, 1, 2, width]
    const shapeJ = [0, 1, 2, 2 + width]
    const shapeS = [1, 2, width, 1 + width]
    const shapeZ = [0, 1, 1 + width, 2 + width]

    tetrominoArray.push(shapeO)
    tetrominoArray.push(shapeI)
    tetrominoArray.push(shapeT)
    tetrominoArray.push(shapeL)
    tetrominoArray.push(shapeJ)
    tetrominoArray.push(shapeS)
    tetrominoArray.push(shapeZ)
  }

  // 2a. Add Tetromino rotations, (none required for '0' block).
  // const shapeI90 = [0, width, 2*width, 3*width]
  // const shapeI180 = [3,2,1,0]
  // const shapeI270 = [3*width, 2*width, width, 0]
  // const shapeT90 = []
  // const shapeT180 = []
  // const shapeT270 = []
  // const shapeL90 = []
  // const shapeL180 = []
  // const shapeL270 = []
  // const shapeJ90 = []
  // const shapeJ180 = []
  // const shapeJ270 = []
  // const shapeS90 = []
  // const shapeS180 = []
  // const shapeS270 = []
  // const shapeZ90 = []
  // const shapeZ180 = []
  // const shapeZ270 = []

  // 3. Pick a random tetromino.
  function createBlock () {
    const randomBlockIndex = Math.floor(Math.random() * tetrominoArray.length)
    currentBlock = tetrominoArray[randomBlockIndex]
  }

  // 4. Add the random tetromino to the grid.
  function addBlock () {
    currentBlock.forEach(index => {
      squares[index + currentPosition].classList.add('block')
    })
  }

  // return 'true' if the block runs out of space OR if the square below contains a 'locked' block.
  function cannotMove(index) {
    return !squares[index + width + currentPosition] ||
      squares[index + width + currentPosition].classList.contains('locked')
  }

  // 5. Make blocks fall.
  function fall () {
    // if the block below either doesn't exists OR is already a block
    if(currentBlock.some(cannotMove)) {
      lockBlocks()
      clearInterval(timerId)
      // Make sure we check for completed lines before gameOver().
      checkRows()
      gameOver()
      return initialise()
    }

    // remove block
    currentBlock.forEach(index => squares[index + currentPosition].classList.remove('block'))
    // update currentPosition
    currentPosition += width
    // redraw block
    currentBlock.forEach(index => squares[index + currentPosition].classList.add('block'))
  }

  // 6. Add 'locked' class to blocks that cannot move.
  function lockBlocks () {
    currentBlock.forEach(index => squares[index + currentPosition].classList.add('locked'))
  }

  // 7. Move Shapes
  function moveBlock(e) {
    currentBlock.forEach(index => squares[index + currentPosition].classList.remove('block'))

    switch(e.keyCode) {
      // Moving left
      case 37:
      // TODO: Will likely be necessary to update once rotating implemented.
      // TODO: add horizontal collision prevention
        // if(currentBlock.some(index => (currentPosition - index) % width === 0)) {
        //   break
        // } else
        if(currentPosition % width !== 0 && !collisionLeft()) currentPosition -= 1
        break
      // Moving right
      case 39:
        // TODO: add horizontal collision prevention
        if((currentBlock.some(index => (currentPosition + index) % width === width - 1)) || collisionRight()) {
          break
        } else if (currentPosition % width < width - 1) currentPosition += 1
        break
      // Moving down
      case 40:
        if(currentPosition + width < width * height) currentPosition += width
        break
    }

    currentBlock.forEach(index => squares[index + currentPosition].classList.add('block'))

  }

  // 8. Detect Horizontal collisions with 'locked' squares - run function in blockMove()
  function collisionLeft () {
    let collision = false
    // If square to the left or to the right is 'locked'
    // set collision to true and return from the function.
    if(currentBlock.forEach(index => squares[index + currentPosition - 1].classList.contains('locked'))) {
      collision = true
      return collision
    }
  }

  function collisionRight () {
    let collision = false
    // If square to the left or to the right is 'locked'
    // set collision to true and return from the function.
    if(currentBlock.forEach(index => squares[index + currentPosition + 1].classList.contains('locked'))) {
      collision = true
      return collision
    }
  }

  // 9a. Check for successful rows
  function checkRows () {
    // Take chunks of squares 10 at a time.
    for (let i=0; i<squares.length; i+=10) {
      let counter = 0
      // Take each of the 10 squares passed.
      for (let j=0; j<10; j++) {
        if(squares[i+j].classList.contains('locked')) {
          counter++
        } else {
          break
        }
        if(counter === 10) {
          // TODO: Make blocks above fall.
          // TODO: Increment score.
          clearLines(i,j)
          score ++
        }
      }
    }
  }

  // 9b. clearLines after a successful row.
  function clearLines(startIndex, stopIndex) {
    for(let i=startIndex; i<=startIndex + stopIndex; i++) {
      squares[i].classList.remove('block')
      squares[i].classList.remove('locked')
      lineDown(startIndex, stopIndex)
    }
  }

  // 9c. Drag lines above down.
  function lineDown (startIndex, stopIndex) {
    console.log(`lineDown() running with start of ${startIndex} and end of ${stopIndex}`)
    for(let i=startIndex; i<=startIndex + stopIndex; i++) {
      if(squares[i-width].classList.contains('locked')) {
        console.log('Removing classes')
        squares[i-width].classList.remove('block')
        squares[i-width].classList.remove('locked')
        // Not working, removes the line above but does not redraw it below.
        console.log('Adding classes below.')
        squares[i].classList.add('block')
        squares[i].classList.add('locked')
      }
    }
  }

  // 10. Block rotation function
  // function rotateBlock (e) {
  //   currentBlock.forEach(index => squares[index + currentPosition].classList.remove('block'))
  //
  //   switch(e.keyCode) {
  //     case 38:
  //
  //   }
  // currentBlock.forEach(index => squares[index + currentPosition].classList.add('block'))
  // }

  // 11. Game end conditions
  function gameOver () {
    for(let i=0; i<10; i++) {
      if(squares[i].classList.contains('locked')) {
        console.log('Game over man, game over!')
        // TODO: How to exit a program?
        exit(0)
      }
    }

  }

  // 12. Scoring

  // 13. Play function
  function initialise () {
    currentPosition = 4
    createBlock()
    addBlock()
    timerId = setInterval(fall, 500)
  }

  createGrid()
  createTetrominos()
  initialise()

  // DOM listener events.
  document.addEventListener('keyup', moveBlock)

  // EXTRAS

  // a. Levels
  // b. clockwise & anti-clockwise rotation
  // c. 'localStorage' leaderboard

})
