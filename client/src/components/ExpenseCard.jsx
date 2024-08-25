import React from 'react'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

function ExpenseCard({data, title, dataKey, value, pathname}) {
  return (
    <div className='expense-container'>
        <h3>{title}</h3>
      <div className="analytics">
        <ResponsiveContainer width="100%" height={150}>
            <LineChart margin={{top: 20, bottom:-50, left:-61}} data={data}>
                <XAxis dataKey="title" hide/>
                <YAxis/>
                <Tooltip/>
            <Line type="monotone" dataKey={dataKey} stroke="#8884d8" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
        <p>Total {pathname == "/seller/profile" ? "Earned" : "Spent"}: ${value}</p>
      </div>
    </div>
  )
}

export default ExpenseCard;
