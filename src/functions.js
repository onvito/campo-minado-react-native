//Criando tabuleiro
const createBoard = (rows,columns) => {
    return Array(rows).fill(0).map((_, row) => {
        return Array(columns).fill(0).map((_, column) => {
            return {
                row,
                column,
                opened: false,
                mined: false,
                flagged: false,
                exploded: false,
                nearMines: 0 
            }
        })
    })
}

//Populando as bombas no tabuleiro
const spreadMines = (board, minesAmount) => {
    const rows = board.length
    const columns = board[0].length
    let minesPlanted = 0

    while (minesPlanted < minesAmount) {
        const rowSel = parseInt(Math.random() * rows, 10)
        const columnSel = parseInt(Math.random() * columns, 10)

        if (!board[rowSel] [columnSel].mined) {
            board[rowSel] [columnSel].mined = true
            minesPlanted++
        }
    }
}

//Chamando a função que popula dentro da criação do tabuleiro
const createMinedBoard = (rows, columns, minesAmount) => {
    const board = createBoard(rows,columns)
    spreadMines(board, minesAmount)
    return board
}

//Clone tabuleiro
const cloneBoard = board => {
    return board.map(rows => {
        return rows.map(field => {
            return { ...field} 
        })
    })
}

//Pegando vizinhos para expandir após o clique
const getNeighbors = (board, row, column) => {
    const neighbors = []
    const rows = [row - 1, row, row + 1]
    const columns = [column-1, column, column + 1]
    rows.forEach(r => {
        columns.forEach(c => {
            const diferent = r !== row || c !== column
            const validRow = r >=0 && r < board.length
            const validColumn = c >= 0 && c < board[0].length
            if (diferent && validRow && validColumn) {
                neighbors.push(board[r][c])
            }
        })
    })
    return neighbors
}

//Descobrindo se os vizinhos estão safe para abrir
const safeNeighborhood = (board,row, column) => {
    const safes =(result, neighbor) => result && !neighbor.mined
    return getNeighbors(board , row, column).reduce(safes, true)
} 

//Função que vai permtir o usuário abrir o campo
const openField = (board, row, column) => {
    const field = board[row][column]
    if (!field.opened) {
        field.opened = true
        if (field.mined) {
            field.exploded = true
        } else if (safeNeighborhood(board, row, column)) {
            getNeighbors(board, row, column).forEach(n => openField(board, n.row, n.column))
        } else {
            const neighbors = getNeighbors(board, row, column)
            field.nearMines = neighbors.filter(n => n.mined).length
        }
    }
}
//Pegar todos os campos do tabuleiro
const fields = board => [].concat(...board)

//Pegar campos que explodiram
const hadExplosion = board => fields(board)
    .filter(field => field.exploded).length > 0

//Saber se existem campos pendentes no jogo    
const pendding = field => (field.mined && !field.flagged)
    || (!field.mined && !field.opened)

//Se n tiver nenhum campo pendente, ganha o jogo
const wonGame = board => fields(board).filter(pendding).length === 0

//Se perder, mostrar onde estão todas as minas
const showMines = board => fields(board).filter(field => field.mined)
    .forEach(field => field.opened = true)

export { 
    createMinedBoard,
    cloneBoard,
    openField,
    hadExplosion,
    wonGame,
    showMines
 }