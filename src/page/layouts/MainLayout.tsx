import React, { useState, useEffect } from 'react';
import { Container } from 'react-bootstrap';
import SideBard from '../components/Sidebar';

import Navbar from '../components/Nadvar';
import { Outlet } from 'react-router-dom';
import '../../assets/styles/Layout.css'




const MainLayout: React.FC = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobile, setIsMobile] = useState(false);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 576);
            if (window.innerWidth < 576) {
                setIsSidebarOpen(false);
            }
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        return () => window.removeEventListener('resize', checkMobile);
    }, []);


    return (
        <Container fluid className="vh-100 p-0">
            <div className="d-flex h-100">
                {/* Sidebar */}
                <div
                    className={`sidebar-container ${isSidebarOpen ? 'open' : 'closed'} ${isMobile ? 'mobile' : 'desktop'}`}
                >
                    <SideBard isOpen={isSidebarOpen} />
                </div>
                {/* === Overlay detrás del sidebar en móvil === */}
                {isSidebarOpen && isMobile && (
                    <div
                        onClick={toggleSidebar}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            zIndex: 1040,
                        }}
                    />
                )}


                <div className="flex-grow-1 d-flex flex-column h-100">
                    {/* Navbar */}
                    <div className="flex-shrink-0 d-flex" style={{ height: '8%' }}>
                        <Navbar toggleSidebar={toggleSidebar} />
                    </div>

                    {/* Contenido */}
                    <div className="contenido flex-grow-1 overflow-auto py-2 px-2">
                        <main className=" text-white h-100 d-flex justify-content-center align-items-center">
                        <Outlet />
                        </main>
                    </div>

                    {/* Footer */}
                    <div className="flex-shrink-0 bg-purple text-black text-center py-2">
                       @GestionTask.com
                    </div>
                </div>

            </div>
        </Container>


    );
};

export default MainLayout;
