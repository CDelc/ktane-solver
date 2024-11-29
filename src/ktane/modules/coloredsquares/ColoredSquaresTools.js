import { getAllByLabelText } from "@testing-library/react";

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

export const solveColoredSquares = (colors, state) => {
    
    const numWhiteSquares = state.numWhiteSquares;
    const prevGroup = state.previousGroupId
    
    const getColorPosition = (color) => {
        let highlight = 0;
        while(colors[highlight] !== color && highlight < 17) highlight++;
        return highlight;
    }

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
                console.log(row)
                if(row.filter(color => color !== 0).length > 0) {
                    console.log('-----------')
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
