import React from 'react'

const ShippingTwo = () => {

    return (
        <section className="shipping-modern mb-80" id="shipping" style={{ width: '100%', background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)', borderRadius: 32, margin: '0 auto 48px auto', boxShadow: '0 8px 32px rgba(60,60,120,0.10)', maxWidth: 'none', padding: '32px 0' }}>
            <div className="container container-lg" style={{ maxWidth: 1400 }}>
                <div className="row gy-4" style={{ display: 'flex', justifyContent: 'center', gap: 32 }}>
                    <div className="col-xxl-3 col-lg-3 col-md-6" style={{ minWidth: 320, maxWidth: 400, flex: '1 1 340px' }}>
                        <div className="shipping-item-modern flex-align gap-20 rounded-24 bg-main-two-50 hover-bg-main-100 transition-2 p-5" style={{ minHeight: 160, boxShadow: '0 4px 16px rgba(60,60,120,0.08)', padding: 32 }}>
                            <span className="flex-center rounded-circle bg-main-two-600 text-white" style={{ width: 72, height: 72, fontSize: 38, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="ph-fill ph-car-profile" />
                            </span>
                            <div>
                                <h6 className="mb-0" style={{ fontWeight: 800, fontSize: 22 }}>Free Shipping</h6>
                                <span className="text-md text-heading" style={{ fontSize: 17 }}>Free shipping all over India</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-lg-3 col-md-6" style={{ minWidth: 320, maxWidth: 400, flex: '1 1 340px' }}>
                        <div className="shipping-item-modern flex-align gap-20 rounded-24 bg-main-two-50 hover-bg-main-100 transition-2 p-5" style={{ minHeight: 160, boxShadow: '0 4px 16px rgba(60,60,120,0.08)', padding: 32 }}>
                            <span className="flex-center rounded-circle bg-main-two-600 text-white" style={{ width: 72, height: 72, fontSize: 38, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="ph-fill ph-hand-heart" />
                            </span>
                            <div>
                                <h6 className="mb-0" style={{ fontWeight: 800, fontSize: 22 }}>100% Satisfaction</h6>
                                <span className="text-md text-heading" style={{ fontSize: 17 }}>Free shipping all over India</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-lg-3 col-md-6" style={{ minWidth: 320, maxWidth: 400, flex: '1 1 340px' }}>
                        <div className="shipping-item-modern flex-align gap-20 rounded-24 bg-main-two-50 hover-bg-main-100 transition-2 p-5" style={{ minHeight: 160, boxShadow: '0 4px 16px rgba(60,60,120,0.08)', padding: 32 }}>
                            <span className="flex-center rounded-circle bg-main-two-600 text-white" style={{ width: 72, height: 72, fontSize: 38, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="ph-fill ph-credit-card" />
                            </span>
                            <div>
                                <h6 className="mb-0" style={{ fontWeight: 800, fontSize: 22 }}>Secure Payments</h6>
                                <span className="text-md text-heading" style={{ fontSize: 17 }}>Free shipping all over India</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-3 col-lg-3 col-md-6" style={{ minWidth: 320, maxWidth: 400, flex: '1 1 340px' }}>
                        <div className="shipping-item-modern flex-align gap-20 rounded-24 bg-main-two-50 hover-bg-main-100 transition-2 p-5" style={{ minHeight: 160, boxShadow: '0 4px 16px rgba(60,60,120,0.08)', padding: 32 }}>
                            <span className="flex-center rounded-circle bg-main-two-600 text-white" style={{ width: 72, height: 72, fontSize: 38, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="ph-fill ph-chats" />
                            </span>
                            <div>
                                <h6 className="mb-0" style={{ fontWeight: 800, fontSize: 22 }}>24/7 Support</h6>
                                <span className="text-md text-heading" style={{ fontSize: 17 }}>Free shipping all over India</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ShippingTwo