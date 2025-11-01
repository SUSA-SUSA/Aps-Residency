import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { io } from 'socket.io-client';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import SearchBar from '../Components/SearchBar';
import RoomCard from '../Components/RoomCard';
import GuestForm from '../Components/GuestForm';
import PaymentSection from '../Components/PaymentSection';
import ReservationSummary from '../Components/ReservationSummary';

const Rooms = () => {
  // Search state
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState(1);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);

  // Booking state
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [guestInfo, setGuestInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    city: '',
    country: '',
  });
  const [paymentMethod, setPaymentMethod] = useState('');
  const [paymentProofFile, setPaymentProofFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmationId, setConfirmationId] = useState('');

  // Data state
  const [roomsData, setRoomsData] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [unavailableRooms, setUnavailableRooms] = useState([]);
  const [soldOutRooms, setSoldOutRooms] = useState([]);
  const [roomsLoading, setRoomsLoading] = useState(true);
  const [roomsError, setRoomsError] = useState(null);
  const [socket, setSocket] = useState(null);

  // Hotel data state
  const [hotel, setHotel] = useState(null);
  const [hotelLoading, setHotelLoading] = useState(true);
  const [hotelError, setHotelError] = useState(null);

  const hotelId = import.meta.env.VITE_HOTEL_ID;
  const apiBase = import.meta.env.VITE_API_BASE;

  // Generate confirmation ID
  const generateConfirmationId = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < 8; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  };

  // Fetch rooms
  const fetchRooms = async (checkInDate, checkOutDate) => {
    try {
      const params = new URLSearchParams();
      if (checkInDate) params.append('checkIn', checkInDate);
      if (checkOutDate) params.append('checkOut', checkOutDate);

      const res = await axios.get(`${apiBase}/rooms/hotel/${hotelId}`, { params });
      setRoomsData(res.data);
      setRoomsError(null);
    } catch (err) {
      setRoomsError(err.response?.data?.message || 'Failed to fetch rooms');
    } finally {
      setRoomsLoading(false);
    }
  };

  // Fetch hotel
  const fetchHotel = async () => {
    try {
      setHotelLoading(true);
      setHotelError(null);
      const res = await axios.get(`${apiBase}/hotel/${hotelId}`);
      setHotel(res.data);
    } catch (err) {
      setHotelError(err.response?.data?.message || 'Failed to fetch hotel');
    } finally {
      setHotelLoading(false);
    }
  };

  // Socket.IO connection
  useEffect(() => {
    const newSocket = io(apiBase);
    setSocket(newSocket);

    newSocket.on('roomCreated', (data) => {
      if (data.hotelId === hotelId) {
        alert('New room added! Room inventory has been updated.');
        fetchRooms(checkIn, checkOut);
      }
    });

    newSocket.on('roomUpdated', (data) => {
      if (data.hotelId === hotelId) {
        alert('Room updated! Room information has been updated.');
        fetchRooms(checkIn, checkOut);
      }
    });

    newSocket.on('roomDeleted', (data) => {
      if (data.hotelId === hotelId) {
        alert('Room removed! A room has been removed from inventory.');
        fetchRooms(checkIn, checkOut);
      }
    });

    return () => {
      newSocket.close();
    };
  }, [hotelId, apiBase, checkIn, checkOut]);

  // Filter rooms based on guests
  useEffect(() => {
    const totalGuests = adults + children;
    const availableRooms = roomsData.filter(
      (room) => room.availability === 'Available' && room.maxGuests >= totalGuests && (room.availableCount || 0) >= rooms
    );
    const unavailableRooms = roomsData.filter(
      (room) => room.availability === 'Available' && room.maxGuests >= totalGuests && (room.availableCount || 0) < rooms && (room.availableCount || 0) > 0
    );
    const soldOutRooms = roomsData.filter(
      (room) => room.availability === 'Available' && room.maxGuests >= totalGuests && (room.availableCount || 0) === 0
    );
    setFilteredRooms(availableRooms);
    setUnavailableRooms(unavailableRooms);
    setSoldOutRooms(soldOutRooms);
  }, [roomsData, adults, children, rooms]);

  // Auto-refresh rooms
  useEffect(() => {
    if (checkIn && checkOut) {
      fetchRooms(checkIn, checkOut);
    }

    const interval = setInterval(() => {
      if (checkIn && checkOut) {
        fetchRooms(checkIn, checkOut);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [checkIn, checkOut]);

  // Set default dates
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    setCheckIn(today.toISOString().split('T')[0]);
    setCheckOut(tomorrow.toISOString().split('T')[0]);
  }, []);

  // Fetch hotel on mount
  useEffect(() => {
    fetchHotel();
  }, [hotelId]);

  // Calculations
  const calculateNights = () => {
    if (checkIn && checkOut) {
      const start = new Date(checkIn);
      const end = new Date(checkOut);
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 1;
  };

  const nights = calculateNights();
  const roomPrice = selectedRoom?.pricePerNight || 0;
  const roomCharges = roomPrice * nights * rooms;
  const adultCharges = selectedRoom ? adults * (selectedRoom.perAdultPrice || 0) : 0;
  const childCharges = selectedRoom ? children * (selectedRoom.perChildPrice || 0) : 0;
  const guestCharges = adultCharges + childCharges;
  const subtotal = roomCharges + guestCharges;
  const taxPercentage = selectedRoom?.taxPercentage || 18;
  const taxes = Math.round(subtotal * (taxPercentage / 100));
  const discount = 0;
  const total = subtotal + taxes - discount;

  const handleSearch = () => {
    if (!checkIn || !checkOut) {
      alert('Please select dates');
      return;
    }
    setRoomsLoading(true);
    fetchRooms(checkIn, checkOut);
  };

  const handleBookNow = (roomId) => {
    const room = roomsData.find(r => r._id === roomId);
    if (room) {
      setSelectedRoom(room);
      document.getElementById('booking-section')?.scrollIntoView({ behavior: 'smooth' });
      alert(`Room selected! ${room.type} has been selected. Please fill in your details below.`);
    }
  };

  const handleMakePayment = async () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'city', 'country'];
    const missingFields = requiredFields.filter(field => !guestInfo[field]);

    if (missingFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }

    if (!selectedRoom) {
      alert('Please select a room');
      return;
    }

    if (!paymentProofFile) {
      alert('Please upload payment proof');
      return;
    }

    setIsProcessing(true);

    try {
      const formData = new FormData();

      formData.append('guestDetails', JSON.stringify(guestInfo));
      formData.append('roomDetails', JSON.stringify({
        roomId: selectedRoom._id || '',
        roomType: selectedRoom.type || '',
        pricePerNight: selectedRoom.pricePerNight || 0,
        maxGuests: selectedRoom.maxGuests || 0,
        bedType: selectedRoom.bedType || '',
        roomSize: selectedRoom.roomSize || '',
      }));
      formData.append('bookingDetails', JSON.stringify({
        checkIn,
        checkOut,
        numberOfRooms: rooms,
        numberOfAdults: adults,
        numberOfChildren: children,
        numberOfNights: nights,
        hotelId,
      }));
      formData.append('amountDetails', JSON.stringify({
        roomCharges,
        guestCharges,
        subtotal,
        taxesAndFees: taxes,
        discount,
        grandTotal: total,
        currency: 'INR',
      }));
      formData.append('paymentDetails', JSON.stringify({
        paymentMethod: paymentMethod || 'UPI',
        paymentStatus: 'pending',
        transactionId: `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        paymentDate: new Date().toISOString(),
      }));
      formData.append('paymentProof', paymentProofFile);
      formData.append('bookingMetadata', JSON.stringify({
        bookingDate: new Date().toISOString(),
        bookingSource: 'web',
        userAgent: navigator.userAgent,
        ipAddress: 'unknown',
        frontendConfirmationId: generateConfirmationId(),
      }));

      const response = await axios.post(`${apiBase}/guests/create`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 30000,
      });

      const receivedConfirmationId = response.data.confirmationId || response.data.bookingId || response.data.id || generateConfirmationId();
      setConfirmationId(receivedConfirmationId);
      alert(`Booking Confirmed! Confirmation ID: ${receivedConfirmationId}`);

      // Reset form
      setSelectedRoom(null);
      setGuestInfo({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        city: '',
        country: '',
      });
      setPaymentMethod('');
      setPaymentProofFile(null);
      setCheckIn('');
      setCheckOut('');
      setRooms(1);
      setAdults(2);
      setChildren(0);
    } catch (error) {
      let errorMessage = 'There was an error processing your booking. Please try again.';
      if (error.response) {
        errorMessage = error.response.data?.message || error.response.data?.error || errorMessage;
      } else if (error.request) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection.';
      } else {
        errorMessage = error.message || errorMessage;
      }
      alert(`Booking failed: ${errorMessage}`);
    } finally {
      setIsProcessing(false);
    }
  };

  const maxAvailableRooms = Math.max(...roomsData.map(r => r.availableCount || 0), 0);

  return (
    <>
      {/* Hero Section */}
      <section id="rooms" className="py-5 bg-white text-center">
        <div className="container">
          <h2 className="display-4 mb-4" style={{ color: '#A37D4C' }}>Our Rooms</h2>
          <p className="text-muted mb-5">
            Discover our luxurious rooms designed for your comfort and relaxation.
          </p>

          {/* Search Bar */}
          <div className="card shadow-sm p-4" style={{ borderRadius: "12px" }}>
  <div className="row g-3 align-items-end">

    {/* ✅ Check-in */}
    <div className="col-12 col-md-3">
      <label className="form-label fw-semibold">Check-in</label>
      <input
        type="date"
        className="form-control"
        value={checkIn}
        onChange={(e) => setCheckIn(e.target.value)}
        style={{ borderRadius: "8px", padding: "10px" }}
      />
    </div>

    {/* ✅ Check-out */}
    <div className="col-12 col-md-3">
      <label className="form-label fw-semibold">Check-out</label>
      <input
        type="date"
        className="form-control"
        value={checkOut}
        onChange={(e) => setCheckOut(e.target.value)}
        style={{ borderRadius: "8px", padding: "10px" }}
      />
    </div>

    {/* ✅ Rooms */}
    <div className="col-6 col-md-2">
      <label className="form-label fw-semibold">Rooms</label>
      <div className="input-group">
        <button
          className="btn btn-outline-secondary"
          onClick={() => setRooms(Math.max(1, rooms - 1))}
          style={{ borderRadius: "6px 0 0 6px" }}
        >
          –
        </button>
        <input
          type="text"
          value={rooms}
          readOnly
          className="form-control text-center"
          style={{ borderRadius: "0" }}
        />
        <button
          className="btn btn-outline-secondary"
          onClick={() => setRooms(rooms + 1)}
          style={{ borderRadius: "0 6px 6px 0" }}
        >
          +
        </button>
      </div>
    </div>

    {/* ✅ Adults */}
    <div className="col-6 col-md-2">
      <label className="form-label fw-semibold">Adults</label>
      <input
        type="number"
        className="form-control text-center"
        min="1"
        value={adults}
        onChange={(e) => setAdults(Number(e.target.value))}
        style={{ borderRadius: "8px", padding: "10px" }}
      />
    </div>

    {/* ✅ Children */}
    <div className="col-6 col-md-2">
      <label className="form-label fw-semibold">Children</label>
      <input
        type="number"
        className="form-control text-center"
        min="0"
        value={children}
        onChange={(e) => setChildren(Number(e.target.value))}
        style={{ borderRadius: "8px", padding: "10px" }}
      />
    </div>

    {/* ✅ Button */}
    <div className="col-12 col-md-2 d-flex justify-content-center">
  <button
    className="btn btn-primary w-100"
    onClick={handleSearch}
    style={{
      padding: "10px",
      borderRadius: "8px",
      fontWeight: "600",
      fontSize: "0.95rem",
      marginTop: "2px",
      maxWidth: "180px",
      backgroundColor: "#A37D4C" // Optional: so it doesn't stretch too wide
    }}
  >
    Check Availability
  </button>
</div>


  </div>
</div>

        </div>
      </section>

      {/* Room Listings */}
      {/* Room Listings */}
<section className="py-5" style={{ background: "#f9f9f9" }}>
  <div className="container">

    {roomsLoading ? (
      <div className="text-center py-5">
        <div className="spinner-border" role="status"></div>
        <p className="mt-3">Loading rooms...</p>
      </div>
    ) : roomsError ? (
      <div className="alert alert-danger text-center">{roomsError}</div>
    ) : (filteredRooms.length > 0 || unavailableRooms.length > 0 || soldOutRooms.length > 0) ? (

      <>
        <h3 className="text-center mb-4" style={{color:"#A37D4C", fontWeight:"600"}}>
          Available Rooms
        </h3>

        <div className="row g-4 justify-content-center">

          {/* ✅ Fully Available */}
          {filteredRooms.map((room) => (
            <div key={room._id} className="col-12 col-md-6 col-lg-4">
              <RoomCard
                id={room._id}
                name={room.type}
                images={[room.image || '/assets/placeholder-room.jpg']}
                description={room.type}
                roomDescription={`${room.type} - Room Size: ${room.roomSize || 'N/A'}`}
                price={room.pricePerNight}
                originalPrice={null}
                features={['Wi-Fi', 'Parking', 'Breakfast']}
                capacity={room.maxGuests || 2}
                bedType={room.bedType || 'King'}
                isPopular={false}
                availableCount={room.availableCount || 0}
                isUnavailable={false}
                isSoldOut={false}
                onBookNow={handleBookNow}
              />
            </div>
          ))}

          {/* ✅ Limited rooms left */}
          {unavailableRooms.map((room) => (
            <div key={room._id} className="col-12 col-md-6 col-lg-4">
              <div className="card shadow-sm h-100 border-warning border">
                <img src={room.image || '/assets/placeholder-room.jpg'} className="card-img-top" alt={room.type} />
                <div className="card-body">
                  <h5 className="card-title">{room.type}</h5>
                  <p className="text-muted small">Limited rooms left!</p>
                  <p className="fw-bold text-warning">Only {room.availableCount} available</p>
                </div>
              </div>
            </div>
          ))}

          {/* ✅ Sold Out */}
          {soldOutRooms.map((room) => (
            <div key={room._id} className="col-12 col-md-6 col-lg-4">
              <div className="card shadow-sm h-100 border-danger border">
                <img src={room.image || '/assets/placeholder-room.jpg'} className="card-img-top grayscale" alt={room.type} />
                <div className="card-body">
                  <h5 className="card-title">{room.type}</h5>
                  <span className="badge bg-danger w-100 py-2">Sold Out</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>

    ) : (
      <div className="text-center">
        <h4>No rooms available for the selected dates.</h4>
        <p className="text-muted">Try changing your search filters.</p>
      </div>
    )}

  </div>
</section>


      {/* Booking Section */}
      {selectedRoom && (
        <section id="booking-section" className="py-5 bg-white">
          <div className="container">
            <h3 className="text-center mb-4" style={{ color: '#A37D4C' }}>Complete Your Booking</h3>

            <div className="row">
              <div className="col-lg-8">
                {/* Payment Section */}
                <PaymentSection
                  paymentMethod={paymentMethod}
                  onPaymentMethodChange={setPaymentMethod}
                  onMakePayment={handleMakePayment}
                  isProcessing={isProcessing}
                  total={total}
                />

                {/* Guest Form */}
                <GuestForm
                  guestInfo={guestInfo}
                  onGuestInfoChange={setGuestInfo}
                  paymentProofFile={paymentProofFile}
                  onPaymentProofChange={setPaymentProofFile}
                />
              </div>

              {/* Reservation Summary Sidebar */}
              <div className="col-lg-4">
                <ReservationSummary
                  roomPrice={roomPrice}
                  nights={nights}
                  discount={discount}
                  roomCount={rooms}
                  selectedRoom={selectedRoom}
                  guestInfo={guestInfo}
                  checkIn={checkIn}
                  checkOut={checkOut}
                  adults={adults}
                  children={children}
                  paymentMethod={paymentMethod}
                  paymentProofFile={paymentProofFile}
                  hotelId={hotelId}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hotel Information */}
      
    </>
  );
};

export default Rooms;
