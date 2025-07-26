import React, { useContext, useState } from 'react';
import { SuggestedContext } from './SuggestedContext';
import { StyledButton } from "./UI/StyledButton";
import { Container, Table, Modal, Form, Spinner } from 'react-bootstrap';
import { toast } from 'react-toastify';

export default function OffersAdmin() {
  const { items, loading, error, createItem, updateItem, deleteItem } =
    useContext(SuggestedContext);

  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState({
    title: '',
    price: '',
    image: '',
    description: '',
  });

  // Estado para errores de validación
  const [errors, setErrors] = useState({});

  const openNew = () => {
    setCurrent({ title: '', price: '', image: '', description: '' });
    setErrors({});
    setShow(true);
  };
  const openEdit = (p) => {
    setCurrent(p);
    setErrors({});
    setShow(true);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!current.title.trim()) {
      newErrors.title = 'Title is required.';
    }
    if (!current.price || Number(current.price) <= 0) {
      newErrors.price = 'Price must be greater than 0.';
    }
    if (
      !current.description.trim() ||
      current.description.trim().length < 10
    ) {
      newErrors.description =
        'Description must be at least 10 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const confirmDelete = (id) => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <p>Are you sure you want to delete this offer?</p>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => {
                deleteItem(id);
                toast.success('Offer deleted');
                closeToast();
              }}
              style={{
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Delete
            </button>
            <button
              onClick={closeToast}
              style={{
                backgroundColor: '#6c757d',
                color: 'white',
                border: 'none',
                padding: '4px 10px',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false }
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (current.id) {
      updateItem(current.id, current);
      toast.success('Offer updated successfully');
    } else {
      createItem(current);
      toast.success('Offer created successfully');
    }

    setShow(false);
  };

  if (loading) return <Spinner animation="border" className="mt-5" />;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <Container className="my-4">
      <h2>Manage Offers</h2>
      <StyledButton
        as="button"
        $variant="details"
        className="mb-3"
        onClick={openNew}
      >
        Add Offer
      </StyledButton>

      <Table striped>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((p) => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>U$S {p.price}</td>
              <td>
                <StyledButton
                  as="button"
                  $variant="close"
                  className="me-2"
                  onClick={() => openEdit(p)}
                >
                  Edit
                </StyledButton>
                <StyledButton
                  as="button"
                  $variant="remove"
                  onClick={() => confirmDelete(p.id)}
                >
                  Delete
                </StyledButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{current.id ? 'Edit Offer' : 'Add Offer'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {/* Title */}
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={current.title}
                onChange={(e) =>
                  setCurrent({ ...current, title: e.target.value })
                }
              />
              {errors.title && (
                <div className="text-danger">{errors.title}</div>
              )}
            </Form.Group>

            {/* Price */}
            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                value={current.price}
                onChange={(e) =>
                  setCurrent({ ...current, price: e.target.value })
                }
              />
              {errors.price && (
                <div className="text-danger">{errors.price}</div>
              )}
            </Form.Group>

            {/* Image URL */}
            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control
                type="url"
                value={current.image}
                onChange={(e) =>
                  setCurrent({ ...current, image: e.target.value })
                }
              />
            </Form.Group>

            {/* Description */}
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={current.description}
                onChange={(e) =>
                  setCurrent({ ...current, description: e.target.value })
                }
              />
              {errors.description && (
                <div className="text-danger">{errors.description}</div>
              )}
            </Form.Group>

            <StyledButton as="button" type="submit" $variant="add">
              Save
            </StyledButton>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}