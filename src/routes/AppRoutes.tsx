import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Spinner from '../page/components/Spinner';
import ProtectedRoute from './ProtectedRoute';
import MainLayout from '../page/layouts/MainLayout';
import CreateUser from '../page/Users/CreatedUser';
import UserList from '../page/Users/ListUsers';
import TaskList from '../page/Task/ListTask';
import TaskFormPage from '../page/Task/CreatedTask';


const Login = lazy(() => import('../page/app/Security/Login'));
const Home = lazy(() => import('../page/Home'));


const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        {/* === PÁGINAS PÚBLICAS === */}
        <Route path="/login" element={<Login />} />
         <Route path="/" element={<Navigate to="/login" />} />
        

        {/* === PÁGINAS PROTEGIDAS (requieren login) === */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<Home />} />

          <Route path="users/create" element={<CreateUser />} />
          <Route path="users/create/:userId" element={<CreateUser />} />
          <Route path="users/list" element={<UserList />} />
          
          <Route path="tasks/created" element={< TaskFormPage/>}/>
           <Route path="tasks/created/:taskId" element={< TaskFormPage/>}/>
          <Route path="tasks/list" element={<TaskList />}/>
           

        </Route>


        {/* === CATCH-ALL (404) === */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
