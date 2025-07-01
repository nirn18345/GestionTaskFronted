import React from 'react';
import { Form } from 'react-bootstrap';
import { TaskFormData } from './CreatedTask';

interface TaskFormProps {
  formData: TaskFormData;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  isEdit: boolean;
  role: string;
  assignableUsers: { userId: string; fullName: string }[];
}

const TaskForm: React.FC<TaskFormProps> = ({ formData, onChange, role, assignableUsers }) => {
  const isAdmin = role === 'Administrador';
  const isSupervisor = role === 'Supervisor';
  const isEmployee = role === 'Empleado';

  return (
    <Form>
      {/* Title - editable solo para admin, readonly para supervisor */}
      {(isAdmin || isSupervisor) && (
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={onChange}
            placeholder="Enter task title"
            required
            readOnly={!isAdmin}
          />
        </Form.Group>
      )}

      {/* Solo admin ve estos campos */}
      {isAdmin && (
        <>
          <Form.Group className="mb-3" controlId="description">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description}
              onChange={onChange}
              placeholder="Task description"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="dueDate">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={onChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="priority">
            <Form.Label>Priority</Form.Label>
            <Form.Select
              name="priority"
              value={formData.priority}
              onChange={onChange}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </Form.Select>
          </Form.Group>
        </>
      )}

      {/* Admin y Supervisor pueden asignar tareas */}
      {(isAdmin || isSupervisor) && (
        <Form.Group className="mb-3" controlId="assignedTo">
          <Form.Label>Assign To</Form.Label>
          <Form.Select
            name="assignedTo"
            value={formData.assignedTo}
            onChange={onChange}
          >
            <option value="">-- Select user --</option>
            {assignableUsers.map((user) => (
              <option key={user.userId} value={user.userId}>
                {user.fullName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      )}

      {/* Todos los roles pueden cambiar estado */}
      {(isAdmin || isSupervisor || isEmployee) && (
        <Form.Group className="mb-3" controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Select
            name="status"
            value={formData.status}
            onChange={onChange}
          >
            <option value="Pending">Pending</option>
            <option value="InProgress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Deleted">Deleted</option>
          </Form.Select>
        </Form.Group>
      )}
    </Form>
  );
};

export default TaskForm;
