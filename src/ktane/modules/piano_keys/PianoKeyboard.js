function PianoKeyboard() {
    return (
        <div class="piano-container">
            <div class="piano">
                <button class="key white" id="C" style={{left: '0'}}>C</button>
                <button class="key black" id="C♯" style={{left: '50px'}}>C#</button>
                <button class="key white" id="D" style={{left: '50px'}}>D</button>
                <button class="key black" id="D♯" style={{left: '100px'}}>D#</button>
                <button class="key white" id="E" style={{left: '100px'}}>E</button>
                <button class="key white" id="F" style={{left: '150px'}}>F</button>
                <button class="key black" id="F♯" style={{left: '200px'}}>F#</button>
                <button class="key white" id="G" style={{left: '200px'}}>G</button>
                <button class="key black" id="G♯" style={{left: '250px'}}>G#</button>
                <button class="key white" id="A" style={{left: '250px'}}>A</button>
                <button class="key black" id="A♯" style={{left: '300px'}}>A#</button>
                <button class="key white" id="B" style={{left: '300px'}}>B</button>
            </div>
        </div>
    )
}

export default PianoKeyboard