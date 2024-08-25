import React from 'react'
import { useSelector } from 'react-redux';
import DashboardSidebar from '../components/DashboardSidebar';
import Analytics from '../components/Analytics';
import Order from '../components/Order';
import PhotosPurchased from '../components/buyer/PhotosPurchased';
import Favourites from '../components/Favourites';

function BuyerDashboard() {
  const tab = useSelector(state => state.nav.tab);

  return (
    <section className='seller-dashboard'>
      <DashboardSidebar/>
      <div className='master-container1'>
      {
        (() => {
          switch (tab) {
            case "photos-purchased":
              return <PhotosPurchased/>
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
              return <PhotosPurchased/>
              break;
          }
        })()
      }
      </div>
    </section>
  )
}

export default BuyerDashboard;
