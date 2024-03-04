import React from 'react'
import './styles.css';

const Tile = ({ item, select, onSelect, shaking, disable }) => {
    
    return (
        <button className={`tile ${select ? 'selected' : 'idle'} ${shaking ? 'shake' : ''} ${disable ? 'disabled' : ''}`} 
        onClick={onSelect}
        disabled={disable}
        >
            
            {item}
        
        </button>

        
    )
}

export default Tile