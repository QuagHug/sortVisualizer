import React, { useState, useEffect } from 'react'
import './MenuBar.css'

interface Props {
  handleGenerate: React.MouseEventHandler<HTMLButtonElement>;
  handleInsertionSort: Function;
  handleMergeSort: Function;
  handleQuickSort: Function;
  handleSelectionSort: Function;
  handleBubbleSort: Function;
  setIsSorting: React.Dispatch<React.SetStateAction<boolean>>;
  isSorting: boolean;
}

const MenuBar: React.FC<Props> = ({ handleGenerate, handleMergeSort, handleQuickSort, handleSelectionSort, handleBubbleSort, handleInsertionSort, isSorting, setIsSorting }) => {

  const [activeSort, setActiveSort] = useState<string | null>(null)

  const handleSortClick = (sortName: string) => {
    setActiveSort(sortName);
  };

  
  const handleSortButton = async () => {
    switch(activeSort) {
      case 'Merge Sort':
        // console.log(isSorting);
        handleMergeSort();
        break;
      case 'Quick Sort':
        handleQuickSort();
        break;
      case 'Insertion Sort':
        handleInsertionSort();
        break;
      case 'Bubble Sort':
        handleBubbleSort();
        break;
      case 'Selection Sort':
        handleSelectionSort();
        break;
    }
  }

  const sorts: string[] = [
    'Insertion Sort',
    'Bubble Sort',
    'Selection Sort',
    'Merge Sort',
    'Quick Sort',
  ]

  return (
    <nav className='MenuBar'>
      <ul>
        <li><button id='sortButton' onClick={handleSortButton}>Sort!</button></li>
        <li><button onClick={handleGenerate}>Generate New Array</button></li>
        {sorts.map((sort) => (
          <li key = {sort}>
            <button
              className = {activeSort == sort ? 'active' : ''}
              onClick = {() => handleSortClick(sort)}
            >
              {sort}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MenuBar