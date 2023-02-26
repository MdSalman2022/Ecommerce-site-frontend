import React, { PureComponent } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: 'February, 2022',
    sells: 60000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'March, 2022',
    sells: 45000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'April, 2022',
    sells: 120000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'May, 2022',
    sells: 40000,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'June, 2022',
    sells: 95000,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'July, 2022',
    sells: 40000,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'August, 2022',
    sells: 45000,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'September, 2022',
    sells: 45000,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'October, 2022',
    sells: 75000,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'November, 2022',
    sells: 60000,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'December, 2022',
    sells: 80000,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'January, 2023',
    sells: 68000,
    pv: 4300,
    amt: 2100,
  },
  {
    name: 'February, 2023',
    sells: 75000,
    pv: 4300,
    amt: 2100,
  },
];

export default class AreaCharts extends PureComponent {
  static demoUrl = 'https://codesandbox.io/s/synchronized-area-chart-kpg1s';

  render() {
    return (
      <div style={{ width: '100%' }}> 
        <ResponsiveContainer width="100%" height={350}>
          <AreaChart
            width={500}
            height={200}
            data={data}
            syncId="anyId"
            margin={{
              top: 10,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="0 3" />
            <XAxis dataKey="name" />
            <YAxis /> 
            <Tooltip />
            <defs>
              <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="55%" stopColor="#4E7AEF" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#4E7AEF" stopOpacity={0} />
              </linearGradient>
            </defs>
            <Area type="monotone" dataKey="sells" stroke="#4E7AEF" strokeWidth={4} fill="url(#gradient)" />
          </AreaChart>
        </ResponsiveContainer> 
      </div>
    );
  }
}
