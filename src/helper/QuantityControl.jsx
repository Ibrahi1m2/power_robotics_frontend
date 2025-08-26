import React, { useState } from 'react';

const QuantityControl = ({ initialQuantity = 1, onQuantityChange }) => {
    const [quantity, setQuantity] = useState(initialQuantity);

    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1) {
            setQuantity(newQuantity);
            if (onQuantityChange) {
                onQuantityChange(newQuantity);
            }
        }
    };

    return (
        <div className="quantity-control d-flex align-items-center gap-16">
            <button
                type="button"
                className="btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-7 px-8 rounded-8 flex-center"
                onClick={() => handleQuantityChange(quantity - 1)}
            >
                <i className="ph ph-minus" />
            </button>
            <span className="text-heading fw-semibold">{quantity}</span>
            <button
                type="button"
                className="btn bg-gray-50 text-heading hover-bg-main-600 hover-text-white py-7 px-8 rounded-8 flex-center"
                onClick={() => handleQuantityChange(quantity + 1)}
            >
                <i className="ph ph-plus" />
            </button>
        </div>
    );
};

export default QuantityControl;
