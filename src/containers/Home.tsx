import React, { useState } from 'react'
import BarChart from '../components/BarChart'
import MenuBar from '../components/MenuBar'
import './Home.css'

const Home = () => {
  const numOfValues = 100,
        maxValue = 100,
        minValue = 0;
  const [intArray, setIntArray] = useState<number[]>(generateRandomArray())
  const [currentIter, setCurrentIter] = useState<number | null>(null);
  const [isSorting, setIsSorting] = useState<boolean>(false)
  
  function generateRandomArray() {
    let randomArray: number[] = [];
    for(let i=0; i<numOfValues; i++) {
      randomArray.push(Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue)
    }
    return randomArray;
  }

  let handleGenerate = () => setIntArray(generateRandomArray);
  
  let merge = (leftArray: number[], rightArray: number[]) => {
    let resultArray: number[] = [];
    let leftIter = 0, rightIter = 0;
    while(leftIter<leftArray.length && rightIter<rightArray.length) {
      if(leftArray[leftIter] <= rightArray[rightIter]) {
        resultArray.push(leftArray[leftIter]);
        leftIter++;
      }
      else {
        resultArray.push(rightArray[rightIter]);
        rightIter++;
      }
    }
    while(leftIter<leftArray.length) {
      resultArray.push(leftArray[leftIter++]);
    }
    while(rightIter<rightArray.length) {
      resultArray.push(rightArray[rightIter++]);
    }
    return resultArray;
  }

  let mergeSort = async (start: number, end: number): Promise<number[]> => {
    if(start == end) return [intArray[start]];
    let leftArray = await mergeSort(start, Math.floor((start+end)/2));
    let rightArray = await mergeSort(Math.floor((start+end)/2)+1, end);
    let resultArray = merge(leftArray, rightArray);
    let newArray = [...intArray];
    for(let i=start, j=0; i<=end; i++, j++) {
      newArray[i] = resultArray[j];
    }
    // await new Promise(resolve => setIntArray([...newArray], () => resolve()))
    await new Promise((resolve) => {
      setIntArray([...newArray]);
      resolve([...newArray]);
    });

    await new Promise(f => setTimeout(f, 100));
    return resultArray;
  }

  let handleMergeSort = async () => {
    let newArray = await mergeSort(0, intArray.length-1);
  }

  let quickSort = async (array: number[], start: number, end: number): Promise<number[]> => {
    if(array.length <= 1) return array;
    let pivotIndex = Math.floor(Math.random() * array.length);
    let pivot = array[pivotIndex];
    let smallArray: number[] = [], bigArray: number[] = [];
    array.forEach((value, index) => {
      if(index == pivotIndex) return;
      if(value >= pivot) bigArray.push(value);
      else smallArray.push(value); 
    })
    let newArray = [...intArray];
    let i;
    for(i=start; i<smallArray.length+start; i++) {
      newArray[i] = smallArray[i-start];
    }
    newArray[i++] = pivot;
    for(let j=0; j<bigArray.length; j++, i++) {
      newArray[i] = bigArray[j];
    }
    setIntArray([...newArray]);
    await new Promise(f => setTimeout(f, 100));
    
    return (await quickSort(smallArray, start, start+smallArray.length-1)).concat(pivot, await quickSort(bigArray, start+smallArray.length+1, end));
  }

  let handleQuickSort = async () => {
    setIntArray(await quickSort([...intArray], 0, intArray.length-1));
  }

  let handleSelectionSort = async () => {
    let newArray = [...intArray];
    let unsortedIndex = 0;
    while(unsortedIndex < newArray.length-1) {
      let minValue = newArray[unsortedIndex], minIndex = unsortedIndex;
      for(let i=unsortedIndex; i<newArray.length; i++) {
        if(newArray[i] < minValue) {
          minValue = newArray[i];
          minIndex = i;
        }
      }
      setCurrentIter(minIndex);
      setIntArray([...newArray]);
      [newArray[minIndex], newArray[unsortedIndex]] = [newArray[unsortedIndex], newArray[minIndex]];
      unsortedIndex++;
      await new Promise(f => setTimeout(f, 100));
    }
    setIntArray([...newArray]);
  }

  let handleBubbleSort = async () => {
    let swapped = true;
    let newArray = [...intArray];
    while(swapped) {
      
      swapped = false;
      for(let i=0; i<newArray.length-1; i++) {
        if(newArray[i] > newArray[i+1]) {
          [newArray[i], newArray[i+1]] = [newArray[i+1], newArray[i]];
          swapped = true;
        }
        setCurrentIter(i);
        setIntArray([...newArray]);
        await new Promise(f => setTimeout(f, 1));
      }
    }
  }

  let handleInsertionSort = async () => {
    let newArray = [...intArray];
    for(let i=1; i<newArray.length; i++) {
      let j=i;
      while(j > 0 && newArray[j] < newArray[j-1]) {
        [newArray[j], newArray[j-1]] = [newArray[j-1], newArray[j]];
        j--;
        setCurrentIter(j);
        setIntArray([...newArray]);
        await new Promise(f => setTimeout(f, 10));
      }
    }
  }

  return (
    <div className='Home'>
        <MenuBar handleGenerate={handleGenerate} handleQuickSort={handleQuickSort} handleMergeSort={handleMergeSort} handleSelectionSort={handleSelectionSort} handleInsertionSort={handleInsertionSort} handleBubbleSort={handleBubbleSort}  setIsSorting={setIsSorting} isSorting={isSorting}/>
        <div className='canvasContainer'>
          <BarChart data={intArray} currentIter={currentIter}/>
        </div>
    </div>
  )
}

export default Home