import React from 'react';
import { useState } from 'react';
import { Tile, TileRow, Mistakes } from './components';
import './styles.css';

function App() {

  const [selected, setSelected] = useState(Array(16).fill(false));
  const [items, setItems] = useState([
    '🍎', '🍎', '🍎', '🍎',
    '🍊', '🍊', '🍊', '🍊',
    '🍉', '🍉', '🍉', '🍉',
    '🍒', '🍒', '🍒', '🍒'
  ]);
  const [numberOfSelected, setNumberOfSelected] = useState(0);
  const [check, setCheck] = useState(false);

  const [connectionsMade, setConnectionsMade] = useState(Array(4).fill(null));

  // const connections = {
  //   '🍎': 'Apples',
  //   '🍊': 'Oranges',
  //   '🍉': 'Watermelons',
  //   '🍒': 'Cherries'
  // }

  const connections = {
    'Apples': '🍎',
    'Oranges': '🍊',
    'Watermelons': '🍉',
    'Cherries': '🍒'
  }


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
    let newItems = items.slice();
    let newSelections = selected.slice();
    for (let i = newItems.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newItems[i], newItems[j]] = [newItems[j], newItems[i]];
      [newSelections[i], newSelections[j]] = [newSelections[j], newSelections[i]];
    }
    setItems(newItems);
    setSelected(newSelections);
  }

  function getKeyByValue(object, value) {
    return Object.keys(object).find(key => object[key] === value);
  }
  

  function checkSelection() {
    let selectedItems = items.filter((item, index) => selected[index]);

    if (selectedItems.every((val, i, arr) => val === arr[0])) {
      makeConnection(getKeyByValue(connections, selectedItems[0]));
    } else {
      resetSelections();
    }
  }

  function makeConnection(category) {
    const index = connectionsMade.findIndex((element) => element === null);
    let newConnections = connectionsMade.slice();

    newConnections[index] = category;
    setConnectionsMade(newConnections);
    
    rearrange(category, index);
    resetSelections();

  }

  function rearrange(category, index) {
    index = index*4;
    let count = 0;
    let newItems = items.slice();

    for (let i = index; i < newItems.length; i++) {
      
      if (newItems[i] === connections[category]) {
        //swap with element at index + count
        [newItems[i], newItems[index + count]] = [newItems[index + count], newItems[i]];
        count++;
      }
    }

    setItems(newItems);

  }

  return (
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
            <Tile item={items[index]} select={selected[index]} onSelect={() => handleClick(index)}/>
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
            <Tile item={items[index]} select={selected[index]} onSelect={() => handleClick(index)}/>
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
            <Tile item={items[index]} select={selected[index]} onSelect={() => handleClick(index)}/>
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
            <Tile item={items[index]} select={selected[index]} onSelect={() => handleClick(index)}/>
          ))
        }
      </div>
      )}
    </div>
    <Mistakes />
    <div className='button-container'>
    <button className='RoundButton' onClick={resetSelections}>Reset</button>
    <button className='RoundButton'onClick={shuffle}>Shuffle</button>
    <button className='RoundButton' onClick={checkSelection} disabled={numberOfSelected!==4}>Check</button>
      
    </div>
  </div>
  );
}



export default App;
