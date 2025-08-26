import React from 'react'
import { Link } from 'react-router-dom'

const FooterTwo = () => {
    return (
        <footer className="footer-two-modern" style={{ width: '100%', background: 'rgba(245,247,250,0.98)', borderTop: '1px solid #e5e7eb', padding: '48px 0 0 0', marginTop: 64 }}>
            <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 16 }}>
                    <img src="/assets/images/logo/robo-logo.png" alt="Robot Logo" style={{ height: 48, width: 'auto', objectFit: 'contain', marginRight: 8, padding: 8, background: '#fff', borderRadius: 16 }} />
                    <span style={{ fontWeight: 900, fontSize: 28, color: '#181A1E', letterSpacing: '-1px' }}>Power Robotics</span>
                        </div>
                <div style={{ color: '#888', fontSize: 18, marginBottom: 16, textAlign: 'center', maxWidth: 600 }}>
                    Power Robotics © 2024. All Rights Reserved
                        </div>
                <div style={{ display: 'flex', gap: 24, marginBottom: 24 }}>
                    <a href="#" style={{ color: '#6366f1', fontSize: 28, padding: 8, borderRadius: 12, transition: 'background 0.18s' }} onMouseOver={e => e.currentTarget.style.background = '#e0e7ff'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                        <i className="ph ph-facebook-logo" />
                    </a>
                    <a href="#" style={{ color: '#6366f1', fontSize: 28, padding: 8, borderRadius: 12, transition: 'background 0.18s' }} onMouseOver={e => e.currentTarget.style.background = '#e0e7ff'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                        <i className="ph ph-instagram-logo" />
                    </a>
                    <a href="#" style={{ color: '#6366f1', fontSize: 28, padding: 8, borderRadius: 12, transition: 'background 0.18s' }} onMouseOver={e => e.currentTarget.style.background = '#e0e7ff'} onMouseOut={e => e.currentTarget.style.background = 'transparent'}>
                        <i className="ph ph-twitter-logo" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default FooterTwo