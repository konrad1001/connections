import React from 'react'
import './styles.css';

const Tile = ({ item, select, onSelect, shaking }) => {
    
    return (
        <button className={`tile ${select ? 'selected' : 'idle'} ${shaking ? 'shake' : ''}`} 
        onClick={onSelect}
        disabled={false}
        >
            
            {item}
        
        </button>

        
    )
}

export default Tile