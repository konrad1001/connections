import React from 'react'

const TileRow = ( {item, mapping, difficulty } ) => {

    const toColour = () => {
        switch (difficulty) {
            case 0:
                return 'yellow';
            case 1:
                return 'green';
            case 2:
                return 'blue';
            case 3:
                return 'purple';
            default:
                return '';
        }
    }

  return (
    <div className={`group ${toColour()}`}>
        <h3 className='tile-item'>{item}</h3>
        <h3 className='tile-item'>{mapping[item]}</h3>
    </div>
  )
}

export default TileRow