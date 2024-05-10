import React from "react";
import { useBookmark } from "../../context/BookmarkListContext";
import ReactCountryFlag from "react-country-flag";
import { Link } from "react-router-dom";
function Bookmark() {
  const { deleteBookmark, bookmarks, currentBookmark } = useBookmark();
  const handleDelete = async (e,id) => {
    e.preventDefault()
    console.log(id);
   await deleteBookmark(id)
  }

  if(!bookmarks.length)return <p>there is no bookmarked location</p>
  return (
    <div>
      <h2>Bookmark List</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
            <Link
              key={item.id}
              to={`${item.id}?lat=${item.latitude}&lng=${item.longitude}`}
            >
              <div
                className={`bookmarkItem ${
                  item.id === currentBookmark.id ? "current-bookmark" : ""
                }`}
              >
               <div>
               <ReactCountryFlag countryCode={item.countryCode} svg />
                &nbsp; <strong>{item.cityName}</strong> &nbsp;
                <span>{item.country}</span>
              </div>
              <button onClick={(e) => handleDelete(e,item.id)} className="">dell</button>
               </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
