import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { BsPlus } from 'react-icons/bs';
import { Toaster, toast } from 'react-hot-toast';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import ProductFormModal from './components/ProductFormModal';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showFormModal, setShowFormModal] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Asume que el backend está corriendo en http://127.0.0.1:8000/
      const response = await axios.get('http://127.0.0.1:8000/productos/');
      setProducts(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching products:', err);
      setError('No se pudieron cargar los productos. Asegúrate de que el backend esté en ejecución.');
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    setShowDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowDetailModal(false);
    setTimeout(() => setSelectedProduct(null), 300); // clear after animation
  };

  const handleOpenForm = (product = null) => {
    setProductToEdit(product);
    setShowFormModal(true);
  };

  const handleCloseForm = () => {
    setShowFormModal(false);
    setTimeout(() => setProductToEdit(null), 300);
  };

  const handleSaveProduct = async (formData, id = null) => {
    try {
      if (id) {
        // Update
        await axios.patch(`http://127.0.0.1:8000/productos/${id}/`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Producto actualizado exitosamente');
      } else {
        // Create
        await axios.post('http://127.0.0.1:8000/productos/', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Producto creado exitosamente');
      }
      fetchProducts(); // Refresh list
    } catch (err) {
      toast.error('Ocurrió un error al guardar el producto');
      throw err; // Let the form modal handle the error display
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/productos/${id}/`);
      toast.success('Producto eliminado');
      fetchProducts(); // Refresh list
    } catch (err) {
      toast.error('Error al eliminar el producto.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <Toaster position="top-right" toastOptions={{
        style: {
          borderRadius: '10px',
          background: '#333',
          color: '#fff',
        },
      }} />
      <Container>
        <header className="app-header">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">
            <h1 className="title-gradient mb-0 text-start">Nuestros Productos</h1>
            <Button variant="primary" className="premium-btn d-flex align-items-center gap-2" onClick={() => handleOpenForm()}>
              <BsPlus size={24} /> Agregar Producto
            </Button>
          </div>
          <p className="subtitle text-start ms-0">
            Explora nuestra colección exclusiva. Diseño premium y calidad inigualable para ti.
          </p>
        </header>

        {loading && (
          <div className="loader-container">
            <div className="spinner"></div>
          </div>
        )}

        {error && (
          <div className="error-container">
            <h4>¡Ups! Algo salió mal</h4>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <Row className="g-4 mb-5">
            {products.map((product) => (
              <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
                <ProductCard product={product} onClick={handleCardClick} />
              </Col>
            ))}
            {products.length === 0 && (
              <Col>
                <div className="text-center text-muted my-5">
                  No hay productos disponibles por el momento.
                </div>
              </Col>
            )}
          </Row>
        )}
      </Container>

      <ProductDetailModal
        show={showDetailModal}
        onHide={handleCloseDetailModal}
        product={selectedProduct}
        onEdit={handleOpenForm}
        onDelete={handleDeleteProduct}
      />

      <ProductFormModal
        show={showFormModal}
        onHide={handleCloseForm}
        productToEdit={productToEdit}
        onSave={handleSaveProduct}
      />
    </div>
  );
}

export default App;
