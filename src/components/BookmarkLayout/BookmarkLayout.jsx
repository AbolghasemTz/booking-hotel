import React from 'react'
import Map from '../Map/Map'
import { Outlet } from 'react-router-dom'
import { useBookmark } from '../../context/BookmarkListContext'
import Bookmark from '../Bookmark/Bookmark'

function BookmarkLayout() {

  return (
    <div className='appLayout'>
      <div className="sidebar">
        <Outlet />
        
      </div>
     <Map markerLocation={[]}/>
    </div>
  )
}

export default BookmarkLayout
