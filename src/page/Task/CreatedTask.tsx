import React, { useState, useEffect } from 'react';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { createTask, CreateTaskRequest, getTaskById, updateTask, UpdateTaskRequest } from '../../services/taskService';
import { getUsers } from '../../services/userService';
import { useModal } from '../components/ModalContext';
import TaskForm from './TaskForm';

export interface TaskFormData {
  title: string;
  description: string;  
  assignedTo: string;
  status: string;
  dueDate: string;
  priority: string;
  createdBy: string;
}

const TaskFormPage: React.FC = () => {
  const { taskId } = useParams();
  const navigate = useNavigate();
  const { showModal } = useModal();
  const isEdit = Boolean(taskId);

  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
    assignedTo: '',
    status: 'Pending',
    dueDate: '',
    priority: 'Low',
    createdBy: localStorage.getItem('name') || 'System',
  });

  const [assignableUsers, setAssignableUsers] = useState<{ userId: string; fullName: string }[]>([]);

  const userRole = localStorage.getItem('role') || 'Empleado';

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

 const handleSubmit = async () => {
  try {
    if (isEdit && taskId) {
      const { createdBy, ...rest } = formData;

      // Prepara payload con tipo Partial para eliminar dinámicamente propiedades
      const updatePayload: Partial<UpdateTaskRequest> = {
        ...rest,
        taskId,
        updatedBy: localStorage.getItem('name') || 'System',
      };

      if (!updatePayload.assignedTo || updatePayload.assignedTo.trim() === '') {
        delete updatePayload.assignedTo;
      }

      const response = await updateTask(updatePayload as UpdateTaskRequest);
      showModal('success', response.message || 'Tarea actualizada', 'System');
    } else {
      const createPayload: Partial<CreateTaskRequest> = { ...formData };

      if (!createPayload.assignedTo || createPayload.assignedTo.trim() === '') {
        delete createPayload.assignedTo;
      }

      const response = await createTask(createPayload as CreateTaskRequest);
      showModal('success', response.message || 'Tarea creada', 'System');
    }

    navigate('/app/tasks/list');
  } catch (err) {
    console.error(err);
  }
};

useEffect(() => {
  (async () => {
    if (isEdit && taskId) {
      const task = await getTaskById(taskId);
      setFormData({
        title: task.title,
        description: task.description,
        assignedTo: task.assignedTo || '',
        status: task.status,
        dueDate: task.dueDate.split('T')[0],
        priority: task.priority,
        createdBy: task.createdBy || 'System',
      });
    } else {
      // 💡 Limpiar formulario si es creación
      setFormData({
        title: '',
        description: '',
        assignedTo: '',
        status: 'Pending',
        dueDate: '',
        priority: 'Low',
        createdBy: localStorage.getItem('name') || 'System',
      });
    }

    if (userRole === 'Supervisor') {
      const users = await getUsers();
      const formatted = users.data.map((u: any) => ({
        userId: u.userId,
        fullName: `${u.firstName} ${u.lastName}`,
      }));
      setAssignableUsers(formatted);
    }
  })();
}, [taskId, userRole]);



  return (
    <Card className="p-4 shadow-lg border-0 rounded-4 w-50">
  <Row className="mb-4">
    <Col>
      <h3 className="fw-bold text-primary">
        {isEdit ? 'Edit Task' : 'Create Task'}
      </h3>
      <p className="text-muted">
        {isEdit ? 'Modify the task details' : 'Create a new task in the system'}
      </p>
    </Col>
  </Row>

  <TaskForm
    formData={formData}
    onChange={handleChange}
    isEdit={isEdit}
    role={userRole}
    assignableUsers={assignableUsers}
  />

  <div className="mt-4 text-end">
    <Button onClick={handleSubmit}>{isEdit ? 'Update' : 'Save'}</Button>
  </div>
</Card>

  );
};

export default TaskFormPage;
