import React, { useEffect, useState } from 'react';
import { Table, Card, Row, Col, Badge, Button } from 'react-bootstrap';
import { deleteUser, getUsers } from '../../services/userService';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../components/ModalContext';

interface User {
  userId: string;
  firstName: string;
  lastName: string;
  dni: string;
  phone: string;
  email: string;
  roleName: string;
}

const UserList: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;

  const navigate = useNavigate();
  const { showModal } = useModal();

  const fetchUsers = async (page: number) => {
    const result = await getUsers(page, pageSize);
    setUsers(result.data);
    setTotalPages(result.totalPages || 1);
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleDelete = async (userId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (!confirmed) return;

    try {
      const response = await deleteUser(userId);
      setUsers(prev => prev.filter(u => u.userId !== userId));
      showModal('success', response.data.message || 'User deleted successfully', 'System');
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || 'An error occurred while deleting the user';
      showModal('error', errorMsg, 'System');
    }
  };

  const handleEdit = (userId: string) => {
    navigate(`/app/users/create/${userId}`);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  return (
    <Card className="p-4 shadow-lg border-0 rounded-4 w-75">
      <Row className="mb-4">
        <Col>
          <h3 className="fw-bold text-primary">Users</h3>
          <p className="text-muted">System user management</p>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table className="table-striped align-middle table-borderless text-center">
          <thead className="bg-light text-dark">
            <tr>
              <th>Full Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId}>
                <td className="fw-semibold">{user.firstName} {user.lastName}</td>
                <td className="text-muted">{user.email}</td>
                <td>
                  <Badge bg="dark" className="rounded-pill px-3 py-1">
                    {user.roleName}
                  </Badge>
                </td>
                <td>{user.phone}</td>
                <td>
                  <div className="d-flex justify-content-center gap-2">
                    <Button variant="outline-primary" size="sm" onClick={() => handleEdit(user.userId)}>
                      <PencilSquare />
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => handleDelete(user.userId)}>
                      <Trash />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan={6} className="text-muted text-center py-4">
                  No registered users
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      {/* Pagination Controls */}
      <Row className="mt-3 align-items-center">
        <Col>
          <span className="text-muted ms-2">
            Page {currentPage} of {totalPages}
          </span>
        </Col>
        <Col className="text-end">
          <Button
            variant="outline-secondary"
            size="sm"
            className="me-2"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline-secondary"
            size="sm"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Col>
      </Row>

    </Card>
  );
};

export default UserList;
