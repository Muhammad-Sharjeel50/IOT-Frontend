import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AddUsers from './components/AddUsers';
import Voicecall from './components/Audio/Voicecall';

import Login from './components/Login';
import Passwordresetrequest from './components/PasswordReset/Passwordresetrequest';
import Resetpassword from './components/PasswordReset/Resetpassword';
import AdminRoute from './components/Routes/AdminRoute';
import PublicRoute from './components/Routes/PublicRoute';
import ProtectedRoute from './components/Routes/protectedRoute';
import VideoCall from './components/Video/VideoCall';
import AgentView from './pages/Agent/AgentView';
import AgentHistory from './pages/Agentpages/Agenthistory';
import BotConfiguration from './pages/BotConfiguration/BotConfiguration';
import Agentsmsmain from './pages/Agentpages/Agentsmsmain';
import ActiveAgentsmain from './pages/Agentpages/ActiveAgentsmain';
// import AdminDashBoard from './components/Dashboard/AdminDashBoard';
import Clientwebsite from './pages/Clientwebsite';
import Dashboard from './pages/Dashboard';
import UnAuthorized from './pages/ErrorPages/unAuthorized';
import Home from './pages/Home';
// import Logout from './pages/Logout';
import PermissionWrapper from './components/Routes/PermissionWrapper';
import UpdatePage from './pages/User/UpdatePage';
import Permitrole from './pages/rolespermissions/Permitrole';
import RolesPermissions from './pages/rolespermissions/RolesPermissions';
import AdminDashBoard from './components/Dashboard/AdminDashBoard';
import DeviceComponent from './components/DeviceComponent';
import TimerComponent from './components/Dashboard/TimerComponent';
import { TimerProvider } from './components/Dashboard/TimerContext';
export default function App() {

  return (

    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={
          <PermissionWrapper>
            <AddUsers />
           </PermissionWrapper>
        } />

        <Route path="/botConfiguration" element={
          // <PermissionWrapper>
            <BotConfiguration />
          // </PermissionWrapper>
        }
           />

        <Route path="/home" element={
           < Home />
        } />
        
        <Route path="/notification" element={
           < TimerComponent />
        } />
        

        <Route path='/three' element={
          // <ProtectedRoute>
            <AdminDashBoard />
          // </ProtectedRoute>
        } />

        <Route path='/dashboard' element={
         <ProtectedRoute>
            <Dashboard />
            </ProtectedRoute>
        } />
 <Route path='/device' element={
          <ProtectedRoute>
            <DeviceComponent   />
           </ProtectedRoute>
        } />
        <Route path="/password-reset-request" element={
          <Passwordresetrequest />
        } />
        

        <Route path="/videocall" element={
          < VideoCall />}
        />

        <Route path="/reset-password/:token" element={
          // <PublicRoute>
            <Resetpassword />}/>
          {/* </PublicRoute>} /> */}

        <Route path="/" element={<Clientwebsite />} />

        <Route path="/agent/home" element={
          // <PermissionWrapper>
            <AgentView />
          // </PermissionWrapper>
        } />



        <Route path="/update/:id" element={
          <PermissionWrapper>
            <UpdatePage />
          </PermissionWrapper>} />
        {/* 
        <Route path='/logout' element={
          <ProtectedRoute>
            < Logout />
          </ProtectedRoute>} /> */}


        <Route path='/agenthistory' element={
          // <AdminRoute>
          <PermissionWrapper>
          <AgentHistory />
          </PermissionWrapper>
          // </AdminRoute>
        } />
        <Route path='/agentsms' element={
          // <AdminRoute>
          <Agentsmsmain />
          // </AdminRoute>
        } />
 <Route path='/activeagent' element={
          // <AdminRoute>
          <ActiveAgentsmain />
          // </AdminRoute>
        } />

        <Route path='/permitrole' element={
          <AdminRoute>
            <Permitrole />
          </AdminRoute>} />

        <Route path='/error403' element={<UnAuthorized />} />

<Route path='/connecttodevice' element={<Passwordresetrequest/>}></Route>
        <Route path='/roles_permissions' element={
          <AdminRoute>
            <RolesPermissions />
          </AdminRoute>} />


        <Route path='/voiceCall' element={
          <PublicRoute>
            <Voicecall />
          </PublicRoute>} />


      </Routes>
    </Router>
  );
}
