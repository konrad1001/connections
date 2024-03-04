import React, { useEffect } from 'react';
import { useState } from 'react';
import { Tile, TileRow, Mistakes } from './components';
import './styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleQuestion } from '@fortawesome/free-regular-svg-icons';

function App() {

  const I = ['🍎', '🍒', '🍓', '🍉', '😀', '😁', '😂', '🤣', '🚗', '🚕', '🚙', '🚓', '☀️', '🌤️', '⛅', '🌦️']
  const [selected, setSelected] = useState(Array(16).fill(false));
  const [shakingTiles , setShakingTiles] = useState(Array(16).fill(false));

  const [items, setItems] = useState(I);
  const [numberOfSelected, setNumberOfSelected] = useState(0);
  const [gameStart , setGameStart] = useState(false);
  const [hasWon, setHasWon] = useState(false);
  const [mistakes, setMistakes] = useState(0);

  const [connectionsMade, setConnectionsMade] = useState(Array(4).fill(null));

  const connections = {
    'Red Fruits': ['🍎', '🍒', '🍓', '🍉'],
    'Smiley Faces': ['😀', '😁', '😂', '🤣'],
    'Modes of transport': ['🚗', '🚕', '🚙', '🚓'],
    'Weather': ['☀️', '🌤️', '⛅', '🌦️']
  }
;
  useEffect(() => {
    shuffle();
  }, []);

  useEffect(() => {
    if (mistakes === 1) {
      setTimeout(() => {
        alert('You lost! Try again');
      }, 500);
     
    }
  }, [mistakes]);

  useEffect(() => {
    if (connectionsMade[3]) {
      setTimeout(() => {
        alert('You won! 🎉');
        setHasWon(true);
      }, 100);
    }
  }, [connectionsMade])


  function handleClick(index) {
    if (numberOfSelected === 4 && !selected[index]) {
      return;
    }
    let newSelected = selected.slice();
    newSelected[index] = !newSelected[index];
    setSelected(newSelected);
    setNumberOfSelected(newSelected.filter((item) => item).length);
    
  }

  function resetSelections() {
    setSelected(Array(16).fill(false));
    setNumberOfSelected(0);
  }

  function shuffle() {
    console.log(mistakes)
    let newItems = items.slice();
    let newSelections = selected.slice();

    const min = connectionsMade.findIndex((element) => element === null) * 4;
    const max = 16;

    for (let i = max - 1; i > min; i--) {
      const j = Math.floor(Math.random() * (max - min) + (min));
      [newItems[i], newItems[j]] = [newItems[j], newItems[i]];
      [newSelections[i], newSelections[j]] = [newSelections[j], newSelections[i]];
    }
    setItems(newItems);
    setSelected(newSelections);
  }

  function checkSelection() {
    let selectedItems = items.filter((item, index) => selected[index]);
    
    for(let category in connections) {
      if (connections[category].every((val) => selectedItems.includes(val))) {
        console.log(category);
        makeConnection(category);
        if (connectionsMade.every((val) => val !== null)) {
          setHasWon(true);
        }
        return;
      } 
    
    }
    runMistake();      
  }

  function runMistake() {
    setMistakes(mistakes + 1);
    shake();
    resetSelections();
    
  }

  function shake() {
    setShakingTiles(selected);
    setTimeout(() => setShakingTiles(Array(16).fill(false)), 200);
  }

  function makeConnection(category) {
    const index = connectionsMade.findIndex((element) => element === null);
    let newConnections = connectionsMade.slice();

    newConnections[index] = category;
    setConnectionsMade(newConnections);
    
    rearrange(category, index);
    resetSelections();

  }

  function rearrange(category, from) {
    from = from*4;
    let count = 0;
    let newItems = items.slice();
    
    for (let i = from; i < newItems.length; i++) {
      
      if (connections[category].includes(newItems[i])) {
        //swap with element at index + count
        [newItems[i], newItems[from + count]] = [newItems[from + count], newItems[i]];
        count++;
      }
    }

    setItems(newItems);

  }

  function resetAll() {
    setGameStart(false);
    setHasWon(false);
    setConnectionsMade(Array(4).fill(null));   
    setItems(I);
    setMistakes(0);
  }


  return (
    <div>
      {gameStart ? (
            <div className='container'>
            <p>Create four groups of four!</p>
            <div className='grid'>
              {connectionsMade[0] ? (
                <div className='row'>
                <TileRow item={connectionsMade[0]} mapping={connections} difficulty={0}/>
                </div>
              ) : (
                <div className='row'>
                {
                  [0, 1, 2, 3].map((index) => (
                    <Tile item={items[index]} select={selected[index]} shaking={shakingTiles[index]} disable={mistakes===4} onSelect={() => handleClick(index)}/>
                  ))
                }
              </div>
              )}
              {connectionsMade[1] ? (
                <div className='row'>
                <TileRow item={connectionsMade[1]} mapping={connections} difficulty={1}/>
                </div>
              ) : (
                <div className='row'>
                {
                  [4, 5, 6, 7].map((index) => (
                    <Tile item={items[index]} select={selected[index]} shaking={shakingTiles[index]} disable={mistakes===4} onSelect={() => handleClick(index)}/>
                  ))
                }
              </div>
              )}
              {connectionsMade[2] ? (
                <div className='row'>
                <TileRow item={connectionsMade[2]} mapping={connections} difficulty={2}/>
                </div>
              ) : (
                <div className='row'>
                {
                  [8, 9, 10, 11].map((index) => (
                    <Tile item={items[index]} select={selected[index]} shaking={shakingTiles[index]} disable={mistakes===4} onSelect={() => handleClick(index)}/>
                  ))
                }
              </div>
              )}
              {connectionsMade[3] ? (
                <div className='row'>
                <TileRow item={connectionsMade[3]} mapping={connections} difficulty={3}/>
                </div>
              ) : (
                <div className='row'>
                {
                  [12, 13, 14, 15].map((index) => (
                    <Tile item={items[index]} select={selected[index]} shaking={shakingTiles[index]} disable={mistakes===4} onSelect={() => handleClick(index)}/>
                  ))
                }
              </div>
              )}
            </div>
            {hasWon ? (
              <p>Congrats 🎉</p>
            ) : (
              <Mistakes count={mistakes}/>   
            )}
            
            <div className='button-container'>
              <button className='RoundButton' onClick={resetSelections}>Deselect</button>
              <button className='RoundButton'onClick={shuffle}>Shuffle</button>
              {hasWon || mistakes===4 ? (
                <button className='RoundButton' onClick={resetAll}>Play again</button>
              ) : (
                <button className='RoundButton' onClick={checkSelection} disabled={numberOfSelected!==4}>Check</button>
              )}
              
              <button 
                style={{ background: 'transparent', border: 'none', cursor: 'pointer' }} 
                onClick={() => setGameStart(false)}
              >
                <FontAwesomeIcon icon={faCircleQuestion} size='xl'/>
              </button>
            </div>
          </div>
      ) : (
        <div className='container'>
          <div className='panel'>
            <h1>Connections</h1>
            <p>Try to make four groups of four!</p>
            <button 
              className='RoundButton' 
              onClick={() => {
                setGameStart(true); 
                // shuffle()
              }}
            >
              Play
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



export default App;
