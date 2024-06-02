import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation, useGetTodosQuery } from '../service/todo/todoApi';
import { addTodo as addTodoAction, deleteTodo as deleteTodoAction, updateTodo as updateTodoAction } from '../service/todo/todoSlice';
import { auth } from '../firebase';

const ToDoForm = () => {
  const { forwhat, id } = useParams();
  const navigate = useNavigate();
  const tasks = useSelector((state) => state.todo.tasks) || [];
  const dispatch = useDispatch();

  const [userId, setUserId] = useState(null);
  const [inputs, setInputs] = useState({
    id: "",
    email:"",
    date: "",
    title: "",
    time: "",
    description: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [addTodo] = useAddTodoMutation();
  const [updateTodo] = useUpdateTodoMutation();
  const [deleteTodo] = useDeleteTodoMutation();

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

  const { data: tasksData } = useGetTodosQuery(userId, { skip: !userId });

  useEffect(() => {
    if (tasksData && tasksData.length > 0) {
      tasksData.forEach(task => dispatch(addTodoAction(task)));
    }
  }, [tasksData, dispatch]);

  useEffect(() => {
    if ((forwhat === 'edit' || forwhat === 'view') && id && tasks.length > 0) {
      const taskToEdit = tasks.find((task) => task.mid === id);
      if (taskToEdit) {
        setInputs(taskToEdit);
      }
    }
  }, [tasks, forwhat, id]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs((prevInputs) => ({
      ...prevInputs,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (forwhat === 'edit') {
        const updatedTask = { ...inputs, userId };
        await updateTodo({ userId, mid: id, ...updatedTask }).unwrap();
        dispatch(updateTodoAction(updatedTask));
      } else if (forwhat === 'delete') {
        await deleteTodo({ userId, mid: id }).unwrap();
        dispatch(deleteTodoAction(id));
      } else {
        const newTask = { ...inputs, id: Date.now().toString(), userId };
        await addTodo({ userId, ...newTask }).unwrap();
        dispatch(addTodoAction(newTask));
      }
      navigate('/tasks');
    } catch (error) {
      setError(error.message || 'Failed to save the task');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} method="POST">
        {error && <div className="text-red-500">{error}</div>}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={inputs.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            disabled={forwhat === 'view' || loading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">Date</label>
          <input
            id="date"
            name="date"
            type="date"
            value={inputs.date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            disabled={forwhat === 'view' || loading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Enter title"
            value={inputs.title}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            disabled={forwhat === 'view' || loading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="time">Time</label>
          <input
            id="time"
            name="time"
            type="time"
            value={inputs.time}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            disabled={forwhat === 'view' || loading}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">Description</label>
          <input
            id="description"
            name="description"
            type="text"
            placeholder="Enter description"
            value={inputs.description}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
            disabled={forwhat === 'view' || loading}
          />
        </div>
        {forwhat !== 'view' && (
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? 'Loading...' : forwhat === 'edit' ? 'Update Task' : 'Add Task'}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default ToDoForm;
