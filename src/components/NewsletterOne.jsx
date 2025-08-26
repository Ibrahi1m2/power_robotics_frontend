import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import AOS from 'aos';
import 'aos/dist/aos.css';

const NewsletterOne = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: true,
        });
    }, []);

    return (
        <div 
            className="newsletter-section py-80"
            data-aos="fade-up"
        >
            <div className="container container-lg">
                <div 
                    className="newsletter-box position-relative rounded-24"
                    style={{
                        background: '#8a929a', // darker shade of #bfc7cf
                        padding: '60px 50px',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                        overflow: 'hidden'
                    }}
                >
                    <div className="row align-items-center">
                        <div className="col-xl-6">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <h1 className="text-white mb-12" style={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
                                    Don't Miss Out on Electronics & Robotics Deals
                                </h1>
                                <p className="text-white h5 mb-0" style={{ opacity: 0.9 }}>
                                    Sign up for the latest updates and offers.
                                </p>
                                <form action="#" className="position-relative mt-40">
                                    <input
                                        type="text"
                                        className="form-control common-input rounded-pill text-white py-22 px-16 pe-144"
                                        placeholder="Your email address..."
                                        style={{ 
                                            backgroundColor: 'rgba(255, 255, 255, 0.2)',
                                            border: '1px solid rgba(255, 255, 255, 0.3)',
                                            color: '#fff'
                                        }}
                                    />
                                    <button
                                        type="submit"
                                        className="btn btn-main-two rounded-pill position-absolute top-50 translate-middle-y inset-inline-end-0 me-10"
                                        style={{
                                            backgroundColor: '#ffffff',
                                            color: '#1c3d7e',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        Subscribe
                                    </button>
                                </form>
                            </motion.div>
                        </div>
                        <div className="col-xl-6 text-center d-xl-block d-none">
                            <motion.img 
                                src="assets/images/thumbs/newsletter-img.png" 
                                alt=""
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8, delay: 0.2 }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NewsletterOne;