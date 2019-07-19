// Variables
const width = 10
const height = 20
let squares = []
const tetrominoArray = []
let currentBlock = null
let currentPosition = 4
let currentPattern = 0
let currentArrayIndex = null
let timerId = null
let score = 0
let lines = 0

document.addEventListener('DOMContentLoaded',() => {
  // Create DOM variables
  const grid = document.querySelector('.game-grid')
  const scoreDisplay = document.getElementById('user-score')
  const lineDisplay = document.getElementById('total-lines')
  const startBtn = document.getElementById('start')
  const resetBtn = document.getElementById('reset')

  // Create Grid
  function createGrid() {
    for (let i=0; i<width * height; i++) {
      const square = document.createElement('div')
      square.classList.add('square')
      grid.appendChild(square)
      squares.push(square)
    }
  }

  // Create Blocks
  function createTetrominos () {
    const shapeO = [
      [0, 1, width, 1 + width],
      [0, 1, width, 1 + width],
      [0, 1, width, 1 + width],
      [0, 1, width, 1 + width]
    ]
    const shapeI = [
      [0, 1, 2, 3],
      [0, width, 2*width, 3*width],
      [2*width+3, 2*width+2, 2*width+1, 2*width],
      [3*width, 2*width, width,0]
    ]
    const shapeT = [
      [width, width+1, width+2, 1],
      [0, width, 2*width, 1+width],
      [2+width, 1+width, width, 2*width+1],
      [2*width+1, 1+width, 1, width]
    ]
    const shapeL = [
      [width, 1+width, 2+width, 2],
      [0, width, 2*width, 2*width+1],
      [2+width, 1+width, width, 2*width],
      [2*width+1, 1+width, 1, 0]
    ]
    const shapeJ = [
      [width, 1+width, 2+width, 0],
      [0, width, 2*width, 1],
      [2+width, 1+width, width, 2*width+2],
      [2*width+1, 1+width, 1, 2*width]
    ]
    const shapeS = [
      [1, 2, width, 1+width],
      [0, width, width+1, 2*width+1],
      [2*width+1, 2*width, 2+width, 1+width],
      [width, 0, 2*width+1, width+1]
    ]
    const shapeZ = [
      [0, 1, 1 + width, 2 + width],
      [width, 2*width, width+1, 1],
      [2*width+2, 2*width+1, 1+width, width],
      [2*width, width, 1+width, 1]
    ]

    tetrominoArray.push(shapeO)
    tetrominoArray.push(shapeI)
    tetrominoArray.push(shapeT)
    tetrominoArray.push(shapeL)
    tetrominoArray.push(shapeJ)
    tetrominoArray.push(shapeS)
    tetrominoArray.push(shapeZ)
  }

  // Pick a random block.
  function createBlock () {
    const randomBlockIndex = Math.floor(Math.random() * tetrominoArray.length)
    currentArrayIndex = randomBlockIndex
    currentBlock = tetrominoArray[currentArrayIndex][currentPattern]
  }

  // Add the random block to the grid.
  function addBlock () {
    console.log(currentBlock)
    currentBlock.forEach(index => {
      squares[index + currentPosition].classList.add('block')
    })
  }

  // return 'true' if the block runs out of space OR if the square below contains a 'locked' block.
  function cannotMove(index) {
    return !squares[index + width + currentPosition] ||
      squares[index + width + currentPosition].classList.contains('locked')
  }

  // Make blocks fall.
  function fall () {
    // if the block below either doesn't exists OR is already a block
    if(currentBlock.some(cannotMove)) {
      lockBlocks()
      clearInterval(timerId)
      checkRows()
      gameOver()
      return initialise()
    }

    // remove block
    currentBlock.forEach(index => squares[index + currentPosition].classList.remove('block'))
    // update currentPosition
    currentPosition += width
    // redraw block in new position.
    currentBlock.forEach(index => squares[index + currentPosition].classList.add('block'))
  }

  // Add 'locked' class to blocks that cannot move.
  function lockBlocks () {
    currentBlock.forEach(index => squares[index + currentPosition].classList.add('locked'))
  }

  // Move Shapes
  function moveBlock(e) {
    currentBlock.forEach(index => squares[index + currentPosition].classList.remove('block'))

    switch(e.keyCode) {
      // Moving left
      case 37:
        if((currentBlock.some(index => (currentPosition + index) % width === 0)) || collisionLeft()) {
          break
        } else if(currentPosition % width !== 0) currentPosition -= 1
        break
      // Moving right
      case 39:
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

  // Detect Horizontal collisions with 'locked' squares - run function in moveBlock()
  function collisionLeft () {
    let collision = false
    // If square to the left is 'locked'
    // set collision to true and return from the function.
    if(currentBlock.forEach(index => squares[index + currentPosition - 1].classList.contains('locked'))) {
      collision = true
      console.log('Collision left')
      return collision
    }
  }

  function collisionRight () {
    let collision = false
    // If square to the right is 'locked'.
    // set collision to true and return from the function.
    if(currentBlock.forEach(index => squares[index + currentPosition + 1].classList.contains('locked'))) {
      collision = true
      console.log('Collision right')
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
          spliceLine(i)
          score += 10
          lines ++
          updateScoreboard()
          updateLines()
        }
      }
    }
  }

  function spliceLine(start) {
    const removedLine = squares.splice(start, width)
    removedLine.forEach(element => {
      element.classList.remove('block')
      element.classList.remove('locked')
    })
    squares = removedLine.concat(squares)
    squares.forEach(element => grid.appendChild(element))
  }

  // Update scoreboard
  function updateScoreboard () {
    scoreDisplay.innerHTML = score
  }

  // Update line scoreboard.
  function updateLines () {
    lineDisplay.innerHTML = lines
  }

  // Block rotation function
  function rotateBlock (e) {
    currentBlock.forEach(index => squares[index + currentPosition].classList.remove('block'))

    switch(e.keyCode) {
      case 38:
        currentPattern++
        if(currentPattern === currentBlock.length) {
          currentPattern = 0
        }
        currentBlock = tetrominoArray[currentArrayIndex][currentPattern]
    }

    currentBlock.forEach(index => squares[index + currentPosition].classList.add('block'))
  }

  // Game end conditions
  function gameOver () {
    for(let i=0; i<10; i++) {
      if(squares[i].classList.contains('locked')) {
        console.log('Game over man, game over!')
        clearInterval(timerId)
      }
    }
  }

  function reset () {
    const removedLines = squares.splice(0, 200)
    removedLines.forEach(element => {
      element.classList.remove('block')
      element.classList.remove('locked')
    })
    squares = removedLines.concat(squares)
    squares.forEach(element => grid.appendChild(element))

    currentBlock = null
    currentPosition = 4
    currentPattern = 0
    currentArrayIndex = null
    timerId = null
    score = 0
    scoreDisplay.innerHTML = score
    lines = 0
    lineDisplay.innerHTML = lines
  }

  // Play function
  function initialise () {
    currentPosition = 4
    currentPattern = 0
    createBlock()
    addBlock()
    timerId = setInterval(fall, 500)
  }

  // Create the playing grid and blocks.
  createGrid()
  createTetrominos()

  // DOM listener events.
  document.addEventListener('keyup', moveBlock)
  document.addEventListener('keyup', rotateBlock)
  startBtn.addEventListener('click', initialise)
  resetBtn.addEventListener('click', reset)

})
