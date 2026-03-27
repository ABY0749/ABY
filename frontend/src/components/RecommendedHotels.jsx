import { useState, useEffect } from 'react';

const RecommendedHotels = ({ onBook }) => {
  const [hotels, setHotels] = useState([
    { id: 1, name: "CROWN suites", image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=600&auto=format&fit=crop&q=60", price: "₹2/night", rating: 4.9, distance: "0.5 miles" },
    { id: 2, name: "HOME STAY", image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&auto=format&fit=crop&q=60", price: "₹2/night", rating: 5.0, distance: "1.2 miles" },
    { id: 3, name: "SIX Seasons Resort", image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&auto=format&fit=crop&q=60", price: "₹2/night", rating: 4.8, distance: "2.0 miles" },
    { id: 4, name: "Waldorf night", image: "https://images.unsplash.com/photo-1541971875076-8f970d573be6?w=600&auto=format&fit=crop&q=60", price: "₹2/night", rating: 4.7, distance: "0.8 miles" }
  ]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedHotel, setSelectedHotel] = useState(null);

  const openDetails = (hotel) => {
    setSelectedHotel(hotel);
  };

  const closeDetails = () => {
    setSelectedHotel(null);
  };

  useEffect(() => {
    const apiUrl = 'http://localhost:8082'; // Local backend
    fetch(`${apiUrl}/api/hotels`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          const enhancedData = data.map(hotel => {
            if (hotel.name === "HOME STAY") {
              return {
                ...hotel,
                image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=600&auto=format&fit=crop&q=60"
              };
            }
            return hotel;
          });
          setHotels(enhancedData);
        }
        setIsLoading(false);
      })
      .catch(err => {
        console.error("Error fetching hotels:", err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: '0 0 5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
        <div>
          <h3 style={{ fontSize: '2rem', fontWeight: '800', color: 'white', fontFamily: "'Playfair Display', serif" }}>Top Elite Picks</h3>
          <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Curated from our 65+ global locations</p>
        </div>
        <p style={{ color: 'var(--primary)', fontWeight: '700', fontSize: '0.9rem', letterSpacing: '1px' }}>WORK FOR HAPPINESS</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
        {isLoading ? (
          Array(4).fill(0).map((_, i) => (
            <div key={i} className="glass-panel" style={{ height: '400px', opacity: 0.5 }}></div>
          ))
        ) : (
          hotels.map(hotel => (
            <div key={hotel.id} className="glass-panel card-hover" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}>
              <div style={{ height: '220px', position: 'relative', overflow: 'hidden' }}>
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; }}
                />
                <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'rgba(15, 23, 42, 0.8)', backdropFilter: 'blur(8px)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '900', color: 'white', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '4px', zIndex: 5 }}>
                  <span style={{ color: '#fbbf24' }}>★</span> {hotel.rating ? hotel.rating.toFixed(1) : '5.0'}
                </div>
                {hotel.rating >= 4.9 && (
                  <div style={{ position: 'absolute', top: '15px', left: '15px', background: 'linear-gradient(135deg, #6366f1, #a855f7)', padding: '6px 14px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: '950', color: 'white', letterSpacing: '1px', boxShadow: '0 0 15px rgba(99, 102, 241, 0.5)', zIndex: 6, textTransform: 'uppercase' }}>
                    Preferred
                  </div>
                )}
              </div>
              
              <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.8rem' }}>
                  <h4 style={{ fontSize: '1.4rem', fontWeight: '800', color: 'white', fontFamily: "'Playfair Display', serif" }}>{hotel.name}</h4>
                  <span style={{ fontSize: '1.3rem', fontWeight: '900', color: 'var(--primary)' }}>{hotel.price}</span>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem', fontWeight: '500' }}>{hotel.distance} from center</p>
                
                <div style={{ display: 'flex', gap: '0.8rem', marginTop: 'auto' }}>
                  <button
                    onClick={() => onBook(hotel.name)}
                    className="btn-primary"
                    style={{ flex: 1.2, padding: '12px', fontSize: '0.9rem', fontWeight: '900', borderRadius: '12px' }}
                  >
                    Reserve
                  </button>
                  <button
                    onClick={() => openDetails(hotel)}
                    style={{ 
                      flex: 0.8, 
                      background: 'rgba(255,255,255,0.05)', 
                      border: '1px solid var(--glass-border)', 
                      color: 'white', 
                      borderRadius: '12px', 
                      padding: '12px', 
                      fontSize: '0.9rem', 
                      fontWeight: '700',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {selectedHotel && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem'
        }} onClick={closeDetails}>
          <div className="glass-panel animate-fade-in" style={{
            maxWidth: '800px',
            width: '100%',
            maxHeight: '90vh',
            overflow: 'auto',
            background: 'var(--bg-color)',
            border: '1px solid var(--surface-border)',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.2fr)',
            gap: '2rem',
            padding: '2rem',
            position: 'relative'
          }} onClick={e => e.stopPropagation()}>
            <button onClick={closeDetails} style={{
              position: 'absolute',
              top: '1rem',
              right: '1rem',
              background: 'transparent',
              border: 'none',
              color: 'white',
              fontSize: '1.5rem',
              cursor: 'pointer'
            }}>×</button>
            
            <div style={{ borderRadius: '15px', overflow: 'hidden', height: '100%' }}>
              <img src={selectedHotel.image} alt={selectedHotel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: '800', fontFamily: "'Playfair Display', serif" }}>{selectedHotel.name}</h2>
                <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)' }}>{selectedHotel.price}</span>
              </div>
              
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ background: 'rgba(59, 130, 246, 0.1)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '700' }}>
                  ★ {selectedHotel.rating} Rating
                </span>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{selectedHotel.distance} from center</span>
              </div>
              
              <div style={{ marginTop: '1rem' }}>
                <h5 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Description</h5>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  Experience luxury and comfort at {selectedHotel.name}. Our premium suites offer breathtaking views and world-class amenities to ensure your stay is unforgettable. Perfect for both business and leisure travelers looking for an elite experience.
                </p>
              </div>
              
              <div style={{ marginTop: '1rem' }}>
                <h5 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.1rem' }}>Amenities</h5>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {['Free WiFi', 'Pool', 'Spa', 'Gym', 'Breakfast Incl.', 'Room Service'].map(tag => (
                    <span key={tag} style={{ background: 'rgba(255,255,255,0.05)', padding: '4px 10px', borderRadius: '5px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{tag}</span>
                  ))}
                </div>
              </div>
              
              <button 
                onClick={() => { onBook(selectedHotel.name); closeDetails(); }}
                className="btn-primary" 
                style={{ marginTop: 'auto', padding: '16px' }}
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendedHotels;
