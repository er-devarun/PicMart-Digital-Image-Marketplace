import React from 'react'
import DashboardSidebar from '../components/DashboardSidebar';
import PhotoManagement from '../components/seller/PhotoManagement';
import Analytics from '../components/Analytics';
import Order from '../components/Order';
import { useSelector } from 'react-redux';
import Favourites from '../components/Favourites';

function SellerDashboard() {
  const tab = useSelector(state => state.nav.tab);
  return (
    <section className='seller-dashboard'>
      <DashboardSidebar/>
      <div className='master-container1'>
      {
        (() => {
          switch (tab) {
            case "photos-management":
              return <PhotoManagement/>
              break;

            case "analytics":
              return <Analytics/>
              break;

            case "orders":
              return <Order/>
              break;

            case "favourites":
              return <Favourites/>
              break;
          
            default:
              return <PhotoManagement/>
              break;
          }
        })()
      }
      </div>
    </section>
  )
}

export default SellerDashboard;
