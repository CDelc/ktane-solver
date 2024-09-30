import { useState, useEffect } from 'react'

function Mazes() {

    const [mode, setMode] = useState('circle')
    const [start, setStart] = useState(-1)
    const [circles, setCircles] = useState([-1, -1])
    const [end, setEnd] = useState(-1)
    const [maze, setMaze] = useState(-1)
    const [mazeMap, setMazeMap] = useState([])
    const [error, setError] = useState('')
    const [solution, setSolution] = useState([])

    const validCircles = [[6, 17], [10, 19], [21, 23], [0, 18], [16, 33], [4, 26], [1, 31], [3, 20], [8, 24]]

    const mazes = [
        {
            vertWalls: [3, 7, 9, 13, 15, 19, 22, 27, 29, 32, 34],
            horWalls: [1, 4, 5, 8, 9, 10, 13, 16, 19, 20, 21, 22, 25, 28]
        },
        {
            vertWalls: [3, 8, 10, 13, 15, 20, 22, 23, 25, 26, 27, 29, 31, 33],
            horWalls: [0, 2, 5, 7, 9, 10, 14, 16, 19, 21, 28]
        },
        {
            vertWalls: [3, 4, 7, 8, 9, 11, 14, 15, 17, 19, 20, 21, 22, 23, 25, 27, 28, 29, 34],
            horWalls: [1, 6, 9, 10, 25, 26]
        },
        {
            vertWalls: [2, 7, 8, 13, 15, 17, 19, 29, 33, 35],
            horWalls: [2, 3, 4, 9, 10, 13, 14, 16, 19, 20, 21, 22, 25, 26, 27]
        },
        {
            vertWalls: [11, 14, 16, 19, 22, 23, 25, 29, 31],
            horWalls: [0, 1, 2, 3, 7, 8, 10, 11, 14, 15, 19, 20, 22, 26, 27, 28]
        },
        {
            vertWalls: [1, 3, 7, 8, 9, 11, 14, 15, 16, 20, 22, 23, 26, 27, 28, 34],
            horWalls: [3, 10, 13, 14, 17, 18, 25, 26, 28]
        },
        {
            vertWalls: [4, 7, 9, 11, 14, 16, 20, 23, 25, 26, 29],
            horWalls: [1, 2, 8, 9, 10, 12, 13, 15, 17, 21, 22, 25, 26, 27]
        },
        {
            vertWalls: [1, 4, 9, 11, 13, 17, 19, 21, 25, 26],
            horWalls: [2, 7, 8, 9, 10, 14, 15, 19, 21, 22, 23, 26, 27, 28, 29]
        },
        {
            vertWalls: [1, 7, 8, 10, 11, 15, 17, 19, 20, 22, 25, 26, 27, 29, 32, 34],
            horWalls: [2, 3, 9, 13, 14, 16, 21, 22, 29]
        }
    ]

    const convertMaze = (maze) => {
        if(maze === -1) return []
        return [...Array(36)].map((_, index) => (
            [
                index >= 6 && mazes[maze].horWalls.indexOf(index - 6) === -1,
                index <= 29 && mazes[maze].horWalls.indexOf(index) === -1,
                index % 6 !== 0 && mazes[maze].vertWalls.indexOf(index) === -1,
                index % 6 !== 5 && mazes[maze].vertWalls.indexOf(index + 1) === -1
            ]
        ))
    }

    // 0 - top, 1 - bottom, 2 - left, 3 - right
    const solveHelper = (list, current, from) => {
        let tmp = [...list]
        tmp.push(current)
        if(current === end) {
            setSolution(tmp)
            return
        }
        if(mazeMap[current][0] && from !== 0) {
            solveHelper(tmp, current - 6, 1)
        }
        if(mazeMap[current][1] && from !== 1) {
            solveHelper(tmp, current + 6, 0)
        }
        if(mazeMap[current][2] && from !== 2) {
            solveHelper(tmp, current - 1, 3)
        }
        if(mazeMap[current][3] && from !== 3) {
            solveHelper(tmp, current + 1, 2)    
        }
    }

    const solve = () => {
        if(start === -1) return;
        if(end === -1) return;
        if(maze === -1) return;
        if(mazeMap.length === 0) return
        
        solveHelper([], start, -1)
    }

    const renderWalls = (maze, index) => ((mazes !== -1) ? {
        borderLeft: (mazes[maze] && (mazes[maze].vertWalls.indexOf(index) > -1 || index % 6 === 0)) ? '2px white solid' : 'none',
        borderBottom: (mazes[maze] && (mazes[maze].horWalls.indexOf(index) > -1 || index > 29)) ? '2px white solid' : 'none',
        borderTop: (mazes[maze] && (index < 6)) ? '2px white solid' : 'none',
        borderRight: (mazes[maze] && (index % 6 === 5)) ? '2px white solid' : 'none'
    } : {})
    
    const modStyle = {
        display: 'grid',
        gridTemplateRows: 'repeat(6, 50px)',
        gridTemplateColumns: 'repeat(6, 50px)',
        backgroundColor: 'rgb(50, 50, 75)',
        padding: '20px',
        borderRadius: '10px',
        margin: '20px'
    }

    const cellStyle = {
        backgroundColor: 'transparent',
        border: 'none'
    }

    const squareStyle = (index) => ({
        width: (solution.indexOf(index) !== -1) ? '30px' : '10px',
        height: (solution.indexOf(index) !== -1) ? '30px' : '10px',
        backgroundColor: (start === index) ? 'rgb(225, 225, 225)' : (solution.indexOf(index) !== -1) ? 'rgb(200, 200, 255)' : 'rgb(150, 150, 150)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '25px'
    })

    const buttonStyle = (type) => ({
        width: '50px',
        height: '50px',
        margin: '5px',
        backgroundColor: 'rgb(50, 50, 75)',
        boxShadow: (type === mode) ? 'none' : '2px 2px 2px'
    })

    const circle = {
        backgroundColor: 'transparent',
        width: '30px',
        height: '30px',
        borderRadius: '50%',
        border: 'rgb(0, 200, 0) 5px solid'
    }

    const triangle = {
        width: '0',
        height: '0',
        borderLeft: '15px solid transparent',
        borderRight: '15px solid transparent',
        borderBottom: '30px solid red'
    }

    const getArrow = (index) => {
        const routePosition = solution.indexOf(index)
        if(routePosition === -1 || routePosition === solution.length - 1) return ''
        const diff = solution[routePosition] - solution[routePosition + 1]
        if(diff === 6) return '↑'
        if(diff === -6) return '↓'
        if(diff === 1) return '←'
        if(diff === -1) return '→'
    }

    const getMaze = () => {
        return validCircles.findIndex(e => (e.indexOf(circles[0]) > -1 && e.indexOf(circles[1]) > -1))
    }

    const onGridClick = (index) => {
        switch(mode) {
            case 'circle':
                let tmp = [...circles]
                const empty = circles.indexOf(-1)
                const exists = circles.indexOf(index)
                if (exists !== -1) {
                    tmp[exists] = -1
                }
                else if(empty > -1) {
                    tmp[empty] = index
                }
                setCircles(tmp)
                break;
            case 'triangle':
                setEnd(index)
                break;
            case 'start':
                setStart(index)
                break;
            default: break
        }
    }

    const updateState = () => {
        setSolution([])
        setMaze(getMaze())
        setMazeMap(convertMaze(maze))
        solve()
    }

    const updateError = () => {
        if(maze === -1 && circles.indexOf(-1) === -1){
            setError('No maze found for the given circles')
        }
        else if(start === end && start !== -1) {
            setError('Start and finish cannot be on the same square')
        }
        else setError('')
    }

    const reset = () => {
        setMode('circle')
        setStart(-1)
        setCircles([-1, -1])
        setEnd(-1)
    }

    useEffect(updateState, [circles, end, start])
    useEffect(updateError, [circles, end, start, maze])
    
    return (
        <div className='center'>
            <div style={{display: 'flex'}}>
                <div style={modStyle}>
                    {[...Array(36)].map((_, index) => (
                        <button key={index} style={{...cellStyle, ...renderWalls(maze, index)}} className='center' onClick={() => onGridClick(index)}>
                            {end!==index && <div style={circles.indexOf(index) > -1 ? circle : {}} className='center'><div style={squareStyle(index)}>{getArrow(index)}</div></div>}
                            {end===index && <div style={circles.indexOf(index) > -1 ? circle : {}} className='center'><div style={triangle} /></div>}
                        </button>
                    ))}
                </div>
                <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <button style={buttonStyle('circle')} className='center' onClick={() => setMode('circle')}>
                        <div style={circle}/>
                    </button>
                    <button style={buttonStyle('triangle')} className='center' onClick={() => setMode('triangle')}>
                        <div style={triangle}/>
                    </button>
                    <button style={buttonStyle('start')} className='center' onClick={() => setMode('start')}>
                        <div style={squareStyle(start)}></div>
                    </button>
                </div>
            </div>
            {(error.length > 0) && <div className="module-error">{error}</div>}
            {(error.length === 0 && solution.length > 0) && <div className="module-solve">{solution.map(i => getArrow(i)).join(' ')}</div>}
            <button onClick={reset} className='reset-button'>Reset</button>
        </div>
    );
}

export default Mazes;