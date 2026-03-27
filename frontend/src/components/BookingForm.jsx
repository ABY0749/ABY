import { useState } from 'react';

const BookingForm = ({ onSubmit, isLoading, initialHotel, hideHeader }) => {
  const [formData, setFormData] = useState({
    name: '',
    checkIn: '',
    checkOut: '',
    rooms: 1,
    hotelName: initialHotel || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Date validation
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);

    if (!formData.name || !formData.checkIn || !formData.checkOut || !formData.hotelName) {
      alert("Please complete required fields including hotel selection.");
      return;
    }

    if (checkInDate < today) {
      alert("Check-in date cannot be in the past. Please select a future date.");
      return;
    }

    if (checkOutDate <= checkInDate) {
      alert("Check-out date must be after your check-in date.");
      return;
    }

    onSubmit(formData);
  };

  return (
    <div className="glass-panel" style={{ padding: '2.5rem', width: '100%' }}>
      {!hideHeader && (
        <div style={{ marginBottom: '2.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1.8rem', fontWeight: '800', fontFamily: "'Playfair Display', serif", color: 'white' }}>Quick Reservation</h4>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Secure your elite experience in seconds.</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        
        <div className="input-group">
          <label className="input-label" htmlFor="hotel" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🏨</span> Select Hotel
          </label>
          <div style={{ position: 'relative' }}>
            <select 
              id="hotel" 
              name="hotelName" 
              className="input-field" 
              value={formData.hotelName} 
              onChange={handleChange}
              required
              style={{ appearance: 'none', cursor: 'pointer', paddingLeft: '45px' }}
            >
              <option value="" disabled style={{ background: 'var(--bg-color)' }}>Choose a hotel...</option>
              <option value="CROWN suites" style={{ background: 'var(--bg-color)' }}>CROWN suites</option>
              <option value="HOME STAY" style={{ background: 'var(--bg-color)' }}>HOME STAY</option>
              <option value="SIX Seasons Resort" style={{ background: 'var(--bg-color)' }}>SIX Seasons Resort</option>
              <option value="Waldorf night" style={{ background: 'var(--bg-color)' }}>Waldorf night</option>
            </select>
            <div style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: 'var(--primary)', fontSize: '1.2rem', opacity: 0.7 }}>🏨</div>
            <div style={{ position: 'absolute', top: '50%', right: '15px', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)' }}>▼</div>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="name" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>👤</span> Guest Name
          </label>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              id="name" 
              name="name" 
              className="input-field" 
              value={formData.name} 
              onChange={handleChange}
              placeholder="e.g. John Doe"
              required
              style={{ paddingLeft: '45px' }}
            />
            <div style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: 'var(--primary)', fontSize: '1.2rem', opacity: 0.7 }}>👤</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <div className="input-group" style={{ flex: 1 }}>
            <label className="input-label" htmlFor="checkIn" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📅</span> Check In
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type="date" 
                id="checkIn" 
                name="checkIn" 
                className="input-field" 
                value={formData.checkIn} 
                onChange={handleChange}
                required
                style={{ colorScheme: 'dark', paddingLeft: '45px' }}
              />
              <div style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: 'var(--primary)', fontSize: '1.2rem', opacity: 0.7 }}>📅</div>
            </div>
          </div>
          
          <div className="input-group" style={{ flex: 1 }}>
            <label className="input-label" htmlFor="checkOut" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🗓️</span> Check Out
            </label>
            <div style={{ position: 'relative' }}>
              <input 
                type="date" 
                id="checkOut" 
                name="checkOut" 
                className="input-field" 
                value={formData.checkOut} 
                onChange={handleChange}
                required
                style={{ colorScheme: 'dark', paddingLeft: '45px' }}
              />
              <div style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: 'var(--primary)', fontSize: '1.2rem', opacity: 0.7 }}>🗓️</div>
            </div>
          </div>
        </div>

        <div className="input-group">
          <label className="input-label" htmlFor="rooms" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>🚪</span> Rooms Needed
          </label>
          <div style={{ position: 'relative' }}>
            <select 
              id="rooms" 
              name="rooms" 
              className="input-field" 
              value={formData.rooms} 
              onChange={handleChange}
              style={{ appearance: 'none', cursor: 'pointer', paddingLeft: '45px' }}
            >
              {[1,2,3,4,5].map(num => (
                <option key={num} value={num} style={{ background: 'var(--bg-color)' }}>{num} Room{num > 1 ? 's' : ''}</option>
              ))}
            </select>
            <div style={{ position: 'absolute', top: '50%', left: '15px', transform: 'translateY(-50%)', color: 'var(--primary)', fontSize: '1.2rem', opacity: 0.7 }}>🚪</div>
            <div style={{ position: 'absolute', top: '50%', right: '15px', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-secondary)' }}>▼</div>
          </div>
        </div>

        <button type="submit" className="btn-primary animate-pulse-glow" disabled={isLoading} style={{ marginTop: '0.5rem', height: '60px' }}>
          {isLoading ? 'Processing...' : 'Complete Reservation'}
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
