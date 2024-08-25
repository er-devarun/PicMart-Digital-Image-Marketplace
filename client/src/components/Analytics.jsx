import React, { useEffect, useState } from "react";
import DashboardHeader from "./DashboardHeader";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { useLocation } from "react-router-dom";
import ExpenseCard from "./ExpenseCard";
import axios from "axios";


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

function Analytics() {
    const {pathname} = useLocation();
    const [dataTillNow, setDataTillNow] = useState([]);
    const [dataThisYear, setDataThisYear] = useState([]);
    const [dataThisMonth, setDataThisMonth] = useState([]);
    const [dataThisWeek, setDataThisWeek] = useState([]);

    async function getPostByDateRange(){
      try {
        const res = await axios.get(import.meta.env.VITE_API_URL + "/post/getPostsByDateRange", 
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
            withCredentials: true,
          }
        )

        const data = await res.data;
        if(data.success == true){
          setDataTillNow(data.data.tillNow);
          setDataThisYear(data.data.thisYear);
          setDataThisMonth(data.data.thisMonth);
          setDataThisWeek(data.data.thisWeek);
        }
      } catch (error) {
        console.error(error);
      }
    }

    useEffect(() => {
      getPostByDateRange();
    }, []);

    const calculateTotalForSeller = (data) => {
      console.log(dataThisYear)
      const value = data.reduce((acc, curr) => {
        const price = curr.price || 0;
        const purchases = curr.purchasedBy ? curr.purchasedBy.length : 0;
        return acc + (price * purchases);
      },0)
      return value;
    }

    const calculateTotalForBuyer = (data) => {
      return data.reduce((acc, curr) => {
        return acc = acc + curr.price;
      },0)
    }

  return (
    <div className="analytics-container">
      <DashboardHeader />
      <h1>Analytics</h1>
      <h3>{pathname == "/seller/profile" ? "Uploaded" : "Purchased"} This Year</h3>

      <div className="analytics">
        <ResponsiveContainer width="100%" height={150}>
            <LineChart margin={{top: 20, bottom:-50, left:-61}} data={dataThisYear}>
                <XAxis dataKey="title" hide/>
                <YAxis/>
                <Tooltip/>
            <Line type="monotone" dataKey="price" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>
        <p>Total {pathname == "/seller/profile" ? "Earned" : "Spent"} : ${pathname == "/seller/profile" ? calculateTotalForSeller(dataThisYear) : calculateTotalForBuyer(dataThisYear)}</p>
      </div>

      {/* 3 expense card */}
      {
        !dataThisMonth?.length ? <h1>No data available</h1> :  (
          <div className="expense-card-container">
            <ExpenseCard data={dataThisMonth} title={pathname == "/seller/profile" ? "Earned This Month" : "Spent This Month"} dataKey="price" value={pathname == "/seller/profile" ? calculateTotalForSeller(dataThisMonth) : calculateTotalForBuyer(dataThisMonth)} pathname={pathname}/>
            <ExpenseCard data={dataThisWeek} title={pathname == "/seller/profile" ? "Earned This Week" : "Spent This Week"} dataKey="price" value={pathname == "/seller/profile" ? calculateTotalForSeller(dataThisWeek) : calculateTotalForBuyer(dataThisWeek)} pathname={pathname}/>
            <ExpenseCard data={dataTillNow} title={pathname == "/seller/profile" ? "Earned Till Now" : "Spent Till Now"} dataKey="price" value={pathname == "/seller/profile" ? calculateTotalForSeller(dataTillNow) : calculateTotalForBuyer(dataTillNow)} pathname={pathname}/>
        </div>
        )
      }
    </div>
  );
}

export default Analytics;
