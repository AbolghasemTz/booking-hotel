import React, { useEffect } from "react";
import { useBookmark } from "../../context/BookmarkListContext";
import { useNavigate, useParams } from "react-router-dom";

function SingleBookmrk() {
  const { id } = useParams();
  const navigate = useNavigate()
  const { getBookmark, isLoading, currentBookmark } =
    useBookmark();

  useEffect(() => {
    getBookmark(id);
  }, [id]);

  if(isLoading ||  !currentBookmark) return <p>Loading...</p>
  return <div>
    <h2>Single Hotel</h2>
    <button onClick={()=> navigate(-1)} className="btn btn--back">&larr; Back</button>
    {
     currentBookmark.cityName
    }
  </div>;
}

export default SingleBookmrk;
