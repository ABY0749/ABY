import { useEffect, useState } from 'react';

const BookingConfirmation = ({ data, onClose, status, onViewDetails }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Slight delay to trigger animation
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300); // Wait for transition
  };

  const handleViewDetails = () => {
    setIsVisible(false);
    setTimeout(onViewDetails, 300);
  };

  const isSuccess = status === 'success';

  // Calculate total amount
  const calculateTotal = () => {
    if (!data || !data.checkIn || !data.checkOut) return 0;
    
    const checkIn = new Date(data.checkIn);
    const checkOut = new Date(data.checkOut);
    const timeDiff = checkOut.getTime() - checkIn.getTime();
    const nights = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
    
    // Default price is $550 based on DataInitializer and RecommendedHotels
    const pricePerNight = 550; 
    const rooms = parseInt(data.rooms) || 1;
    
    return nights * rooms * pricePerNight;
  };

  const totalAmount = calculateTotal();

  return (
    <div 
      style={{ 
        position: 'fixed', 
        inset: 0, 
        zIndex: 50, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(8px)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease',
        padding: '1rem'
      }}
      onClick={handleClose}
    >
      <div 
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '500px',
          padding: '3rem 2rem',
          textAlign: 'center',
          transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.95) translateY(20px)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          background: 'rgba(30, 41, 59, 0.95)'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ 
          width: '90px', 
          height: '90px', 
          borderRadius: '50%', 
          background: isSuccess ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          color: isSuccess ? '#22c55e' : '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          fontSize: '3.5rem',
          boxShadow: isSuccess ? '0 0 40px rgba(34, 197, 94, 0.3)' : '0 0 40px rgba(239, 68, 68, 0.3)',
          border: `2px solid ${isSuccess ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`
        }}>
          {isSuccess ? '✓' : '✕'}
        </div>

        <h3 style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '1rem', color: 'white', fontFamily: "'Playfair Display', serif" }}>
          {isSuccess ? 'Booking Sent' : 'Unavailable'}
        </h3>
        
        {isSuccess ? (
          <div style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            <p style={{ marginBottom: '1rem' }}>Thank you, <strong style={{color: 'white'}}>{data.name}</strong>. Your request for <strong>{data.status === 'PENDING' ? 'approval' : (data.status || 'booking')}</strong> has been sent to the admin.</p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1.5rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.8rem', textAlign: 'left', border: '1px solid var(--surface-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.9rem' }}>Hotel:</span>
                <strong style={{color: 'white'}}>{data.hotelName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.9rem' }}>Check-in:</span>
                <strong style={{color: 'white'}}>{new Date(data.checkIn).toLocaleDateString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.9rem' }}>Check-out:</span>
                <strong style={{color: 'white'}}>{new Date(data.checkOut).toLocaleDateString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                <span style={{ fontSize: '0.9rem' }}>Rooms:</span>
                <strong style={{color: 'white'}}>{data.rooms}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', alignItems: 'center' }}>
                <span style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--primary)' }}>Total Amount:</span>
                <strong style={{color: 'white', fontSize: '1.4rem', fontWeight: '900'}}>${totalAmount}</strong>
              </div>
            </div>
          </div>
        ) : (
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            We're sorry, but there are no available rooms for the selected dates. Please try adjusting your dates or checking our recommended hotels nearby.
          </p>
        )}

        <button onClick={handleViewDetails} className="btn-primary" style={{ background: isSuccess ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, var(--surface-border), rgba(255,255,255,0.1))', color: 'white', boxShadow: isSuccess ? '0 0 20px rgba(34,197,94,0.3)' : 'none', width: '100%', height: '55px', fontSize: '1.1rem' }}>
          {isSuccess ? 'Confirm & View Status' : 'Try Again'}
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
