import React from 'react'

const Mistakes = ({count}) => {
  return (
    <div className='mistakes-panel'>
      <p>Mistakes remaining:</p>
      
      <div className='dots'> 
        {[...Array(4 - count)].map(() => (
          <div className='dot'></div>
        ))}
      </div>
    </div>
  )
}

export default Mistakes