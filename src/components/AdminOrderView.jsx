import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const AdminOrderView = () => {
    const { uniqueId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                setLoading(true);
                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/cart-image/admin/order/${uniqueId}`);
                
                if (!response.ok) {
                    throw new Error('Order not found');
                }
                
                const orderData = await response.json();
                setOrder(orderData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (uniqueId) {
            fetchOrder();
        }
    }, [uniqueId]);

    if (loading) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                fontSize: '18px',
                color: '#666'
            }}>
                Loading order details...
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                fontSize: '18px',
                color: '#e74c3c'
            }}>
                Error: {error}
            </div>
        );
    }

    if (!order) {
        return (
            <div style={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '100vh',
                fontSize: '18px',
                color: '#666'
            }}>
                Order not found
            </div>
        );
    }

    return (
        <div style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '40px 20px',
            fontFamily: 'Arial, sans-serif'
        }}>
            <div style={{ 
                background: '#fff', 
                borderRadius: '16px', 
                boxShadow: '0 8px 32px rgba(60,60,120,0.12)',
                padding: '40px',
                marginBottom: '32px'
            }}>
                <h1 style={{ 
                    color: '#181A1E', 
                    fontSize: '32px', 
                    fontWeight: '900',
                    marginBottom: '8px',
                    textAlign: 'center'
                }}>
                    Order Details
                </h1>
                <div style={{ 
                    textAlign: 'center', 
                    color: '#666', 
                    fontSize: '18px',
                    marginBottom: '40px'
                }}>
                    Order #{order.order_number}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
                    {/* Customer Information */}
                    <div>
                        <h2 style={{ 
                            color: '#181A1E', 
                            fontSize: '24px', 
                            fontWeight: '700',
                            marginBottom: '20px'
                        }}>
                            Customer Information
                        </h2>
                        <div style={{ 
                            background: '#f8fafc', 
                            padding: '24px', 
                            borderRadius: '12px',
                            marginBottom: '20px'
                        }}>
                            <p><strong>Name:</strong> {order.first_name} {order.last_name}</p>
                            <p><strong>Phone:</strong> {order.phone}</p>
                            <p><strong>Email:</strong> {order.guest_email || 'N/A'}</p>
                            <p><strong>Address:</strong></p>
                            <div style={{ marginLeft: '20px', color: '#666' }}>
                                <p>{order.address_line1}</p>
                                {order.address_line2 && <p>{order.address_line2}</p>}
                                <p>{order.city}, {order.state} {order.postal_code}</p>
                                <p>{order.country}</p>
                            </div>
                        </div>

                        <h2 style={{ 
                            color: '#181A1E', 
                            fontSize: '24px', 
                            fontWeight: '700',
                            marginBottom: '20px'
                        }}>
                            Order Items
                        </h2>
                        <div style={{ 
                            background: '#f8fafc', 
                            padding: '24px', 
                            borderRadius: '12px'
                        }}>
                            {order.items && order.items.map((item, index) => (
                                <div key={index} style={{ 
                                    display: 'flex', 
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    padding: '12px 0',
                                    borderBottom: index < order.items.length - 1 ? '1px solid #e5e7eb' : 'none'
                                }}>
                                    <div>
                                        <p style={{ fontWeight: '600', margin: '0 0 4px 0' }}>{item.product_name}</p>
                                        <p style={{ color: '#666', margin: '0' }}>Qty: {item.quantity}</p>
                                    </div>
                                    <div style={{ fontWeight: '700', color: '#6366f1' }}>
                                        ₹{(item.unit_price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Cart Image and Order Summary */}
                    <div>
                        <h2 style={{ 
                            color: '#181A1E', 
                            fontSize: '24px', 
                            fontWeight: '700',
                            marginBottom: '20px'
                        }}>
                            Cart Image
                        </h2>
                        {order.cart_image_url && (
                            <div style={{ 
                                background: '#f8fafc', 
                                padding: '24px', 
                                borderRadius: '12px',
                                marginBottom: '20px',
                                textAlign: 'center'
                            }}>
                                <img 
                                    src={`http://localhost:5000${order.cart_image_url}`} 
                                    alt="Cart Summary" 
                                    style={{ 
                                        maxWidth: '100%', 
                                        height: 'auto',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 16px rgba(60,60,120,0.08)'
                                    }}
                                />
                            </div>
                        )}

                        <h2 style={{ 
                            color: '#181A1E', 
                            fontSize: '24px', 
                            fontWeight: '700',
                            marginBottom: '20px'
                        }}>
                            Order Summary
                        </h2>
                        <div style={{ 
                            background: '#f8fafc', 
                            padding: '24px', 
                            borderRadius: '12px'
                        }}>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                marginBottom: '12px'
                            }}>
                                <span>Subtotal:</span>
                                <span>₹{order.subtotal.toFixed(2)}</span>
                            </div>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                marginBottom: '12px'
                            }}>
                                <span>Shipping:</span>
                                <span>₹{order.shipping_cost.toFixed(2)}</span>
                            </div>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                marginBottom: '12px'
                            }}>
                                <span>Tax:</span>
                                <span>₹{order.tax_amount.toFixed(2)}</span>
                            </div>
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                marginBottom: '12px'
                            }}>
                                <span>Discount:</span>
                                <span>₹{order.discount_amount.toFixed(2)}</span>
                            </div>
                            <hr style={{ 
                                border: 'none', 
                                borderTop: '2px solid #e5e7eb',
                                margin: '16px 0'
                            }} />
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between',
                                fontSize: '20px',
                                fontWeight: '900',
                                color: '#181A1E'
                            }}>
                                <span>Total:</span>
                                <span>₹{order.total_amount.toFixed(2)}</span>
                            </div>
                        </div>

                        <div style={{ 
                            background: '#f8fafc', 
                            padding: '24px', 
                            borderRadius: '12px',
                            marginTop: '20px'
                        }}>
                            <p><strong>Payment Method:</strong> {order.payment_method}</p>
                            <p><strong>Order Status:</strong> {order.status}</p>
                            <p><strong>Payment Status:</strong> {order.payment_status}</p>
                            <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                            {order.notes && (
                                <p><strong>Notes:</strong> {order.notes}</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminOrderView; 