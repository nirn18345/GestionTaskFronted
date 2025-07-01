// TaskForm.test.tsx
import React from 'react'; // ✅ necesario para Jest + JSX

import { render, screen } from '@testing-library/react';
import TaskForm from '../Task/TaskForm';
import '@testing-library/jest-dom';

const mockFormData = {
  title: 'Test Task',
  description: 'A test task description',
  assignedTo: '',
  status: 'Pending',
  dueDate: '2025-07-01',
  priority: 'Medium',
  createdBy: 'TestUser',
};

const mockUsers = [
  { userId: '1', fullName: 'John Doe' },
  { userId: '2', fullName: 'Jane Smith' },
];

describe('TaskForm Component', () => {
  it('renders title in readonly for Supervisor', () => {
    render(
      <TaskForm
        formData={mockFormData}
        onChange={() => {}}
        isEdit={true}
        role="Supervisor"
        assignableUsers={mockUsers}
      />
    );

    const titleInput = screen.getByLabelText('Title');
    expect(titleInput).toBeInTheDocument();
    expect(titleInput).toHaveAttribute('readOnly');
  });

  it('renders all fields for Admin', () => {
    render(
      <TaskForm
        formData={mockFormData}
        onChange={() => {}}
        isEdit={true}
        role="Administrador"
        assignableUsers={mockUsers}
      />
    );

    expect(screen.getByLabelText('Title')).toBeInTheDocument();
    expect(screen.getByLabelText('Description')).toBeInTheDocument();
    expect(screen.getByLabelText('Due Date')).toBeInTheDocument();
    expect(screen.getByLabelText('Priority')).toBeInTheDocument();
    expect(screen.getByLabelText('Assign To')).toBeInTheDocument();
    expect(screen.getByLabelText('Status')).toBeInTheDocument();
  });
});
