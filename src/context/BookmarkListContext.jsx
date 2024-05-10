import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import axios from "axios";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

const intialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: null,
  error: null,
};
function bookmarkReducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        isLoading: false,
        bookmarks: action.payload,
      };
    case "bookmark/loaded":
      return { ...state, isLoading: false, currentBookmark: action.payload };
    case "bookmark/created":
      return {
        ...state,
        isLoading: false,
        bookmarks: [...state.bookmarks, action.payload],
        currentBookmark: action.payload,
      };
    case "bookmark/delete":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter(
          (item) => item.id !== action.payload
        ),
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      throw new error("unkonw action");
  }
}
function BokmarkListProvider({ children }) {
  //   const [currentBookmark, setCurrentBookmark] = useState({});
  // const [bookmarks,setBookmarks] = useState([])
  // const [isLoading,setIsLoading] = useState(false)

  const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    intialState
  );

  useEffect(() => {
    async function fetchBookmarkList() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        dispatch({
          type: "rejected",
          payload: "an Error in loading bookmarks",
        });
      }
    }
    fetchBookmarkList()
  }, []);

  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/delete", payload: id });
    } catch (error) {
      console.log(err);
      dispatch({
        type: "rejected",
        payload: "an Error in delete bookmarks",
      });
    }
  }
  async function getBookmark(id) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
     
    } catch (error) {
      console.log(err);
      dispatch({
        type: "rejected",
        payload: "an Error in loading single bookmarks",
      });
    }
  }
  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);
      dispatch({ type: "bookmark/created", payload: data });
    } catch (error) {
      
      dispatch({
        type: "rejected",
        payload: "an Error in loading single bookmarks",
      });
    }
  }
  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        getBookmark,
        deleteBookmark,
        currentBookmark,
        createBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BokmarkListProvider;

export function useBookmark() {
  return useContext(BookmarkContext);
}
