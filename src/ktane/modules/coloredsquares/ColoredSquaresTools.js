import { letterToMorse, removeCharAt, getLastDigit } from "../../utils";

const COLORED_SQUARES_GRID = [
    [2, 7, 1, 4, 6, 3, 5],
    [6, 3, 2, 5, 1, 7, 4],
    [4, 5, 3, 6, 2, 1, 7],
    [2, 3, 4, 7, 1, 6, 5],
    [4, 6, 2, 5, 7, 1, 3],
    [5, 1, 4, 3, 7, 2, 6],
    [3, 6, 7, 2, 5, 4, 1],
    [5, 1, 3, 2, 4, 7, 6],
    [7, 4, 1, 3, 6, 5, 2],
    [3, 7, 6, 1, 5, 2, 4],
    [1, 4, 6, 7, 3, 5, 2],
    [7, 2, 5, 1, 4, 6, 3],
    [6, 5, 7, 4, 2, 3, 1],
    [1, 2, 5, 6, 3, 4, 7],
    [7, 6, 7, 6, 7, 6, 7]
]

export const COLOR = [
    '#eee', //WHITE 0
    '#d00', //RED 1
    '#00c', //BLUE 2
    '#0d0', //GREEN 3
    '#ee0', //YELLOW 4
    '#d0d', //MAGENTA 5
    '#bbb', //GREY 6
    '#d70', //ORANGE 7
    '#0ee', //CYAN 8
    '#60a', //PURPLE 9
    '#600', //CHESTNUT 10
    '#950', //BROWN 11
    '#f9f', //MAUVE 12
    '#07d', //AZURE 13
    '#8f8', //JADE 14
    '#002a00', //FOREST 15
    '#444' //BLACK 16
];

export const MODULE_TYPES = {
    BICOLORED: 'Bicolored Squares',
    COLORED: 'Colored Squares',
    DECOLORED: 'Decolored Squares',
    DISCOLORED: 'Discolored Squares',
    ISOCOLORED: 'Isocolored Squares',
    JUXTACOLORED: 'Juxtacolored Squares',
    NOT_COLORED: 'Not Colored Squares',
    OVERCOLORED: 'Overcolored Squares',
    PERSPECTICOLORED: 'Perspecticolored Squares',
    TOMBSTONE: 'Tombstone Maze',
    UNCOLORED: 'Uncolored Squares',
    VARICOLORED: 'Varicolored Squares'
}

export const detectModule = (colors, flashing) => {
    if(flashing > -1) return ''
    const counts = countColors(colors);
    const shortCounts = counts.slice(0, 6);
    const specialCounts = counts.slice(6);
    const hasSpecialColors = specialCounts.filter(i => i !== 0).length > 0
    const hasWhite = counts[0] > 0
    let minCount = 1
    while(!counts.includes(minCount)) minCount++;

    if(!hasSpecialColors && !hasWhite && hasNumberOf(shortCounts, 4, 4)) return MODULE_TYPES.BICOLORED;
    else if(!hasSpecialColors && !hasWhite && hasNumberOf(shortCounts, 1, 16)) return MODULE_TYPES.OVERCOLORED;
    else if(!hasSpecialColors && !hasWhite && hasNumberOf(shortCounts, 1, minCount)) return MODULE_TYPES.COLORED;
    else if(!hasSpecialColors && !hasWhite && hasNumberOf(shortCounts, 3, 2) && hasNumberOf(shortCounts, 2, 5)) return MODULE_TYPES.DECOLORED;
    else if(!hasSpecialColors && !hasWhite && hasNumberOf(shortCounts, 4, 1)) return MODULE_TYPES.DISCOLORED;
    else if(!hasSpecialColors && !hasWhite && hasNumberOf(shortCounts, 3, 1)) return MODULE_TYPES.ISOCOLORED;
    else if(!hasWhite && hasNumberOf(counts, 16, 1)) return MODULE_TYPES.JUXTACOLORED;
    //else if(hasSpecialColors && !hasWhite) return MODULE_TYPES.TOMBSTONE;
    else if(!hasSpecialColors && !hasWhite && hasNumberOf(shortCounts, 2, minCount)) return MODULE_TYPES.UNCOLORED;
    else if(!hasSpecialColors && !hasWhite && hasNumberOf(shortCounts, 4, 3)) return MODULE_TYPES.VARICOLORED;
    else return '';
}

export const countColors = (colors) => {
    let counts = Array(17).fill(0);
    colors.forEach( (color) => {
        counts[color]++;
    })
    return counts;
}

const hasNumberOf = (arr, count, value) => {
    return arr.filter((e) => e === value).length === count;
}

const getColorPosition = (colors, color) => {
    let highlight = 0;
    while(colors[highlight] !== color && highlight < 17) highlight++;
    return highlight;
}

const solveNotColoredSquares = (colors, state) => {
    console.log("Not Colored Squares")
    const goalBoards = [
        [
            2, 2, 2, 4,
            5, 4, 2, 4,
            3, 1, 2, 3,
            5, 2, 1, 1
        ],
        [
            2, 2, 1, 4,
            3, 4, 3, 2,
            3, 3, 2, 5,
            3, 2, 3, 4
        ],
        [
            3, 4, 2, 2,
            4, 1, 2, 3,
            1, 5, 3, 1,
            2, 3, 5, 5
        ],
        [
            1, 5, 2, 5,
            5, 1, 1, 2,
            5, 1, 2, 2,
            5, 4, 1, 1
        ],
        [
            5, 4, 2, 2,
            3, 1, 4, 5,
            3, 2, 1, 2,
            4, 4, 5, 5
        ],
        [
            3, 3, 4, 2,
            1, 4, 3, 4,
            4, 5, 1, 2,
            2, 1, 2, 3
        ],
        [
            4, 2, 4, 1,
            4, 2, 1, 3,
            5, 5, 2, 5,
            3, 3, 4, 3
        ],
        [
            4, 5, 5, 5,
            1, 5, 5, 4,
            4, 4, 4, 5,
            4, 5, 4, 2
        ],
        [
            1, 2, 4, 3,
            3, 5, 3, 5,
            5, 1, 5, 4,
            3, 4, 1, 3
        ],
        [
            5, 3, 1, 3,
            1, 5, 4, 5,
            1, 3, 2, 4,
            2, 1, 3, 2
        ],
        [
            5, 1, 4, 2,
            2, 5, 1, 2,
            4, 2, 4, 2,
            5, 3, 1, 2
        ],
        [
            1, 2, 5, 1,
            3, 2, 3, 1,
            2, 1, 1, 2,
            5, 4, 3, 1
        ],
        [
            2, 2, 1, 4,
            5, 2, 4, 4,
            2, 2, 2, 3,
            1, 4, 5, 1
        ],
        [
            1, 1, 2, 3,
            1, 4, 4, 5,
            1, 5, 4, 1,
            1, 2, 1, 2
        ],
        [
            2, 5, 5, 3,
            2, 5, 4, 3,
            1, 4, 5, 1,
            3, 2, 4, 2
        ],
        [
            2, 4, 5, 1,
            4, 3, 4, 5,
            2, 4, 5, 2,
            1, 5, 3, 3
        ]
    ]

    const moveLegal = (start, end) => {
        return (start % 4 === end % 4 || Math.floor(start / 4) === Math.floor(end / 4)) && start !== end
    }

    const makeMove = (start, end, board) => {
        if(!moveLegal(start, end)) return
        let result = [...board]
        result[start] = board[end]
        result[end] = 16
        return result
    }

    const moveQuality = (start, end, board, goal) => {
        let quality = 0
        if(board[end] === goal[end]) quality--
        if(board[end] === goal[start]) quality++
        return quality
    }

    const findAllMoves = (start, boardState, goal) => {
        let moves = []
        const board = boardState.board
        for(let end = 0; end < board.length; end++) {
            if(!moveLegal(start, end)) continue
            moves.push({
                board: makeMove(start, end, board),
                quality: boardState.quality + moveQuality(start, end, board, goal),
                moveHistory: [...boardState.moveHistory, end]
            })
        }
        return moves
    }

    const findBestMoves = (start, board, goal) => {
        let boardStates = [{board: board, quality: 0, moveHistory: []}]
        for(let depth = 1; depth <= 9; depth++) {
            let newStates = []
            for(let i = 0; i < boardStates.length; i++) {
                const boardState = boardStates[i]
                const moveHistory = boardState.moveHistory
                const currentSquare = moveHistory.length > 0 ? moveHistory[moveHistory.length - 1] : start
                newStates.push(...findAllMoves(currentSquare, boardState, goal))
            }
            boardStates = [...newStates]
            //console.log(boardStates.filter(state => state.quality >= 0).map(state => {return {...state, sim: state.board.filter((color, index) => color === goal[index]).length}}).filter(state => state.sim > 14))
            const solution = boardStates.filter(state => state.board.filter((color, index) => color === goal[index]).length >= goal.length - 1)
            if(solution.length > 0) {
                console.log(solution[0])
                return {
                    state: solution[0],
                    solved: true
                }
            }
            const qualities = boardStates.map(state => state.quality)
            const bestQuality = qualities.reduce((a, b) => Math.max(a, b))
            if(bestQuality <= 0) continue
            const bestState = boardStates.find(state => state.quality >= bestQuality)
            return {
                state: bestState,
                solved: false
            }
        }
        return null
    }

    let currentBoard = [...colors]
    let queue = []
    let startPosition = currentBoard.indexOf(16, 0)
    
    if(startPosition === -1) return "Black square missing for not colored squares"
    const goal = goalBoards[startPosition]
    let solved = false

    let timeout = 0
    while(!solved) {
        const rValue = findBestMoves(startPosition, currentBoard, goal)
        if(rValue === null) {
            console.log(queue)
            return "Solution not found"
        }
        const bestNextMoves = rValue.state
        solved = rValue.solved
        queue.push(...bestNextMoves.moveHistory)
        startPosition = queue[queue.length - 1]
        currentBoard = [...bestNextMoves.board]

        timeout++
        if(timeout >= 100) return "Error: Got stuck in a loop"
    }
    queue.push(startPosition)
    return {
        ...state,
        queue: queue,
        highlight: -1
    }
}

export const solveColoredSquares = (colors, state, flashing) => {
    
    if(flashing !== -1) return "Nothing should be flashing on this module"
    const numWhiteSquares = state.numWhiteSquares;
    const prevGroup = state.previousGroupId

    const getAllColorPositions = (color) => {
        let highlight = [];
        colors.forEach((ele, index) => {
            if(ele === color) highlight.push(index);
        })
        return highlight;
    }

    if(colors.filter(color => color > 5 && color !== 16).length > 0 || colors.filter(color => color === 16).length > 1) {
        return "Invalid Colors on board for this module"
    }

    if(state.queue.length > 0) return "Module should be solved"

    if(colors.includes(16)) {
        return solveNotColoredSquares(colors, state)
    }

    if(prevGroup === -1) {
        const counts = countColors(colors)
        counts.shift()
        let min = 17;
        let color = 0;
        counts.forEach((count, index) => {
            if(count < min && count > 0) {
                color = index;
                min = count;
            }
        })
        color++;
        const next = getAllColorPositions(color)
        return {
            ...state,
            highlight: next,
            previousGroupId: color
        }
    }
    else if(prevGroup > 0 && prevGroup < 8) {
        const nextGroup = COLORED_SQUARES_GRID[numWhiteSquares - 1][prevGroup - 1];
        let highlight = []
        if(nextGroup < 6) {
            highlight = getAllColorPositions(nextGroup)
        }
        else if(nextGroup === 6) {
            for(let i = 0; i < 16; i+=4) {
                const row = colors.slice(i, i + 4);
                if(row.filter(color => color !== 0).length > 0) {
                    highlight = row.map((color, index) => {
                        if(color !== 0) {
                            return index + i;
                        }
                        else return -1
                    }).filter(e => e !== -1)
                    break;
                }
            }
        }
        else if(nextGroup === 7) {
            for(let i = 0; i < 4; i++) {
                const col = colors.filter((_, index) => index % 4 === i)
                if(col.filter(color => color !== 0).length > 0) {
                    highlight = col.map((color, index) => {
                        if(color !== 0) {
                            return 4*index + i
                        }
                        else return -1
                    }).filter(e => e !== -1)
                    break;
                }
            }
        }
        else {
            return "Internal Logic Failure, previous group not tracked correctly"
        }
        if(highlight.length === 0) {
            return "No correct buttons found to press"
        }
        return {
            ...state,
            highlight: highlight,
            previousGroupId: nextGroup
        }
    }
}

export const solveBicoloredSquares = (colors, state, flashing) => {

    if(flashing !== -1) return "Nothing should be flashing on this module"
    const combinations = (str, numChars) => {
        if(numChars === 0) return []
        let list = []
        for(let i = 0; i < str.length; i++) {
            if(numChars === 1) {
                list.push(str.charAt(i))
                continue
            }
            const remainingCombos = combinations(str, numChars - 1)
            remainingCombos.forEach((combo) => list.push(str.charAt(i) + combo))
        }
        return list
    }

    const permutations = (str) => {
        if(str.length === 1) return [str]
        let perms = []
        for(let i = 0; i < str.length; i++) {
            const subPerms = permutations(removeCharAt(str, i))
            subPerms.forEach(perm => perms.push(str.charAt(i) + perm))
        }
        return [...new Set(perms)]
    }

    const testMorseLength = (str) => {
        let length = 0
        for(let i = 0; i < str.length; i++) {
            length += letterToMorse(str.charAt(i)).length
        }
        return length === 16
    }

    const stringToMorse = (str) => {
        let morse = []
        let string = str.split('');
        for(let i = 0; i < string.length; i++) {
            morse.push(letterToMorse(string[i]))
        }
        return morse.join('|')
    }

    const flipAlternateBits = (str) => {
        let arr = str.split('')
        let flip = false
        for(let i = 0; i < arr.length; i++) {
            if(!flip && arr[i] !== '|') {
                flip = true;
                continue;
            }
            else if(flip && arr[i] !== '|') {
                flip = false;
                if(arr[i] === '.') arr[i] = '-'
                else if(arr[i] === '-') arr[i] = '.'
            }
            else continue;
        }
        return arr.join('')
    }

    const serial = state.serial
    if(serial.length < 6) return "Serial number missing or incomplete"

    if(state.queue.length > 0) {
        return "Module should be solved"
    }

    if(state.dotColor === -1) {
        return {
            ...state,
            highlight: 0,
            dotColor: colors[0]
        }
    }

    if(state.dotColor !== -1 && state.dashColor === -1) {
        let highlight = 1
        while(colors[highlight] === colors[0]) highlight++
        return {
            ...state,
            highlight: highlight,
            dashColor: colors[highlight]
        }
    }

    for(let length = 3; length < 7; length++) {
        let totalCombinations = [];
        totalCombinations.push(...combinations(serial, length))
        const filteredCombinations = totalCombinations.filter(combination => combination.length > 3 && testMorseLength(combination))
        const filteredPermutations = filteredCombinations.map(combination => permutations(combination)).flat()
        
        const morseStrings = filteredPermutations.map(combination => stringToMorse(combination))
        const flippedMorse = morseStrings.map(morse => flipAlternateBits(morse))
    
        if(state.dotColor !== -1 && state.dashColor !== -1) {
            const dotColor = state.dotColor
            const dashColor = state.dashColor
            const counts = countColors(colors)
            const dotCount = counts[dotColor]
            const dashCount = counts[dashColor]
            if(dotCount + dashCount !== 16) return "This board is invalid, check input"
    
            let sequence = ''
            for(let i = 0; i < flippedMorse.length; i++) {
                const morse = flippedMorse[i]
                const dots = morse.split('.').length - 1
                const dashes = morse.split('-').length - 1
                if(dots === dotCount && dashes === dashCount) {
                    sequence = morse
                    break;
                }
            }
            if(sequence.length === 0) continue;
            let solution = []
            let nextDash = getColorPosition(colors, dashColor)
            let nextDot = getColorPosition(colors, dotColor)
            const charArray = sequence.split('');
    
            charArray.forEach(c => {
                if(c === '-') {
                    solution.push(nextDash)
                    do{
                        nextDash++
                    } while(colors[nextDash] !== dashColor && nextDash < 16)
                }
                if(c === '.') {
                    solution.push(nextDot)
                    do{
                        nextDot++
                    } while(colors[nextDot] !== dotColor && nextDot < 16)
                }
                if(c === '|') {
                    solution.push(solution[solution.length - 1])
                }
            })
            solution.push(solution[solution.length - 1])
            return {
                ...state,
                highlight: -1,
                queue: solution
            }
        }
    }
    return "No possible solution found, check input"
}

export const solveDecoloredSquares = (colors, state, flashing) => {

    if(flashing !== -1) return "Nothing should be flashing on this module"
    const decolored_chart = [
        {
            colorOptions: [2],
            yes: i => i + 6,
            no: i => i + 2,
            empty: false
        },
        {
            empty: true
        },
        {
            colorOptions: [4, 3, 1],
            yes: i => i + 6,
            no: i => i - 2,
            empty: false
        },
        {
            colorOptions: [2, 4, 1],
            yes: i => i - 1,
            no: i => i + 6,
            empty: false
        },
        {
            colorOptions: [1, 5],
            yes: i => i + 1,
            no: i => i + 6,
            empty: false
        },
        {
            colorOptions: [3, 4],
            yes: i => i + 6,
            no: i => i - 1,
            empty: false
        },
        {
            colorOptions: [5, 3, 1, 2],
            yes: i => i + 6,
            no: i => i - 6,
            empty: false
        },
        {
            colorOptions: [1, 2],
            yes: i => i + 6,
            no: i => i - 1,
            empty: false
        },
        {
            colorOptions: [2, 5],
            yes: i => i + 1,
            no: i => i + 12,
            empty: false
        },
        {
            colorOptions: [1],
            yes: i => i - 1,
            no: i => i - 6,
            empty: false
        },
        {
            colorOptions: [4, 3, 2],
            yes: i => i + 1,
            no: i => i - 6,
            empty: false
        },
        {
            colorOptions: [4, 5, 1],
            yes: i => i + 6,
            no: i => i - 1,
            empty: false
        },
        {
            colorOptions: [3, 4, 1, 2],
            yes: i => i + 1,
            no: i => i - 6,
            empty: false
        },
        {
            colorOptions: [4, 5],
            yes: i => i - 6,
            no: i => i + 3,
            empty: false
        },
        {
            empty: true
        },
        {
            empty: true
        },
        {
            colorOptions: [1, 3, 4, 5],
            yes: i => i + 1,
            no: i => i - 6,
            empty: false
        },
        {
            colorOptions: [1, 4],
            yes: i => i - 6,
            no: i => i - 1,
            empty: false
        },
        {
            colorOptions: [2, 3],
            yes: i => i + 6,
            no: i => i + 1,
            empty: false
        },
        {
            colorOptions: [1, 2, 3, 4, 5],
            yes: i => i - 1,
            no: i => i,
            empty: false
        },
        {
            colorOptions: [5],
            yes: i => i + 1,
            no: i => i - 1,
            empty: false
        },
        {
            colorOptions: [2, 4],
            yes: i => i - 12,
            no: i => i + 1,
            empty: false
        },
        {
            colorOptions: [5, 1, 2],
            yes: i => i + 1,
            no: i => i + 6,
            empty: false
        },
        {
            colorOptions: [3],
            yes: i => i - 1,
            no: i => i - 6,
            empty: false
        },
        {
            colorOptions: [3, 1, 2],
            yes: i => i + 6,
            no: i => i + 2,
            empty: false
        },
        {
            empty: true
        },
        {
            colorOptions: [2, 5, 4],
            yes: i => i + 1,
            no: i => i + 6,
            empty: false
        },
        {
            colorOptions: [1, 3],
            yes: i => i + 1,
            no: i => i - 6,
            empty: false
        },
        {
            colorOptions: [5, 2, 1, 4],
            yes: i => i - 1,
            no: i => i - 6,
            empty: false
        },
        {
            colorOptions: [4, 3, 5],
            yes: i => i + 6,
            no: i => i - 6,
            empty: false
        },
        {
            colorOptions: [3, 5, 1],
            yes: i => i + 1,
            no: i => i - 6,
            empty: false
        },
        {
            colorOptions: [5, 3, 4, 2],
            yes: i => i - 12,
            no: i => i + 1,
            empty: false
        },
        {
            colorOptions: [],
            yes: i => i,
            no: i => i + 1,
            empty: false
        },
        {
            colorOptions: [3, 5],
            yes: i => i - 1,
            no: i => i + 1,
            empty: false
        },
        {
            colorOptions: [4],
            yes: i => i - 1,
            no: i => i - 6,
            empty: false
        },
        {
            colorOptions: [5, 2, 3],
            yes: i => i - 6,
            no: i => i - 1,
            empty: false
        }
    ];

    if(state.decoloredPosition === -1) {
        let startRow = -1
        let startCol = -1
        switch(colors[13]) {
            case 2:
                startRow = 0;
                break;
            case 4:
                startRow = 1;
                break;
            case 3:
                startRow = 3;
                break;
            case 5:
                startRow = 4;
                break;
            case 1:
                startRow = 5;
                break;
            default: break;
        }
        switch(colors[1]) {
            case 5:
                startCol = 0;
                break;
            case 3:
                startCol = 2;
                break;
            case 4:
                startCol = 3;
                break;
            case 2:
                startCol = 4;
                break;
            case 1:
                startCol = 5;
                break;
            default: break;
        }
        state.decoloredPosition = startRow * 6 + startCol;
    }
    
    let highlight = state.highlight > -1 ? state.highlight + 1 : 0
    let tableIndex = state.decoloredPosition
    
    for(let i = highlight; i < colors.length; i++) {
        const cell = decolored_chart[tableIndex]
        const color = colors[i];
        if(cell.colorOptions.includes(color)) {
            tableIndex = cell.yes(tableIndex)
            highlight = i;
            break;
        }
        else tableIndex = cell.no(tableIndex)
        if(i === colors.length - 1) return "Module should be solved"
    }

    return {
        ...state,
        highlight: highlight,
        decoloredPosition: tableIndex
    }

}

export const solveDiscoloredSquares = (colors, state, flashing) => {

    if(flashing !== -1) return "Nothing should be flashing on this module"
    const moveN = i => (i - 4 + 16) % 16
    const moveE = i => (i + 1) % 4 === 0 ? i - 3 : i + 1
    const moveW = i => (i - 1 + 4) % 4 === 3 ? i + 3 : i - 1
    const moveS = i => (i + 4) % 16
    const moveNW = i => moveN(moveW(i))
    const moveNE = i => moveN(moveE(i))
    const moveSW = i => moveS(moveW(i))
    const moveSE = i => moveS(moveE(i))
    const stay = i => i
    const rotateCW = i => 4 * (i % 4) + 3 - Math.floor(i / 4)
    const rotate180 = i => 4 * (3 - Math.floor(i / 4)) + 3 - (i % 4)
    const rotateCCW = i => 4 * (3 - (i % 4)) + Math.floor(i / 4)
    const mirrorVertical = i => 4 * Math.floor(i / 4) + 3 - (i % 4)
    const mirrorHorizontal = i => 4 * (3 - Math.floor(i / 4)) + i % 4
    const mirrorPositive = i => 4 * (3 - (i % 4)) + 3 - Math.floor(i / 4)
    const mirrorNegative = i => 4 * (i % 4) + Math.floor(i / 4)
    

    const stages = [
        [2, 13, 7, 9, 0, 10, 6, 14, 8, 11, 15, 1, 5, 4, 3, 12],
        [0, 10, 6, 9, 15, 2, 3, 13, 12, 7, 11, 4, 14, 1, 5, 8],
        [14, 12, 6, 15, 7, 4, 2, 9, 1, 13, 8, 3, 10, 11, 5, 0],
        [12, 9, 2, 0, 8, 10, 6, 7, 11, 15, 1, 5, 13, 3, 14, 4]
    ]

    const instructions = [
        moveNW, moveNE, moveN, rotate180,
        mirrorNegative, moveSW, mirrorVertical, stay,
        mirrorPositive, moveE, rotateCW, moveW,
        mirrorHorizontal, moveS, rotateCCW, moveSE
    ]

    if(state.stage && state.stage > 3) return "Module should be solved"

    if(state.rememberedColors) {
        const stageOrder = stages[state.stage]
        const instruction = instructions[state.rememberedPositions[state.stage]]
        const color = state.rememberedColors[state.stage]
        if(!colors.includes(color)) return "Expected color is missing from board, invalid input"
        let queue = []
        let colorsCopy = [...colors]

        for(let i = 0; i < stageOrder.length; i++) {
            let checkIndex = stageOrder[i]
            if(colorsCopy[checkIndex] !== color) continue;
            else {
                let timeout = 0
                do {
                    checkIndex = instruction(checkIndex)
                    timeout++;
                    if(timeout > 4) return "Solve stuck in loop, double check input"
                } while(colorsCopy[checkIndex] === 0)
                queue.push(checkIndex)
                colorsCopy[checkIndex] = 0
            }
        }
        return {
            ...state,
            queue: queue,
            stage: state.stage + 1
        }
    }

    else {
        const counts = countColors(colors).slice(0, 6)
        if(hasNumberOf(counts, 4, 1)) {
            const mainColor = counts.indexOf(12)
            let queue = [];
            let rememberedColors = []
            let rememberedPositions = []
            
            for(let i = 0; i < colors.length; i++) {
                const color = colors[i]
                if(color !== mainColor) {
                    queue.push(i)
                    rememberedColors.push(color)
                    rememberedPositions.push(i)
                }
            }
            return {
                ...state,
                queue: queue,
                rememberedPositions: rememberedPositions,
                rememberedColors: rememberedColors,
                stage: 0
            }
        }
    }
}

export const solveIsocoloredSquares = (colors, state, flashing) => {

    if(flashing !== -1) return "Nothing should be flashing on this module"
    const transitionDiagrams = [
        [4, 2, 5, 1, 4, 4],
        [3, 2, 4, 3, 3, 0],
        [3, 3, 4, 4, 1, 0],
        [4, 3, 1, 3, 3, 0],
        [3, 5, 1, 4, 2, 3],
        [5, 2, 5, 1, 2, 1],
        [5, 3, 1, 0, 2, 4],
        [4, 3, 4, 2, 5, 0],
        [5, 3, 0, 3, 0, 2],
        [5, 1, 1, 1, 3, 2]
    ]

    const moveN = i => (i - 4 + 16) % 16
    const moveE = i => (i + 1) % 4 === 0 ? i - 3 : i + 1
    const moveW = i => (i - 1 + 4) % 4 === 3 ? i + 3 : i - 1
    const moveS = i => (i + 4) % 16

    const adjacentIndices = (index) => {
        return [moveN(index), moveE(index), moveS(index), moveW(index)]
    }

    const shiftArray = (array) => {
        let copy = [...array]
        const begin = copy.shift()
        copy.push(begin)
        return copy
    }

    const normalizePattern = (pattern) => {
        let normalizedArray = [];
        
        let patternCopy = [...pattern]
        for(let i = 0; i < pattern.length; i++) {
            normalizedArray.push(patternCopy.join(''))
            patternCopy = shiftArray(patternCopy)
        }
        patternCopy = patternCopy.reverse()
        for(let i = 0; i < pattern.length; i++) {
            normalizedArray.push(patternCopy.join(''))
            patternCopy = shiftArray(patternCopy)
        }
        
        return normalizedArray
    }

    const checkSolve = (board) => {
        const colorCounts = countColors(board).slice(0, 6)
        if(colorCounts[2] === colorCounts[5]) return false
        if(colorCounts[1] === colorCounts[4]) return false
        let counts = Array(16).fill(0);
        for(let i = 0; i < colorCounts.length; i++) {
            counts[colorCounts[i]]++
        }
        if(counts.includes(3) || counts.includes(4) || counts.includes(5)) return false
        const adjacentColors = board.map((_, index) => adjacentIndices(index).map(index => board[index]))
        const adjacentColorSets = new Array(6).fill(new Set([]))
        for(let i = 0; i < adjacentColors.length; i++) {

            if(adjacentColors[i].filter(color => color === adjacentColors[i][0]).length === adjacentColors[i].length) return false

            const color = board[i]
            if(adjacentColorSets[color].has(adjacentColors[i].join(''))) {
                return false
            }
            else {
                adjacentColorSets[color] = adjacentColorSets[color].union(new Set(normalizePattern(adjacentColors[i])))
            }
        }

        let rowPatterns = new Set([])
        let colPatterns = new Set([])

        for(let i = 0; i < 4; i++) {
            const row = board.slice(4 * i, 4 * (i + 1))
            const col = board.filter((_, index) => index % 4 === i)

            const rowPattern = row.join('')
            const colPattern = col.join('')

            if(rowPatterns.has(rowPattern)) return false
            if(colPatterns.has(colPattern)) return false
            rowPatterns = rowPatterns.union(new Set(normalizePattern(row)))
            colPatterns = colPatterns.union(new Set(normalizePattern(col)))
        }

        return true
    }

    const makeMove = (board, index, transition) => {
        let result = [...board.board]
        result[index] = 0
        let adjacent = [
            index > 3 ? index - 4 : null,
            index > 3 && index % 4 !== 3 ? index - 4 + 1 : null,
            index > 3 && index % 4 !== 0 ? index - 4 - 1 : null,
            index % 4 !== 0 ? index - 1 : null,
            index % 4 !== 3 ? index + 1 : null,
            index < 12 ? index + 4 : null,
            index < 12 && index % 4 !== 3 ? index + 4 + 1 : null,
            index < 12 && index % 4 !== 0 ? index + 4 - 1 : null,
        ]
        adjacent = adjacent.filter(i => i !== null)
        for(let i = 0; i < adjacent.length; i++) {
            result[adjacent[i]] = transitionDiagrams[transition][result[adjacent[i]]]
        }

        return {board: result, sequence: [...board.sequence, index]}
    }

    const getAllMoves = (board, transition) => {
        let results = []
        for(let i = 0; i < board.board.length; i++) {
            results.push(makeMove(board, i, transition))
        }
        return results
    }

    if(colors === 'test') {
        return;
    }

    if(state.queue.length > 0) return "Solution already found"

    const lastDigit = getLastDigit(state.serial)
    if(!lastDigit) return "Serial number missing or does not have a digit"

    let transitionDiagram = +lastDigit;
    let queue = []

    let checkedBoards = [{board: [...colors], sequence: []}]
    for(let depth = 1; depth < 5; depth++) {
        let nextBoards = []
        for(let i = 0; i < checkedBoards.length; i++) {
            const moves = getAllMoves(checkedBoards[i], transitionDiagram)
            const puzzleCompletions = moves.filter(move => checkSolve(move.board))
            if(puzzleCompletions.length > 0) {
                queue = puzzleCompletions[0].sequence
                break;
            }
            nextBoards.push(...moves)
        }
        if(queue.length > 0) break;
        checkedBoards = [...nextBoards]
        transitionDiagram = (transitionDiagram + 1) % 10
    }

    if(queue.length === 0) return "No solution found"

    return {
        ...state,
        queue: queue
    }
}

export const solveJuxtaColoredSquares = (colors, state, flashing) => {
    
    if(flashing !== -1) return "Nothing should be flashing on this module"
    const table = [
        {
            horizontal: [],
            vertical: []
        },
        {
            horizontal: [11, 7, 16],
            vertical: [12, 3, 10]
        },
        {
            horizontal: [3, 14, 13],
            vertical: [16, 15, 6]
        },
        {
            horizontal: [5, 10, 13],
            vertical: [4, 9, 2]
        },
        {
            horizontal: [5, 6, 10],
            vertical: [14, 12, 2]
        },
        {
            horizontal: [14, 7, 16],
            vertical: [6, 12, 11]
        },
        {
            horizontal: [9, 5, 16],
            vertical: [10, 14, 2]
        },
        {
            horizontal: [2, 8, 13],
            vertical: [15, 16, 14]
        },
        {
            horizontal: [4, 12, 5],
            vertical: [15, 10, 2]
        },
        {
            horizontal: [6, 11, 12],
            vertical: [7, 3, 4]
        },
        {
            horizontal: [13, 11, 12],
            vertical: [16, 7, 2]
        },
        {
            horizontal: [8, 13, 5],
            vertical: [15, 12, 2]
        },
        {
            horizontal: [6, 7, 10],
            vertical: [9, 13, 14]
        },
        {
            horizontal: [16, 13, 10],
            vertical: [14, 6, 2]
        },
        {
            horizontal: [11, 10, 16],
            vertical: [5, 3, 8]
        },
        {
            horizontal: [9, 14, 12],
            vertical: [6, 2, 1]
        },
        {
            horizontal: [11, 13, 5],
            vertical: [10, 7, 6]
        },
    ]

    if(state.highlight !== -1) return "Module already solved"

    let highlight = []

    for(let i = 0; i < colors.length; i++) {
        const color = colors[i]
        const chartEntry = table[color]
        if(
            (i % 4 !== 0 && chartEntry.horizontal.includes(colors[i - 1])) ||
            (i % 4 !== 3 && chartEntry.horizontal.includes(colors[i + 1])) ||
            (i > 3 && chartEntry.vertical.includes(colors[i - 4])) ||
            (i < 12 && chartEntry.vertical.includes(colors[i + 4]))
        ) {
            highlight.push(i)
        }
    }

    return {
        ...state,
        highlight: highlight
    }

}

export const solveOvercoloredSquares = (colors, state, flashing) => {
    
    if(flashing !== -1) return "Nothing should be flashing on this module"
    if(!state.previousBoard) {
        const previousBoard = colors
        const highlight = 0
        return {
            ...state,
            previousBoard: previousBoard,
            highlight: highlight
        }
    }

    const highlight = [...Array(16)].map((_, index) => index).filter(index => colors[index] === state.previousBoard[index] && colors[index] !== 0)
    return {
        ...state,
        previousBoard: [...colors],
        highlight: highlight
    }
}

export const solveUncoloredSquares = (colors, state, flashing) => {

    if(flashing !== -1) return "Nothing should be flashing on this module"

    const shapes = [
        [],
        [[0, 0], [0, 1], [-1, 1]],
        [[0, 0], [1, 0], [0, 1]],
        [[0, 0], [0, 1], [0, 2], [1, 1]],
        [[0, 0], [1, 0], [1, 1]],
        
        [[0, 0], [0, 1], [1, 1], [1, 2]],
        [],
        [[0, 0], [0, 1], [1,1]],
        [[0, 0], [-1, 0], [1, 0], [0, 1]],
        [[0, 0], [0, 1], [-1, 1], [1, 1]],
        
        [[0, 0], [0, 1]],
        [[0, 0], [0, 1], [0, 2], [1, 2]],
        [],
        [[0, 0], [0, 1], [1, 0], [1, 1]],
        [[0, 0], [1, 0], [0, 1], [-1, 1]],

        [[0, 0], [0, 1], [-1, 1], [-1, 2]],
        [[0, 0], [0, 1], [0, 2], [-1, 2]],
        [[0, 0], [0, 1], [0, 2], [1, 0]],
        [],
        [[0, 0], [0, 1], [0, 2], [-1, 1]],

        [[0, 0], [1, 0], [1, 1], [2, 1]],
        [[0, 0], [1, 0]],
        [[0, 0], [1, 0], [2, 0], [2, 1]],
        [[0, 0], [1, 0], [2, 0], [0, 1]],
        []
    ]

    const shapeFits = (shape, index, colors) => {
        const horizontal = shape.map(coord => coord[0])
        const vertical = shape.map(coord => coord[1])
        // console.log(index)
        // console.log(index % 4 + Math.min(...horizontal))
        // console.log(index % 4 + Math.max(...horizontal))
        // console.log(Math.floor(index) + Math.max(...vertical))
        // console.log('----------------------------')

        if(index % 4 + Math.min(...horizontal) < 0) return false
        if(index % 4 + Math.max(...horizontal) > 3) return false
        if(Math.floor(index / 4) + Math.max(...vertical) > 3) return false

        for(let coord of shape) {
            const check = index + 4 * coord[1] + coord[0]
            if(check < 0 || check > 15) return "Internal logic error, my code broke"
            if(colors[check] < 1 || colors[check] > 5) return false
        }
        return true
    }

    let counts = countColors(colors)
    counts = counts.slice(1, 6)
    let minCount = Math.min(...counts.filter(count => count !== 0))

    if(counts.filter(count => count === minCount).length !== 2) {
        return "There should be exactly two colors tied for the least common color"
    }
    const minColorIndices = [colors.indexOf(counts.indexOf(minCount) + 1), colors.indexOf(counts.lastIndexOf(minCount) + 1)]
    console.log(minColorIndices)
    const colorOne = colors[Math.min(...minColorIndices)]
    const colorTwo = colors[Math.max(...minColorIndices)]

    if((colorOne > 6 || colorOne < 1) || ((colorTwo > 6 || colorTwo < 1))) {
        return "Error: Illegal Colors"
    }
    console.log((colorTwo - 1) * 5 + colorOne - 1)
    const shape = shapes[(colorTwo - 1) * 5 + colorOne - 1]
    let highlight = []
    console.log(shape)
    for(let i = 0; i < colors.length; i++) {
        if(shapeFits(shape, i, colors)) {
            for(let coord of shape) {
                highlight.push(i + 4 * coord[1] + coord[0])   
            }
            return {
                ...state,
                highlight: highlight
            }
        }
    }
    return "No solution found"
}