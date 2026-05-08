import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';

const ProductFormModal = ({ show, onHide, productToEdit, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    imagen: null
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        nombre: productToEdit.nombre || '',
        descripcion: productToEdit.descripcion || '',
        precio: productToEdit.precio || '',
        stock: productToEdit.stock || '',
        imagen: null // No pre-cargamos la imagen como archivo, si es nulo no la enviamos
      });
    } else {
      setFormData({
        nombre: '',
        descripcion: '',
        precio: '',
        stock: '',
        imagen: null
      });
    }
    setError(null);
  }, [productToEdit, show]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'imagen') {
      setFormData({ ...formData, imagen: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const data = new FormData();
    data.append('nombre', formData.nombre);
    data.append('descripcion', formData.descripcion);
    data.append('precio', formData.precio);
    data.append('stock', formData.stock);
    if (formData.imagen) {
      data.append('imagen', formData.imagen);
    }

    try {
      await onSave(data, productToEdit?.id);
      onHide();
    } catch (err) {
      console.error(err);
      setError('Ocurrió un error al guardar el producto. Verifica los datos.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} centered className="premium-modal">
      <Modal.Header closeButton>
        <Modal.Title>{productToEdit ? 'Editar Producto' : 'Nuevo Producto'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body className="p-4">
          {error && <Alert variant="danger">{error}</Alert>}
          
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className="premium-input"
              placeholder="Ej. Teclado Mecánico"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              className="premium-input"
              placeholder="Detalles del producto..."
            />
          </Form.Group>

          <div className="row">
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Precio ($)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="precio"
                  value={formData.precio}
                  onChange={handleChange}
                  required
                  className="premium-input"
                  placeholder="0.00"
                />
              </Form.Group>
            </div>
            <div className="col-md-6">
              <Form.Group className="mb-3">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                  className="premium-input"
                  placeholder="Cantidad"
                />
              </Form.Group>
            </div>
          </div>

          <Form.Group className="mb-3">
            <Form.Label>Imagen (Opcional)</Form.Label>
            <Form.Control
              type="file"
              name="imagen"
              onChange={handleChange}
              accept="image/*"
              className="premium-input"
            />
            {productToEdit?.imagen && !formData.imagen && (
              <Form.Text className="text-muted mt-2 d-block">
                Mantén este campo vacío para conservar la imagen actual.
              </Form.Text>
            )}
          </Form.Group>

        </Modal.Body>
        <Modal.Footer className="border-0 bg-light">
          <Button variant="secondary" onClick={onHide} className="px-4 border-0 rounded-pill" disabled={isSubmitting}>
            Cancelar
          </Button>
          <Button variant="primary" type="submit" className="premium-btn" disabled={isSubmitting}>
            {isSubmitting ? (
              <><Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" /> Guardando...</>
            ) : (
              'Guardar'
            )}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ProductFormModal;
