import React from 'react';
import { Link } from 'react-router-dom';

const DataItem = ({data, onEdit, onDelete}) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Country</th>
      </tr>
    </thead>
    <tbody>
      {(
        data.map(user => (
          
          <tr key={user.name}>
            <td><Link to={`/home/${user.id}`}> {user.name}</Link></td>
            <td>{user.country}</td>
            <td>
              <button onClick={() => onEdit(user)}>Edit</button>
              <button onClick={() => onDelete(user)}>Delete</button>
            </td>
          </tr>
         
        ))
      )}
    </tbody>
  </table>        
);


export default DataItem;