// Variables
const totalBoxes = 200
const width = 10
const height = 20
const squares = []
const shapesArray = []
// Create a random square for a block.
let currentIndex = Math.floor(Math.random() * 4 + 3)
console.log(currentIndex)
// let randomIndex = Math.floor(Math.random() * 3 + 3)
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
  // Start with a single block, then 'O','I', then 'L','J','T', finally 'S', 'Z'
  function createShapes () {
    const shapeO = [0, 1, width, 1 + width] // [0,1,10,11]
    const shapeI = [0, 1, 2, 3]
    const shapeT = [0, 1, 2, 1 + width] // [0,1,2,11]
    const shapeL = [0, 1, 2, width] // [0,1,2,10]
    const shapeJ = [0, 1, 2, 2 + width] // [0,1,2,12]
    const shapeS = [1, 2, width, 1 + width] // [1,2,10,11]
    const shapeZ = [0, 1, 1 + width, 2 + width] // [0,1,11,12]

    shapesArray.push(shapeO)
    shapesArray.push(shapeI)
    shapesArray.push(shapeT)
    shapesArray.push(shapeL)
    shapesArray.push(shapeJ)
    shapesArray.push(shapeS)
    shapesArray.push(shapeZ)
  }
  
  const randomShapeIndex = Math.floor(Math.random() * shapesArray.length)

  // Pick a random shape and add it to the grid.
  const randomShape = shapesArray[randomShapeIndex]
  console.log(randomShape) // returns an array of 4 numbers
  randomShape.forEach(index => {
    squares[index].classList.add('block')
  })


  // const currentBlock = squares[currentIndex]
  // currentBlock.classList.add('block')

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
    squares.forEach((box, index) => {
      if(box.classList.contains('block')) {
        console.log('Square had a block.')
        box.classList.remove('block')
        console.log('Removed a block.')
        squares[index + width].classList.add('block')
        console.log('Added a block below.')
      }
    })
  }

  fall()

  // 5. Detect Sides



  // 6a. Detect grid bottom



  // 6b. Detect vertical collision with placed blocks



  // 7. Create new blocks



  // 8. Check for successful rows



  // 9. Block rotation functions



  // 10. Game end conditions



  // 11. Scoring



  // EXTRAS

  // a. Levels
  // b. clockwise & anti-clockwise rotation
  // c. 'localStorage' leaderboard


})
