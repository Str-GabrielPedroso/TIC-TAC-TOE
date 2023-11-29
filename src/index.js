
const btnStart = document.getElementById(`btnStart`)
const boardPositions = document.querySelectorAll(`.gameBoard span`)
const switchName = document.getElementById(`switchName`)
const switchIcon = document.getElementById(`switchIcon`)
let boardPosition = []

btnStart.addEventListener(`click`, startGame)

function startGame() {
    const playerOne = document.getElementById(`playerOne`).value.toUpperCase()
    const playerTwo = document.getElementById(`playerTwo`).value.toUpperCase()
    boardPosition = [[``, ``, ``], [``, ``, ``], [``, ``, ``]]

    if (playerOne && playerTwo) {
        switchName.innerText = `${playerOne}`
        switchIcon.innerText = `close`
        btnStart.innerText = `Restart`
        boardPositions.forEach(function (element) {
            element.classList.remove(`win`)
            element.classList.add(`inGame`, `cursorPointer`)
            element.innerText = ``
            element.addEventListener(`click`, handleBoardClick)
        })
    }
}

function handleBoardClick(event) {
    const playerOne = document.getElementById(`playerOne`).value.toUpperCase()
    const playerTwo = document.getElementById(`playerTwo`).value.toUpperCase()

    if (switchIcon.innerText === `close`) {
        event.currentTarget.innerText = `close`
        switchName.innerText = `${playerTwo}`
        switchIcon.dataset.icon = `radio_button_unchecked`
        switchIcon.innerText = `radio_button_unchecked`
        const rowColumn = event.currentTarget.dataset.position.split(`.`)
        const row = rowColumn[0]
        const column = rowColumn[1]
        boardPosition[row][column] = `X`
    }
    else if (switchIcon.innerText === `radio_button_unchecked`) {
        event.currentTarget.innerText = `radio_button_unchecked`
        event.currentTarget.setAttribute(`disabled`, true)
        switchName.innerText = `${playerOne}`
        switchIcon.dataset.icon = `close`
        switchIcon.innerText = `close`

        const rowColumn = event.currentTarget.dataset.position.split(`.`)
        const row = rowColumn[0]
        const column = rowColumn[1]
        boardPosition[row][column] = `O`
    }
    console.clear()
    console.table(boardPosition)
    disableBtn(event.currentTarget)

    const getWinGame = winGame()
    if (getWinGame.length > 0) {
        handleWin(getWinGame)
        if (switchName.innerText === `${playerOne}`) {
            switchName.innerText = `${playerTwo} WIN`
        } else {
            switchName.innerText = `${playerOne} WIN`
        }
    }
    else if (boardPosition.flat().includes(``)) {
        return
    }
    else {
        switchName.innerText = `TIE`
    }
}

function handleWin(regions) {
    regions.forEach(function (region) {
        document.querySelector(`[data-position="${region}"]`).classList.add(`win`)
        document.querySelector(`[data-position="${region}"]`).classList.remove(`inGame`)
    })
}

function disableBtn(element) {
    element.classList.remove(`cursorPointer`)
    element.removeEventListener(`click`, handleBoardClick)
}

function winGame() {
    const winRegions = []
    if (boardPosition[0][0] && boardPosition[0][0] === boardPosition[0][1] && boardPosition[0][0] === boardPosition[0][2])
        winRegions.push(`0.0`, `0.1`, `0.2`)
    if (boardPosition[1][0] && boardPosition[1][0] === boardPosition[1][1] && boardPosition[1][0] === boardPosition[1][2])
        winRegions.push(`1.0`, `1.1`, `1.2`)
    if (boardPosition[2][0] && boardPosition[2][0] === boardPosition[2][1] && boardPosition[2][0] === boardPosition[2][2])
        winRegions.push(`2.0`, `2.1`, `2.2`)
    if (boardPosition[0][0] && boardPosition[0][0] === boardPosition[1][0] && boardPosition[0][0] === boardPosition[2][0])
        winRegions.push(`0.0`, `1.0`, `2.0`)
    if (boardPosition[0][1] && boardPosition[0][1] === boardPosition[1][1] && boardPosition[0][1] === boardPosition[2][1])
        winRegions.push(`0.1`, `1.1`, `2.1`)
    if (boardPosition[0][2] && boardPosition[0][2] === boardPosition[1][2] && boardPosition[0][2] === boardPosition[2][2])
        winRegions.push(`0.2`, `1.2`, `2.2`)
    if (boardPosition[0][0] && boardPosition[0][0] === boardPosition[1][1] && boardPosition[0][0] === boardPosition[2][2])
        winRegions.push(`0.0`, `1.1`, `2.2`)
    if (boardPosition[0][2] && boardPosition[0][2] === boardPosition[1][1] && boardPosition[0][2] === boardPosition[2][0])
        winRegions.push(`0.2`, `1.1`, `2.0`)
    return winRegions
}