import { useEffect, useState } from "react";

import axios from "axios";

import "../styles/admin.css";

const Admin = () => {

  const [users, setUsers] = useState([]);

 
  const fetchUsers = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/admin/users"
      );

      console.log(response.data);

      setUsers(
        response.data.users || response.data
      );

    } catch (error) {

      console.log(error);

      alert("Failed to load users");

    }

  };

  const deleteUser = async (id) => {

    try {

      await axios.delete(
        `http://127.0.0.1:8000/admin/users/${id}`
      );

      alert("User Deleted");

      fetchUsers();

    } catch (error) {

      console.log(error);

      alert("Delete Failed");

    }

  };

  
  const updateUser = async (user) => {

    try {
  
      await axios.put(
        `http://127.0.0.1:8000/admin/users/${user.id}`,
        {
          name: user.name,
          email: user.email,
          role: user.role
        }
      );
  
      alert("User Updated");
  
      fetchUsers();
  
    } catch (error) {
  
      console.log(error);
  
      alert("Update Failed");
  
    }
  
  };

  
  useEffect(() => {

    fetchUsers();

  }, []);

  return (

    <div className="admin-container">

      <div className="admin-header">

        <h1>
          Admin Panel
        </h1>

        <p>
          Manage users and permissions
        </p>

      </div>

      <div className="admin-table-container">

        <table className="admin-table">

          <thead>

            <tr>

              <th>ID</th>

              <th>Name</th>

              <th>Email</th>

              <th>Role</th>

              <th>Actions</th>

            </tr>

          </thead>

          <tbody>

{
  users.length > 0 ? (

    users.map((user) => (

      <tr key={user.id}>

        <td>{user.id}</td>

        
        <td>

          <input
            type="text"
            value={user.name}
            className="edit-input"
            onChange={(e) => {

              const updatedUsers = users.map((u) =>

                u.id === user.id
                  ? {
                      ...u,
                      name: e.target.value
                    }
                  : u
              );

              setUsers(updatedUsers);

            }}
          />

        </td>

        
        <td>

          <input
            type="email"
            value={user.email}
            className="edit-input"
            onChange={(e) => {

              const updatedUsers = users.map((u) =>

                u.id === user.id
                  ? {
                      ...u,
                      email: e.target.value
                    }
                  : u
              );

              setUsers(updatedUsers);

            }}
          />

        </td>

       
        <td>

          <select
            value={user.role}
            onChange={(e) =>
              updateRole(
                user.id,
                e.target.value
              )
            }
            className="role-select"
          >

            <option value="Viewer">
              Viewer
            </option>

            <option value="Analyst">
              Analyst
            </option>

            <option value="Super Admin">
              Super Admin
            </option>

          </select>

        </td>

        
        <td className="action-buttons">

          
          <button
            className="update-btn"
            onClick={() =>
              updateUser(user)
            }
          >
            Update
          </button>

          <button
            className="delete-btn"
            onClick={() =>
              deleteUser(user.id)
            }
          >
            Delete
          </button>

        </td>

      </tr>

    ))

  ) : (

    <tr>

      <td
        colSpan="5"
        className="no-users"
      >
        No Users Found
      </td>

    </tr>

  )
}

</tbody>

        </table>

      </div>

    </div>

  );

};

export default Admin;