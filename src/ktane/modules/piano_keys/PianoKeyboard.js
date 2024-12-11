function PianoKeyboard(props) {
    return (
        <div class="piano-container">
            <div class="piano">
                <button class="key white" style={{left: '0'}}>{props.not ? '1' : 'C'}</button>
                <button class="key black" style={{left: '50px'}}>{props.not ? '2' : 'C#'}</button>
                <button class="key white" style={{left: '50px'}}>{props.not ? '3' : 'D'}</button>
                <button class="key black" style={{left: '100px'}}>{props.not ? '4' : 'D#'}</button>
                <button class="key white" style={{left: '100px'}}>{props.not ? '5' : 'E'}</button>
                {props.not && <button class="key black" id="F♯" style={{left: '150px'}}>6</button>}
                <button class="key white" style={{left: '150px'}}>{props.not ? '7' : 'F'}</button>
                {!props.not && <button class="key black" id="F♯" style={{left: '200px'}}>F#</button>}
                <button class="key white" style={{left: '200px'}}>{props.not ? '8' : 'G'}</button>
                <button class="key black" style={{left: '250px'}}>{props.not ? '9' : 'G#'}</button>
                <button class="key white" style={{left: '250px'}}>{props.not ? '10' : 'A'}</button>
                <button class="key black" style={{left: '300px'}}>{props.not ? '11' : 'A#'}</button>
                <button class="key white" style={{left: '300px'}}>{props.not ? '12' : 'B'}</button>
            </div>
        </div>
    )
}

PianoKeyboard.defaultProps = {
    not: false
}

export default PianoKeyboard