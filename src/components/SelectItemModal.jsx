import React from 'react';

const SelectItemModal = ({ show, items, onClose, onSelect, title = 'Select Item' }) => {
  if (!show) return null;

  return (
    <div className="modal-backdrop" style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,40,80,0.18)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="modal-content" style={{ background: 'rgba(255,255,255,0.98)', borderRadius: 20, boxShadow: '0 8px 32px rgba(60,60,120,0.18)', minWidth: 340, maxWidth: 420, padding: 32, position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer' }}>&times;</button>
        <h3 style={{ fontWeight: 700, fontSize: 22, marginBottom: 24, color: '#222' }}>{title}</h3>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, maxHeight: 320, overflowY: 'auto' }}>
          {items.map(item => (
            <li key={item.id} style={{ marginBottom: 12 }}>
              <button
                onClick={() => onSelect(item)}
                style={{
                  width: '100%',
                  background: '#f3f4f6',
                  border: '1px solid #e0e7ff',
                  borderRadius: 12,
                  padding: '14px 18px',
                  fontSize: 16,
                  color: '#222',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'background 0.18s, box-shadow 0.18s',
                  boxShadow: '0 2px 8px rgba(60,60,120,0.04)',
                }}
                onMouseOver={e => e.currentTarget.style.background = '#e0e7ff'}
                onMouseOut={e => e.currentTarget.style.background = '#f3f4f6'}
              >
                {item.image && <img src={item.image} alt={item.name} style={{ width: 32, height: 32, objectFit: 'cover', borderRadius: 8, marginRight: 12, verticalAlign: 'middle' }} />}
                {item.name || item.title}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SelectItemModal; 