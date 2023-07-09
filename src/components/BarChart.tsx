import React, { useEffect, useRef } from 'react';
import './BarChart.css'

interface Props {
  data: number[];
  currentIter: number | null;
}

const BarChart: React.FC<Props> = ({data, currentIter}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    const canvasContainer = canvas?.parentElement;

    // Set the canvas size
    if(!canvas || !ctx || !canvasContainer) return;
    const chartWidth = canvasContainer.clientWidth;
    const chartHeight = 400;
    canvas.height = chartHeight;
    canvas.width = chartWidth;
    // Calculate the width of each bar
    const barWidth = chartWidth / data.length;

    // Find the maximum value in the data
    const maxValue = Math.max(...data);

    // Calculate the scale factor for the heights
    const scaleFactor = chartHeight / maxValue;

    // Set the bar color
    ctx.fillStyle = '#A7C7E7';

    // Iterate through the data and draw the bars
    for (let i = 0; i < data.length; i++) {
      const barHeight = data[i] * scaleFactor;
      const x = i * barWidth;
      const y = chartHeight - barHeight;

      // Draw the bar
      if(i == currentIter) ctx.fillStyle = '#e68600';
      ctx.fillRect(x, y, barWidth, barHeight);
      if(i == currentIter) ctx.fillStyle = '#A7C7E7';
    }
  }, [data]);

  return <canvas className='BarChart' ref={canvasRef}></canvas>;
};

export default BarChart;
