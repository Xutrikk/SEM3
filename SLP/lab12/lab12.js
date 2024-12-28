/*Разработайте класс Sudoku. Класс создает игровое поле 9х9 (двумерный массив).
 В классе Sudoku должны быть реализованы методы проверяющие столбцы, строки и квадраты на повторение цифр.
  В консоль необходимо выводить номер ошибочного столбца(column), строки(row), квадрата. Кроме того, должны быть методы:
- метод, который сбрасывает игровое поле до исходного состояния, 
- метод, который проверяет все игровое поле на наличие ошибок (пустая клетка не является ошибкой),
- метод, который генерирует правильно заполненное игровое поле.*/
class Sudoku {
  constructor(initialGrid) {
  
    this.grid = initialGrid || Array.from({ length: 9 }, () => Array(9).fill(0));
  }

 
  resetGrid() {
    this.grid = Array.from({ length: 9 }, () => Array(9).fill(0));
  }

  
  checkRow(row) {
    const seen = new Set();
    for (let i = 0; i < 9; i++) {
      const value = this.grid[row][i];
      if (value !== 0) {
        if (seen.has(value)) return false;
        seen.add(value);
      }
    }
    return true;
  }

  
  checkColumn(column) {
    const seen = new Set();
    for (let i = 0; i < 9; i++) {
      const value = this.grid[i][column];
      if (value !== 0) {
        if (seen.has(value)) return false;
        seen.add(value);
      }
    }
    return true;
  }


  checkSquare(row, column) {
    const seen = new Set();
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(column / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        const value = this.grid[i][j];
        if (value !== 0) {
          if (seen.has(value)) return false;
          seen.add(value);
        }
      }
    }
    return true;
  }


  getSquareNumber(row, column) {
    const squareRow = Math.floor(row / 3);
    const squareCol = Math.floor(column / 3);
    return squareRow * 3 + squareCol + 1;
  }

 
  checkErrors() {
    let errors = [];

   
    for (let i = 0; i < 9; i++) {
      if (!this.checkRow(i)) {
        errors.push(`Ошибка в строке ${i + 1}`);
      }
    }


    for (let i = 0; i < 9; i++) {
      if (!this.checkColumn(i)) {
        errors.push(`Ошибка в столбце ${i + 1}`);
      }
    }

  
    for (let i = 0; i < 9; i += 3) {
      for (let j = 0; j < 9; j += 3) {
        if (!this.checkSquare(i, j)) {
          const squareNumber = this.getSquareNumber(i, j);
          errors.push(`Ошибка в квадрате ${squareNumber}`);
        }
      }
    }

    return errors.length > 0 ? errors.join('\n') : "Ошибок не найдено";
  }

  generateSolution() {
    this.grid = [
      [5, 3, 4, 6, 7, 8, 9, 1, 2],
      [6, 7, 2, 1, 9, 5, 3, 4, 8],
      [1, 9, 8, 3, 4, 2, 5, 6, 7],
      [8, 5, 9, 7, 6, 1, 4, 2, 3],
      [4, 2, 6, 8, 5, 3, 7, 9, 1],
      [7, 1, 3, 9, 2, 4, 8, 5, 6],
      [9, 6, 1, 5, 3, 7, 2, 8, 4],
      [2, 8, 7, 4, 1, 9, 6, 3, 5],
      [3, 4, 5, 2, 8, 6, 1, 7, 9]
    ];
  }

  
  printGrid() {
    this.grid.forEach(row => console.log(row.join(" ")));
  }
}


const sudoku = new Sudoku();
sudoku.generateSolution();
console.log("Сгенерированное поле:");
sudoku.printGrid();

console.log("\nПроверка на ошибки:");
console.log(sudoku.checkErrors());

sudoku.resetGrid();
console.log("\nПоле после сброса:");
sudoku.printGrid();
console.log("\nПроверка на ошибки после сброса:");
console.log(sudoku.checkErrors());
