const isDigit = (char) => {
    return (char >= '0' && char <= '9')
}

export const getLastDigit = (sn) => {
    for(let i = 5; i >= 0; i--) {
        const char = sn.charAt(i)
        if(isDigit(sn.charAt(char))) {
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