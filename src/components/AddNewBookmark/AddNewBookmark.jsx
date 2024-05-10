import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import axios from "axios";
import { useBookmark } from "../../context/BookmarkListContext";

const BACE_URL_GEOCODING =
  "https://api.bigdatacloud.net/data/reverse-geocode-client";
function AddNewBookmark() {
  const [lat, lng] = useUrlLocation();
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const {createBookmark} = useBookmark()
  useEffect(() => {
    if (!lat || !lng) return;
    async function getLocation() {
      try {
        const { data } = await axios.get(
          `${BACE_URL_GEOCODING}?latitude=${lat}&longitude=${lng}`
        );

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {}
    }
    getLocation();
  }, [lat, lng]);

  const handleSubmit =async (e) => {
    e.preventDefault();
    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + " " + country,
    };
    await createBookmark(newBookmark)
    navigate("/bookmark")
  };
  return (
    <div>
      <h2>Add New Bookmark</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
        <label htmlFor="cityName">CityName</label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            name="cityName"
            id="cityName"
          />
        </div>
        <div className="formControl">
        <label htmlFor="country">Country</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            name="country"
            id="country"
          />
        </div>
        <div className="buttons">
          <button
            onClick={(e) => {
              e.preventDefault();
              navigate(-1);
            }}
            className="btn btn--back"
          >
            &larr; Back
          </button>
          <button type="submit" className="btn btn--primary">
            {" "}
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
