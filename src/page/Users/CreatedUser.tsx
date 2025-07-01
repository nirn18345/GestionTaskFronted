import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import UserAccountForm from './UserAccountForm';
import { createdAccount } from '../../services/accountService';
import { getRoles } from '../../services/roleService';
import { createUser, getUserById, updatedUser } from '../../services/userService';
import { useModal } from '../components/ModalContext';

export interface UserFormData {
  firstName: string;
  lastName: string;
  dni: string;
  phone: string;
  email: string;
  password: string;
  roleId: string;
  createBy: string;
  accountId?: string; // nuevo
}


const UserFormPage: React.FC = () => {
  const { userId } = useParams(); // si viene userId, es edición
  const navigate = useNavigate();
  const { showModal } = useModal();
  const isEdit = Boolean(userId);

  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    dni: '',
    phone: '',
    email: '',
    password: '',
    roleId: '',
    accountId:'',
    createBy: localStorage.getItem('userName') || 'System',
  });

  const [roles, setRoles] = useState<{ roleId: string; roleName: string }[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const resetFormData = () => {
    setFormData({
      firstName: '',
      lastName: '',
      dni: '',
      phone: '',
      email: '',
      password: '',
      roleId: '',
      createBy: localStorage.getItem('userName') || 'System',
    });
  };

  const handleSubmit = async () => {
  try {
    if (isEdit && userId) {
      const { password, createBy,email, ...rest } = formData; // excluir createBy y password
      const updatePayload = {
        ...rest,
        userID: userId, // requerido por tu API
        modifiedBy: localStorage.getItem('userName') || 'System',
        accountId: formData.accountId!, // debe existir
      };

      const response = await updatedUser(updatePayload);
      showModal('success', response.message || 'User updated successfully', 'System');
    } else {
      const accountID = await createdAccount(formData.email, formData.password, formData.createBy);
      const response = await createUser({
        ...formData,
        accountId: accountID,
        createdBy: formData.createBy,
      });
      showModal('success', response.message || 'User created successfully', 'System');
      resetFormData();
    }

    navigate('/app/users/list');
  } catch (err) {
    console.error(err);
  }
};



useEffect(() => {
  (async () => {
    const result = await getRoles();
    setRoles(result);

    if (isEdit && userId) {
      const user = await getUserById(userId);
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        dni: user.dni,
        phone: user.phone,
        email: user.email,
        password: '',
        roleId: user.roleId,
        createBy: user.createdBy || localStorage.getItem('userName') || 'System',
        accountId: user.accountId,
      });
    } else {
      // 🔄 Limpiar formulario si es creación
      resetFormData();
    }
  })();
}, [userId]);


  return (
   <Card className="p-4 shadow-lg border-0 rounded-4 w-50">
  <Row className="mb-4">
    <Col>
      <h3 className="fw-bold text-primary">
        {isEdit ? 'Edit User' : 'Create User'}
      </h3>
      <p className="text-muted">
        {isEdit ? 'Modify user information' : 'Create a new system user'}
      </p>
    </Col>
  </Row>

  <UserAccountForm formData={formData} onChange={handleChange} roles={roles} isEdit={isEdit} />

  <div className="mt-4 text-end">
    <Button onClick={handleSubmit}>{isEdit ? 'Update' : 'Save'}</Button>
  </div>
</Card>

  );
};

export default UserFormPage;
