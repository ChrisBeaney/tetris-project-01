// Variables
const width = 10
const height = 20
const squares = []
const tetrominoArray = []
let currentBlock = null
let currentPosition = 4
let timerId = null


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
    const shapeO = [0, 1, width, 1 + width] // [0,1,10,11]
    const shapeI = [0, 1, 2, 3]
    const shapeT = [0, 1, 2, 1 + width] // [0,1,2,11]
    const shapeL = [0, 1, 2, width] // [0,1,2,10]
    const shapeJ = [0, 1, 2, 2 + width] // [0,1,2,12]
    const shapeS = [1, 2, width, 1 + width] // [1,2,10,11]
    const shapeZ = [0, 1, 1 + width, 2 + width] // [0,1,11,12]

    tetrominoArray.push(shapeO)
    tetrominoArray.push(shapeI)
    tetrominoArray.push(shapeT)
    tetrominoArray.push(shapeL)
    tetrominoArray.push(shapeJ)
    tetrominoArray.push(shapeS)
    tetrominoArray.push(shapeZ)
  }


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
        if(currentPosition % width !== 0) currentPosition -= 1
        break
      // Moving right
      case 39:
        // TODO: add horizontal collision prevention
        if(currentBlock.some(index => (currentPosition + index) % width === width - 1)) {
          break
        } else if (currentPosition % width < width - 1) currentPosition += 1
        console.log(currentPosition)
        break
      // Moving down
      case 40:
        if(currentPosition + width < width * height) currentPosition += width
        break
    }

    currentBlock.forEach(index => squares[index + currentPosition].classList.add('block'))

  }

  // 8. Detect Sides - do this in blockMove()?

  // 9. Check for successful rows
  function checkRows () {
    // Look through the squares 10 at a time.
    // squares.forEach(index => )
    // Can I use currentPosition to avoid checking through the whole squares array.
    // If all contain the class 'locked':
    // Remove the 'locked' class to clear the line.
    // Drop any locked blocks above.
    // Increment score.
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
