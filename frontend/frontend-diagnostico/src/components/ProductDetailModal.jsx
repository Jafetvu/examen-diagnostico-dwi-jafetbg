import React, { useState } from 'react';
import { Modal, Button, Spinner } from 'react-bootstrap';
import { BsImage, BsBoxSeam, BsTag, BsPencil, BsTrash } from 'react-icons/bs';

const ProductDetailModal = ({ show, onHide, product, onEdit, onDelete }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  if (!product) return null;

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(product.id);
    setIsDeleting(false);
    setShowConfirmDelete(false);
    onHide();
  };

  const handleClose = () => {
    setShowConfirmDelete(false);
    onHide();
  };

  const handleEdit = () => {
    onHide(); // close detail modal
    onEdit(product); // open edit modal
  };

  return (
    <Modal show={show} onHide={onHide} size="lg" centered className="premium-modal">
      <Modal.Header closeButton>
        <Modal.Title>{product.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="modal-img-container">
          {product.imagen ? (
            <img src={product.imagen} alt={product.nombre} />
          ) : (
            <BsImage size={64} opacity={0.3} color="#94a3b8" />
          )}
        </div>
        <div className="modal-details">
          <div className="detail-price">${parseFloat(product.precio).toFixed(2)}</div>
          <p className="detail-desc">{product.descripcion}</p>
          
          <div className="detail-meta">
            <div className="meta-item">
              <BsBoxSeam size={18} />
              <span>Stock: <strong>{product.stock}</strong> unidades</span>
            </div>
            <div className="meta-item">
              <BsTag size={18} />
              <span>ID: <strong>#{product.id}</strong></span>
            </div>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer className={`border-0 bg-light ${showConfirmDelete ? 'flex-column align-items-stretch' : 'd-flex justify-content-between'}`}>
        {showConfirmDelete ? (
          <div className="w-100 text-center py-2 fade-in">
            <h5 className="text-danger mb-3 fw-bold">¿Eliminar este producto?</h5>
            <p className="text-muted mb-4">Esta acción no se puede deshacer.</p>
            <div className="d-flex gap-2 justify-content-center">
              <Button variant="light" className="px-4 rounded-pill" onClick={() => setShowConfirmDelete(false)} disabled={isDeleting}>
                Cancelar
              </Button>
              <Button variant="danger" className="px-4 rounded-pill d-flex align-items-center gap-2" onClick={handleDelete} disabled={isDeleting}>
                {isDeleting ? <Spinner size="sm" animation="border" /> : <BsTrash />} Sí, eliminar
              </Button>
            </div>
          </div>
        ) : (
          <>
            <Button variant="outline-danger" className="border-0 rounded-pill d-flex align-items-center gap-2 px-3" onClick={() => setShowConfirmDelete(true)}>
              <BsTrash /> Eliminar
            </Button>
            <div className="d-flex gap-2">
              <Button variant="secondary" className="px-4 border-0 rounded-pill" onClick={handleClose}>
                Cerrar
              </Button>
              <Button variant="primary" className="premium-btn d-flex align-items-center gap-2" onClick={handleEdit}>
                <BsPencil /> Editar
              </Button>
            </div>
          </>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ProductDetailModal;
