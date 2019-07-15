// Variables
const width = 10
const height = 20
const squares = []
const tetrominoArray = []
let currentBlock = null
let currentIndex = null
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
    const block = tetrominoArray[randomBlockIndex]
    currentBlock = block
  }

  function createCurrentIndex () {
    currentIndex = Math.floor(Math.random() * 2 + 3)
  }

  // 4. Add the random tetromino to the grid.
  function addBlock () {
    createCurrentIndex()
    currentBlock.forEach(index => {
      squares[index + currentIndex].classList.add('block')
    })
  }


  // 5. Make blocks fall.
  function fall () {
    for(let i = squares.length-1; i >= 0; i--) {
      if(squares[i].classList.contains('block')) {
        // Check for grid's bottom or square below.
        if(i > height * width - width || squares[i + 10].classList.contains('block')) {
          lockBlocks()
          break
          // Create a new block, add it, make it fall.
        }
        squares[i].classList.remove('block')
        squares[i + 10].classList.add('block')
      }
    }
  }

  function lockBlocks () {
    for(let i=0; i < squares.length; i++) {
      if(squares[i].classList.contains('block')) {
        squares[i].classList.add('locked')
      }
    }
  }

  // 6. Move Shapes (left/right movement 'A''D', then 'S')
  // function moveBlock(e) {
  //
  //   currentBlock.classList.remove('block')
  //
  //   switch(e.keyCode) {
  //     case 37:
  //       if(currentIndex % width !== 0) currentIndex -= 1
  //       break
  //     case 39:
  //       if(currentIndex % width < width - 1) currentIndex += 1
  //       break
  //     case 40:
  //       if(currentIndex + width < width * height) currentIndex += width
  //       break
  //   }
  //
  //   currentBlock.classList.add('block')
  //
  // }


  // 7. Detect Sides



  // 8a. Detect grid bottom



  // 8b. Detect vertical collision with placed blocks



  // 9. Create new blocks



  // 10. Check for successful rows



  // 11. Block rotation functions



  // 12. Game end conditions



  // 13. Scoring



  // 14. Play function
  function initialise () {
    fall()
    setTimeout(initialise, 500)
  }

  // function continue () {
  //   createBlock()
  //   addBlock()
  // }

  createGrid()
  createTetrominos()
  createBlock()
  addBlock()
  initialise()

  // DOM listener events.
  // document.addEventListener('keyup', moveBlock)

  // EXTRAS

  // a. Levels
  // b. clockwise & anti-clockwise rotation
  // c. 'localStorage' leaderboard

})
