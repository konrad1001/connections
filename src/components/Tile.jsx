import React from 'react'
import './styles.css';

const Tile = ({ item, select, onSelect }) => {
    
    return (
        <button className={`tile ${select ? 'selected' : 'idle'}`} onClick={onSelect}>{item}</button>
    )
}

export default Tile