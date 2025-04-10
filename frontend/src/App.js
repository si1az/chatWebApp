import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ChatRoom from './components/ChatRoom';
import RoomList from './components/RoomList';
import AuthProvider from './context/AuthContext';
import './styles/main.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <RoomList />
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/chat/:roomId" component={ChatRoom} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;