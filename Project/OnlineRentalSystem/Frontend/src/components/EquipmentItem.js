import React from 'react';
import './EquipmentItem.css';

function EquipmentItem({ item, onToggle, onDelete, currentUser }) {
  const isOwner = currentUser && item.createdBy === currentUser;

  return (
    <div className={`equipment-card ${item.available ? 'available' : 'rented'}`}>
      <div className="card-header">
        <h3 className="item-title">{item.name}</h3>
        {isOwner ? (
          <button
            onClick={() => onDelete(item._id)}
            className="delete-btn"
            title="Delete Equipment"
          >
            &times;
          </button>
        ) : (
          <div style={{ width: 34 }} /> /* space to align header */
        )}
      </div>

      <p className="item-desc">{item.description}</p>

      <div className="card-row">
        <div className="price">₹{item.pricePerDay}</div>
        <div className="status">{item.available ? 'Available' : 'Rented'}</div>
      </div>

      <div className="card-actions">
        <button
          className={`action-btn ${item.available ? '' : 'secondary'}`}
          onClick={() => onToggle(item._id, !item.available)}
        >
          {item.available ? 'Rent' : 'Return'}
        </button>
      </div>

      <div className="card-footer">
        <div className="added-by">Added by: {item.createdBy || 'Unknown'}</div>
      </div>
    </div>
  );
}

export default EquipmentItem;
