import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ToDoList from './components/ToDoList';
import ToDoForm from './components/ToDoForm';
import { Provider } from 'react-redux';
import store from './service/store';
import Login from './components/loginForm';
import SignUpForm from './components/signUpForm';
import protectedRouter from './service/ProtectRouter';
function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleUpdate = (updatedTask) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task));
  };

  const addItem = (newTask) => {
    setTasks([...tasks, newTask]);
  };
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Provider store={store}>

      <Router>
        <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/tasks" /> : <Navigate to="/login" />} />
        <Route path="/" element={<Navigate to="/signup" />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/tasks/:id" element={<ToDoList />} />
          <Route path="tasks" >
            <Route index element={<ToDoList tasks={tasks} />} />
            <Route path="/tasks/add" element={<ToDoForm mode="add" />} />
            <Route path="/tasks/:forwhat/:id" element={<ToDoForm />} />           
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
