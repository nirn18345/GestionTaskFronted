import { TextEncoder, TextDecoder } from 'util';
Object.assign(global, { TextEncoder, TextDecoder });

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TaskFormPage from '../Task/CreatedTask';
import * as taskService from '../../services/taskService';
import * as userService from '../../services/userService';
import { BrowserRouter } from 'react-router-dom';
import { ModalProvider } from '../components/ModalContext';

jest.mock('../../services/taskService');
jest.mock('../../services/userService');

// Mock de useParams y useNavigate
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({}), // Simula modo creación
  useNavigate: () => jest.fn(),
}));

describe('TaskFormPage (Create Mode)', () => {
  beforeEach(() => {
    localStorage.setItem('role', 'Administrador');
    localStorage.setItem('name', 'TestAdmin');

    // Mock de createTask
    (taskService.createTask as jest.Mock).mockResolvedValue({
      message: 'Tarea creada',
    });

    // Mock de getUsers (aunque para admin no se usa)
    (userService.getUsers as jest.Mock).mockResolvedValue({
      data: [],
    });
  });

  it('permite crear una tarea y muestra modal de éxito', async () => {
    render(
      <BrowserRouter>
        <ModalProvider>
          <TaskFormPage />
        </ModalProvider>
      </BrowserRouter>
    );

    // Completar campos
    fireEvent.change(screen.getByLabelText('Title'), { target: { value: 'Nueva tarea' } });
    fireEvent.change(screen.getByLabelText('Description'), { target: { value: 'Desc prueba' } });

    // Guardar
    fireEvent.click(screen.getByText('Save'));

    await waitFor(() => {
      expect(taskService.createTask).toHaveBeenCalledWith(
        expect.objectContaining({
          title: 'Nueva tarea',
          description: 'Desc prueba',
          createdBy: 'TestAdmin',
        })
      );
    });
  });
});
