import {Component} from '@angular/core';


@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent {
  matrix: Array<Array<number>>;
  moveX: Array<{ rowIndex: number, cellIndex: number }>;
  moveO: Array<{ rowIndex: number, cellIndex: number }>;
  winOptions: Array<Array<{ rowIndex: number, cellIndex: number }>>;
  winRow: Array<{ rowIndex: number, cellIndex: number }>;
  turnX: boolean;
  winX: boolean;
  winO: boolean;
  winColor: string;
  message: string;


  constructor() {
    this.matrix = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]
    this.moveX = [];
    this.moveO = [];
    this.winOptions = [
      [{rowIndex: 0, cellIndex: 0}, {rowIndex: 0, cellIndex: 1}, {rowIndex: 0, cellIndex: 2}],
      [{rowIndex: 1, cellIndex: 0}, {rowIndex: 1, cellIndex: 1}, {rowIndex: 1, cellIndex: 2}],
      [{rowIndex: 2, cellIndex: 0}, {rowIndex: 2, cellIndex: 1}, {rowIndex: 2, cellIndex: 2}],
      [{rowIndex: 0, cellIndex: 0}, {rowIndex: 1, cellIndex: 0}, {rowIndex: 2, cellIndex: 0}],
      [{rowIndex: 0, cellIndex: 1}, {rowIndex: 1, cellIndex: 1}, {rowIndex: 2, cellIndex: 1}],
      [{rowIndex: 0, cellIndex: 2}, {rowIndex: 1, cellIndex: 2}, {rowIndex: 2, cellIndex: 2}],
      [{rowIndex: 0, cellIndex: 0}, {rowIndex: 1, cellIndex: 1}, {rowIndex: 2, cellIndex: 2}],
      [{rowIndex: 0, cellIndex: 2}, {rowIndex: 1, cellIndex: 1}, {rowIndex: 2, cellIndex: 0}],
    ]
    this.winRow = [];
    this.turnX = true;
    this.winX = false;
    this.winO = false;
    this.winColor = "win-color";
    this.message = '';
  }


  setMoveArray(row: number, cell: number) {
    if (this.winX || this.winO || this.moveO.length === 5 || this.moveX.length === 5) {
      return;
    }

    if (this.matrix[row][cell] === 0) {
      if (this.turnX) {
        this.matrix[row][cell] = 1;
        this.moveX.push({rowIndex: row, cellIndex: cell});
        this.turnX = false;
      } else {
        this.matrix[row][cell] = 2;
        this.moveO.push({rowIndex: row, cellIndex: cell});
        this.turnX = true;
      }
    }
  }


  compareMatrices(count: number, cell: { cellIndex: number, rowIndex: number }, move: Array<{ rowIndex: number,cellIndex: number }>) {
    let result = move.some((myCell) => {
        return (myCell.cellIndex === cell.cellIndex) && (myCell.rowIndex === cell.rowIndex);
      }
    )
    if (result) {
      count++;
    }
    return count;
  }


  checkOptions() {
    this.winOptions.forEach((row) => {
      let countX = 0;
      let countO = 0;

      row.forEach((cell) => {
        countX = this.compareMatrices(countX, cell, this.moveX);
        countO = this.compareMatrices(countO, cell, this.moveO);

      })


      if (countX === 3 || countO === 3) {
        row.forEach((cell) => {
          this.winRow.push({rowIndex: cell.rowIndex, cellIndex: cell.cellIndex})
        });
      }

      if (countX === 3) {
        this.winX = true;
      }
      if (countO === 3) {
        this.winO = true;
      }
    })
  }


  showWinner() {
    if (this.winX) {
      this.message = 'A castigat X!'
    } else if (this.winO) {
      this.message = 'A castigat O!'
    } else if (this.moveO.length === 5 || this.moveX.length === 5) {
      this.message = 'Egalitate!'
    }
  }


  onCellClick(rowId: number, cellId: number) {
    this.setMoveArray(rowId, cellId);
    this.checkOptions();
    this.showWinner();
  }


  checkCell(row: number, cell: number): boolean {
    return (this.winRow.some((myCell) => {
      return ((myCell.rowIndex === row) && (myCell.cellIndex === cell));
    }));
  };
}
