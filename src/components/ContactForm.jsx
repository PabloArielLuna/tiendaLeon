import React, { useState } from 'react';
import { Row, Col, Form } from 'react-bootstrap';
import { FaUser, FaEnvelope, FaComment, FaPhone, FaClipboardList } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { StyledButton } from './UI/StyledButton';

export default function ContactForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    source: '',
    interests: [],
    message: ''
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!form.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      const updated = checked
        ? [...form.interests, value]
        : form.interests.filter((i) => i !== value);
      setForm({ ...form, interests: updated });
    } else if (type === 'radio') {
      setForm({ ...form, [name]: value });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    // Simular envío
    toast.success('Message sent successfully!');
    setForm({
      name: '',
      email: '',
      phone: '',
      reason: '',
      source: '',
      interests: [],
      message: ''
    });
    setErrors({});
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label><FaUser className="me-2" />Name</Form.Label>
            <Form.Control name="name" value={form.name} onChange={handleChange} />
            {errors.name && <div className="text-danger">{errors.name}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><FaEnvelope className="me-2" />Email</Form.Label>
            <Form.Control name="email" value={form.email} onChange={handleChange} />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><FaPhone className="me-2" />Phone</Form.Label>
            <Form.Control name="phone" value={form.phone} onChange={handleChange} />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label><FaClipboardList className="me-2" />Reason</Form.Label>
            <Form.Select name="reason" value={form.reason} onChange={handleChange}>
              <option>Choose an option</option>
              <option>General Inquiry</option>
              <option>Support</option>
              <option>Feedback</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>How did you hear about us?</Form.Label>
            <div className="ms-2">
              {['Google', 'Instagram', 'Referral'].map((val) => (
                <Form.Check
                  inline
                  key={val}
                  type="radio"
                  label={val}
                  name="source"
                  value={val}
                  checked={form.source === val}
                  onChange={handleChange}
                />
              ))}
            </div>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Topics you're interested in:</Form.Label>
            <div className="ms-2">
              {['Promotions', 'Events', 'Partnerships'].map((val) => (
                <Form.Check
                  key={val}
                  type="checkbox"
                  label={val}
                  name="interests"
                  value={val}
                  checked={form.interests.includes(val)}
                  onChange={handleChange}
                />
              ))}
            </div>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label><FaComment className="me-2" />Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={10}
              name="message"
              value={form.message}
              onChange={handleChange}
            />
            {errors.message && <div className="text-danger">{errors.message}</div>}
          </Form.Group>

          <StyledButton
            as="button"
            type="submit"
            $variant="send"
            className="w-100"
          >
            Send
          </StyledButton>
        </Col>
      </Row>
    </Form>
  );
}