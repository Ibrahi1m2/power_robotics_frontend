import React, { useRef, useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import SelectItemModal from './SelectItemModal';

const OrderSlipPDF = ({ order, autoDownload }) => {
  const slipRef = useRef();
  // Demo state for select item popup
  const [showSelect, setShowSelect] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const sampleItems = [
    { id: 1, name: 'Product A', image: '/assets/images/thumbs/product-img1.png' },
    { id: 2, name: 'Product B', image: '/assets/images/thumbs/product-img2.png' },
    { id: 3, name: 'Product C', image: '/assets/images/thumbs/product-img3.png' },
  ];
  const [showGuide, setShowGuide] = useState(false);

  const handleDownload = async () => {
    // Hide no-print elements temporarily
    const noPrintElements = slipRef.current.querySelectorAll('.no-print');
    const originalDisplays = [];
    noPrintElements.forEach(el => {
      originalDisplays.push(el.style.display);
      el.style.display = 'none';
    });

    const canvas = await html2canvas(slipRef.current, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'pt', 'a4');
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('order-slip.pdf');

    // Restore original display states
    noPrintElements.forEach((el, index) => {
      el.style.display = originalDisplays[index];
    });
  };

  // WhatsApp message handler - downloads image and opens WhatsApp
  const handleSendWhatsApp = async () => {
    if (!order) {
      console.log('No order data available');
      return;
    }
    
    console.log('Starting WhatsApp send process...');
    
    try {
      // Convert the order slip to canvas/image
      console.log('Converting to canvas...');
      const canvas = await html2canvas(slipRef.current, { 
        scale: 2,
        backgroundColor: '#ffffff',
        useCORS: true,
        allowTaint: true,
        logging: true
      });
      
      console.log('Canvas created successfully');
      
      // Convert canvas to data URL and trigger download
      const dataURL = canvas.toDataURL('image/png', 0.95);
      
      // Create download link
      const link = document.createElement('a');
      link.href = dataURL;
      link.download = `order-slip-${order.invoiceNo || 'order'}.png`;
      
      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      console.log('Image downloaded successfully');
      
      // Wait a moment then open WhatsApp
      setTimeout(() => {
        // Create WhatsApp message
        let message = `*Order Slip - ${order.invoiceNo || 'New Order'}*%0A%0A`;
        message += `📋 *Customer Details:*%0A`;
        message += `Name: ${order.name || 'Cash Sale'}%0A`;
        message += `Phone: ${order.customerMobile || order.phone || ''}%0A`;
        
        if (order.address) {
          message += `Address: ${order.address}%0A%0A`;
        } else {
          message += `%0A`;
        }
        
        message += `🛍️ *Order Summary:*%0A`;
        if (order.items && order.items.length > 0) {
          order.items.forEach(item => {
            message += `• ${item.name} x${item.quantity} = ₹${(item.price * item.quantity).toFixed(2)}%0A`;
          });
        }
        
        message += `%0A💰 *Payment Details:*%0A`;
        message += `Subtotal: ₹${order.subtotal?.toFixed(2) || '0.00'}%0A`;
        message += `Shipping: ₹${order.shipping?.toFixed(2) || '0.00'}%0A`;
        message += `*Total: ₹${order.total?.toFixed(2) || '0.00'}*%0A%0A`;
        message += `📸 *Order slip image has been downloaded automatically.*%0A`;
        message += `Please attach the image to this chat and send.%0A%0A`;
        message += `Thank you for your order! 🙏`;
        
        // Open WhatsApp with the message
        const whatsappUrl = `https://wa.me/919003779504?text=${encodeURIComponent(message)}`;
        console.log('Opening WhatsApp:', whatsappUrl);
        window.open(whatsappUrl, '_blank');
        
        // Show guidance message
        setShowGuide(true);
      }, 500);
      
    } catch (error) {
      console.error('Error in WhatsApp send:', error);
      
      // Fallback: open WhatsApp with text message only
      let fallbackMessage = `*Order Slip - ${order.invoiceNo || 'New Order'}*%0A%0A`;
      fallbackMessage += `❌ *Unable to generate image automatically.*%0A%0A`;
      fallbackMessage += `📋 *Order Details:*%0A`;
      fallbackMessage += `Customer: ${order.name || 'Cash Sale'}%0A`;
      fallbackMessage += `Phone: ${order.customerMobile || order.phone || ''}%0A`;
      fallbackMessage += `Total: ₹${order.total?.toFixed(2) || '0.00'}%0A%0A`;
      fallbackMessage += `Please use the Download PDF button to get the order slip and attach manually.`;
      
      const fallbackUrl = `https://wa.me/919003779504?text=${encodeURIComponent(fallbackMessage)}`;
      window.open(fallbackUrl, '_blank');
      setShowGuide(true);
    }
  };

  useEffect(() => {
    if (autoDownload) {
      // Wait for the slip to render, then trigger download
      setTimeout(() => {
        handleDownload();
      }, 500);
    }
    // eslint-disable-next-line
  }, [autoDownload]);

  return (
    <div>
      {/* DEMO: Select Item Popup */}
      <div ref={slipRef} style={{ background: '#fff', color: '#000', padding: 32, maxWidth: 900, margin: '0 auto', fontFamily: 'Arial, sans-serif', border: '1px solid #ccc', borderRadius: 12 }}>
        {/* HEADER */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <img src="/assets/images/logo/robo-logo.png" alt="Logo" style={{ width: 100, height: 100, borderRadius: '50%', marginRight: 28, objectFit: 'cover', border: '2px solid #222' }} />
          <div>
            <h2 style={{ margin: 0, fontWeight: 900, fontSize: 32 }}>Power Robotics</h2>
            <div style={{ fontSize: 18, marginTop: 4 }}>Mobile: 8300364874</div>
          </div>
        </div>
        {/* Invoice Bar */}
        <div style={{ background: '#f3f4f6', borderRadius: 4, padding: '10px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: 18, margin: '18px 0 12px 0' }}>
          <span>Invoice No.: {order.invoiceNo}</span>
          <span>Invoice Date: {order.date}</span>
        </div>
        {/* BILL TO */}
        <div style={{ marginBottom: 8 }}>
          <strong style={{ fontSize: 18 }}>BILL TO</strong><br />
          <span style={{ fontWeight: 700, fontSize: 17 }}>{order.name || 'Cash Sale'}</span><br />
          <span style={{ fontSize: 16 }}>Mobile: {order.customerMobile}</span>
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
            {order.items && order.items.map((item, idx) => (
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
          <div>Subtotal: ₹{order.subtotal?.toFixed(2)}</div>
          <div>Shipping: ₹{order.shipping?.toFixed(2)}</div>
          <div style={{ fontWeight: 900, fontSize: 19, color: '#181A1E' }}>Total: ₹{order.total?.toFixed(2)}</div>
        </div>
        {/* Download PDF Button - Hidden in PDF */}
        <div style={{ textAlign: 'right', marginBottom: 12, display: 'flex', gap: 12, justifyContent: 'flex-end' }} className="no-print">
          <button onClick={handleDownload} style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', fontWeight: 700, fontSize: 17, cursor: 'pointer', marginTop: 8 }}>
            Download PDF
          </button>
        </div>
        {/* Guidance Message */}
        {showGuide && (
          <div style={{ background: '#fffbe6', color: '#b45309', border: '1px solid #fde68a', borderRadius: 8, padding: 16, margin: '12px 0', fontWeight: 600, fontSize: 16, textAlign: 'center', position: 'relative' }}>
            <span>
              Please attach the downloaded PDF slip in WhatsApp before sending your message.
            </span>
            <button onClick={() => setShowGuide(false)} style={{ position: 'absolute', top: 8, right: 12, background: 'none', border: 'none', fontSize: 20, fontWeight: 700, color: '#b45309', cursor: 'pointer' }} title="Close">&times;</button>
          </div>
        )}
        {/* TERMS & CONDITIONS ONLY */}
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
          <span style={{ fontWeight: 400 }}>{order.amountInWords}</span>
        </div>
      </div>
      {!autoDownload && (
        <button onClick={handleDownload} style={{ marginTop: 24 }}>Download PDF</button>
      )}
    </div>
  );
};

export default OrderSlipPDF;