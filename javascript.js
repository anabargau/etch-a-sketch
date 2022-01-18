let valueRange = document.getElementById('value-range')
let clearButton = document.getElementById('clear')
let container = document.getElementById('grid-container')
let colorChoicePicker = document.getElementById('color-picker')
let eraseButton = document.getElementById('erase')
let drawButton = document.getElementById('draw').classList.add("pressed")
let isEraserSelected = false
let selectedColor = colorChoicePicker.value
let num = valueRange.value
let sizeValue = document.getElementById('size-value')
let mouseDown = 0



document.body.addEventListener('mousedown', () => mouseDown = 1)
document.body.addEventListener('mouseup', () => mouseDown = 0)


valueRange.addEventListener('mousemove', updateSizeValue)

colorChoicePicker.addEventListener('change', (e) => {
    selectedColor = e.target.value
})

function makeRows(rows, cols){
    container.style.setProperty('--grid-rows', rows)
    container.style.setProperty('--grid-cols', cols)
    for (let i = 0; i < rows * cols; i++){
        let cell = document.createElement('div')
        container.appendChild(cell)
        cell.classList.add('grid-item')
    }
}

function clear (){
    gridItems.forEach((gridItem) => gridItem.style.backgroundColor = 'white' )
}

function erase(){
    isEraserSelected = true
    eraseButton.classList.add("pressed")
    drawButton.classList.remove("pressed")

}
function drawAgain (){
    isEraserSelected = false
    eraseButton.classList.remove("pressed")
    drawButton.classList.add("pressed")

}
function reset (){
    num = valueRange.value
    clear()
    makeRows(num, num)
    gridItems = document.querySelectorAll('.grid-item')
    draw()

}

window.onload = makeRows(num, num)
let gridItems = document.querySelectorAll('.grid-item')

function draw(){
    gridItems.forEach((gridItem) => {
        gridItem.style.opacity = 0
        gridItem.addEventListener('mouseover', () => { 
            if(mouseDown){
                if (isEraserSelected) {
                    gridItem.style.opacity = 0
                } 
                else {
                    gridItem.style.backgroundColor = selectedColor
                    gridItem.style.opacity = parseFloat(gridItem.style.opacity) + 0.3
                }
            }

        })
    })
    
}


function updateSizeValue(){
    sizeValue.innerHTML = `${valueRange.value} x ${valueRange.value}`
}

draw()
clearButton.addEventListener('click', clear)
eraseButton.addEventListener('click', erase)
drawButton.addEventListener('click', drawAgain)
valueRange.addEventListener('change', () => {
    reset()
    console.log(valueRange.value)
    updateSizeValue()
})
