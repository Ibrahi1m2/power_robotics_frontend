import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import OrderSlipPDF from './ProductCardTwo';
import { QrCode, WhatsappLogo } from "@phosphor-icons/react";
import ReactDOM from 'react-dom/client';
import html2canvas from 'html2canvas';

const Checkout = () => {
    const navigate = useNavigate();
    const { cartItems, removeFromCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showQR, setShowQR] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [orderSummary, setOrderSummary] = useState(null);
    const [shouldDownloadSlip, setShouldDownloadSlip] = useState(false);
    const [pendingOrderData, setPendingOrderData] = useState(null);
    const [showQRModal, setShowQRModal] = useState(false);

    // Form states
    const [selectedPayment, setSelectedPayment] = useState("cash_on_delivery");
    const [shippingAddress, setShippingAddress] = useState({
        name: '',
        country: 'India',
        address_line1: '',
        city: '',
        state: '',
        pin_code: '',
        phone: ''
    });
    const [notes, setNotes] = useState('');
    
    // Validation states
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    // Calculate totals
    let shipping_cost = 100;
    const stateValue = shippingAddress.state.trim().toLowerCase().replace(/\s+/g, '');
    if (stateValue === 'tamilnadu') {
        shipping_cost = 80;
    } else if (
        stateValue === 'kerala' ||
        stateValue === 'banglore' ||
        stateValue === 'bengaluru'
    ) {
        shipping_cost = 120;
    }
    const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const total_amount = subtotal + shipping_cost;

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.value);
    };

    const handleAddressChange = (field, value) => {
        setShippingAddress(prev => ({
            ...prev,
            [field]: value
        }));
        
        // Clear previous errors when user starts typing
        if (field === 'name') {
            setNameError('');
        }
        if (field === 'phone') {
            setPhoneError('');
        }
        
        // Validate name field (should not contain numbers)
        if (field === 'name') {
            const nameRegex = /^[a-zA-Z\s]*$/;
            if (value && !nameRegex.test(value)) {
                setNameError('Name should only contain letters and spaces');
            } else {
                setNameError('');
            }
        }
        
        // Validate phone field (should only contain numbers)
        if (field === 'phone') {
            const phoneRegex = /^[0-9]*$/;
            if (value && !phoneRegex.test(value)) {
                setPhoneError('Phone number should only contain numbers');
            } else {
                setPhoneError('');
            }
        }
    };

    const handleWhatsAppClick = () => {
        const phoneNumber = '918300364874';
        const whatsappUrl = `https://wa.me/${phoneNumber}`;
        window.open(whatsappUrl, '_blank');
    };

    const validateForm = () => {
        const requiredFields = ['name', 'country', 'address_line1', 'city', 'state', 'pin_code', 'phone'];
        
        for (const field of requiredFields) {
            if (!shippingAddress[field] || shippingAddress[field].trim() === '') {
                setError(`Please fill in ${field.replace('_', ' ')}`);
                return false;
            }
        }

        // Name validation (should not contain numbers)
        const nameRegex = /^[a-zA-Z\s]+$/;
        if (!nameRegex.test(shippingAddress.name.trim())) {
            setError('Name should only contain letters and spaces');
            return false;
        }

        // Phone validation (should only contain numbers and be 10 digits)
        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(shippingAddress.phone)) {
            setError('Please enter a valid 10-digit phone number');
            return false;
        }

        if (cartItems.length === 0) {
            setError('Your cart is empty');
            return false;
        }

        return true;
    };

    // Function to capture cart as image
    const captureCartImage = async () => {
        try {
            // Create order data for OrderSlipPDF
            const orderData = {
                invoiceNo: `ORD-${Date.now()}`,
                date: new Date().toLocaleDateString(),
                customerMobile: shippingAddress.phone,
                name: shippingAddress.name,
                items: cartItems.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                subtotal: subtotal,
                shipping: shipping_cost,
                total: total_amount,
                amountInWords: toWords(total_amount)
            };
    
            // Create a temporary div to render OrderSlipPDF
            const tempDiv = document.createElement('div');
            tempDiv.style.position = 'absolute';
            tempDiv.style.left = '-9999px';
            tempDiv.style.top = '-9999px';
            tempDiv.style.width = '900px';
            tempDiv.style.background = '#fff';
            document.body.appendChild(tempDiv);
    
            // Create a ref for the OrderSlipPDF component
            const slipRef = React.createRef();
    
            // Render OrderSlipPDF content
            const slipContent = (
                <div ref={slipRef} style={{ 
                    background: '#fff', 
                    color: '#000', 
                    padding: 32, 
                    maxWidth: 900, 
                    margin: '0 auto', 
                    fontFamily: 'Arial, sans-serif', 
                    border: '1px solid #ccc', 
                    borderRadius: 12 
                }}>
                    {/* HEADER */}
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                        <div style={{ 
                            width: 100, 
                            height: 100, 
                            borderRadius: '50%', 
                            marginRight: 28, 
                            objectFit: 'cover', 
                            border: '2px solid #222',
                            background: '#f0f0f0',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '12px',
                            color: '#666'
                        }}>
                            <img src="assets/images/logo/robo-logo.png" alt="Logo" style={{ width: '100%', height: '100%' }} />
                        </div>
                        <div>
                            <h2 style={{ margin: 0, fontWeight: 900, fontSize: 32 }}>Power Robotics</h2>
                            <div style={{ fontSize: 18, marginTop: 4 }}>Mobile: 9003779504</div>
                        </div>
                    </div>
                    
                    {/* Invoice Bar */}
                    <div style={{ 
                        background: '#f3f4f6', 
                        borderRadius: 4, 
                        padding: '10px 18px', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        fontWeight: 700, 
                        fontSize: 18, 
                        margin: '18px 0 12px 0' 
                    }}>
                        <span>Invoice No.: {orderData.invoiceNo}</span>
                        <span>Invoice Date: {orderData.date}</span>
                    </div>
                    
                    {/* BILL TO */}
                    <div style={{ marginBottom: 8 }}>
                        <strong style={{ fontSize: 18 }}>BILL TO</strong><br />
                        <span style={{ fontWeight: 700, fontSize: 17 }}>{orderData.name}</span><br />
                        <span style={{ fontSize: 16 }}>Mobile: {orderData.customerMobile}</span>
                    </div>
                    
                    {/* Product Table */}
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 18, marginBottom: 8 }}>
                        <thead>
                            <tr style={{ background: '#f3f4f6', fontWeight: 700, fontSize: 17 }}>
                                <th style={{ padding: 8, border: '1px solid #e5e7eb', textAlign: 'left' }}>Product</th>
                                <th style={{ padding: 8, border: '1px solid #e5e7eb', textAlign: 'center' }}>Qty</th>
                                <th style={{ padding: 8, border: '1px solid #e5e7eb', textAlign: 'right' }}>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orderData.items.map((item, idx) => (
                                <tr key={idx} style={{ fontSize: 16 }}>
                                    <td style={{ padding: 8, border: '1px solid #e5e7eb' }}>{item.name}</td>
                                    <td style={{ padding: 8, border: '1px solid #e5e7eb', textAlign: 'center' }}>{item.quantity}</td>
                                    <td style={{ padding: 8, border: '1px solid #e5e7eb', textAlign: 'right' }}>₹{(item.price * item.quantity).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    
                    {/* Subtotal, Shipping, Total */}
                    <div style={{ marginTop: 12, marginBottom: 8, fontSize: 17, fontWeight: 600, textAlign: 'right' }}>
                        <div>Subtotal: ₹{orderData.subtotal.toFixed(2)}</div>
                        <div>Shipping: ₹{orderData.shipping.toFixed(2)}</div>
                        <div style={{ fontWeight: 900, fontSize: 19, color: '#181A1E' }}>Total: ₹{orderData.total.toFixed(2)}</div>
                    </div>
                    
                    {/* TERMS & CONDITIONS */}
                    <div style={{ marginTop: 24 }}>
                        <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8 }}>Terms & Conditions</div>
                        <div style={{ fontWeight: 400, fontSize: 14, color: '#555' }}>
                            Goods once sold will not be taken back or exchanged.<br />
                            Please check the products at the time of delivery.
                        </div>
                    </div>
                    
                    {/* Amount in words */}
                    <div style={{ marginTop: 24, fontWeight: 700, fontSize: 16 }}>
                        Total Amount (in words)<br />
                        <span style={{ fontWeight: 400 }}>{orderData.amountInWords}</span>
                    </div>
                </div>
            );
    
            // Render the content to the temp div
            const root = ReactDOM.createRoot(tempDiv);
            root.render(slipContent);
    
            // Wait for the content to render
            await new Promise(resolve => setTimeout(resolve, 100));
    
            // Use html2canvas to capture the rendered content
            const canvas = await html2canvas(tempDiv.firstChild, { 
                scale: 2,
                backgroundColor: '#ffffff',
                useCORS: true,
                allowTaint: true,
                width: 900,
                height: tempDiv.firstChild.scrollHeight
            });
    
            // Clean up
            document.body.removeChild(tempDiv);
    
            // Convert canvas to blob
            return new Promise((resolve) => {
                canvas.toBlob(resolve, 'image/png', 0.95);
            });
    
        } catch (error) {
            console.error('Error capturing cart image:', error);
            return null;
        }
    };

    const handlePlaceOrder = async () => {
        console.log("Placing order"); // Debug log to confirm button works
        if (!validateForm()) {
            return;
        }

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            // Split name into first_name and last_name for backend compatibility
            const [first_name, ...rest] = shippingAddress.name.trim().split(' ');
            const last_name = rest.join(' ') || '';

            // Capture cart image
            const cartImageBlob = await captureCartImage();
            
            if (!cartImageBlob) {
                throw new Error('Failed to capture cart image');
            }

            // Create FormData for multipart/form-data
            const formData = new FormData();
            formData.append('cartImage', cartImageBlob, 'cart.png');
            
            // Add order data
            formData.append('shippingAddress', JSON.stringify({
                first_name,
                last_name,
                country: shippingAddress.country,
                address_line1: shippingAddress.address_line1,
                city: shippingAddress.city,
                state: shippingAddress.state,
                postal_code: shippingAddress.pin_code,
                phone: shippingAddress.phone,
                email: '' // Add email field if needed
            }));
            
            formData.append('items', JSON.stringify(cartItems));
            formData.append('subtotal', subtotal.toString());
            formData.append('shipping_cost', shipping_cost.toString());
            formData.append('total_amount', total_amount.toString());
            formData.append('payment_method', selectedPayment);
            formData.append('notes', notes);
            formData.append('user_id', 21);//Todo Need to dynamicaaly provide user id


            // Send to new endpoint
            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart-image/upload-and-create-order`, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();
            
            if (!response.ok) {
                throw new Error(result.message || 'Failed to create order');
            }

            // Generate slip text
            let slip = `Order Slip\n`;
            slip += `-----------------------------\n`;
            slip += `Name: ${shippingAddress.name}\n`;
            slip += `Phone: ${shippingAddress.phone}\n`;
            slip += `Address: ${shippingAddress.address_line1}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.pin_code}, ${shippingAddress.country}\n`;
            slip += `-----------------------------\n`;
            slip += `Products:\n`;
            cartItems.forEach(item => {
                slip += `- ${item.name} x${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}\n`;
            });
            slip += `-----------------------------\n`;
            slip += `Subtotal: ₹${subtotal.toFixed(2)}\n`;
            slip += `Shipping: ₹${shipping_cost.toFixed(2)}\n`;
            slip += `Total: ₹${total_amount.toFixed(2)}\n`;
            slip += `-----------------------------\n`;

            // Capture order summary before clearing cart
            setOrderSummary({
                name: shippingAddress.name,
                phone: shippingAddress.phone,
                address: `${shippingAddress.address_line1}, ${shippingAddress.city}, ${shippingAddress.state}, ${shippingAddress.pin_code}, ${shippingAddress.country}`,
                date: new Date().toLocaleDateString(),
                items: cartItems.map(item => ({
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                subtotal: subtotal,
                total: total_amount
            });

            const orderData = {
                invoiceNo: result.order_number || new Date().getTime(),
                date: new Date().toLocaleDateString(),
                name: shippingAddress.name,
                customerMobile: shippingAddress.phone,
                items: cartItems.map(item => ({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price
                })),
                subtotal: subtotal,
                shipping: shipping_cost,
                total: total_amount,
                amountInWords: toWords(total_amount)
            };
            console.log('Setting order data:', orderData);
            setPendingOrderData(orderData);
            setShouldDownloadSlip(true);
            console.log('Should download slip set to true');
            
            // Show success message with admin URL
            if (result.admin_url) {
                setSuccess(`Order placed successfully! Admin URL: ${result.admin_url}`);
            }
        } catch (err) {
            setError(err.message || 'Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    // Add a handler for closing the modal
    const handleCloseSlipModal = () => {
        setError('');
        cartItems.forEach(item => removeFromCart(item.cartItemId));
        setShowSuccess(true);
        setShouldDownloadSlip(false);
        setPendingOrderData(null);
        setTimeout(() => {
            setShowSuccess(false);
            navigate(`/`);
        }, 1000);
    };

    if (cartItems.length === 0) {
        return (
            <section className="checkout py-80">
                <div className="container container-lg">
                    <div className="text-center">
                        <h2 className="mb-4">Your cart is empty</h2>
                        <p className="mb-4">Add some products to your cart before proceeding to checkout.</p>
                        <Link to="/" className="btn btn-main">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="checkout-modern py-80" style={{ background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)', borderRadius: 32, margin: '48px 0', boxShadow: '0 8px 32px rgba(60,60,120,0.10)' }}>
            <div className="container container-lg">
                <div className="row" style={{ display: 'flex', justifyContent: 'center', gap: 32 }}>
                    <div className="col-xl-7 col-lg-8" style={{ minWidth: 340, maxWidth: 600, flex: '1 1 480px' }}>
                        <form onSubmit={(e) => { e.preventDefault(); handlePlaceOrder(); }} className="pe-xl-5" style={{ background: '#fff', borderRadius: 32, boxShadow: '0 4px 16px rgba(60,60,120,0.08)', padding: 40, marginBottom: 32 }}>
                            {/* Error message display */}
                            {error && !shouldDownloadSlip && (
                                <div style={{ color: 'red', marginBottom: 16, fontWeight: 600, fontSize: 18 }}>
                                    {error}
                                </div>
                            )}
                            {/* Success message display */}
                            {success && (
                                <div style={{ color: 'green', marginBottom: 16, fontWeight: 600, fontSize: 18 }}>
                                    {success}
                                </div>
                            )}
                            <h2 style={{ fontWeight: 900, fontSize: 28, color: '#181A1E', marginBottom: 24 }}>Shipping Details</h2>
                            <div className="row gy-3">
                                <div className="col-12">
                                    <input 
                                        type="text" 
                                        className={`common-input border-gray-100 ${nameError ? 'border-danger' : ''}`} 
                                        style={{ 
                                            borderRadius: 16, 
                                            fontSize: 18, 
                                            padding: 16, 
                                            marginBottom: nameError ? 4 : 12,
                                            borderColor: nameError ? '#dc3545' : ''
                                        }} 
                                        placeholder="Full Name" 
                                        value={shippingAddress.name} 
                                        onChange={e => handleAddressChange('name', e.target.value)} 
                                    />
                                    {nameError && (
                                        <div style={{ color: '#dc3545', fontSize: 14, marginBottom: 12 }}>
                                            {nameError}
                                        </div>
                                    )}
                                </div>
                                <div className="col-12">
                                    <input type="text" className="common-input border-gray-100" style={{ borderRadius: 16, fontSize: 18, padding: 16, marginBottom: 12 }} placeholder="Address Line 1" value={shippingAddress.address_line1} onChange={e => handleAddressChange('address_line1', e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <input type="text" className="common-input border-gray-100" style={{ borderRadius: 16, fontSize: 18, padding: 16, marginBottom: 12 }} placeholder="City" value={shippingAddress.city} onChange={e => handleAddressChange('city', e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <input type="text" className="common-input border-gray-100" style={{ borderRadius: 16, fontSize: 18, padding: 16, marginBottom: 12 }} placeholder="State" value={shippingAddress.state} onChange={e => handleAddressChange('state', e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <input type="text" className="common-input border-gray-100" style={{ borderRadius: 16, fontSize: 18, padding: 16, marginBottom: 12 }} placeholder="Pin Code" value={shippingAddress.pin_code} onChange={e => handleAddressChange('pin_code', e.target.value)} />
                                </div>
                                <div className="col-6">
                                    <input 
                                        type="text" 
                                        className={`common-input border-gray-100 ${phoneError ? 'border-danger' : ''}`} 
                                        style={{ 
                                            borderRadius: 16, 
                                            fontSize: 18, 
                                            padding: 16, 
                                            marginBottom: phoneError ? 4 : 12,
                                            borderColor: phoneError ? '#dc3545' : ''
                                        }} 
                                        placeholder="Phone Number" 
                                        value={shippingAddress.phone} 
                                        onChange={e => handleAddressChange('phone', e.target.value)} 
                                    />
                                    {phoneError && (
                                        <div style={{ color: '#dc3545', fontSize: 14, marginBottom: 12 }}>
                                            {phoneError}
                                        </div>
                                    )}
                                </div>
                                <div className="col-12">
                                    <input type="text" className="common-input border-gray-100" style={{ borderRadius: 16, fontSize: 18, padding: 16, marginBottom: 12 }} placeholder="Country" value={shippingAddress.country} onChange={e => handleAddressChange('country', e.target.value)} />
                                </div>
                                <div className="col-12">
                                    <textarea className="common-input border-gray-100" style={{ borderRadius: 16, fontSize: 18, padding: 16, marginBottom: 12, minHeight: 80 }} placeholder="Order Notes (optional)" value={notes} onChange={e => setNotes(e.target.value)} />
                                </div>
                            </div>
                            {/* QR Icon and WhatsApp Icon above Place Order button */}
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 24, marginTop: 32 }}>
                              <button
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                onClick={() => setShowQRModal(true)}
                                aria-label="Show QR Code"
                              >
                                <QrCode size={48} color="#333" />
                              </button>
                              <button
                                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                                onClick={handleWhatsAppClick}
                                aria-label="Contact on WhatsApp"
                              >
                                <WhatsappLogo size={48} color="#25D366" />
                              </button>
                            </div>
                            {showQRModal && (
                              <div style={{
                                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                                background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center'
                              }}>
                                <div style={{ background: '#fff', borderRadius: 16, padding: 24, boxShadow: '0 8px 32px rgba(60,60,120,0.15)', position: 'relative' }}>
                                  <button
                                    onClick={() => setShowQRModal(false)}
                                    style={{ position: 'absolute', top: 8, right: 8, background: 'none', border: 'none', fontSize: 28, cursor: 'pointer' }}
                                    aria-label="Close"
                                  >&times;</button>
                                  <img src="/assets/images/qr-code.png" alt="QR Code" style={{ width: 240, height: 240, display: 'block' }} />
                                </div>
                              </div>
                            )}
                            
                             
                             {/* Place Order button */}
                             <button 
                               onClick={() => {
                                 if (!validateForm()) {
                                   return;
                                 }
                                 
                                 const orderData = {
                                   invoiceNo: `ORD-${Date.now()}`,
                                   date: new Date().toLocaleDateString(),
                                   name: shippingAddress.name,
                                   customerMobile: shippingAddress.phone,
                                   items: cartItems.map(item => ({
                                     name: item.name,
                                     quantity: item.quantity,
                                     price: item.price
                                   })),
                                   subtotal: subtotal,
                                   shipping: shipping_cost,
                                   total: total_amount,
                                   amountInWords: toWords(total_amount)
                                 };
                                 console.log('Order data:', orderData);
                                 setPendingOrderData(orderData);
                                 setShouldDownloadSlip(true);
                               }}
                               className="btn w-100 mt-4 d-flex align-items-center justify-content-center gap-2"
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
                               disabled={loading}
                             >
                               {loading ? 'Processing...' : 'Place Order'}
                             </button>
                        </form>
                    </div>
                    <div className="col-xl-5 col-lg-4" style={{ minWidth: 320, maxWidth: 420, flex: '1 1 340px' }}>
                        <div className="order-summary-modern" style={{ background: '#fff', borderRadius: 32, boxShadow: '0 4px 16px rgba(60,60,120,0.08)', padding: 32, marginBottom: 32 }}>
                            <h3 style={{ fontWeight: 900, fontSize: 24, color: '#181A1E', marginBottom: 18 }}>Order Summary</h3>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {cartItems.map(item => (
                                    <li key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
                                        <img src={item.image_url || '/assets/images/thumbs/robo-1.png'} alt={item.name} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 12, background: '#f3f4f6', boxShadow: '0 2px 8px rgba(60,60,120,0.04)' }} />
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 700, fontSize: 17 }}>{item.name}</div>
                                            <div style={{ color: '#888', fontSize: 15 }}>Qty: {item.quantity}</div>
                                        </div>
                                        <div style={{ fontWeight: 700, fontSize: 17, color: '#6366f1' }}>₹{(item.price * item.quantity).toFixed(2)}</div>
                                    </li>
                                ))}
                            </ul>
                            <hr style={{ margin: '18px 0', border: 'none', borderTop: '1.5px solid #e5e7eb' }} />
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
                                <span>Subtotal</span>
                                <span>₹{subtotal.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: 18, marginBottom: 8 }}>
                                <span>Shipping</span>
                                <span>₹{shipping_cost.toFixed(2)}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 900, fontSize: 20, marginBottom: 0, color: '#181A1E' }}>
                                <span>Total</span>
                                <span>₹{total_amount.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                         {/* Render OrderSlipPDF in a visible modal/overlay when shouldDownloadSlip is true */}
             {console.log('Modal render check:', { shouldDownloadSlip, pendingOrderData: !!pendingOrderData })}
             {shouldDownloadSlip && pendingOrderData && (
                 <div style={{ 
                     position: 'fixed', 
                     top: 0, 
                     left: 0, 
                     width: '100vw', 
                     height: '100vh', 
                     background: 'rgba(0,0,0,0.7)', 
                     zIndex: 9999, 
                     display: 'flex', 
                     alignItems: 'center', 
                     justifyContent: 'center',
                     padding: '20px'
                 }}>
                     <div style={{ 
                         background: '#fff', 
                         borderRadius: 16, 
                         boxShadow: '0 8px 32px rgba(60,60,120,0.15)', 
                         padding: 24, 
                         maxWidth: 1000, 
                         width: '100%', 
                         maxHeight: '95vh', 
                         overflowY: 'auto', 
                         position: 'relative' 
                     }}>
                         {/* Close button */}
                         <button 
                             onClick={handleCloseSlipModal} 
                             style={{ 
                                 position: 'absolute', 
                                 top: 16, 
                                 right: 16, 
                                 background: '#dc3545', 
                                 color: '#fff',
                                 border: 'none', 
                                 borderRadius: '50%', 
                                 width: 40, 
                                 height: 40, 
                                 fontSize: 20, 
                                 fontWeight: 700, 
                                 cursor: 'pointer', 
                                 zIndex: 10,
                                 display: 'flex',
                                 alignItems: 'center',
                                 justifyContent: 'center'
                             }} 
                             title="Close"
                         >
                             ×
                         </button>
                         
                         {/* Modal Header */}
                         <div style={{ 
                             textAlign: 'center', 
                             marginBottom: 24, 
                             paddingBottom: 16, 
                             borderBottom: '2px solid #f3f4f6' 
                         }}>
                             <h2 style={{ 
                                 margin: 0, 
                                 fontWeight: 900, 
                                 fontSize: 28, 
                                 color: '#181A1E' 
                             }}>
                                 Order Slip Generated Successfully!
                             </h2>
                             <p style={{ 
                                 margin: '8px 0 0 0', 
                                 color: '#6b7280', 
                                 fontSize: 16 
                             }}>
                                 Your order has been placed. You can download the slip or send it via WhatsApp.
                             </p>
                         </div>
                         
                         {pendingOrderData ? (
                           <OrderSlipPDF order={pendingOrderData} autoDownload={false} />
                         ) : (
                           <div style={{ textAlign: 'center', padding: '40px', color: '#666' }}>
                             <h3>Loading order slip...</h3>
                             <p>Please wait while we generate your order slip.</p>
                           </div>
                         )}
                     </div>
                 </div>
             )}
        </section>
    )
}

// Add a helper function to convert numbers to words (simple version)
function toWords(num) {
  // You can use a library for more complex cases
  const a = [ '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen' ];
  const b = [ '', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety' ];
  if ((num = num.toString()).length > 9) return 'Overflow';
  let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return '';
  let str = '';
  str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'Crore ' : '';
  str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'Lakh ' : '';
  str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'Thousand ' : '';
  str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'Hundred ' : '';
  str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'Rupees ' : '';
  return str.trim();
}

export default Checkout