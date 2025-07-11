import React, { useContext, useState } from 'react';
import { SuggestedContext } from './SuggestedContext';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';

export default function OffersAdmin() {
  const { items, loading, error, createItem, updateItem, deleteItem } = useContext(SuggestedContext);
  const [show, setShow] = useState(false);
  const [current, setCurrent] = useState({ title:'', price:0, image:'', description:'' });

  const openNew = () => { setCurrent({ title:'', price:0, image:'', description:'' }); setShow(true); };
  const openEdit = p => { setCurrent(p); setShow(true); };

  const handleSubmit = e => {
  e.preventDefault();
  if (current && current.id) {
    updateItem(current.id, current);
  } else {
    createItem(current);
  }
  setShow(false);
};

  if (loading) return <Spinner />;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <Container className="my-4">
      <h2>Manage Offers</h2>
      <Button onClick={openNew} className="mb-3">Add Offer</Button>
      <Table striped>
        <thead>
          <tr><th>Title</th><th>Price</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {items.map(p => (
            <tr key={p.id}>
              <td>{p.title}</td>
              <td>U$S {p.price}</td>
              <td>
                <Button size="sm" onClick={() => openEdit(p)}>Edit</Button>{' '}
                <Button size="sm" variant="danger" onClick={() => {
                  if (confirm('Are you sure you want to delete this offer?')) deleteItem(p.id);
                }}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Header closeButton><Modal.Title>Offer</Modal.Title></Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-2">
              <Form.Label>Title</Form.Label>
              <Form.Control 
                required 
                value={current.title} 
                onChange={e=>setCurrent({...current,title:e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Price</Form.Label>
              <Form.Control 
                type="number" 
                required 
                value={current.price} 
                onChange={e=>setCurrent({...current,price:parseFloat(e.target.value)})}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Image URL</Form.Label>
              <Form.Control 
                type="url" 
                value={current.image} 
                onChange={e=>setCurrent({...current,image:e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={2} 
                value={current.description} 
                onChange={e=>setCurrent({...current,description:e.target.value})}
              />
            </Form.Group>
            <Button type="submit">Save</Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}