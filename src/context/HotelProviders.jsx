import React, { createContext, useContext, useState } from "react";
import { useSearchParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import axios from "axios";

const HotelContext = createContext();
const BASE_URL = "http://localhost:5000/hotels"
function HotelProviders({ children }) {
  const [serachParams, setSearchParams] = useSearchParams();
  const destination = serachParams.get("destination");
  const room = JSON.parse(serachParams.get("options"))?.room;
  const [currentHotel,setCurrentHotel] = useState({})
  const [isLoadingCurrentHotel,setIsLoadingCurrentHotel] = useState(false)
  const { isLoading, data: hotels } = useFetch(
   BASE_URL,
    `q=${destination || ""} &accommodates_gte=${room || 1}`
  );

  async function getHotel(id){
    setIsLoadingCurrentHotel(true)
    try {
      const {data} = await axios.get(`${BASE_URL}/${id}`)
      setCurrentHotel(data)
      setIsLoadingCurrentHotel(false)

    } catch (error) {
      console.log(err);
      setIsLoadingCurrentHotel(false)

    }
  }
  return (
    <HotelContext.Provider value={{ isLoading, hotels,getHotel,isLoadingCurrentHotel ,currentHotel }}>
      {children}
    </HotelContext.Provider>
  );
}

export default HotelProviders;

export function useHotels() {
  return useContext(HotelContext);
}
