// Variables
const totalBoxes = 200
const width = 10
const height = 20
const squares = []
const tetrominoArray = []
let currentBlock = null
let currentIndex = Math.floor(Math.random() * 4 + 3)
let timerId = null


document.addEventListener('DOMContentLoaded',() => {
  // 0. Create DOM variables
  const grid = document.querySelector('.game-grid')


  // 1. Create Grid
  // Create grid of 200 divs.
  function createGrid() {
    for (let i=0; i<totalBoxes; i++) {
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
    console.log(tetrominoArray)
  }


  // 3. Pick a random tetromino.
  function createBlock () {
    const randomBlockIndex = Math.floor(Math.random() * tetrominoArray.length)
    const block = tetrominoArray[randomBlockIndex]
    currentBlock = block
    console.log(currentBlock)
  }

  // 4. Add the random tetromino to the grid.
  // TODO: make block appear in a random central block.
  function addBlock () {
    currentBlock.forEach(index => {
      squares[index].classList.add('block')
    })
  }



  // function fallingBlock () {
  //   if(currentIndex + width < width * height) {
  //     currentBlock[currentIndex] = currentBlock[currentIndex + width]
  //     console.log(currentBlock[currentIndex])
  //   }
  // }
  // timerId = setInterval(fallingBlock(), 1000)


  // 3. Move Shapes (left/right movement 'A''D', then 'S')
  // function moveBlock(e) {
  //
  //   squares[currentIndex].classList.remove('block')
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
  //   squares[currentIndex].classList.add('block')
  //
  // }
  //
  // document.addEventListener('keyup', moveBlock)

  // 4. Make blocks fall.
  function fall () {
    for(let i = squares.length-1; i >= 0; i--) {
      if(squares[i].classList.contains('block')) {
        console.log('Square has a block, removing block')
        squares[i].classList.remove('block')
        console.log('Adding block to square underneath.')
        squares[i + 10].classList.add('block')
      }
    }

    // squares.forEach((box, index) => {
    //   if(box.classList.contains('block')) {
    //     console.log('Square had a block.')
    //     box.classList.remove('block')
    //     console.log('Removed a block.')
    //     squares[index + width].classList.add('block')
    //     console.log('Added a block below.')
    //   }
    // })
  }


  // 5. Detect Sides



  // 6a. Detect grid bottom



  // 6b. Detect vertical collision with placed blocks



  // 7. Create new blocks



  // 8. Check for successful rows



  // 9. Block rotation functions



  // 10. Game end conditions



  // 11. Scoring



  // 12. Play function
  function play () {

  }

  createGrid()
  createTetrominos()
  createBlock()
  addBlock()
  fall()
  // EXTRAS

  // a. Levels
  // b. clockwise & anti-clockwise rotation
  // c. 'localStorage' leaderboard

})
