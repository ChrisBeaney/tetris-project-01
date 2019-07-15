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
      return initialise()
    }

    // remove block
    currentBlock.forEach(index => squares[index + currentPosition].classList.remove('block'))
    // update currentPosition
    currentPosition += width
    // redraw block
    currentBlock.forEach(index => squares[index + currentPosition].classList.add('block'))
  }

  // 6. Add 'locked' class to blocks in place.
  function lockBlocks () {
    currentBlock.forEach(index => squares[index + currentPosition].classList.add('locked'))
  }

  // 7. Move Shapes
  function moveBlock(e) {
    // What object am I trying to move here?
    // Do I need to track the block's position in fall() function?
    // something like . . . currentPosition = currentBlock.map(element => element + offSet)
    currentBlock.classList.remove('block')

    switch(e.keyCode) {
      case 37:
        if(currentPosition % width !== 0) currentPosition -= 1
        break
      case 39:
        if(currentPosition % width < width - 1) currentPosition += 1
        break
      case 40:
        if(currentPosition + width < width * height) currentPosition += width
        break
    }

    currentBlock.classList.add('block')

  }

  // 8. Detect Sides

  // 9. Detect vertical collision with placed blocks

  // 10. Check for successful rows

  // 11. Block rotation functions

  // 12. Game end conditions
  function gameOver () {
    console.log('Game Over.')
  }

  // 13. Scoring

  // 14. Play function
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
