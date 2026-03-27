import { useState } from 'react';

const Login = ({ onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const storedUsers = JSON.parse(localStorage.getItem('aby_users') || '[]');

    const phoneRegex = /^[0-9]{10}$/;
    if (phoneNumber !== 'ABY' && !phoneRegex.test(phoneNumber)) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    if (isRegistering) {
      if (storedUsers.find(u => u.phoneNumber === phoneNumber)) {
        setError('Phone number already exists!');
        return;
      }
      const newUser = { phoneNumber, password, role: 'guest' };
      localStorage.setItem('aby_users', JSON.stringify([...storedUsers, newUser]));
      setIsRegistering(false);
      setError('');
      alert('Account created! Please login now.');
    } else {
      const matchedUser = storedUsers.find(u => u.phoneNumber === phoneNumber && u.password === password);
      
      if ((phoneNumber === '7702610149' || phoneNumber === 'ABY' && password === 'ABY123') || matchedUser) {
        onLogin({ 
          username: phoneNumber, 
          role: (phoneNumber === '7702610149' || phoneNumber === 'ABY' || (matchedUser && matchedUser.role === 'admin')) ? 'admin' : 'guest' 
        });
      } else {
        setError('Invalid credentials. If you are new, please create an account.');
      }
    }
  };

  return (
    <div style={{ 
      height: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      background: 'url(https://images.unsplash.com/photo-1542314831-c6a4d14d8373?q=80&w=2670&auto=format&fit=crop) center/cover no-repeat',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      zIndex: 2000
    }}>
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(10px)' }}></div>
      
      <div className="glass-panel animate-fade-in" style={{ width: '100%', maxWidth: '450px', padding: '2.5rem', position: 'relative', textAlign: 'center' }}>
        <div style={{ width: '60px', height: '60px', background: 'var(--primary)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'white', fontSize: '2rem', fontWeight: 'bold', boxShadow: '0 0 30px var(--primary-shadow)' }}>A</div>
        <h1 style={{ fontSize: '2rem', color: 'white', marginBottom: '0.5rem', fontWeight: '800' }}>{isRegistering ? 'CREATE ACCOUNT' : 'ABY ELITE SUITES'}</h1>
        <p style={{ color: 'var(--primary)', fontWeight: '600', marginBottom: '2.5rem', letterSpacing: '1px' }}>WORK FOR HAPPINESS</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginLeft: '12px' }}>Phone Number</label>
            <input 
              type="tel" 
              maxLength="10"
              pattern="[0-9]{10}"
              placeholder={isRegistering ? "Register your 10-digit number" : "10-digit Phone Number"}
              className="input-field" 
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value.replace(/[^0-9]/g, ''))}
              required
            />
          </div>
          <div style={{ textAlign: 'left' }}>
            <label style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginLeft: '12px' }}>Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="input-field" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && <p style={{ color: '#ef4444', fontSize: '0.85rem' }}>{error}</p>}
          
          <button type="submit" className="btn-primary" style={{ padding: '1rem', marginTop: '1rem', fontSize: '1rem', fontWeight: '800' }}>
            {isRegistering ? 'SIGN UP NOW' : 'ENTER PORTAL'}
          </button>
        </form>

        <p style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          {isRegistering ? 'Already have an account?' : "Don't have an account?"}
          <button 
            onClick={() => { setIsRegistering(!isRegistering); setError(''); }}
            style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontWeight: 'bold', marginLeft: '8px', cursor: 'pointer', textDecoration: 'underline' }}
          >
            {isRegistering ? 'Login here' : 'Create one'}
          </button>
        </p>
        
        <div style={{ marginTop: '2.5rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>65+ Global Locations</p>
          <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem', marginTop: '8px' }}>Experience premium luxury with ABY</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
