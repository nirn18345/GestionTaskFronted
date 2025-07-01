// src/App.tsx
import AppRoutes from './routes/AppRoutes';
import { ModalProvider, useModal } from '../src/page/components/ModalContext';
import ModalGlobal from './page/components/Modal';
import AxiosInterceptorInitializer from './page/components/Interceptor';

const ModalWrapper = () => {
  const { show, message, title, type, hideModal } = useModal();
  return (
    <ModalGlobal
      show={show}
      onClose={hideModal}
      message={message}
      title={title}
      type={type}
    />
  );
};

const App = () => {
  return (
    <ModalProvider>
      <AxiosInterceptorInitializer />
      <ModalWrapper />
      <AppRoutes />
    </ModalProvider>
  );
};

export default App;
