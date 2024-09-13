import wires from './images/wires.png';
import the_button from './images/the_button.png';
import keypads from './images/keypads.png';
import mazes from './images/mazes.png';
import complicated_wires from './images/complicated_wires.png';
import memory from './images/memory.png';
import morse_code from './images/morse_code.png';
import password from './images/password.png';
import simon_says from './images/simon_says.png';
import whos_on_first from './images/whos_on_first.png';
import wire_sequences from './images/wire_sequences.png';

import BombModule from './modules/BombModule';
import Wires from './modules/Wires';
import TheButton from './modules/TheButton';
import Keypads from './modules/Keypads';

const modules = [
    {
        name: "Wires",
        image: wires,
        path: "wires",
        element: <BombModule />,
        component: <Wires />
    },
    {
        name: "The Button",
        image: the_button,
        path: "the_button",
        element: <BombModule />,
        component: <TheButton />
    },
    {
        name: "Keypads",
        image: keypads,
        path: "keypads",
        element: <BombModule />,
        component: <Keypads />
    },
    {
        name: "Simon Says",
        image: simon_says,
        path: "simon_says",
        element: <BombModule module={this} />,
        component: <div />
    },
    {
        name: "Who's on First",
        image: whos_on_first,
        path: "wof",
        element: <BombModule module={this} />,
        component: <div />
    },
    {
        name: "Memory",
        image: memory,
        path: "memory",
        element: <BombModule module={this} />,
        component: <div />
    },
    {
        name: "Morse Code",
        image: morse_code,
        path: "morse_code",
        element: <BombModule module={this} />,
        component: <div />
    },
    {
        name: "Complicated Wires",
        image: complicated_wires,
        path: "complex_wires",
        element: <BombModule module={this} />,
        component: <div />
    },
    {
        name: "Wire Sequences",
        image: wire_sequences,
        path: "wire_sequences",
        element: <BombModule module={this} />,
        component: <div />
    },
    {
        name: "Mazes",
        image: mazes,
        path: "mazes",
        element: <BombModule module={this} />,
        component: <div />
    },
    {
        name: "Passwords",
        image: password,
        path: "passwords",
        element: <BombModule module={this} />,
        component: <div />
    }
]

modules.forEach(module => {
    module.element = <BombModule module={module}/>
})

export default modules;