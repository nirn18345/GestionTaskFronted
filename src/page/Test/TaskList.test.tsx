import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextEncoder, TextDecoder });

import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TaskList from '../Task/ListTask';
import { BrowserRouter } from 'react-router-dom';
import * as taskService from '../../services/taskService';
import { ModalProvider } from '../components/ModalContext';
import { AxiosResponse } from 'axios';
import { AxiosHeaders } from 'axios';


jest.mock('../../services/taskService');

const mockTasks = [
  {
    taskId: '1',
    title: 'Test Task 1',
    description: 'Description 1',
    assignedTo: 'user1',
    fullName: 'John Doe',
    status: 'Pending',
    dueDate: '2025-07-01',
    priority: 'High',
    createdBy: 'Admin',
    createdAt: '',
    updatedBy: null,
    updatedAt: null,
  },
];

const renderWithProviders = (ui: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <ModalProvider>{ui}</ModalProvider>
    </BrowserRouter>
  );
};

describe('TaskList Component', () => {
  beforeEach(() => {
    localStorage.setItem('role', 'Administrador');
    localStorage.setItem('userId', 'user1');

        const mockResponse: AxiosResponse = {
        data: { data: mockTasks, totalPages: 1 },
        status: 200,
        statusText: 'OK',
        headers: {},
        config: {
            headers: new AxiosHeaders(), // ✅ solución correcta
        },
        };
    

    (taskService.getTask as jest.Mock).mockResolvedValue(mockResponse);
  });

  afterEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders the list of tasks', async () => {
    renderWithProviders(<TaskList />);

    expect(await screen.findByText('Test Task 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('filters tasks by search input', async () => {
    renderWithProviders(<TaskList />);

    const searchInput = screen.getByPlaceholderText('Search by title or status...');
    await userEvent.clear(searchInput);
    await userEvent.type(searchInput, 'test');

    await waitFor(() => {
      expect(taskService.getTask).toHaveBeenCalledWith(1, 10, 'test', 'title', false);
    });
  });

  it('calls deleteTask when delete button is clicked', async () => {
    const deleteMock = jest.spyOn(taskService, 'deleteTask').mockResolvedValue({
        data: {},
        status: 200,
        statusText: 'OK',
        headers: new AxiosHeaders(), // ✅ Corrección aquí
        config: {
            headers: new AxiosHeaders(), // ✅ También en config si es necesario
        },
        });

    window.confirm = jest.fn().mockReturnValue(true);

    renderWithProviders(<TaskList />);

    const deleteBtn = await screen.findByRole('button', { name: /trash/i });
    expect(deleteBtn).toBeInTheDocument();
    await userEvent.click(deleteBtn);

    await waitFor(() => {
      expect(deleteMock).toHaveBeenCalledWith('1');
    });
  });
});
