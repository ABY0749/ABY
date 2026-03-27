import { useEffect, useState } from 'react';

const BookingConfirmation = ({ data, onClose, status }) => {
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

  const isSuccess = status === 'success';

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
          width: '80px', 
          height: '80px', 
          borderRadius: '50%', 
          background: isSuccess ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
          color: isSuccess ? '#22c55e' : '#ef4444',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 2rem',
          fontSize: '3rem',
          boxShadow: isSuccess ? '0 0 30px rgba(34, 197, 94, 0.2)' : '0 0 30px rgba(239, 68, 68, 0.2)'
        }}>
          {isSuccess ? '✓' : '✕'}
        </div>

        <h3 style={{ fontSize: '2rem', fontWeight: '700', marginBottom: '1rem', color: 'white' }}>
          {isSuccess ? 'Booking Accepted!' : 'Unavailable'}
        </h3>
        
        {isSuccess ? (
          <div style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            <p style={{ marginBottom: '1rem' }}>Thank you, <strong style={{color: 'white'}}>{data.name}</strong>. Your stay has been successfully confirmed.</p>
            <div style={{ background: 'rgba(0,0,0,0.3)', padding: '1rem', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '0.5rem', textAlign: 'left', border: '1px solid var(--surface-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Hotel:</span>
                <strong style={{color: 'white'}}>{data.hotelName}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Check-in:</span>
                <strong style={{color: 'white'}}>{new Date(data.checkIn).toLocaleDateString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Check-out:</span>
                <strong style={{color: 'white'}}>{new Date(data.checkOut).toLocaleDateString()}</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Rooms:</span>
                <strong style={{color: 'white'}}>{data.rooms}</strong>
              </div>
            </div>
          </div>
        ) : (
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2.5rem', lineHeight: '1.6' }}>
            We're sorry, but there are no available rooms for the selected dates. Please try adjusting your dates or checking our recommended hotels nearby.
          </p>
        )}

        <button onClick={handleClose} className="btn-primary" style={{ background: isSuccess ? 'linear-gradient(135deg, #22c55e, #16a34a)' : 'linear-gradient(135deg, var(--surface-border), rgba(255,255,255,0.1))', color: 'white', boxShadow: isSuccess ? '0 0 20px rgba(34,197,94,0.3)' : 'none' }}>
          {isSuccess ? 'View Details' : 'Try Again'}
        </button>
      </div>
    </div>
  );
};

export default BookingConfirmation;
