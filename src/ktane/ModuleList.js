import { useState } from 'react'
import modules from "./modules";
import ModuleListItem from "./ModuleListItem"
import './styles/ktane.css'

function ModuleList() {
    
    const [search, setSearch] = useState('');

    const isValid = (module) => {
        return module.name.toLowerCase().includes(search.toLowerCase())
    }
    
    const filtered = modules.filter(m => isValid(m))
    
    return (
        <div className="module-list-container">
            <input className="module-search-bar" placeholder="Search" onChange={(e) => {setSearch(e.target.value);}}/>
            {filtered.map((module, index) => (<ModuleListItem data={module} key={index}/>))}
        </div>
    );
}

export default ModuleList;