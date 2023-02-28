import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'February, 2022', 
    Completed: 550,
    Received: 600, 
  },
  {
    name: 'March, 2022',
    sells: 450,
    Completed: 450,
    Received: 400,  
  },
  {
    name: 'April, 2022',
    sells: 1200,
    Completed: 1200,
    Received: 1100,
    amt: 2290,
  },
  {
    name: 'May, 2022',
    sells: 400,
    Completed: 380,
    Received: 400,
  },
  {
    name: 'June, 2022',
    sells: 950,
    Completed: 900,
    Received: 950,
  },
  {
    name: 'July, 2022',
    sells: 400,
    Completed: 350,
    Received: 400,
  },
  {
    name: 'August, 2022',
    sells: 450,
    Completed: 400,
    Received: 450,
  },
  {
    name: 'September, 2022',
    sells: 450,
    Completed: 400,
    Received: 450,
  },
  {
    name: 'October, 2022',
    sells: 750,
    Completed: 655,
    Received: 750,
  },
  {
    name: 'November, 2022',
    sells: 600,
    Completed: 500,
    Received: 600,
  },
  {
    name: 'December, 2022',
    sells: 800,
    Completed: 700,
    Received: 800,
  },
  {
    name: 'January, 2023',
    sells: 680,
    Completed: 650,
    Received: 680,
  },
  {
    name: 'February, 2023',
    sells: 850,
    Completed: 790,
    Received: 850, 
  },
];


export default class BarCharts extends PureComponent {
 

  render() {
    return (
      <div style={{ width: '100%' }} className="overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        > 
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Completed" fill="#4E7AEF" />
          <Bar dataKey="Received" fill="#304B97" />
        </BarChart>
      </ResponsiveContainer>
      </div>
    );
  }
}

