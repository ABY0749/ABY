import { useState } from 'react';
import BookingForm from './components/BookingForm';
import RecommendedHotels from './components/RecommendedHotels';
import BookingConfirmation from './components/BookingConfirmation';
import AdminDashboard from './components/AdminDashboard';
import BookingModal from './components/BookingModal';
import BookingStatus from './components/BookingStatus';
import Login from './components/Login'; 
import './index.css';

function App() {
  const [user, setUser] = useState(null); // { username, role }
  const [currentView, setCurrentView] = useState('home'); // 'home' or 'admin'
  const [bookingStatus, setBookingStatus] = useState('idle');
  const [bookingData, setBookingData] = useState(null);
  const [viewingStatusId, setViewingStatusId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState('');

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  const handleBookHotel = (hotelName) => {
    setSelectedHotel(hotelName);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleBookingSubmit = async (formData) => {
    setBookingStatus('loading');
    try {
      const apiUrl = 'http://localhost:8082'; // Pointing back to local backend
      const response = await fetch(`${apiUrl}/api/bookings`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        const result = await response.json();
        setBookingData(result);
        setBookingStatus('success');
        setIsModalOpen(false); 
      } else {
        // Backend returned an error response
        const localId = 'LOCAL-' + Date.now();
        setBookingData({ ...formData, id: localId, status: 'PENDING' });
        setBookingStatus('success');
        setIsModalOpen(false);
      }
    } catch (error) {
      // Backend is offline — create a local booking record
      console.warn("Backend offline, creating local booking:", error.message);
      const localId = 'LOCAL-' + Date.now();
      setBookingData({ ...formData, id: localId, status: 'PENDING' });
      setBookingStatus('success');
      setIsModalOpen(false);
    }
  };

  const resetBooking = () => {
    setBookingStatus('idle');
    setBookingData(null);
  };

  const handleShowStatus = (id) => {
    setViewingStatusId(id);
    setCurrentView('view-status');
    resetBooking();
  };

  return (
    <div className="app-container" style={{ background: 'var(--bg-color)', minHeight: '100vh', color: 'white', position: 'relative' }}>
      <header className="sticky-nav" style={{ padding: '0.8rem 5%', display: 'flex', justifyContent: 'center' }}>
        <div style={{ maxWidth: '1400px', width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div 
            onClick={() => setCurrentView('home')}
            style={{ display: 'flex', alignItems: 'center', gap: '15px', cursor: 'pointer' }}
          >
            <div style={{ width: '45px', height: '45px', background: 'linear-gradient(135deg, var(--primary), #a855f7)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '900', fontSize: '1.4rem', boxShadow: '0 0 20px var(--primary-glow)', fontFamily: "'Playfair Display', serif" }}>
              A
            </div>
            <div className="hidden-mobile">
              <h1 style={{ fontSize: '1.4rem', fontWeight: '900', letterSpacing: '-0.5px', textTransform: 'uppercase', lineHeight: '1', fontFamily: "'Playfair Display', serif", margin: 0 }}>ABY Elite Suites</h1>
              <p style={{ fontSize: '0.6rem', color: 'var(--primary)', fontWeight: '800', letterSpacing: '2px', marginTop: '2px', margin: 0 }}>WORK FOR HAPPINESS</p>
            </div>
          </div>

          <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            <button 
              onClick={() => setCurrentView('home')} 
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.95rem', color: currentView === 'home' ? 'white' : 'var(--text-secondary)', fontWeight: '700', transition: 'all 0.3s ease', letterSpacing: '0.5px' }}
            >
              LOCATIONS
            </button>
            <button 
              onClick={() => setCurrentView('view-status')} 
              style={{ background: 'transparent', border: 'none', color: currentView === 'view-status' ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.95rem', fontWeight: '700', transition: 'all 0.3s ease', letterSpacing: '0.5px' }}
            >
              STATUS
            </button>
            {user.role === 'admin' && (
              <button 
                onClick={() => setCurrentView('admin')} 
                style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', color: 'var(--primary)', padding: '8px 16px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', fontWeight: '800', transition: 'all 0.3s ease' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(99, 102, 241, 0.2)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)'; }}
              >
                ADMIN
              </button>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginLeft: '10px', borderLeft: '1px solid var(--glass-border)', paddingLeft: '20px' }}>
              <div style={{ position: 'relative' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem', fontWeight: '900', boxShadow: '0 0 10px var(--primary-glow)' }}>
                  {user.username.substring(0, 1).toUpperCase()}
                </div>
                <div style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#fbbf24', color: '#000', fontSize: '0.5rem', fontWeight: '950', padding: '2px 4px', borderRadius: '4px', textTransform: 'uppercase', boxShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>ELITE</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '700', color: 'white' }}>{user.username}</span>
                <button onClick={() => setUser(null)} style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', fontSize: '0.7rem', fontWeight: '600', padding: 0, textAlign: 'left' }}>Logout</button>
              </div>
            </div>
          </nav>
        </div>
      </header>

      <main>
        {currentView === 'home' ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            <section className="hero scroll-reveal" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0', position: 'relative', padding: '1rem 2.5%' }}>
              <div style={{ height: '750px', borderRadius: '40px', overflow: 'hidden', position: 'relative', boxShadow: '0 30px 60px -12px rgba(0,0,0,0.5)' }}>
                <div className="parallax-bg" style={{ 
                   width: '100%', 
                  height: '115%', 
                  backgroundImage: 'url(https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'absolute',
                  top: '-7%'
                }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(2,6,23,0.3), rgba(2,6,23,0.95))' }}></div>
                </div>
                
                <div style={{ position: 'absolute', top: '20%', left: '8%', maxWidth: '850px', zIndex: 10 }}>
                  <span style={{ color: 'var(--primary)', fontWeight: '900', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '1rem', marginBottom: '1rem', display: 'block' }}>Elite Hospitality</span>
                  <h2 style={{ fontSize: '6rem', fontWeight: '950', lineHeight: '0.95', marginBottom: '2rem', color: 'white', fontFamily: "'Playfair Display', serif", letterSpacing: '-3px', textShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
                    Your Elite Escape <br/> Awaits.
                  </h2>
                  <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '2rem', fontWeight: '900', color: 'white' }}>65+</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Global Locations</span>
                    </div>
                    <div style={{ height: '40px', width: '1px', background: 'rgba(255,255,255,0.2)' }}></div>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span style={{ fontSize: '2rem', fontWeight: '900', color: 'white' }}>5.0</span>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>Guest Rating</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="floating-card scroll-reveal reveal-delay-200" style={{ maxWidth: '1100px', width: '92%', margin: '0 auto', zIndex: 20 }}>
                <BookingForm onSubmit={handleBookingSubmit} isLoading={bookingStatus === 'loading'} />
              </div>
            </section>

            <section className="scroll-reveal reveal-delay-300" style={{ padding: '0 5% 8rem', maxWidth: '1400px', margin: '0 auto', width: '100%', textAlign: 'center' }}>
              <span style={{ color: 'var(--primary)', fontWeight: '950', letterSpacing: '4px', textTransform: 'uppercase', fontSize: '0.8rem', marginBottom: '1rem', display: 'block' }}>Exclusive Amenities</span>
              <h3 style={{ fontSize: '3.5rem', fontWeight: '950', color: 'white', fontFamily: "'Playfair Display', serif", marginBottom: '4rem' }}>The Elite Experience</h3>
              
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem' }}>
                {[
                  { title: 'Full Concierge', desc: 'Personal assistants available 24/7 to handle every request, from dining to travel.', icon: '🛎️' },
                  { title: 'Private Spa', desc: 'World-class wellness retreats and exclusive treatments in the comfort of your suite.', icon: '🧖' },
                  { title: 'Chef on Demand', desc: 'Michelin-starred dining experiences prepared privately by our master chefs.', icon: '👨‍🍳' },
                  { title: 'Elite Transport', desc: 'Luxury chauffeur services and private jet charters at your fingertips.', icon: '🚁' }
                ].map((service, index) => (
                  <div key={index} className="glass-panel" style={{ padding: '3rem 2rem', transition: 'all 0.3s ease', cursor: 'default' }} onMouseEnter={e => e.currentTarget.style.borderColor = 'var(--primary)'} onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--glass-border)'}>
                    <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{service.icon}</div>
                    <h4 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'white', marginBottom: '1rem', fontFamily: "'Playfair Display', serif" }}>{service.title}</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.7' }}>{service.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section className="scroll-reveal reveal-delay-300" style={{ padding: '0 5%', maxWidth: '1400px', margin: '0 auto', width: '100%' }}>
              <RecommendedHotels onBook={handleBookHotel} />
            </section>
          </div>
        ) : currentView === 'admin' ? (
          <div style={{ padding: '2rem 5%', maxWidth: '1400px', margin: '0 auto' }}>
            <AdminDashboard />
          </div>
        ) : (
          <div style={{ padding: '2rem 5%', maxWidth: '1400px', margin: '0 auto' }}>
            <BookingStatus user={user} bookingId={viewingStatusId} onBack={() => setCurrentView('home')} />
          </div>
        )}
      </main>

      <footer style={{ padding: '5rem 5% 3rem', borderTop: '1px solid var(--glass-border)', marginTop: '5rem', background: 'rgba(0,0,0,0.3)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '4rem' }}>
          <div>
            <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', marginBottom: '1.5rem' }}>ABY Elite</h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: '1.8' }}>Redefining luxury travel for the modern explorer. Experience the world through our curated lens.</p>
          </div>
          <div>
            <h5 style={{ fontWeight: '800', marginBottom: '1.5rem', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Contact</h5>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>concierge@abyelite.com</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '10px' }}>+1 (888) ABY-ELITE</p>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '5px' }}>Direct: 7702610149</p>
          </div>
          <div>
            <h5 style={{ fontWeight: '800', marginBottom: '1.5rem', fontSize: '0.9rem', letterSpacing: '1px', textTransform: 'uppercase' }}>Follow Us</h5>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
              <a href="https://instagram.com/bharath.yadav.6" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '5px', transition: 'color 0.3s ease' }} onMouseEnter={e => e.currentTarget.style.color = 'white'} onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}>
                <span style={{ fontSize: '1.2rem' }}>📸</span> bharath.yadav.6
              </a>
              <span style={{ color: 'var(--text-secondary)' }}>Twitter</span>
              <span style={{ color: 'var(--text-secondary)' }}>LinkedIn</span>
            </div>
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '5rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.8rem' }}>
          &copy; 2026 ABY Elite Suites. Work for Happiness.
        </div>
      </footer>

      {bookingStatus === 'success' && bookingData && (
        <BookingConfirmation 
          data={bookingData} 
          onClose={resetBooking} 
          status="success" 
          onViewDetails={() => handleShowStatus(bookingData.id)}
        />
      )}
      
      {bookingStatus === 'error' && (
        <BookingConfirmation onClose={resetBooking} status="error" />
      )}

      <BookingModal 
        isOpen={isModalOpen} 
        onClose={handleModalClose} 
        onSubmit={handleBookingSubmit}
        hotelName={selectedHotel}
        isLoading={bookingStatus === 'loading'}
        initialHotel={selectedHotel}
      />
    </div>
  );
}

export default App;
