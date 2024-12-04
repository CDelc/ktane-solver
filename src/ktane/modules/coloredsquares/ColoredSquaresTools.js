import { letterToMorse, removeCharAt } from "../../utils";

export const offColor = '#555';

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
    offColor, //OFF 6
    '#d70', //ORANGE 7
    '#0ee', //CYAN 8
    '#60a', //PURPLE 9
    '#600', //CHESTNUT 10
    '#950', //BROWN 11
    '#f9f', //MAUVE 12
    '#07d', //AZURE 13
    '#8f8', //JADE 14
    '#002a00', //FOREST 15
    '#111' //BLACK 16
];

export const offIndex = 6;

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

export const detectModule = (colors) => {
    if(colors.includes(offIndex)) return '';
    const counts = countColors(colors);
    const shortCounts = counts.slice(0, 6);
    const specialCounts = counts.slice(6);
    let minCount = 1
    while(!counts.includes(minCount)) minCount++;

    if(hasNumberOf(shortCounts, 4, 4)) return MODULE_TYPES.BICOLORED;
    else if(hasNumberOf(counts, 1, 16)) return MODULE_TYPES.OVERCOLORED;
    else if(hasNumberOf(shortCounts, 1, minCount)) return MODULE_TYPES.COLORED;
    else if(hasNumberOf(shortCounts, 3, 2) && hasNumberOf(shortCounts, 2, 5)) return MODULE_TYPES.DECOLORED;
    else if(hasNumberOf(shortCounts, 4, 1)) return MODULE_TYPES.DISCOLORED;
    else if(hasNumberOf(shortCounts, 3, 1)) return MODULE_TYPES.ISOCOLORED;
    else if(hasNumberOf(counts, 16, 1)) return MODULE_TYPES.JUXTACOLORED;
    else if(specialCounts.filter(i => i !== 0).length > 0) return MODULE_TYPES.TOMBSTONE;
    else if(hasNumberOf(shortCounts, 2, minCount)) return MODULE_TYPES.UNCOLORED;
    else if(hasNumberOf(shortCounts, 4, 3)) return MODULE_TYPES.VARICOLORED;
    else return '';
}

export const countColors = (colors) => {
    let counts = Array(16).fill(0);
    colors.forEach( (color) => {
        if(color === offIndex) return;
        if(color > offIndex) color--;
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

export const solveColoredSquares = (colors, state) => {
    
    const numWhiteSquares = state.numWhiteSquares;
    const prevGroup = state.previousGroupId

    const getAllColorPositions = (color) => {
        let highlight = [];
        colors.forEach((ele, index) => {
            if(ele === color) highlight.push(index);
        })
        return highlight;
    }

    if((prevGroup !== -1 && colors.filter(color => color > 5).length > 0) || colors.filter(color => color > 5 && color !== 16).length > 0) {
        return "Invalid Colors on board for this module"
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

export const solveBicoloredSquares = (colors, state) => {

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

export const solveDecoloredSquares = (colors, state) => {

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


export const solveDiscoloredSquares = (colors, state) => {

}