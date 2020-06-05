import React from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import "./styles.scss"

export default props => {

  const data = [
  {
    name: 'Revenue', uv: 4000, output: 2400, amt: 2400,
  },
  {
    name: 'Revenue', uv: 3000, output: 1398, amt: 2210,
  },
  {
    name: 'Revenue', uv: 2000, output: 9800, amt: 2290,
  },
  {
    name: 'Revenue', uv: 2780, output: 3908, amt: 2000,
  },
  {
    name: 'Revenue', uv: 1890, output: 4800, amt: 2181,
  },
  {
    name: 'Revenue', uv: 2390, output: 3800, amt: 2500,
  },
  {
    name: 'Revenue', uv: 3490, output: 4300, amt: 2100,
  },
];

    return (
      <div className="chartContainer">
         <LineChart
        width={1000}
        height={400}
        data={data}
        margin={{
          top: 5, right: 30, left: 20, bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="output" stroke="#000000" activeDot={{ r: 8 }} />
      </LineChart>
        </div>
     
    );
  
}
