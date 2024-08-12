'use client'

import { useRef } from "react"

// import { Chart } from "chart.js/auto";

import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
export default function LineChart() {
 // console.log(props.countTree)
  const ref = useRef();
  const data = {

    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'First dataset',
        data: [33, 53, 85, 41, 44, 65],
        fill: false,
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
      <h2 className=" ">Weekly Sales</h2>
      <div className="w-[1100px] h-screen flex mx-auto my-auto">
        <div className='border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl'>
          {/* <canvas id='myLineChart' ref={ref} data={myChart}></canvas> */}
          <Line ref={ref} data={data} />
        </div>
      </div>
    </>
  )
} 