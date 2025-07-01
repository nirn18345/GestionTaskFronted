// src/components/NotificationOverlay.tsx
import { Overlay, Popover } from 'react-bootstrap';
import React from 'react';


interface Notification {
    name: string;
    message: string;
    time: string;
    avatar: string;
}

interface NotificationOverlayProps {
    title: string;
    show: boolean;
    target: HTMLElement | null;
    onClose: () => void;
    notifications: Notification[];
}

const NotificationOverlay: React.FC<NotificationOverlayProps> = ({
    title,
    show,
    target,
    onClose,
    notifications,
}) => {
    return (
        <Overlay
            target={target}
            show={show}
            placement="bottom-end"
            rootClose
            containerPadding={10}
            onHide={onClose}
        >
            {(props) => (
               <Popover {...props}>
                    <Popover.Header as="h3">{title}</Popover.Header>
                    <Popover.Body className="p-0">
                        {notifications.length === 0 ? (
                            <div className="text-muted p-3">No hay mensajes</div>
                        ) : (
                            <>
                                {notifications.map((item, index) => (
                                    <div
                                        key={index}
                                        className="d-flex align-items-start gap-2 p-2 border-bottom"
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img
                                            src={item.avatar}
                                            alt={item.name}
                                            className="rounded-circle"
                                            width="40"
                                            height="40"
                                        />
                                        <div>
                                            <div className="fw-semibold">
                                                {item.name}{' '}
                                                <span className="fw-normal text-muted">
                                                    {item.message}
                                                </span>
                                            </div>
                                            <small className="text-muted">{item.time}</small>
                                        </div>
                                    </div>
                                ))}
                                <div className="text-center py-2 fw-bold text-primary" style={{ fontSize: '0.9rem' }}>
                                    {notifications.length} nuevos mensajes
                                </div>
                            </>
                        )}
                    </Popover.Body>
                </Popover>
            )}
        </Overlay>
    );
};

export default NotificationOverlay;
