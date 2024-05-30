import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Formtable from './component/Formtable';
import TaskForm from './component/TaskForm';

axios.defaults.baseURL = "https://curd-5nie.onrender.com";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [taskSection, setTaskSection] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", mobile: "" });
  const [formDataEdit, setFormDataEdit] = useState({ name: "", email: "", mobile: "", _id: "" });
  const [taskData, setTaskData] = useState({ title: "", description: "", assignedUsers: [] });
  const [dataList, setDataList] = useState([]);
  const [taskList, setTaskList] = useState([]);
  const [users, setUsers] = useState([]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditOnChange = (e) => {
    const { name, value } = e.target;
    setFormDataEdit((prev) => ({ ...prev, [name]: value }));
  };

  const handleTaskOnChange = (e) => {
    const { name, value, options } = e.target;
    if (name === "assignedUsers") {
      const selectedUsers = Array.from(options).filter(option => option.selected).map(option => option.value);
      setTaskData((prev) => ({ ...prev, [name]: selectedUsers }));
    } else {
      setTaskData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/create", formData);
      if (response.data.success) {
        setAddSection(false);
        alert(response.data.message);
        getFetchData();
        setFormData({ name: "", email: "", mobile: "" });
      }
    } catch (error) {
      console.error("Error creating data:", error);
      alert("Failed to create data");
    }
  };

  const handleTaskSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/tasks/create", taskData);
      if (response.data.success) {
        setTaskSection(false);
        alert(response.data.message);
        getFetchTasks();
        setTaskData({ title: "", description: "", assignedUsers: [] });
      }
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put("/update", formDataEdit);
      if (response.data.success) {
        getFetchData();
        alert(response.data.message);
        setEditSection(false);
      }
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update data");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`/delete/${id}`);
      if (response.data.success) {
        getFetchData();
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("Failed to delete data");
    }
  };

  const handleEdit = (item) => {
    setFormDataEdit(item);
    setEditSection(true);
  };

  const getFetchData = async () => {
    try {
      const response = await axios.get("/");
      if (response.data.success) {
        setDataList(response.data.data);
        setUsers(response.data.data); 
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getFetchTasks = async () => {
    try {
      const response = await axios.get("/tasks");
      if (response.data.success) {
        setTaskList(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    getFetchData();
    getFetchTasks();
  }, []);

  return (
    <div className="container">
      <button className="btn btn-add" onClick={() => setAddSection(true)}>Add User</button>
      <button className="btn btn-add" onClick={() => setTaskSection(true)}>Add Task</button>
      {addSection && (
        <Formtable
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          handleclose={() => setAddSection(false)}
          rest={formData}
        />
      )}
      {editSection && (
        <Formtable
          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          handleclose={() => setEditSection(false)}
          rest={formDataEdit}
        />
      )}
      {taskSection && (
        <TaskForm
          handleSubmit={handleTaskSubmit}
          handleOnChange={handleTaskOnChange}
          handleClose={() => setTaskSection(false)}
          rest={taskData}
          users={users}
        />
      )}
      <div className="tableContainer">
        <h2>Users</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {dataList.length > 0 ? (
              dataList.map((el) => (
                <tr key={el._id}>
                  <td>{el.name}</td>
                  <td>{el.email}</td>
                  <td>{el.mobile}</td>
                  <td>
                    <button className="btn btn-edit" onClick={() => handleEdit(el)}>Edit</button>
                    <button className="btn btn-delete" onClick={() => handleDelete(el._id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center", color: "white" }}>No Data</td>
              </tr>
            )}
          </tbody>
        </table>

        <h2>Tasks</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Assigned Users</th>
            </tr>
          </thead>
          <tbody>
            {taskList.length > 0 ? (
              taskList.map((task) => (
                <tr key={task._id}>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    {task.assignedUsers.map(user => user.name).join(', ')}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center", color: "white" }}>No Tasks</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
