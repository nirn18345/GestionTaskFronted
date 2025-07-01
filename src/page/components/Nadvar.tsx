import { Button, Dropdown } from 'react-bootstrap';

import { useNavigate } from 'react-router-dom';


const Navbar: React.FC<any> = ({ toggleSidebar }) => {

    const navigate = useNavigate();








    return (
        <div className="d-flex justify-content-between align-items-center w-100 px-3">
            <Button size="lg" variant="light" onClick={toggleSidebar}>
                ☰
            </Button>



            {/* Menú de usuario */}
            <Dropdown align="end">
                <Dropdown.Toggle variant="light" size="lg" >
                    <i className="mdi mdi-account fs-4 text-dark" />
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={() => {
                        localStorage.clear(); // o localStorage.removeItem('token')
                        navigate('/login');
                    }}>Cerrar sesión</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>

    );
};

export default Navbar;
