import React, { useEffect, useState } from 'react';
import { Container, Row, InputGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useGetTodosQuery, useDeleteTodoMutation, useAddTodoMutation, useGetUserDetailsQuery } from '../service/todo/todoApi';
import ToDoTable from './ToDoTable';
import { addTodo } from '../service/todo/todoSlice'; 
import { auth } from '../firebase';

const ToDoList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userId, setUserId] = useState(null);

  const { data: userDetails } = useGetUserDetailsQuery(userId, { skip: !userId });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const { data: tasks = [], isLoading, isError } = useGetTodosQuery(userId, { skip: !userId });
  const [deleteTodo] = useDeleteTodoMutation();
  const [addTodoMutation] = useAddTodoMutation();

  const addItem = () => {
    navigate('/tasks/add');
  };

  const editTask = (mid) => {
    navigate(`/tasks/edit/${mid}`);
  };

  const deleteTask = async (mid) => {
    await deleteTodo({
      mid,
      userId,
    });
  };

  const viewTask = (mid) => {
    navigate(`/tasks/view/${mid}`);
  };

  const handleSignOut = () => {
    auth.signOut()
      .then(() => {
        navigate('/login');
      })
      .catch((error) => {
        console.error('Error signing out:', error);
      });
  };

  useEffect(() => {
    if (tasks.length > 0) {
      tasks.forEach(task => dispatch(addTodo(task)));
    }
  }, [tasks, dispatch]);

  return (
    <Container className="mx-auto p-4">
      <Row className="mb-4">
        <h1 className="text-3xl font-bold text-left w-full mb-6">ToDo List</h1>
        {userDetails && (
          <div className="mb-4">
            <h2>Welcome, {userDetails.name}!</h2>
            <p>Email: {userDetails.email}</p>
          </div>
        )}
        <InputGroup className="mb-3"></InputGroup>
        <div className="flex justify-between w-full">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 focus:outline-none focus:shadow-outline"
            onClick={addItem}
          >
            Create New Task
          </button>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2 focus:outline-none focus:shadow-outline"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </Row>
      {isLoading ? (
        <p>Loading tasks...</p>
      ) : isError ? (
        <p>Error loading tasks.</p>
      ) : tasks.length === 0 ? (
        <p>No tasks available. Start by creating a new task!</p>
      ) : (
        <ToDoTable tasks={tasks} border="gray-500" onEdit={editTask} onDelete={deleteTask} onView={viewTask} />
      )}
    </Container>
  );
};

export default ToDoList;
