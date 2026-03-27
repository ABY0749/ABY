import { useState, useRef, useEffect } from 'react';

// ── Knowledge base ──────────────────────────────────────────────
const KB = [
  {
    patterns: ['hello', 'hi', 'hey', 'good morning', 'good evening', 'greet'],
    responses: [
      "Welcome to ABY Elite Suites! 🌟 I'm your personal concierge. How may I assist you today?",
      "Hello! Delighted to have you here. I'm ready to help you with bookings, amenities, or anything else. ✨",
    ],
  },
  {
    patterns: ['book', 'reservation', 'reserve', 'check in', 'check-in', 'stay'],
    responses: [
      "Ready to book? Simply fill out the Booking Form at the top of the page. Choose your hotel, dates, room type and we'll handle the rest! 🏨",
      "To make a reservation, use the booking form on the home page. Need help choosing the perfect room? Just ask me! 🛎️",
    ],
  },
  {
    patterns: ['price', 'cost', 'rate', 'fee', 'cheap', 'expensive', 'tariff', 'how much'],
    responses: [
      "Our room rates vary by hotel and season. Standard rooms start from ₹4,999/night, Deluxe from ₹7,999/night, and Elite Suites from ₹15,999/night. 💎",
      "Pricing depends on your chosen property and dates. Select your hotel in the booking form to see real-time availability and rates! 🏷️",
    ],
  },
  {
    patterns: ['hotel', 'property', 'location', 'where', 'branch', 'city'],
    responses: [
      "ABY Elite Suites operates across 65+ global locations! 🌍 Our featured properties include:\n• ABY Grand Palace – Premium city-view suites\n• HOME STAY – Boutique comfort experience\n• ABY Oceanfront – Beachside luxury\nUse the Locations tab to explore them all!",
      "We have over 65 elite properties worldwide. Check out our Recommended Hotels section below the booking form to explore featured properties. 🗺️",
    ],
  },
  {
    patterns: ['spa', 'wellness', 'massage', 'treatment', 'relax', 'pool', 'gym', 'fitness'],
    responses: [
      "Our wellness facilities are world-class! 🧖 Every Elite property features:\n• Private Spa & massage rooms\n• Infinity pools\n• State-of-the-art fitness center\n• Yoga & meditation sessions\nAvailable to all guests daily.",
    ],
  },
  {
    patterns: ['food', 'restaurant', 'dining', 'eat', 'breakfast', 'lunch', 'dinner', 'chef', 'menu'],
    responses: [
      "Indulge in our Chef on Demand service! 👨‍🍳 We offer:\n• Michelin-starred in-room dining\n• International breakfast buffet\n• Rooftop dining with stunning views\n• 24/7 room service\nAll cuisines available upon request.",
    ],
  },
  {
    patterns: ['transport', 'taxi', 'car', 'airport', 'transfer', 'pickup', 'driver', 'chauffeur'],
    responses: [
      "We provide Elite Transport services! 🚁 Options include:\n• Luxury chauffeur-driven cars\n• Airport pick-up & drop-off\n• Private helicopter transfers\n• Yacht & boat charters\nBook through our concierge at +1 (888) ABY-ELITE.",
    ],
  },
  {
    patterns: ['cancel', 'cancellation', 'refund', 'policy', 'change booking'],
    responses: [
      "Our cancellation policy:\n• Free cancellation up to 48 hours before check-in ✅\n• 50% refund within 24–48 hours\n• No refund within 24 hours of check-in\nFor changes, contact concierge@abyelite.com or call 7702610149.",
    ],
  },
  {
    patterns: ['wifi', 'internet', 'connection', 'network'],
    responses: [
      "Yes! All ABY Elite properties offer complimentary high-speed Wi-Fi (up to 1 Gbps) throughout the hotel — including rooms, lobby, pool areas, and dining spaces. 📶",
    ],
  },
  {
    patterns: ['pet', 'dog', 'cat', 'animal'],
    responses: [
      "We love furry guests! 🐾 ABY Elite Suites is a pet-friendly hotel. We offer special pet amenities including beds, bowls, and treats. Pet fee of ₹500/night applies. Please inform us in advance.",
    ],
  },
  {
    patterns: ['status', 'booking status', 'track', 'my booking', 'confirm'],
    responses: [
      "To track your booking status, click the **STATUS** button in the navigation bar at the top! Enter your booking ID to see real-time updates. 📋",
    ],
  },
  {
    patterns: ['contact', 'phone', 'email', 'call', 'reach', 'support', 'help'],
    responses: [
      "You can reach ABY Elite Suites via:\n📧 concierge@abyelite.com\n📞 +1 (888) ABY-ELITE\n📱 Direct: 7702610149\n\nOur concierge team is available 24/7! 🛎️",
    ],
  },
  {
    patterns: ['check out', 'checkout', 'late checkout', 'early checkout'],
    responses: [
      "Standard check-out is at 11:00 AM. 🕚\nEarly check-in (from 8 AM) is available on request.\nLate check-out (until 2 PM) may be arranged at ₹999 extra.\nFeel free to request your preferred time!",
    ],
  },
  {
    patterns: ['room', 'suite', 'deluxe', 'standard', 'type', 'bed', 'single', 'double', 'king'],
    responses: [
      "Our room types include:\n🛏️ **Standard** – Cozy & comfortable (₹4,999/night)\n🛏️ **Deluxe** – Upgraded amenities & views (₹7,999/night)\n👑 **Elite Suite** – Luxury at its finest (₹15,999/night)\n\nAll rooms include free Wi-Fi, minibar, and 24/7 room service!",
    ],
  },
  {
    patterns: ['thank', 'thanks', 'bye', 'goodbye', 'great', 'awesome', 'perfect', 'nice'],
    responses: [
      "You're most welcome! Have a wonderful and luxurious stay with us. ✨ Is there anything else I can help you with?",
      "It's my pleasure to assist! Feel free to ask anytime. Enjoy your ABY Elite experience! 🌟",
    ],
  },
];

const SUGGESTIONS = [
  "How do I book a room?",
  "What are the room prices?",
  "Tell me about amenities",
  "Cancellation policy?",
  "How to track my booking?",
];

function getBotResponse(message) {
  const lc = message.toLowerCase();
  for (const item of KB) {
    if (item.patterns.some((p) => lc.includes(p))) {
      const r = item.responses;
      return r[Math.floor(Math.random() * r.length)];
    }
  }
  return "I'm not quite sure about that, but I'd love to help! 🤔 You can also reach our team at concierge@abyelite.com or call 7702610149 for personalized assistance.";
}

// ── Component ───────────────────────────────────────────────────
export default function AIChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 0,
      from: 'bot',
      text: "Hello! I'm **Aria**, your ABY Elite virtual concierge. 🌟 How can I assist you today?",
      time: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (open) {
      setUnread(0);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text) => {
    const trimmed = (text || input).trim();
    if (!trimmed) return;

    const userMsg = { id: Date.now(), from: 'user', text: trimmed, time: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    const delay = 600 + Math.random() * 800;
    setTimeout(() => {
      const botText = getBotResponse(trimmed);
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: 'bot', text: botText, time: new Date() },
      ]);
      setTyping(false);
      if (!open) setUnread((n) => n + 1);
    }, delay);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const formatTime = (d) =>
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // Render markdown-ish bold (**text**)
  const renderText = (text) => {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i}>{part.slice(2, -2)}</strong>;
      }
      // Handle newlines
      return part.split('\n').map((line, j, arr) => (
        <span key={`${i}-${j}`}>
          {line}
          {j < arr.length - 1 && <br />}
        </span>
      ));
    });
  };

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen((v) => !v)}
        title="Chat with Aria"
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          width: '62px',
          height: '62px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6366f1, #a855f7)',
          border: 'none',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(99,102,241,0.55)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9998,
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          transform: open ? 'rotate(45deg) scale(1.05)' : 'scale(1)',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.boxShadow = '0 12px 40px rgba(99,102,241,0.75)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.boxShadow = '0 8px 32px rgba(99,102,241,0.55)'; }}
      >
        <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{open ? '✕' : '💬'}</span>
        {!open && unread > 0 && (
          <span style={{
            position: 'absolute', top: '2px', right: '2px',
            background: '#ef4444', color: '#fff', borderRadius: '50%',
            width: '20px', height: '20px', fontSize: '0.7rem', fontWeight: '900',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '2px solid #0f0f1a',
          }}>
            {unread}
          </span>
        )}
      </button>

      {/* Chat window */}
      <div style={{
        position: 'fixed',
        bottom: '104px',
        right: '28px',
        width: '370px',
        maxHeight: '560px',
        borderRadius: '24px',
        background: 'rgba(15,15,30,0.97)',
        border: '1px solid rgba(99,102,241,0.35)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(99,102,241,0.15)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 9997,
        overflow: 'hidden',
        backdropFilter: 'blur(20px)',
        transform: open ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.95)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'auto' : 'none',
        transition: 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1), opacity 0.25s ease',
      }}>
        {/* Header */}
        <div style={{
          padding: '18px 20px',
          background: 'linear-gradient(135deg, rgba(99,102,241,0.3), rgba(168,85,247,0.2))',
          borderBottom: '1px solid rgba(99,102,241,0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '14px',
        }}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '44px', height: '44px', borderRadius: '50%',
              background: 'linear-gradient(135deg, #6366f1, #a855f7)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.4rem', boxShadow: '0 0 16px rgba(99,102,241,0.5)',
            }}>🤖</div>
            <span style={{
              position: 'absolute', bottom: '2px', right: '2px',
              width: '11px', height: '11px', borderRadius: '50%',
              background: '#22c55e', border: '2px solid #0f0f1a',
            }} />
          </div>
          <div>
            <div style={{ fontWeight: '800', fontSize: '1rem', color: '#fff', letterSpacing: '0.3px' }}>
              Aria
            </div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(167,139,250,0.9)', fontWeight: '600' }}>
              ABY Elite AI Concierge · Online
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            style={{
              marginLeft: 'auto', background: 'rgba(255,255,255,0.07)', border: 'none',
              borderRadius: '8px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer',
              padding: '6px 10px', fontSize: '0.85rem', fontWeight: '700',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.15)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; }}
          >✕</button>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto', padding: '16px',
          display: 'flex', flexDirection: 'column', gap: '12px',
          scrollbarWidth: 'thin', scrollbarColor: 'rgba(99,102,241,0.3) transparent',
        }}>
          {messages.map((msg) => (
            <div key={msg.id} style={{
              display: 'flex',
              flexDirection: msg.from === 'user' ? 'row-reverse' : 'row',
              alignItems: 'flex-end',
              gap: '8px',
            }}>
              {msg.from === 'bot' && (
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                  background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.85rem',
                }}>🤖</div>
              )}
              <div style={{
                maxWidth: '78%',
                background: msg.from === 'user'
                  ? 'linear-gradient(135deg, #6366f1, #7c3aed)'
                  : 'rgba(255,255,255,0.06)',
                borderRadius: msg.from === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                padding: '10px 14px',
                border: msg.from === 'bot' ? '1px solid rgba(99,102,241,0.2)' : 'none',
                boxShadow: msg.from === 'user' ? '0 4px 20px rgba(99,102,241,0.35)' : 'none',
              }}>
                <p style={{
                  margin: 0, fontSize: '0.85rem', lineHeight: '1.55',
                  color: msg.from === 'user' ? '#fff' : 'rgba(255,255,255,0.9)',
                  whiteSpace: 'pre-wrap',
                }}>
                  {renderText(msg.text)}
                </p>
                <span style={{
                  display: 'block', marginTop: '5px',
                  fontSize: '0.65rem',
                  color: msg.from === 'user' ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.3)',
                  textAlign: msg.from === 'user' ? 'left' : 'right',
                }}>
                  {formatTime(msg.time)}
                </span>
              </div>
            </div>
          ))}

          {typing && (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px' }}>
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem',
              }}>🤖</div>
              <div style={{
                background: 'rgba(255,255,255,0.06)', borderRadius: '16px 16px 16px 4px',
                border: '1px solid rgba(99,102,241,0.2)', padding: '12px 16px',
                display: 'flex', gap: '5px', alignItems: 'center',
              }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{
                    width: '7px', height: '7px', borderRadius: '50%',
                    background: 'rgba(167,139,250,0.8)',
                    display: 'inline-block',
                    animation: `typingBounce 1.2s ease-in-out ${i * 0.2}s infinite`,
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick replies */}
        {messages.length <= 1 && (
          <div style={{
            padding: '0 16px 12px',
            display: 'flex', flexWrap: 'wrap', gap: '8px',
          }}>
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => sendMessage(s)}
                style={{
                  background: 'rgba(99,102,241,0.12)',
                  border: '1px solid rgba(99,102,241,0.3)',
                  color: 'rgba(167,139,250,0.95)',
                  borderRadius: '20px', padding: '6px 12px',
                  fontSize: '0.75rem', fontWeight: '600',
                  cursor: 'pointer', transition: 'all 0.2s ease',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(99,102,241,0.25)';
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(99,102,241,0.12)';
                  e.currentTarget.style.borderColor = 'rgba(99,102,241,0.3)';
                  e.currentTarget.style.color = 'rgba(167,139,250,0.95)';
                }}
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{
          padding: '12px 16px',
          borderTop: '1px solid rgba(99,102,241,0.2)',
          display: 'flex', gap: '10px', alignItems: 'center',
          background: 'rgba(0,0,0,0.2)',
        }}>
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask me anything…"
            style={{
              flex: 1, background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(99,102,241,0.25)',
              borderRadius: '12px', padding: '10px 14px',
              color: '#fff', fontSize: '0.85rem',
              outline: 'none', transition: 'border-color 0.2s',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.6)'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(99,102,241,0.25)'; }}
          />
          <button
            onClick={() => sendMessage()}
            disabled={!input.trim()}
            style={{
              width: '42px', height: '42px', borderRadius: '12px', flexShrink: 0,
              background: input.trim()
                ? 'linear-gradient(135deg, #6366f1, #a855f7)'
                : 'rgba(255,255,255,0.06)',
              border: 'none', cursor: input.trim() ? 'pointer' : 'default',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1rem', transition: 'all 0.2s ease',
              boxShadow: input.trim() ? '0 4px 16px rgba(99,102,241,0.4)' : 'none',
            }}
          >
            🚀
          </button>
        </div>
      </div>

      {/* Typing animation keyframes */}
      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.5; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
