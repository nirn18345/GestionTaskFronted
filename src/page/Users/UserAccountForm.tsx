import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

export interface UserFormData {
  firstName: string;
  lastName: string;
  dni: string;
  phone: string;
  email: string;
  password: string;
  roleId: string;
  createBy: string;
}



interface Props {
  formData: UserFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  roles: { roleId: string; roleName: string }[]; 
  isEdit?: boolean;
}

const UserAccountForm: React.FC<Props> = ({ formData, onChange, roles,isEdit }) => {
  return (
    <Form className="mx-auto" style={{ maxWidth: '900px' }}>
  <Row className="g-3">
    <Col md={6}>
      <div className="form-floating">
        <Form.Control
          type="text"
          className="form-control rounded shadow-sm"
          name="firstName"
          id="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={onChange}
        />
        <Form.Label htmlFor="firstName">First Name</Form.Label>
      </div>
    </Col>

    <Col md={6}>
      <div className="form-floating">
        <Form.Control
          type="text"
          className="form-control rounded shadow-sm"
          name="lastName"
          id="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={onChange}
        />
        <Form.Label htmlFor="lastName">Last Name</Form.Label>
      </div>
    </Col>

    <Col md={6}>
      <div className="form-floating">
        <Form.Control
          type="text"
          className="form-control rounded shadow-sm"
          name="dni"
          id="dni"
          placeholder="DNI"
          value={formData.dni}
          maxLength={15}
          onChange={onChange}
        />
        <Form.Label htmlFor="dni">DNI</Form.Label>
      </div>
    </Col>

    <Col md={6}>
      <div className="form-floating">
        <Form.Control
          type="text"
          className="form-control rounded shadow-sm"
          name="phone"
          id="phone"
            maxLength={10}
          placeholder="Phone"
          value={formData.phone}
          onChange={onChange}
        />
        <Form.Label htmlFor="phone">Phone</Form.Label>
      </div>
    </Col>

    <Col md={6}>
      <div className="form-floating">
        <Form.Control
          type="email"
          className="form-control rounded shadow-sm"
          name="email"
          id="email"
          placeholder="Email"
          value={formData.email}
          onChange={onChange}
        />
        <Form.Label htmlFor="email">Email</Form.Label>
      </div>
    </Col>

   {!isEdit && (
  <Col md={6}>
    <div className="form-floating">
      <Form.Control
        type="password"
        className="form-control rounded shadow-sm"
        name="password"
        id="password"
        placeholder="Password"
        value={formData.password}
        onChange={onChange}
      />
      <Form.Label htmlFor="password">Password</Form.Label>
    </div>
  </Col>
)}

    <Col md={12}>
      <div className="form-floating">
        <Form.Select
          className="form-select rounded shadow-sm"
          name="roleId"
          id="roleId"
          value={formData.roleId}
          onChange={onChange}
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.roleId} value={role.roleId}>
              {role.roleName}
            </option>
          ))}
        </Form.Select>
        <Form.Label htmlFor="roleId">Role</Form.Label>
      </div>
    </Col>
  </Row>
</Form>

  );
};

export default UserAccountForm;
