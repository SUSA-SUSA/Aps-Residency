import React, { useState } from 'react';
import axios from 'axios';

const ReservationSummary = ({
  roomPrice,
  nights,
  discount,
  roomCount,
  selectedRoom,
  guestInfo,
  checkIn,
  checkOut,
  adults,
  children,
  paymentMethod,
  paymentProofFile,
  hotelId,
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

  // Calculate room charges
  const roomCharges = roomPrice * nights * roomCount;

  // Calculate guest charges
  const adultCharges = selectedRoom ? adults * (selectedRoom.perAdultPrice || 0) : 0;
  const childCharges = selectedRoom ? children * (selectedRoom.perChildPrice || 0) : 0;
  const guestCharges = adultCharges + childCharges;

  // Calculate subtotal
  const subtotal = roomCharges + guestCharges;

  // Calculate taxes
  const taxPercentage = selectedRoom?.taxPercentage || 18;
  const taxes = Math.round(subtotal * (taxPercentage / 100));

  // Calculate commission
  const commissionPercentage = selectedRoom?.commission || 0;
  const commission = Math.round(subtotal * (commissionPercentage / 100));

  // Calculate grand total
  const total = subtotal + taxes + commission - discount;

  const handleProceedToPay = async () => {
    if (!selectedRoom) {
      alert('Please select a room');
      return;
    }

    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'city', 'country'];
    const missingFields = requiredFields.filter(field => !guestInfo[field]);

    if (missingFields.length > 0) {
      alert('Please fill in all required fields');
      return;
    }

    if (!paymentProofFile) {
      alert('Please upload payment proof');
      return;
    }

    setIsProcessing(true);

    try {
      const formData = new FormData();

      formData.append('guestDetails', JSON.stringify({
        firstName: guestInfo.firstName,
        lastName: guestInfo.lastName,
        email: guestInfo.email,
        phone: guestInfo.phone,
        city: guestInfo.city,
        country: guestInfo.country,
      }));

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
        numberOfRooms: roomCount,
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
      }));

      const response = await axios.post(`${apiBase}/bookings`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 60000,
      });

      const confirmationId = response.data.confirmationId || response.data.bookingId || response.data.id || Date.now().toString().slice(-6);
      setBookingId(confirmationId);
      setShowSuccessModal(true);
    } catch (error) {
      let errorMsg = 'There was an error processing your booking. Please try again.';
      if (error.response) {
        errorMsg = error.response.data?.message || error.response.data?.error || errorMsg;
      } else if (error.request) {
        errorMsg = 'Unable to connect to the server. Please check your internet connection.';
      } else {
        errorMsg = error.message || errorMsg;
      }
      setErrorMessage(errorMsg);
      setShowErrorModal(true);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="card sticky-top">
        <div className="card-header bg-light">
          <h5 className="card-title mb-0">Reservation Summary</h5>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <div className="d-flex justify-content-between">
              <span>Room Rate</span>
              <span>₹{roomPrice.toLocaleString()}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Number of Rooms</span>
              <span>{roomCount}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span>Number of Nights</span>
              <span>{nights}</span>
            </div>
          </div>

          <div className="bg-light p-3 rounded mb-3">
            <div className="d-flex justify-content-between mb-2">
              <span className="fw-medium">Guests</span>
              <span className="fw-medium">{adults + children} Total</span>
            </div>
            <div className="d-flex justify-content-between small">
              <span>Adults: {adults}</span>
              <span>₹{selectedRoom?.perAdultPrice || 0} each</span>
            </div>
            {children > 0 && (
              <div className="d-flex justify-content-between small">
                <span>Children: {children}</span>
                <span>₹{selectedRoom?.perChildPrice || 0} each</span>
              </div>
            )}
            {selectedRoom && (
              <div className="mt-2 pt-2 border-top">
                <div className="d-flex justify-content-between small">
                  <span>Adult charges ({adults} × ₹{selectedRoom.perAdultPrice})</span>
                  <span>₹{adultCharges.toLocaleString()}</span>
                </div>
                {children > 0 && (
                  <div className="d-flex justify-content-between small">
                    <span>Child charges ({children} × ₹{selectedRoom.perChildPrice})</span>
                    <span>₹{childCharges.toLocaleString()}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="d-flex justify-content-between">
            <span>Room Charges</span>
            <span>₹{roomCharges.toLocaleString()}</span>
          </div>

          {guestCharges > 0 && (
            <div className="d-flex justify-content-between">
              <span>Guest Charges</span>
              <span>₹{guestCharges.toLocaleString()}</span>
            </div>
          )}

          <hr />

          <div className="d-flex justify-content-between">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString()}</span>
          </div>

          <div className="d-flex justify-content-between">
            <span>Taxes & Fees ({taxPercentage}%)</span>
            <span>₹{taxes.toLocaleString()}</span>
          </div>

          {commission > 0 && (
            <div className="d-flex justify-content-between">
              <span>Commission ({commissionPercentage}%)</span>
              <span>₹{commission.toLocaleString()}</span>
            </div>
          )}

          {discount > 0 && (
            <div className="d-flex justify-content-between text-success">
              <span>Discount</span>
              <span>-₹{discount.toLocaleString()}</span>
            </div>
          )}

          <hr />

          <div className="d-flex justify-content-between h5">
            <span>Grand Total</span>
            <span className="text-primary">₹{total.toLocaleString()}</span>
          </div>

          <button
            className="btn btn-success w-100 mt-3"
            onClick={handleProceedToPay}
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Complete Booking'}
          </button>
        </div>
      </div>

      {/* Success Modal */}
      <div className={`modal fade ${showSuccessModal ? 'show' : ''}`} style={{ display: showSuccessModal ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-success d-flex align-items-center gap-2">
                <i className="bi bi-check-circle"></i>
                Booking Confirmed!
              </h5>
              <button type="button" className="btn-close" onClick={() => setShowSuccessModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="bg-success bg-opacity-10 p-3 rounded">
                <p className="text-success fw-medium">Confirmation ID: {bookingId}</p>
                <p className="text-success small">Please save this confirmation ID for your records.</p>
              </div>
              <div className="small text-muted mt-3">
                <p><strong>Check-in:</strong> {checkIn}</p>
                <p><strong>Check-out:</strong> {checkOut}</p>
                <p><strong>Room:</strong> {selectedRoom?.type}</p>
                <p><strong>Total Amount:</strong> ₹{total.toLocaleString()}</p>
              </div>
              <button className="btn btn-success w-100 mt-3" onClick={() => setShowSuccessModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Error Modal */}
      <div className={`modal fade ${showErrorModal ? 'show' : ''}`} style={{ display: showErrorModal ? 'block' : 'none' }} tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title text-danger d-flex align-items-center gap-2">
                <i className="bi bi-x-circle"></i>
                Booking Failed
              </h5>
              <button type="button" className="btn-close" onClick={() => setShowErrorModal(false)}></button>
            </div>
            <div className="modal-body">
              <div className="bg-danger bg-opacity-10 p-3 rounded">
                <p className="text-danger">{errorMessage}</p>
              </div>
              <div className="d-flex gap-2 mt-3">
                <button className="btn btn-outline-secondary flex-fill" onClick={() => setShowErrorModal(false)}>
                  Close
                </button>
                <button className="btn btn-success flex-fill" onClick={() => {
                  setShowErrorModal(false);
                  handleProceedToPay();
                }}>
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccessModal && <div className="modal-backdrop fade show" onClick={() => setShowSuccessModal(false)}></div>}
      {showErrorModal && <div className="modal-backdrop fade show" onClick={() => setShowErrorModal(false)}></div>}
    </>
  );
};

export default ReservationSummary;
