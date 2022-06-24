import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import Verifyemail from './pages/Verifyemail';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<PublicRoutes><Login /></PublicRoutes>} />
          <Route path="*" element={<PageNotFound />} />
          <Route path="/verify/:token" element={<PublicRoutes><Verifyemail /></PublicRoutes>} />
          <Route path="/register" element={<PublicRoutes><Register /></PublicRoutes>} />
          <Route path="/dashboard" element={<ProtectedRoutes> <Dashboard /></ProtectedRoutes>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;

export function ProtectedRoutes({ children }) {
  const user = localStorage.getItem('data')
  if (user) {
    return children
  } else {
    return <Navigate to="/" />
  }
}
export function PublicRoutes({ children }) {
  const user = localStorage.getItem('data')
  if (user) {
    return <Navigate to='/dashboard' />
  } else {
    return children
  }
}
