import { useState, useEffect } from 'react';
import { Nav, Collapse } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

import userProfileImage from '../../assets/images/imagenPerfil.png';
import '../../assets/styles/Layout.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Link } from 'react-router-dom';


const SideBard = ({ isOpen }: { isOpen: boolean }) => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);

  // Leer el rol desde localStorage cuando carga el componente
  useEffect(() => {
    const storedRole = localStorage.getItem('role');
    setRole(storedRole);
    const storedName = localStorage.getItem('name');
    setName(storedName);
  }, []);

  // Colapsar menús si se contrae el sidebar
  useEffect(() => {
    if (!isOpen) {
      setOpenMenus({});
    }
  }, [isOpen]);

  const toggleMenu = (menuKey: string) => {
    setOpenMenus((prev) => ({
      ...prev,
      [menuKey]: !prev[menuKey],
    }));
  };

  const navItem = (
    icon: string,
    label: string,
    menuKey?: string,
    children?: React.ReactNode
  ) => (
    <>
      <Nav.Link
        onClick={() => menuKey && toggleMenu(menuKey)}
        className="sidebar-link d-flex justify-content-between align-items-center"
      >
        <div className="d-flex align-items-center">
          <i className={`bi ${icon} me-2`} />
          {isOpen && <span>{label}</span>}
        </div>
        {menuKey && isOpen && (
          <i className={`bi ${openMenus[menuKey] ? 'bi-chevron-up' : 'bi-chevron-down'}`} />
        )}
      </Nav.Link>

      {menuKey && (
        <Collapse in={openMenus[menuKey]}>
          <div className="ms-4">
            {children}
          </div>
        </Collapse>
      )}
    </>
  );

  return (
    <div
      className={`sidebar sidebar-container ${isOpen ? 'expanded open' : 'collapsed closed'} ${window.innerWidth < 768 ? 'mobile' : ''
        }`}
    >
      {/* Perfil */}
      <div className="text-center py-3">
        <Image src={userProfileImage} roundedCircle style={{ width: '60px' }} />
        {isOpen && (
          <>
            <div className="mt-2 fw-bold">{name}</div>
            <div className="text-muted small">{role}</div>
          </>
        )}
      </div>

      {/* Navegación */}
      <Nav className="flex-column px-2">
        {navItem('bi-house', 'Dashboard')}

        {/* Solo visible para Administrador y Supervisor */}
        {(role === 'Administrador') &&
          navItem('bi-person', 'Users', 'user', (
            <>
              <Nav.Link as={Link} to="/app/users/create" className="d-flex align-items-center">
                <i className="bi bi-arrow-right me-2" />
                Create User
              </Nav.Link>
              <Nav.Link as={Link} to="/app/users/list" className="d-flex align-items-center">
                <i className="bi bi-arrow-right me-2" />
                List Users
              </Nav.Link>
            </>
          ))}

        {/* Todos los roles pueden ver tareas */}
        {navItem('bi-journal-text', 'Task', 'task', (
          <>
            {role === 'Administrador' && (
              <Nav.Link as={Link} to="/app/tasks/created" className="d-flex align-items-center">
                <i className="bi bi-arrow-right me-2" />
                Create Task
              </Nav.Link>
            )}
            {(role === 'Administrador' || role === 'Supervisor' || role === 'Empleado') && (
              <Nav.Link as={Link} to="/app/tasks/list" className="d-flex align-items-center">
                <i className="bi bi-arrow-right me-2" />
                List Task
              </Nav.Link>
            )}
          </>
        ))}

      </Nav>
    </div>
  );
};

export default SideBard;
