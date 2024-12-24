const vowels = ['a', 'e', 'i', 'o', 'u'];

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
    '--..',
    '-----',
    '.----',
    '..---',
    '...--',
    '....-',
    '.....',
    '-....',
    '--...',
    '---..',
    '----.'
]

export const morseToLetter = (string) => {
    const rIndex = morseAlphabet.indexOf(string)
    if(rIndex >= 0) return alphabet[rIndex]
    else return ''
}

export const letterToMorse = (letter) => {
    if(letter.toLowerCase() >= 'a' && letter.toLowerCase() <= 'z') {
        return morseAlphabet[alphaPosition(letter) - 1]
    }
    else if(letter.toLowerCase() >= '0' && letter.toLowerCase() <= '9') {
        return morseAlphabet[+letter + 26]
    }
}

export const removeCharAt = (str, i) => {
    if(i >= str.length) return str
    return str.slice(0, i) + str.slice(i + 1, str.length)
}

export const alphaPosition = (letter) => {
    return letter.toLowerCase().charCodeAt() - 96
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

export const getLargestDigit = (sn) => {
    let max = -1
    for(let i = 0; i < sn.length; i++) {
        const char = sn.charAt(i)
        if(isDigit(char)) {
            let num = parseInt(char)
            if(num > max) max = num
        }
    }
    return max
}

export const getFirstDigit = (sn) => {
    for(let i = 0; i < sn.length; i++) {
        const char = sn.charAt(i)
        if(isDigit(char)) {
            return parseInt(char)
        }
    }
    return null
}

export const evenvodd = (sn) => {
    let evenCount = 0;
    let oddCount = 0;
    for(let i = 0; i < sn.length; i++) {
        const char = sn.charAt(i)
        if(isDigit(char)) {
            if(parseInt(char) % 2) oddCount ++
            else evenCount++
        }
    }
    if(evenCount > oddCount) return 1
    if(oddCount > evenCount) return -1
    if(oddCount === evenCount) return 0
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

export const range = (size, start = 0) => {
    return [...Array(size).keys()].map(i => i + start);
}

export const arrayEquals = (array1, array2) => {
    return array1.filter((e, i) => e === array2[i]).length === array1.length
}
