import React from 'react';
import { Card } from 'react-bootstrap';
import { BsImage } from 'react-icons/bs';

const ProductCard = ({ product, onClick }) => {
  return (
    <Card className="premium-card h-100" onClick={() => onClick(product)}>
      <div className="card-img-wrapper">
        {product.imagen ? (
          <img src={product.imagen} alt={product.nombre} loading="lazy" />
        ) : (
          <div className="placeholder-img">
            <BsImage size={48} opacity={0.5} />
          </div>
        )}
      </div>
      <div className="card-content">
        <h3 className="product-title">{product.nombre}</h3>
        <p className="product-desc">{product.descripcion}</p>
        <div className="product-footer">
          <span className="product-price">${parseFloat(product.precio).toFixed(2)}</span>
          <span className={`product-stock ${product.stock < 10 ? 'stock-low' : ''}`}>
            {product.stock} {product.stock === 1 ? 'disponible' : 'disponibles'}
          </span>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
