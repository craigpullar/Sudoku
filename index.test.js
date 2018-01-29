const SudokuGame = require('./sudoku');

describe('Sudoko Game', () => {
    const sudoku = new SudokuGame();

    it('creates an empty board', () => {
        const board = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0]];

        expect(sudoku.getEmptyBoard()).toEqual(board);
    });
    it('can validate a board true', () => {

        const board = [[4, 3, 5, 2, 6, 9, 7, 8, 1],
                    [6, 8, 2, 5, 7, 1, 4, 9, 3],
                    [1, 9, 7, 8, 3, 4, 5, 6, 2],
                    [8, 2, 6, 1, 9, 5, 3, 4, 7],
                    [3, 7, 4, 6, 8, 2, 9, 1, 5],
                    [9, 5, 1, 7, 4, 3, 6, 2, 8],
                    [5, 1, 9, 3, 2, 6, 8, 7, 4],
                    [2, 4, 8, 9, 5, 7, 1, 3, 6],
                    [7, 6, 3, 4, 1, 8, 2, 5, 9]];
           
        expect(sudoku.isValid(board)).toEqual(true);
    });
    it('can validate a board false', () => {

        const board = [[4, 3, 5, 2, 6, 9, 7, 8, 1],
                        [6, 8, 2, 5, 7, 1, 4, 9, 3],
                        [1, 9, 7, 8, 3, 4, 5, 2, 6],
                        [8, 2, 6, 1, 9, 5, 3, 4, 7],
                        [3, 7, 4, 6, 8, 2, 9, 1, 5],
                        [9, 5, 1, 7, 7, 3, 6, 2, 8],
                        [5, 1, 9, 3, 2, 6, 8, 7, 4],
                        [2, 4, 8, 9, 5, 7, 1, 3, 6],
                        [7, 6, 3, 4, 1, 8, 2, 5, 9]];

        expect(sudoku.isValid(board)).toEqual(false);
    });
    it ('Can get possible moves for board space if board empty', () => {
        const board = [[0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0, 0]];
        expect(sudoku.getPossibleMoves(board, {x: 0, y: 0})).toEqual([1,2,3,4,5,6,7,8,9]);
    });
    it('Can get possible moves for board space if given 1 value', () => {
        const board = [[1, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0]];
        expect(sudoku.getPossibleMoves(board, { x: 1, y: 0 })).toEqual([2, 3, 4, 5, 6, 7, 8, 9]);
    });
    it('Can get possible moves for board space if given 8 values', () => {
        const board = [[1, 5, 3, 6, 7, 2, 8, 9, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0],
                        [0, 0, 0, 0, 0, 0, 0, 0, 0]];
        expect(sudoku.getPossibleMoves(board, { x: 8, y: 0 })).toEqual([4]);
    });
    it('can generate a valid board', () => {
        const board = sudoku.generateBoard();
        expect(sudoku.isValid(board)).toBe(true);
        
    });
    it('Can create an easy mode board', () => {
        const board = sudoku.generateBoard(1);
        const naughtCount = board.reduce((accum, array) => { 
            return accum + array.reduce((accum, val) => { 
                return !val ? accum+1 : accum
                }, 0)
            },
        0);
        expect(naughtCount).toBe(20);
    });
    it('Can create an medium mode board', () => {
        const board = sudoku.generateBoard(2);
        const naughtCount = board.reduce((accum, array) => {
            return accum + array.reduce((accum, val) => {
                return !val ? accum + 1 : accum
            }, 0)
        },
            0);
        expect(naughtCount).toBe(40);
    });
    it('Can create an medium mode board', () => {
        const board = sudoku.generateBoard(3);
        const naughtCount = board.reduce((accum, array) => {
            return accum + array.reduce((accum, val) => {
                return !val ? accum + 1 : accum
            }, 0)
        },
            0);
        expect(naughtCount).toBe(60);
    });
    it('Can get array of holes', () => {
        const board = sudoku.generateBoard(1);
        expect(sudoku.getHoles(board).length).toEqual(20);
    });
    it('Can make move', () => {
        let board = sudoku.generateBoard(1);
        let holes = sudoku.getHoles(board);
        holes[0].value = 1;
        board = sudoku.makeMove(board,holes);
        holes = sudoku.getHoles(board);
        expect(holes.length).toBe(19);
    });
});