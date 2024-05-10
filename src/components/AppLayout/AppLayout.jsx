import React from 'react'
import { Outlet } from 'react-router-dom'
import Map from '../Map/Map'
import { useHotels } from '../../context/HotelProviders'

function AppLayout() {
  const {hotels} = useHotels()

  return (
    <div className='appLayout'>
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocation={hotels}/>
    </div>
  )
}

export default AppLayout
