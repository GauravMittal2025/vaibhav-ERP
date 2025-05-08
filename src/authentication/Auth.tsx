import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../components/ProtectedRoute';

import SignInPage from '../pages/auth/SignInPage';
import SignUpPage from '../pages/auth/SignUpPage';
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage';
import ResetPasswordPage from '../pages/auth/ResetPasswordPage';

import Dashboard from '../pages/Dashboard';
import Overview from '../pages/attendance';
import AttendancePage from '../pages/attendance/Attendance';
import RequestsPage from '../pages/attendance/RequestPage';
import Inventory from '../pages/inventory/Inventory';
import Orders from '../pages/orders/Orders';
import Suppliers from '../pages/supplier/Supplier';
import Equipment from '../pages/equipment/Equipment';
import Maintenance from '../pages/maintenance/Maintenance';
import Reports from '../pages/reports/Reports';
import Settings from '../pages/settings/Settings';
import Users from '../pages/users/Users';
import Profile from '../pages/Profile';
import { UserList } from '../roles/features/users/UserList';
import { UserDetails } from '../roles/features/users/UserDetails';
import { UserForm } from '../roles/features/users/UserForm';
import { RoleList } from '../roles/features/roles/RoleList';
import { RoleDetails } from '../roles/features/roles/RoleDetails';
import { RoleForm } from '../roles/features/roles/RoleForm';
import { PermissionList } from '../roles/features/permissions/PermissionList';

function Auth() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          
          {/* protected routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'manager','guard', 'supervisor', 'sr-supervisor', 'driver']} />}>
            <Route 
              path="/" 
              element={ <Dashboard />} 
            />
            <Route 
              path="/users" 
              element={ <Users />} 
            />
            <Route 
              path="/profile" 
              element={ <Profile />} 
            />
          </Route>

          {/* Role management */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'manager','guard', 'supervisor', 'sr-supervisor', 'driver']} />}>
            <Route path="/users-management" element={<UserList />} />
            <Route path="/users/:id" element={<UserDetails />} />
            <Route path="/users/create" element={<UserForm />} />
            <Route path="/users/:id/edit" element={<UserForm />} />

            <Route path="/roles" element={<RoleList />} />
            <Route path="/roles/:id" element={<RoleDetails />} />
            <Route path="/roles/create" element={<RoleForm />} />
            <Route path="/roles/:id/edit" element={<RoleForm />} />
            
            {/* Permission routes */}
            <Route path="/permissions" element={<PermissionList />} />
          </Route>

          {/* attendance management routes starts here */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'supervisor', 'sr-supervisor', 'guard', 'driver']}/>}>
            <Route
              path='/overview'
              element={<Overview/>}
            />
            <Route
              path='/attendance'
              element={<AttendancePage/>}
            />
            <Route
              path='/request_management'
              element={<RequestsPage/>}
            />
          </Route>
          {/* attendance management routes ends here */}

          {/* store management routes starts here */}
          <Route element={<ProtectedRoute allowedRoles={['admin', 'supervisor', 'sr-supervisor']}/>}>
            <Route
              path='/inventory'
              element={<Inventory/>}
            />
            <Route
              path='/orders'
              element={<Orders/>}
            />
            <Route
              path='/customers'
              element={<Suppliers/>}
            />
            <Route
              path='/suppliers'
              element={<Suppliers/>}
            />
          </Route>
          {/* store management routes ends here */}

          {/* Maintenance management starts here */}
          <Route element={<ProtectedRoute/>}>
            <Route
              path='/equipment'
              element={<Equipment/>}
            />
            <Route
              path='/maintenance'
              element={<Maintenance/>}
            />
          </Route>
          {/* Maintenance management ends here */}

          {/* Reports management starts here */}
          <Route element={<ProtectedRoute/>}>
            <Route
              path='/reports'
              element={<Reports/>}
            />
          </Route>
          {/* Reports management ends here */}

          {/* settings routes starts here */}
          <Route element={<ProtectedRoute/>}>
            <Route
              path='/settings'
              element={<Settings/>}
            />
          </Route>
          {/* settings routes ends here */}

          {/* protected routes */}

        <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default Auth;