class Sudoku {
    generateBoard(level = 0) {
        let genBoard = this.copyBoard(this.getEmptyBoard());
        for (let j = 0; j < this.getNumbers().length; j++) {
            for (let i = 0; i < this.getNumbers().length; i++) {
                const moves = this.getPossibleMoves(genBoard, { x: i, y: j }); 
                const rand = this.getRandomNumber(moves.length);
                if (!moves.length)  {
                    i = 0;  
                    j = 0;
                } else {
                    genBoard[j][i] = moves[rand];
                }
            }        
        }
        genBoard = this.holeBoard(genBoard, level * 20);
        return genBoard;
    }

    getRandomNumber(length) {
        return Math.floor(Math.random() * length);
    }

    getNumbers() {
        return [1, 2, 3, 4, 5, 6, 7, 8, 9];
    }

    shuffle(arr) {
        arr.forEach((val, i) => {
            const orig = arr[i];
            const randIndex = this.getRandomNumber(arr.length);
            const randValue = arr[randIndex];
            arr[i] = randValue;
            arr[randIndex] = orig;
        });

        return arr;
    }

    getHoles(board) {
        const holes = [];
        board.forEach((val, i) => val.forEach((val, j) => {
            !val && holes.push({
                value: 0,
                x: i,
                y: j,
            });
        }));
        return holes;
    }

    makeMove(board, holes) {
        let outBoard = this.copyBoard(board);
        holes.forEach(item => {
            outBoard[item.x][item.y] = item.value;
        });
        return outBoard;
    }

    holeBoard(board, holeNumber) {
        let randoms = [];
        while(randoms.length < 81) randoms.push(randoms.length);
        randoms = this.shuffle(randoms);
        for(let i = 0; i < holeNumber; i++) {
            const rand = randoms[i];
            board[Math.floor(rand / 9)][rand % 9] = 0;
        }
        return board;
    }

    getEmptyBoard () {
        return [[0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0]];
    }

    copyBoard(board) {
        let empty = this.getEmptyBoard();
        return empty.map((val, i) => {
            return val.map((val, j) => {
                return board[i][j];
            });
        });
    }

    getPossibleMoves(board, loc) {
        const testBoard = this.copyBoard(board);
        return this.getNumbers().map( (val, index) => {
                testBoard[loc.y][loc.x] = val;
                return this.isValid(testBoard) && (index + 1);
            })
            .filter(val => val)
    }

    isValid (board, evalZeros = false) {
        let testBoard = board.slice(0);
        if(!evalZeros)
        testBoard = testBoard.map((arr, i) => arr.map((val,j) => {
                if(val === 0) return 100+i+j*9;
                return val;
                }));
            
        const indexNumbers = this.getNumbers().map(val => val-1);
        return [...indexNumbers].reduce((accum, val, i) => {
            const row = new Set(testBoard[i]);
            const column = new Set([...indexNumbers].map(j => testBoard[j][i]));
            const section = new Set();
            [0, 1, 2].map((arr, x) => 
                [0, 1, 2].map((val, y) => 
                    section.add(testBoard[i % 3 * 3 + x][Math.floor(i / 3) * 3 + y])
                )
            );
           return accum && (row.size === 9 && 9 === column.size && section.size === 9);
       }, true);
    }
}

module.exports = Sudoku;