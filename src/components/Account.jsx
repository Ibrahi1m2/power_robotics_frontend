import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Lock, Eye, EyeSlash, EnvelopeSimple, UserPlus, SignIn, Shield } from '@phosphor-icons/react'

const API_BASE = `${process.env.REACT_APP_API_BASE_URL}/api/auth`;

const Account = () => {
    const [loginData, setLoginData] = useState({ username: '', password: '' });
    const [registerData, setRegisterData] = useState({ username: '', password: '', email: '' });
    const [error, setError] = useState('');
    const [registerError, setRegisterError] = useState('');
    const [registerSuccess, setRegisterSuccess] = useState('');
    const [user, setUser] = useState(null);
    const [showForgot, setShowForgot] = useState(false);
    const [forgotEmail, setForgotEmail] = useState('');
    const [forgotMsg, setForgotMsg] = useState('');
    const [forgotError, setForgotError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');
        if (token && userData) {
            setUser(JSON.parse(userData));
        }
    }, []);

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        console.log('Login field changed:', name, value); // Debug log
        setLoginData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({ ...prev, [name]: value }));
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        console.log('=== LOGIN FUNCTION CALLED ===');
        setError('');
        console.log('Login data:', loginData); // Debug log
        console.log('Username:', loginData.username, 'Password:', loginData.password); // More detailed debug
        
        // Trim whitespace and check for empty values
        const username = loginData.username?.trim();
        const password = loginData.password?.trim();
        
        if (!username || !password) {
            setError('Please fill in both username and password');
            return;
        }
        try {
            const res = await fetch(`${API_BASE}/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ usernameOrEmail: loginData.username, password: loginData.password }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Login failed');
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
        } catch (err) {
            setError(err.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        console.log('=== REGISTER FUNCTION CALLED ===');
        setRegisterError('');
        setRegisterSuccess('');
        if (!registerData.username || !registerData.password) {
            setRegisterError('Username and password are required');
            return;
        }
        try {
            const res = await fetch(`${API_BASE}/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(registerData),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Registration failed');
            setRegisterSuccess('Registration successfully done. You can now log in.');
            // Optionally clear form fields
            setRegisterData({ username: '', password: '', email: '' });
        } catch (err) {
            setRegisterError(err.message || 'Registration failed');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const handleForgotPassword = async (e) => {
        e.preventDefault();
        setForgotMsg('');
        setForgotError('');
        if (!forgotEmail) {
            setForgotError('Email is required');
            return;
        }
        try {
            const res = await fetch(`${API_BASE}/forgot-password`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: forgotEmail }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.message || 'Failed to send email');
            setForgotMsg('A new password has been sent to your email.');
        } catch (err) {
            setForgotError(err.message);
        }
    };

    if (user) {
        return (
            <section className="account py-80">
                <div className="container container-lg text-center">
                    <h2>Welcome, {user.username || user.email}!</h2>
                    <p>You are logged in.</p>
                    <button 
                        className="btn d-flex align-items-center justify-content-center gap-2 mt-4" 
                        onClick={handleLogout}
                        style={{
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            color: 'white',
                            padding: '16px 32px',
                            borderRadius: '50px',
                            fontWeight: 600,
                            fontSize: 16,
                            border: 'none',
                            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                            textDecoration: 'none'
                        }}
                    >
                        Logout
                    </button>
                </div>
            </section>
        );
    }

    return (
        <motion.section 
            className="account py-80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            style={{
                minHeight: '100vh',
                background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div className="container container-lg">
                <motion.div 
                    className="account-header mb-4"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    style={{
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        padding: '24px 32px',
                        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}
                >
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                            <h2 style={{ fontWeight: 800, color: '#2d3748', margin: 0 }}>Account Portal</h2>
                            <p style={{ color: '#718096', margin: 0, fontSize: 16 }}>Sign in to your account or create a new one</p>
                        </div>
                        <div className="d-flex align-items-center gap-3">
                            <User size={32} color="#667eea" weight="fill" />
                        </div>
                    </div>
                </motion.div>

                <div className="row gy-4">
                    <div className="col-xl-6 col-lg-6">
                        {/* Login Card Start */}
                        <form 
                            onSubmit={handleLogin}
                            style={{
                                opacity: 1,
                                transform: 'translateX(0)',
                                transition: 'all 0.5s ease'
                            }}
                        >
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                padding: '40px',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                height: '100%',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <SignIn size={32} color="#0ea5e9" weight="fill" />
                                    <h3 style={{ fontWeight: 800, color: '#1e293b', margin: 0 }}>Sign In</h3>
                                </div>
                                {error && <div className="alert alert-danger">{error}</div>}
                                {!showForgot ? (
                                    <>
                                        <div className="mb-4">
                                            <label style={{ color: '#374151', fontWeight: 600, marginBottom: 12, display: 'block' }}>
                                                Username <span style={{ color: '#ef4444' }}>*</span>
                                            </label>
                                            <div style={{ position: 'relative' }}>
                                                <User size={20} color="#6b7280" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} />
                                                <input
                                                    type="text"
                                                    id="username"
                                                    name="username"
                                                    placeholder="Enter your username"
                                                    value={loginData.username}
                                                    onChange={handleLoginChange}
                                                    style={{
                                                        width: '100%',
                                                        padding: '16px 16px 16px 48px',
                                                        borderRadius: '12px',
                                                        border: '2px solid rgba(14, 165, 233, 0.2)',
                                                        background: 'rgba(255, 255, 255, 0.8)',
                                                        fontSize: 16,
                                                        transition: 'all 0.3s ease',
                                                        outline: 'none'
                                                    }}
                                                    onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
                                                    onBlur={(e) => e.target.style.borderColor = 'rgba(14, 165, 233, 0.2)'}
                                                />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label style={{ color: '#374151', fontWeight: 600, marginBottom: 12, display: 'block' }}>
                                                Password <span style={{ color: '#ef4444' }}>*</span>
                                            </label>
                                            <div style={{ position: 'relative' }}>
                                                <Lock size={20} color="#6b7280" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} />
                                                <input
                                                    type="password"
                                                    id="password"
                                                    name="password"
                                                    placeholder="Enter your password"
                                                    value={loginData.password}
                                                    onChange={handleLoginChange}
                                                    style={{
                                                        width: '100%',
                                                        padding: '16px 48px 16px 48px',
                                                        borderRadius: '12px',
                                                        border: '2px solid rgba(14, 165, 233, 0.2)',
                                                        background: 'rgba(255, 255, 255, 0.8)',
                                                        fontSize: 16,
                                                        transition: 'all 0.3s ease',
                                                        outline: 'none'
                                                    }}
                                                    onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
                                                    onBlur={(e) => e.target.style.borderColor = 'rgba(14, 165, 233, 0.2)'}
                                                />
                                                <EyeSlash size={20} color="#6b7280" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', zIndex: 2 }} />
                                            </div>
                                        </div>
                                        <div className="mb-4 mt-4">
                                            <button 
                                                type="submit" 
                                                className="w-100 d-flex align-items-center justify-content-center gap-2"
                                                style={{
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    color: 'white',
                                                    padding: '16px 32px',
                                                    borderRadius: '50px',
                                                    fontWeight: 600,
                                                    fontSize: 16,
                                                    border: 'none',
                                                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                                                    textDecoration: 'none',
                                                    cursor: 'pointer',
                                                    transition: 'all 0.3s ease'
                                                }}
                                                onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                                                onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}

                                            >
                                                <SignIn size={20} /> Sign In
                                            </button>
                                            <div className="d-flex align-items-center gap-2 mt-3">
                                                <input type="checkbox" id="remember" style={{ accentColor: '#0ea5e9' }} />
                                                <label htmlFor="remember" style={{ color: '#64748b', fontSize: 14 }}>Remember me</label>
                                            </div>
                                        </div>
                                        <div className="mt-48">
                                            <a href="#" className="text-main-600 text-decoration-underline fw-semibold" onClick={e => { e.preventDefault(); setShowForgot(true); }}>
                                                Forgot your password?
                                            </a>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <div className="mb-24">
                                            <label htmlFor="forgotEmail" className="text-neutral-900 text-lg mb-8 fw-medium">
                                                Enter your email <span className="text-danger">*</span>{' '}
                                            </label>
                                            <input
                                                type="email"
                                                className="common-input"
                                                id="forgotEmail"
                                                placeholder="Enter your email"
                                                value={forgotEmail}
                                                onChange={e => setForgotEmail(e.target.value)}
                                            />
                                        </div>
                                        {forgotMsg && <div className="alert alert-success">{forgotMsg}</div>}
                                        {forgotError && <div className="alert alert-danger">{forgotError}</div>}
                                        <div className="mb-24 mt-48">
                                            <button 
                                                type="button" 
                                                className="btn d-flex align-items-center justify-content-center gap-2" 
                                                onClick={handleForgotPassword}
                                                style={{
                                                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                                    color: 'white',
                                                    padding: '16px 32px',
                                                    borderRadius: '50px',
                                                    fontWeight: 600,
                                                    fontSize: 16,
                                                    border: 'none',
                                                    boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                                                    textDecoration: 'none'
                                                }}
                                            >
                                                Send Reset Email
                                            </button>
                                            <button type="button" className="btn btn-link ms-3" onClick={() => setShowForgot(false)}>
                                                Back to Login
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </form>
                        {/* Login Card End */}
                    </div>
                    
                    <div className="col-xl-6 col-lg-6">
                        {/* Register Card Start */}
                        <form 
                            onSubmit={handleRegister}
                            style={{
                                opacity: 1,
                                transform: 'translateY(0)',
                                transition: 'all 0.5s ease'
                            }}
                        >
                            <div style={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                padding: '40px',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                height: '100%',
                                position: 'relative',
                                overflow: 'hidden'
                            }}>
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <UserPlus size={32} color="#0ea5e9" weight="fill" />
                                    <h3 style={{ fontWeight: 800, color: '#1e293b', margin: 0 }}>Create Account</h3>
                                </div>
                                {registerSuccess && <div className="alert alert-success">{registerSuccess}</div>}
                                {registerError && <div className="alert alert-danger">{registerError}</div>}
                                <div className="mb-4">
                                    <label style={{ color: '#374151', fontWeight: 600, marginBottom: 12, display: 'block' }}>
                                        Username <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <User size={20} color="#6b7280" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} />
                                        <input
                                            type="text"
                                            id="username"
                                            name="username"
                                            placeholder="Choose a username"
                                            value={registerData.username}
                                            onChange={handleRegisterChange}
                                            style={{
                                                width: '100%',
                                                padding: '16px 16px 16px 48px',
                                                borderRadius: '12px',
                                                border: '2px solid rgba(14, 165, 233, 0.2)',
                                                background: 'rgba(255, 255, 255, 0.8)',
                                                fontSize: 16,
                                                transition: 'all 0.3s ease',
                                                outline: 'none'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
                                            onBlur={(e) => e.target.style.borderColor = 'rgba(14, 165, 233, 0.2)'}
                                        />
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <label style={{ color: '#374151', fontWeight: 600, marginBottom: 12, display: 'block' }}>
                                        Password <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <Lock size={20} color="#6b7280" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} />
                                        <input
                                            type="password"
                                            id="password"
                                            name="password"
                                            placeholder="Create a strong password"
                                            value={registerData.password}
                                            onChange={handleRegisterChange}
                                            style={{
                                                width: '100%',
                                                padding: '16px 48px 16px 48px',
                                                borderRadius: '12px',
                                                border: '2px solid rgba(14, 165, 233, 0.2)',
                                                background: 'rgba(255, 255, 255, 0.8)',
                                                fontSize: 16,
                                                transition: 'all 0.3s ease',
                                                outline: 'none'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
                                            onBlur={(e) => e.target.style.borderColor = 'rgba(14, 165, 233, 0.2)'}
                                        />
                                        <EyeSlash size={20} color="#6b7280" style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', cursor: 'pointer', zIndex: 2 }} />
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label style={{ color: '#374151', fontWeight: 600, marginBottom: 12, display: 'block' }}>
                                        Email <span style={{ color: '#ef4444' }}>*</span>
                                    </label>
                                    <div style={{ position: 'relative' }}>
                                        <EnvelopeSimple size={20} color="#6b7280" style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }} />
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            placeholder="Enter your email"
                                            value={registerData.email}
                                            onChange={handleRegisterChange}
                                            style={{
                                                width: '100%',
                                                padding: '16px 16px 16px 48px',
                                                borderRadius: '12px',
                                                border: '2px solid rgba(14, 165, 233, 0.2)',
                                                background: 'rgba(255, 255, 255, 0.8)',
                                                fontSize: 16,
                                                transition: 'all 0.3s ease',
                                                outline: 'none'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = '#0ea5e9'}
                                            onBlur={(e) => e.target.style.borderColor = 'rgba(14, 165, 233, 0.2)'}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="my-4">
                                    <div style={{
                                        background: 'rgba(14, 165, 233, 0.05)',
                                        borderRadius: '12px',
                                        padding: '16px',
                                        border: '1px solid rgba(14, 165, 233, 0.1)'
                                    }}>
                                        <div className="d-flex align-items-center gap-2 mb-2">
                                            <Shield size={20} color="#0ea5e9" />
                                            <span style={{ color: '#0ea5e9', fontWeight: 600, fontSize: 14 }}>Privacy & Security</span>
                                        </div>
                                        <p style={{ color: '#64748b', fontSize: 13, margin: 0, lineHeight: 1.5 }}>
                                            Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our
                                            <Link to="#" style={{ color: '#0ea5e9', textDecoration: 'underline', marginLeft: 4 }}>privacy policy</Link>.
                                        </p>
                                    </div>
                                </div>
                                <div className="mt-4">
                                    <button 
                                        type="submit" 
                                        className="w-100 d-flex align-items-center justify-content-center gap-2"
                                        style={{
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            color: 'white',
                                            padding: '16px 32px',
                                            borderRadius: '50px',
                                            fontWeight: 600,
                                            fontSize: 16,
                                            border: 'none',
                                            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.3)',
                                            textDecoration: 'none',
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseEnter={(e) => e.target.style.transform = 'scale(1.02)'}
                                        onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}

                                    >
                                        <UserPlus size={20} /> Create Account
                                    </button>
                                </div>
                            </div>
                        </form>
                        {/* Register Card End */}
                    </div>
                    
                    <div className="col-xl-12 col-lg-12 mt-4">
                        <motion.div 
                            className="account-summary"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(20px)',
                                borderRadius: '24px',
                                padding: '32px',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                position: 'sticky',
                                top: '100px'
                            }}
                        >
                            <h4 style={{ fontWeight: 800, color: '#2d3748', marginBottom: 24 }}>Account Benefits</h4>
                            
                            <div className="benefits-list mb-4">
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: 'rgba(102, 126, 234, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <User size={20} color="#667eea" />
                                    </div>
                                    <div>
                                        <h6 style={{ fontWeight: 600, color: '#2d3748', margin: 0 }}>Account Management</h6>
                                        <p style={{ color: '#718096', fontSize: 14, margin: 0 }}>Manage your account and preferences</p>
                                    </div>
                                </div>
                                
                                <div className="d-flex align-items-center gap-3 mb-3">
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: 'rgba(72, 187, 120, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <Shield size={20} color="#48bb78" />
                                    </div>
                                    <div>
                                        <h6 style={{ fontWeight: 600, color: '#2d3748', margin: 0 }}>Secure Shopping</h6>
                                        <p style={{ color: '#718096', fontSize: 14, margin: 0 }}>Protected transactions and data</p>
                                    </div>
                                </div>
                                
                                <div className="d-flex align-items-center gap-3 mb-4">
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        borderRadius: '50%',
                                        background: 'rgba(251, 191, 36, 0.1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }}>
                                        <EnvelopeSimple size={20} color="#fbbf24" />
                                    </div>
                                    <div>
                                        <h6 style={{ fontWeight: 600, color: '#2d3748', margin: 0 }}>Exclusive Offers</h6>
                                        <p style={{ color: '#718096', fontSize: 14, margin: 0 }}>Special deals and early access</p>
                                    </div>
                                </div>
                            </div>

                            <hr style={{ margin: '24px 0', border: 'none', borderTop: '1px solid rgba(0, 0, 0, 0.1)' }} />

                            <div className="security-info mb-4">
                                <div className="d-flex align-items-center gap-3 p-3" style={{
                                    background: 'rgba(72, 187, 120, 0.05)',
                                    borderRadius: '16px',
                                    border: '1px solid rgba(72, 187, 120, 0.1)'
                                }}>
                                    <Shield size={20} color="#48bb78" />
                                    <span style={{ color: '#48bb78', fontSize: 14, fontWeight: 600 }}>SSL Secured</span>
                                </div>
                            </div>

                            <div className="help-section p-3" style={{
                                background: 'rgba(102, 126, 234, 0.05)',
                                borderRadius: '16px',
                                border: '1px solid rgba(102, 126, 234, 0.1)'
                            }}>
                                <h6 style={{ color: '#667eea', fontWeight: 600, marginBottom: 8 }}>Need Help?</h6>
                                <p style={{ color: '#718096', fontSize: 12, margin: 0 }}>
                                    Contact our support team for assistance with your account or any questions.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.section>
    );
}

export default Account;