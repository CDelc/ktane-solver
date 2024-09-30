const vowels = ['A', 'E', 'I', 'O', 'U'];

const alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']

const morseAlphabet = [
    '.-',
    '-...',
    '-.-.',
    '-..',
    '.',
    '..-.',
    '--.',
    '....',
    '..',
    '.---',
    '-.-',
    '.-..',
    '--',
    '-.',
    '---',
    '.--.',
    '--.-',
    '.-.',
    '...',
    '-',
    '..-',
    '...-',
    '.--',
    '-..-',
    '-.--',
    '--..'
]

export const morseToLetter = (string) => {
    const rIndex = morseAlphabet.indexOf(string)
    if(rIndex >= 0) return alphabet[rIndex]
    else return ''
}

export const containsVowel = (serial) => {
    return vowels.filter(v => (serial.indexOf(v) !== -1)).length > 0;
}

export const countPort = (portPlates, port) => {
    return portPlates.flat().filter(p => p === port).length
}

const isDigit = (char) => {
    return (char >= '0' && char <= '9')
}

export const getLastDigit = (sn) => {
    for(let i = sn.length - 1; i >= 0; i--) {
        const char = sn.charAt(i)
        if(isDigit(char)) {
            return parseInt(char)
        }
    }
    return null
}

export const getFirstDigit = (sn) => {
    for(let i = 0; i < sn.length; i++) {
        const char = sn.charAt(i)
        if(isDigit(sn.charAt(char))) {
            return parseInt(char)
        }
    }
    return null
}

export const getNumBatteries = (batteries) => {
    let count = 0;
    batteries.forEach(b => (b==='AA') ? count += 2 : count += 1);
    return count;
}

export const getLitIndicators = (indicators) => {
    let rValue = indicators.filter(i => i[1] === 1).map(i => (i[0]))
    return rValue;
}

export const getUnlitIndicators = (indicators) => {
    let rValue = indicators.filter(i => i[1] === 0).map(i => (i[0]))
    return rValue;
}