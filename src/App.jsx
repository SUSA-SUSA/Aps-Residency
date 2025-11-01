import './App.css'
import Navbar from "./Components/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from "./Pages/Home"
import Amenities from "./Pages/Amenities"
import Gallery from "./Pages/Gallery"
import Contact from "./Pages/Contact"
import Rooms from "./Pages/Rooms"
import ErrorBoundary from "./Components/ErrorBoundary";
import { Routes, Route } from "react-router-dom"
import Footer from './Components/Footer';
import Roomsslide from "../src/Pages/Roomsslide"
// import Booking from './Pages/Booking';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Roomsslide/>
              {/* <Booking/> */}
              <Amenities />
              <Gallery />
              <Contact />
            </>
          }
        />
        <Route
          path="/rooms"
          element={
            <ErrorBoundary>
              <Rooms />
            </ErrorBoundary>
          }
        />
      </Routes>
      <Footer/>
    </>
  )
}

export default App
