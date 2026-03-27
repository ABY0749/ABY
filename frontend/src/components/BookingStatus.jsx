import { useState, useEffect } from 'react';

const BookingStatus = ({ bookingId, onBack, user }) => {
  const [searchType, setSearchType] = useState('name');
  const [searchValue, setSearchValue] = useState(bookingId || '');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [payingId, setPayingId] = useState(null);

  const fetchStatus = (val, type) => {
    if (!val) return;
    setLoading(true);
    setError(null);
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8082';
    const url = type === 'id' 
      ? `${apiUrl}/api/bookings/${val}` 
      : `${apiUrl}/api/bookings/search?name=${encodeURIComponent(val)}`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("No bookings found.");
        return res.json();
      })
      .then(data => {
        const results = Array.isArray(data) ? data : [data];
        setBookings(results.sort((a, b) => b.id - a.id));
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
        setBookings([]);
      });
  };

  useEffect(() => {
    if (bookingId) {
      setSearchType('id');
      setSearchValue(bookingId);
      fetchStatus(bookingId, 'id');
    } else if (user && user.username && user.role !== 'admin') {
      setSearchValue(user.username);
      fetchStatus(user.username, 'name');
    }
  }, [bookingId, user]);

  const handlePayment = (id) => {
    setPayingId(id);
    setTimeout(() => {
        const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8082';
        fetch(`${apiUrl}/api/admin/bookings/${id}/status`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify('PAID')
        })
        .then(() => {
            setPayingId(null);
            fetchStatus(searchValue, searchType);
            alert("Payment Successful! Your stay is now fully confirmed.");
        });
    }, 2000);
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'PAID': return { label: 'PAID & CONFIRMED', color: '#8b5cf6', icon: '💳' };
      case 'ACCEPTED': return { label: 'ACCEPTED - AWAITING PAYMENT', color: '#10b981', icon: '✅' };
      case 'CANCELLED': return { label: 'CANCELLED', color: '#ef4444', icon: '✕' };
      case 'NOT_AVAILABLE': return { label: 'NOT AVAILABLE', color: '#f59e0b', icon: '⚠️' };
      default: return { label: 'AWAITING ADMIN APPROVAL', color: '#94a3b8', icon: '⌛' };
    }
  };

  return (
    <div className="animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem' }}>
      <button onClick={onBack} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
        ← Back to Home
      </button>

      <div className="glass-panel scroll-reveal" style={{ padding: '3rem 2rem', marginBottom: '4rem', textAlign: 'center', boxShadow: '0 40px 80px -20px rgba(0,0,0,0.6)' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '950', marginBottom: '1.5rem', color: 'white', fontFamily: "'Playfair Display', serif" }}>Luxury Reservation Status</h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button onClick={() => setSearchType('name')} style={{ padding: '8px 20px', borderRadius: '30px', border: '1px solid var(--glass-border)', background: searchType === 'name' ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>By Guest Name</button>
          <button onClick={() => setSearchType('id')} style={{ padding: '8px 20px', borderRadius: '30px', border: '1px solid var(--glass-border)', background: searchType === 'id' ? 'var(--primary)' : 'rgba(255,255,255,0.05)', color: 'white', cursor: 'pointer', fontWeight: 'bold' }}>By Booking ID</button>
        </div>

        <div style={{ background: 'rgba(0,0,0,0.2)', padding: '2rem', borderRadius: '15px', border: '1px solid var(--glass-border)' }}>
          <form onSubmit={(e) => { e.preventDefault(); fetchStatus(searchValue, searchType); }} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ textAlign: 'left' }}>
              <label style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginLeft: '12px', marginBottom: '8px', display: 'block' }}>
                {searchType === 'id' ? 'BOOKING REFERENCE ID' : 'GUEST FULL NAME'}
              </label>
              <input 
                type={searchType === 'id' ? 'number' : 'text'}
                placeholder={searchType === 'id' ? "e.g. 101" : "e.g. John Doe"} 
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                className="input-field"
                style={{ fontSize: '1.1rem', padding: '15px 20px' }}
                required
              />
            </div>
            <button type="submit" className="btn-primary" style={{ padding: '15px', fontSize: '1.1rem', fontWeight: '800' }}>
              SEARCH RECORDS 🚀
            </button>
          </form>
        </div>
      </div>

      {loading && <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--primary)', fontWeight: 'bold' }}>Loading History...</div>}
      
      {bookings.length > 0 && !loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          {bookings.map(booking => {
            const info = getStatusInfo(booking.status);
            return (
              <div key={booking.id} className="glass-panel scroll-reveal" style={{ padding: '3rem', borderLeft: `8px solid ${info.color}`, position: 'relative', transition: 'all 0.3s ease' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '2.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '0.5rem', fontFamily: "'Playfair Display', serif" }}>{booking.hotelName || 'Elite Escape'}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontWeight: '700', fontSize: '0.8rem', letterSpacing: '1px' }}>REF: #{booking.id}</p>
                  </div>
                  <div style={{ background: `${info.color}15`, color: info.color, padding: '10px 20px', borderRadius: '50px', fontWeight: '900', fontSize: '0.75rem', border: `1px solid ${info.color}30` }}>
                    {info.icon} {info.label}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1rem', background: 'rgba(0,0,0,0.25)', padding: '1.5rem', borderRadius: '15px' }}>
                  <div><span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>GUEST</span><strong style={{ color: 'white', display: 'block' }}>{booking.name}</strong></div>
                  <div><span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>CHECK-IN</span><strong style={{ color: 'white', display: 'block' }}>{booking.checkIn}</strong></div>
                  <div><span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>CHECK-OUT</span><strong style={{ color: 'white', display: 'block' }}>{booking.checkOut}</strong></div>
                  <div><span style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>ROOMS</span><strong style={{ color: 'white', display: 'block' }}>{booking.rooms}</strong></div>
                </div>

                {booking.status === 'ACCEPTED' && (
                  <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
                    <button 
                      onClick={() => handlePayment(booking.id)}
                      disabled={payingId === booking.id}
                      className="btn-primary"
                      style={{ padding: '12px 40px', width: 'auto', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', boxShadow: '0 4px 15px rgba(16, 185, 129, 0.3)' }}
                    >
                      {payingId === booking.id ? 'Processing Payment...' : 'Proceed to Pay 💳'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BookingStatus;
