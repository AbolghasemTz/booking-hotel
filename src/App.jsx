import React from "react";
import "./App.css";
import Header from "./components/Header/Header";
import { Toaster } from "react-hot-toast";
import LocationList from "./components/locationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import HotelProviders from "./context/HotelProviders";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import BokmarkListProvider from "./context/BookmarkListContext";
import Bookmark from "./components/Bookmark/Bookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import SingleBookmrk from "./components/SingleBookmark/SingleBookmrk";
function App() {
  return (
    <div>
      <BokmarkListProvider>
        <HotelProviders>
          <Toaster />
          <Header />
          <Routes>
            <Route path="/" element={<LocationList />} />
            <Route path="/hotels" element={<AppLayout />}>
              <Route index element={<Hotels />} />
              <Route path=":id" element={<SingleHotel />} />
            </Route>
            <Route path="/bookmark" element={<BookmarkLayout />}>
              <Route index element={<Bookmark />} />
              <Route path=":id" element={<SingleBookmrk />} />
              <Route path="add" element={<AddNewBookmark />} />
            </Route>
          </Routes>
        </HotelProviders>
      </BokmarkListProvider>
    </div>
  );
}

export default App;
