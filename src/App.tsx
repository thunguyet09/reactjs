
import './App.css';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import User from './admin/components/User/user';
import Sidebar from './admin/components/Sidebar/Sidebar';
import Header from './admin/components/Header/Header';
import Dashboard from './admin/components/Dashboard/Dashboard';
import { ThemeProvider } from './admin/ThemeContext/ThemeContext';

function App() {
  return (
    <div className="App">
        <ThemeProvider>
          <Router>
            <Routes>
              <Route path="" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/dashboard"
                element={
                  <>
                    <Sidebar />
                    <Header />
                    <Dashboard />
                  </>
                }
              />
              <Route
                path="/user"
                element={
                  <>
                    <Sidebar />
                    <Header />
                    <User />
                  </>
                }
              />
            </Routes>
          </Router>
        </ThemeProvider>
    </div>
  );
}

export default App;
