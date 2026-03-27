import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8082';
    fetch(`${apiUrl}/api/admin/bookings`)
      .then(res => res.json())
      .then(data => {
        setBookings(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching bookings:', error));
  }, []);

  return (
    <div className="animate-fade-in" style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: '700', color: 'white' }}>Admin Dashboard</h2>
        <div style={{ background: 'var(--glass-bg)', padding: '10px 20px', borderRadius: '12px', border: '1px solid var(--glass-border)', color: 'white' }}>
          Total Bookings: <span style={{ fontWeight: 'bold', color: 'var(--primary)' }}>{bookings.length}</span>
        </div>
      </div>

      <div className="glass-panel" style={{ overflow: 'hidden', padding: '2rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--text-primary)' }}>Recent Reservations</h3>
        
        {isLoading ? (
          <p style={{ color: 'var(--text-secondary)' }}>Loading bookings...</p>
        ) : bookings.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)' }}>No bookings found yet.</p>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', color: 'white' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600' }}>ID</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Guest Name</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Check In</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Check Out</th>
                  <th style={{ padding: '1rem', color: 'var(--text-secondary)', fontWeight: '600' }}>Rooms</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', transition: 'background 0.2s' }}>
                    <td style={{ padding: '1rem' }}>#{booking.id}</td>
                    <td style={{ padding: '1rem', fontWeight: '600' }}>{booking.name}</td>
                    <td style={{ padding: '1rem' }}>{booking.checkIn}</td>
                    <td style={{ padding: '1rem' }}>{booking.checkOut}</td>
                    <td style={{ padding: '1rem' }}>
                      <span style={{ background: 'rgba(59, 130, 246, 0.2)', color: '#60a5fa', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                        {booking.rooms} Room{booking.rooms > 1 ? 's' : ''}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
