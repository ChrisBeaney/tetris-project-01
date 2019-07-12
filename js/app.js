// Variables
const totalBoxes = 200
const width = 10
const height = 20
// let currentIndex = 0
let currentIndex = Math.floor(Math.random() * 3 + 3)
// let randomIndex = Math.floor(Math.random() * 3 + 3)
let timerId = null


document.addEventListener('DOMContentLoaded',() => {
  // 0. Create DOM variables
  const grid = document.querySelector('.game-grid')
  const squares = []

  // 1. Create Grid
  // Can start with a small one then a 10 x 20.
  for (let i=0; i<totalBoxes; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    square.innerText = i
    grid.appendChild(square)
    squares.push(square)
  }

  // 2. Create Blocks
  // Start with a single block, then 'O','I', then 'L','J','T', finally 'S', 'Z'
  const shapeO = [0, 1, width, 1 + width]
  const shapeI = [0, 1, 2, 3]
  const shapeT = [0, 1, 2, 1 + width]
  const shapeL = [0, 1, 2, width]
  const shapeJ = [0, 1, 2, 2 + width]
  const shapeS = [1, 2, width, 1 + width]
  const shapeZ = [0, 1, 1 + width, 2 + width]

  const shapesArray = [shapeO, shapeI, shapeT, shapeL, shapeJ, shapeS, shapeZ]
  const randomShapeIndex = Math.floor(Math.random() * shapesArray.length)

  const randomShape = shapesArray[randomShapeIndex]
  console.log(randomShape)
  // randomShape.forEach(index => {
  //   squares
  // })


  const currentBlock = squares[currentIndex]
  currentBlock.classList.add('block')

  function fallingBlock () {
    if(currentIndex + width < width * height) {
      currentBlock[currentIndex] = currentBlock[currentIndex + width]
      console.log(currentBlock[currentIndex])
    }
  }
  timerId = setInterval(fallingBlock(), 1000)


  // 3. Move Shapes (left/right movement 'A''D', then 'S')
  function moveBlock(e) {

    squares[currentIndex].classList.remove('block')

    switch(e.keyCode) {
      case 37:
        if(currentIndex % width !== 0) currentIndex -= 1
        break
      case 39:
        if(currentIndex % width < width - 1) currentIndex += 1
        break
      case 40:
        if(currentIndex + width < width * height) currentIndex += width
        break
    }

    squares[currentIndex].classList.add('block')

  }

  document.addEventListener('keyup', moveBlock)

  // 4. Create falling blocks
  // Start with a single, falling block.



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
