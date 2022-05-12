import React from 'react';
import { Link } from 'react-router-dom';

const GameItem = ({data, onEdit, onDelete}) => (
  <table>
    <thead>
      <tr>
        <th>Team1</th>
        <th>Team2</th>
      </tr>
    </thead>
    <tbody>
      {(
        data.map(user => (
          
          <tr key={user.name}>
            <td><Link to={`/home/${user?.team1?.id}`}> {user?.team1?.name}</Link></td>
            <td><Link to={`/home/${user?.team2?.id}`}> {user?.team2?.name}</Link></td>

            
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


export default GameItem;