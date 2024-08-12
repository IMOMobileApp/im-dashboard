'use client'
import { useRef } from "react"
import 'chart.js/auto';
import { Pie } from 'react-chartjs-2';
export default function PieChart() {
  const ref = useRef();
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'First dataset',
        data: [33, 53, 85, 41, 44, 65],
        fill: true,
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)'
      },
      {
        label: 'Second dataset',
        data: [33, 25, 35, 51, 54, 76],
        fill: false,
        borderColor: '#742774',
      },
    ],
  };
  return (
    <>
      {/* line chart */}
      <h2 className= "">Best Selling Products</h2>
      <div className="w-[1100px] h-screen flex mx-auto my-auto">
        <div className='circlechart'>
          {/* <canvas id='myPieChart'></canvas> */}
          <Pie ref={ref} data={data} />
        </div>
      </div>
    </>
  )

}

 