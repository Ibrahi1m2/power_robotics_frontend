import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const OrderConfirmationPage = () => {
    const { orderId } = useParams();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchOrderDetails = async () => {
            try {
                const token = localStorage.getItem('token');
                const headers = {
                    'Content-Type': 'application/json'
                };

                if (token) {
                    headers['Authorization'] = `Bearer ${token}`;
                }

                const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/checkout/order/${orderId}`, {
                    headers: headers
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch order details');
                }

                const orderData = await response.json();
                setOrder(orderData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (orderId) {
            fetchOrderDetails();
        }
    }, [orderId]);

    if (loading) {
        return (
            <section className="py-80">
                <div className="container container-lg">
                    <div className="text-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                        <p className="mt-3">Loading order details...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="py-80">
                <div className="container container-lg">
                    <div className="text-center">
                        <div className="alert alert-danger" role="alert">
                            {error}
                        </div>
                        <Link to="/" className="btn btn-main">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    if (!order) {
        return (
            <section className="py-80">
                <div className="container container-lg">
                    <div className="text-center">
                        <h2>Order not found</h2>
                        <p>Sorry, we couldn't find the order you're looking for.</p>
                        <Link to="/" className="btn btn-main">
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-80">
            <div className="container container-lg">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        {/* Success Message */}
                        <div className="text-center mb-5">
                            <div className="mb-4">
                                <i className="ph ph-check-circle text-success" style={{ fontSize: '4rem' }}></i>
                            </div>
                            <h1 className="text-success mb-3">Order Confirmed!</h1>
                            <p className="text-muted">Thank you for your purchase. Your order has been successfully placed.</p>
                        </div>

                        {/* Order Summary Card */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-header bg-success text-white">
                                <h5 className="mb-0">Order Summary</h5>
                            </div>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <p><strong>Order Number:</strong> {order.order_number}</p>
                                        <p><strong>Order Date:</strong> {new Date(order.created_at).toLocaleDateString()}</p>
                                        <p><strong>Status:</strong> 
                                            <span className={`badge ms-2 ${
                                                order.status === 'pending' ? 'bg-warning' :
                                                order.status === 'processing' ? 'bg-info' :
                                                order.status === 'shipped' ? 'bg-primary' :
                                                order.status === 'delivered' ? 'bg-success' :
                                                'bg-secondary'
                                            }`}>
                                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                            </span>
                                        </p>
                                        <p><strong>Payment Method:</strong> {order.payment_method.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</p>
                                        <p><strong>Payment Status:</strong> 
                                            <span className={`badge ms-2 ${
                                                order.payment_status === 'paid' ? 'bg-success' :
                                                order.payment_status === 'pending' ? 'bg-warning' :
                                                'bg-danger'
                                            }`}>
                                                {order.payment_status.charAt(0).toUpperCase() + order.payment_status.slice(1)}
                                            </span>
                                        </p>
                                    </div>
                                    <div className="col-md-6">
                                        <p><strong>Subtotal:</strong> ₹{parseFloat(order.subtotal).toFixed(2)}</p>
                                        <p><strong>Shipping:</strong> {order.shipping_cost === 0 ? 'Free' : `₹${parseFloat(order.shipping_cost).toFixed(2)}`}</p>
                                        <p><strong>Tax:</strong> ₹{parseFloat(order.tax_amount).toFixed(2)}</p>
                                        <p><strong>Total:</strong> ₹{parseFloat(order.total_amount).toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-header">
                                <h5 className="mb-0">Shipping Address</h5>
                            </div>
                            <div className="card-body">
                                <p><strong>{order.first_name} {order.last_name}</strong></p>
                                {order.business_name && <p>{order.business_name}</p>}
                                <p>{order.address_line1}</p>
                                {order.address_line2 && <p>{order.address_line2}</p>}
                                <p>{order.city}, {order.state} {order.postal_code}</p>
                                <p>{order.country}</p>
                                <p><strong>Phone:</strong> {order.phone}</p>
                                <p><strong>Email:</strong> {order.email}</p>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="card border-0 shadow-sm mb-4">
                            <div className="card-header">
                                <h5 className="mb-0">Order Items</h5>
                            </div>
                            <div className="card-body">
                                {order.items && order.items.map((item, index) => (
                                    <div key={index} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                                        <div className="flex-shrink-0 me-3">
                                            <img 
                                                src={item.product_image || "assets/images/thumbs/product-two-img1.png"} 
                                                alt={item.product_name}
                                                style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                                                className="rounded"
                                            />
                                        </div>
                                        <div className="flex-grow-1">
                                            <h6 className="mb-1">{item.product_name}</h6>
                                            <p className="text-muted mb-0">Quantity: {item.quantity}</p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            <span className="fw-bold">₹{parseFloat(item.total_price).toFixed(2)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Notes */}
                        {order.notes && (
                            <div className="card border-0 shadow-sm mb-4">
                                <div className="card-header">
                                    <h5 className="mb-0">Order Notes</h5>
                                </div>
                                <div className="card-body">
                                    <p className="mb-0">{order.notes}</p>
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="text-center">
                            <Link to="/" className="btn btn-main me-3">
                                Continue Shopping
                            </Link>
                            <Link to="/account" className="btn btn-outline-secondary">
                                View My Orders
                            </Link>
                        </div>

                        {/* Additional Information */}
                        <div className="mt-5">
                            <div className="alert alert-info" role="alert">
                                <h6>What happens next?</h6>
                                <ul className="mb-0">
                                    <li>You will receive an email confirmation with your order details</li>
                                    <li>We will process your order and update you on the status</li>
                                    <li>Once shipped, you will receive tracking information</li>
                                    <li>For any questions, please contact our customer support</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrderConfirmationPage; 