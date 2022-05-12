import React, {useState, useEffect} from 'react';
import { axiosPrivate } from '../../api/axios';

import './game-modal.css'
const GameModal = ({show, data, onSubmit,teams, onCancel, editTeam}) => {

   

 
    


    
  useEffect(() => {
   

    if (editTeam) setFormData(editTeam);
  }, [editTeam]);

  const initialFormState = () => {
    return editTeam ? {
        "id": 4,
        "team1": {
            "id": 4,
            "name": "css",
            "country": "Tunisia"
        },
        "team2": {
            "id": 5,
            "name": "asm",
            "country": "Tunisia"
        }
    } :{
        "id": null,
        "team1": {
            "id": null,
            "name": "css",
            "country": "Tunisia"
        },
        "team2": {
            "id": null,
            "name": "asm",
            "country": "Tunisia"
        }
    };
    
  } 
  const [formData, setFormData] = useState(initialFormState);

  const onInputChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: (name === 'team1' ? value : value )});
  }

  const submitData = async (event) => {
    event.preventDefault();
    try {
      const responseDelte = await axiosPrivate.delete(`/apiGame/game/${formData.id}`);

      const responseAdd = await axiosPrivate.post('/apiGame/addgame',formData);

  }catch (err){
    console.log(err);
  }  
    onSubmit(formData);
    onCancel();
  }

  return (
    show ? (
    <div className="modal-overlay">
        
      <div className='modal'>
        <form onSubmit={submitData}>
          <h3>{editTeam ? 'edit details' : 'new details'}</h3>
          <div className="modal-section">
            <label>team1</label>
            
              <select name="team1" value={formData.team1.id} 
              onChange={onInputChange} autoFocus >
        {
            teams?.map(team =>(
                <option value={team.id} key={team.id}>{team.name}</option>

            ))
        }
        </select>
          </div>

          <div className="modal-section"> 
            <label>team2</label>
            <select name="team2" value={formData.team1.id} 
              onChange={onInputChange} >
        {
            teams?.map(team =>(
                <option value={team.id} key={team.id}>{team.name}</option>

            ))
        }
        </select>
          </div>
          <button type="button" onClick={onCancel}>cancel</button>
          <button type="submit">submit</button>
        </form>
      </div>
    </div> 
    ) : null
  );
}

export default GameModal;