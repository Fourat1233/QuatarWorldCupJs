import React, {useState, useEffect} from 'react';
import { axiosPrivate } from '../../api/axios';

import './modal.css'
const Modal = ({show, data, onSubmit, onCancel, editTeam}) => {

  useEffect(() => {
   // console.log(editTeam);
    if (editTeam) setFormData(editTeam);
  }, [editTeam]);

  const initialFormState = () => {
    return editTeam ? {id: null, name: 'silly billy', country: '123'} : {id: null, name: '', country: ''};
  } 

  const [formData, setFormData] = useState(initialFormState);

  const onInputChange = event => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: (name === 'country' ? value : value )});
  }

  const submitData = async (event) => {
    event.preventDefault();
    try {
      const responseDelte = await axiosPrivate.delete(`/apiTeam/team/${formData.id}`);

      const responseAdd = await axiosPrivate.post('/apiTeam/addTeam',formData);

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
            <label>Name</label>
            <input type="text" name="name" value={formData.name} 
              onChange={onInputChange} autoFocus autoComplete="off" />
          </div>
          <div className="modal-section">
            <label>Country</label>
            <input type="text" name="country" value={formData.country} 
              onChange={onInputChange} autoComplete="off" />
          </div>
          <button type="button" onClick={onCancel}>cancel</button>
          <button type="submit">submit</button>
        </form>
      </div>
    </div> 
    ) : null
  );
}

export default Modal;