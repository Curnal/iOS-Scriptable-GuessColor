// Script by: LanguageArtsGrade#6949 // Aditya Mathur
// 8/17/21
// Version 1.01

const STATE_EMPTY = null;

let board = [ 
  [STATE_EMPTY, STATE_EMPTY],
]
let WINNER = null
let table = new UITable();
updateTable()
tbale.present()

function updateTable() {
  table.removeAllRows()
  for (let rn = 0; rn < board.length; rn++) {
    let cols = board[rn]
    let row = new UITableRow()
    row.height = 80
    for (let cn = 0; cn < cols.length; cn++){
      let state = cols[cn]
      let emoji = emojiForSquareState(state)
      let cell
      if (state == STATE_EMPTY && WINNER == null && HAS_EMPTY_SQUARES){
        cell = row.addButton(emoji)
        cell.onTap = () => {
          move(rn, cn)
          checkForWinner()
          updateTable()
          table.reload()
        }
      } else {
        cell = row.addText(emoji)
      }
      cell.centerAligned()
    }
    table.addRow(row)
  }
  
  if(WINNER != null) {
    let row = new UITableRow()
    row.isHeader = true
    let cell = row.addText("You guessed correct!")
    cell.centerAligned()
    table.addRow(row)
    
  } else {
    let row = new UITableRow()
    row.isHeader = true
    let cell = row.addText("You did not guess the correct color!")
    cell.centerAligned()
    table.addRow(row)
  }
}

function move(rn, cn) {
  board[rn][cn] = CURRENT_PLAYER
}

function checkForWinner(){
  if(CURRENT_PLAYER == RANDCOL){
    WINNER = CURRENT_PLAYER
  }
}


function emojiForSquareState(state){
  if(state == STATE_EMPTY){
    return "🟥"
    return "🟦"
  } 
}
