import React, { useEffect, useState } from 'react';
import { Table, Card, Row, Col, Badge, Button, Form } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../components/ModalContext';
import { getTask, deleteTask } from '../../services/taskService';

interface Task {
  taskId: string;
  title: string;
  description: string;
  assignedTo: string | null;
  fullName: string;
  status: string;
  dueDate: string;
  priority: string;
  createdBy: string;
  createdAt: string;
  updatedBy: string | null;
  updatedAt: string | null;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('title');
  const [sortDesc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();
  const { showModal } = useModal();

  const userRole = localStorage.getItem('role') || '';
  const currentUserId = localStorage.getItem('userId') || '';

  useEffect(() => {
    fetchTasks();
  }, [sortBy, sortDesc, search, currentPage]);

  const fetchTasks = async () => {
    try {
      const result = await getTask(currentPage, 10, search, sortBy, sortDesc);
      let filteredTasks = result.data;

      if (userRole === 'Empleado') {
       filteredTasks = filteredTasks.filter((task: Task) => task.assignedTo === currentUserId);

      }

      setTasks(filteredTasks);
      setTotalPages(result.totalPages || 1);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleDelete = async (taskId: string) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      await deleteTask(taskId);
      setTasks(prev => prev.filter(t => t.taskId !== taskId));
      showModal('success', 'Task deleted successfully', 'System');
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || 'Error deleting task';
      showModal('error', errorMsg, 'System');
    }
  };

  const handleEdit = (taskId: string) => {
    navigate(`/app/tasks/created/${taskId}`);
  };

  return (
    <Card className="p-4 shadow-lg border-0 rounded-4 w-75">
      <Row className="mb-4">
        <Col>
          <h3 className="fw-bold text-primary">Tasks</h3>
          <p className="text-muted">Manage system tasks</p>
        </Col>
        <Col md="4">
          <Form.Control
            type="text"
            placeholder="Search by title or status..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </Col>
      </Row>

      <div className="table-responsive">
        <Table className="table-striped align-middle table-borderless text-center">
          <thead className="bg-light text-dark">
            <tr>
              <th onClick={() => setSortBy('title')}>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Assigned</th>
              <th>Due Date</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.taskId}>
                <td className="fw-semibold">{task.title}</td>
                <td className="text-muted">{task.description}</td>
                <td>
                  <Badge
                    bg={task.status === 'Deleted' ? 'danger' : 'info'}
                    className="rounded-pill px-3 py-1"
                  >
                    {task.status}
                  </Badge>
                </td>
                <td>{task.fullName || '-'}</td>
                <td>{new Date(task.dueDate).toLocaleDateString()}</td>
                <td>{task.priority}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => handleEdit(task.taskId)}
                      >
                        <PencilSquare />
                      </Button>
                  
                    {userRole === 'Administrador' && (
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(task.taskId)}
                      >
                        <Trash />
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {tasks.length === 0 && (
              <tr>
                <td colSpan={7} className="text-muted text-center py-4">
                  No tasks available
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-3">
        <span className="text-muted">Page {currentPage} of {totalPages}</span>
        <div>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="me-2"
          >
            Previous
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default TaskList;
