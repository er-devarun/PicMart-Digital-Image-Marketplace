import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setOrders } from '../store/slices/orderSlice';
import toast from 'react-hot-toast';
import DashboardHeader from './DashboardHeader';

function Order() {
    const orderList = useSelector(state => state.order.orders);
    const role = useSelector(state => state.auth.role);
    const dispatch = useDispatch();
    console.log(orderList);

    function convertDate(date){
        return date.split("T")[0];
    }

    const getOrders = async () => {
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL + "/orders/get", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("accessToken"),
                }
            })
    
            const data = res.data;
            if(data.success == true){
                dispatch(setOrders(data.data));
            }
        } catch (error) {
            // toast.error(error.response.data.message);
            console.log("Order Data Error ", error)
        }
    }

    useEffect(() => {
        getOrders();
    }, [])

  return (
    <div>
      <DashboardHeader/>
      <h1>Orders</h1>
      <div className='order-table-container'>
        <table className='order-table'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Item</th>
                    <th>{role == "seller" ? "Purchaser" : "Author"} Name</th>
                    <th>Date</th>
                    <th>Price</th>
                </tr>
            </thead>
            <tbody>
                {orderList?.map(order => (
                    <tr>
                        <td>{order.razorpayOrderId}</td>
                        <td>{order.title}</td>
                        <td>{ role == "buyer" ? order.author.charAt(0).toUpperCase() + order.author.slice(1) : order.purchaser.charAt(0).toUpperCase() + order.purchaser.slice(1)}</td>
                        <td>{convertDate(order.createdAt)}</td>
                        <td>${order.price}</td>
                    </tr>
                    )
                )}
            </tbody>
        </table>
      </div>
    </div>
  )
}

export default Order;
