import { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [editFormData, setEditFormData] = useState({});

  const fetchBookings = () => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8082';
    fetch(`${apiUrl}/api/admin/bookings`)
      .then(res => res.json())
      .then(data => {
        setBookings(data.sort((a, b) => b.id - a.id)); // Newest first
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching bookings:', error));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8082';
    fetch(`${apiUrl}/api/admin/bookings/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newStatus)
    })
    .then(() => fetchBookings());
  };

  const startEditing = (booking) => {
    setEditingId(booking.id);
    setEditFormData({ checkIn: booking.checkIn, checkOut: booking.checkOut });
  };

  const handleUpdateBooking = (id) => {
    const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8082';
    fetch(`${apiUrl}/api/bookings/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...bookings.find(b => b.id === id), ...editFormData })
    })
    .then(() => {
      setEditingId(null);
      fetchBookings();
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'ACCEPTED': return '#10b981';
      case 'CANCELLED': return '#ef4444';
      case 'NOT_AVAILABLE': return '#f59e0b';
      default: return '#94a3b8';
    }
  };

  return (
    <div className="scroll-reveal" style={{ padding: '2rem 0' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div>
          <h2 style={{ fontSize: '3rem', fontWeight: '950', color: 'white', fontFamily: "'Playfair Display', serif", letterSpacing: '-1px' }}>Management Suite</h2>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px', fontWeight: '500' }}>Control the elite guest experience</p>
        </div>
        <div className="glass-panel" style={{ padding: '12px 25px', fontSize: '1rem', fontWeight: '800', border: '1px solid var(--primary)' }}>
          Active Requests: <span style={{ color: 'var(--primary)' }}>{bookings.length}</span>
        </div>
      </header>

      <div className="glass-panel" style={{ padding: '1.5rem', overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--glass-border)' }}>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>ID</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Hotel</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Guest</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Check In</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Check Out</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Status</th>
              <th style={{ padding: '1rem', color: 'var(--text-secondary)' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>#{booking.id}</td>
                <td style={{ padding: '1rem', color: 'white', fontWeight: '600' }}>{booking.hotelName || 'N/A'}</td>
                <td style={{ padding: '1rem', color: 'white' }}>{booking.name}</td>
                <td style={{ padding: '1rem' }}>
                  {editingId === booking.id ? (
                    <input type="date" value={editFormData.checkIn} onChange={e => setEditFormData({...editFormData, checkIn: e.target.value})} className="input-field" style={{ padding: '4px', fontSize: '0.8rem' }} />
                  ) : <span style={{ color: 'white' }}>{booking.checkIn}</span>}
                </td>
                <td style={{ padding: '1rem' }}>
                  {editingId === booking.id ? (
                    <input type="date" value={editFormData.checkOut} onChange={e => setEditFormData({...editFormData, checkOut: e.target.value})} className="input-field" style={{ padding: '4px', fontSize: '0.8rem' }} />
                  ) : <span style={{ color: 'white' }}>{booking.checkOut}</span>}
                </td>
                <td style={{ padding: '1rem' }}>
                  <span style={{ 
                    background: `${getStatusColor(booking.status)}22`, 
                    color: getStatusColor(booking.status), 
                    padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '800', border: `1px solid ${getStatusColor(booking.status)}44` 
                  }}>
                    {booking.status || 'PENDING'}
                  </span>
                </td>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    {editingId === booking.id ? (
                      <button onClick={() => handleUpdateBooking(booking.id)} style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Save</button>
                    ) : (
                      <button onClick={() => startEditing(booking)} style={{ background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer' }}>Edit</button>
                    )}
                    {(!booking.status || booking.status === 'PENDING') && (
                      <>
                        <button onClick={() => handleUpdateStatus(booking.id, 'ACCEPTED')} style={{ background: '#10b981', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Accept</button>
                        <button onClick={() => handleUpdateStatus(booking.id, 'CANCELLED')} style={{ background: '#f59e0b', border: 'none', color: 'white', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
                      </>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
