import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useHotels } from "../../context/HotelProviders";

function Hotels() {
const {isLoading,hotels,currentHotel} = useHotels()

  if (isLoading) <p>Loading ...</p>;
  return (
    <div className="searchList">
      <h2>Search Result {hotels.length}</h2>
      {hotels.map((item) => {
        return (
          <Link
            key={item.id}
            to={`/hotels/${item.id}?lat${item.latitude}&lng${item.longitude}`}
          >
            <div className={`searchItem ${item.id === currentHotel?.id ? "current-hotel": ""}`}>
              <img src={item.picture_url.url} alt={item.name} />
              <div className="searchItemDesc">
                <p className="location">{item.smart_location}</p>
                <p className="name">{item.name}</p>
                <p className="price">
                  €&nbsp;{item.price}&nbsp; <span>night</span>
                </p>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Hotels;
