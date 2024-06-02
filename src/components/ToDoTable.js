import React from 'react';
import { useNavigate } from 'react-router-dom';

const ToDoTable = ({ tasks, border, onEdit, onDelete, onView }) => {
  const tableBorderStyle = border ? `border-collapse border border-${border}` : '';

  const navigate = useNavigate();
console.log(tasks)
  return (
    <div className="App">
      <h1 className="text-2xl font-bold text-left w-full mb-6">List Tasks</h1>
      <table className={tableBorderStyle}>
        <thead>
          <tr>
            <th className={`border border-${border} px-4 py-2`}>Id</th>
            <th className={`border border-${border} px-4 py-2`}>Email</th>
            <th className={`border border-${border} px-4 py-2`}>Date</th>
            <th className={`border border-${border} px-4 py-2`}>Title</th>
            <th className={`border border-${border} px-4 py-2`}>Time</th>
            <th className={`border border-${border} px-4 py-2`}>Description</th>
            <th className={`border border-${border} px-4 py-2`}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? tasks.map(( task) => (
            <tr key={task.mid}>
              <td className={`border border-${border} px-4 py-2`}>{task.id}</td>
              <td className={`border border-${border} px-4 py-2`}>{task.email}</td>
              <td className={`border border-${border} px-4 py-2`}>{task.date}</td>
              <td className={`border border-${border} px-4 py-2`}>{task.title}</td>
              <td className={`border border-${border} px-4 py-2`}>{task.time}</td>
              <td className={`border border-${border} px-4 py-2`}>{task.description}</td>
              <td className={`border border-${border} px-4 py-2`}>
                <button
                  onClick={() => onEdit(task.mid)}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(task.mid)}
                  className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  Delete
                </button>
                <button
                  onClick={() => onView(task.mid)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                  View
                </button>
              </td>
            </tr>
          )) : (
            <tr>
              <td className={`border border-${border} px-4 py-2`} colSpan="6">No tasks available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ToDoTable;
