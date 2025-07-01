// src/components/ModalGlobal.tsx
import { Button, Card } from 'react-bootstrap';
import {
  CheckCircleFill,
  ExclamationCircleFill,
  InfoCircleFill,
} from 'react-bootstrap-icons';

type ModalType = 'success' | 'error' | 'info';

interface Props {
  show: boolean;
  onClose: () => void;
  type?: ModalType;
  title?: string;
  message: string;
  confirmText?: string;
}

const ModalGlobal: React.FC<Props> = ({
  show,
  onClose,
  type = 'info',
  title,
  message,
  confirmText = 'Cerrar',
}) => {
  if (!show) return null;

  const getVariant = () => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'danger';
      default:
        return 'primary';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircleFill className="text-success me-2" size={24} />;
      case 'error':
        return <ExclamationCircleFill className="text-danger me-2" size={24} />;
      default:
        return <InfoCircleFill className="text-primary me-2" size={24} />;
    }
  };

  return (
  <div
  style={{
    position: 'fixed',
    top: '20px',
    right: '20px',
    zIndex: 1050,
    minWidth: '300px',
  }}
>

      <Card className="shadow-lg border-0 rounded-4">
        <Card.Header className="d-flex align-items-center bg-light border-0">
          {getIcon()}
          <strong>{title || 'Mensaje'}</strong>
        </Card.Header>
        <Card.Body className="fs-6">
          <p className="mb-3">{message}</p>
          <div className="text-end">
            <Button
              size="sm"
              variant={getVariant()}
              onClick={onClose}
              className="rounded-3 px-3"
            >
              {confirmText}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default ModalGlobal;
