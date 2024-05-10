import { useState } from "react";

export default function useGeoLocation() {
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState({});
  const [error, setError] = useState(null);

  function getPosition() {
    if(!navigator.geolocation) return setError("your browser does not support geoLocation")
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      () => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setIsLoading(false);
      },
      (error) => {
        setError(error.message);
        setIsLoading(false)
      }
    );
  }
  return {isLoading,error,position,getPosition}
}
