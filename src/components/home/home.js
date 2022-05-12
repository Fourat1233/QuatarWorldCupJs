import React, { useState } from 'react';
import './../../index.css';
import DataItem from '../data-item/data-item';
import Modal from '../modal/Modal';
import AuthContext from "../../context/AuthProvider";
import axios from '../../api/axios';
import useAuth from '../../hooks/useAuth';
const Home = () => {
    const { auth } = useAuth();


        console.log(auth);
    // const { setAuth } = useContext(AuthContext);

    // const response = await axios.get(LOGIN_URL,
    //     {
    //         headers: { 'Content-Type': 'application/json' ,
    //         'Authorization': `Bearer ${AuthContext.accessToken}`}
    //     }
    // );
    const data = [
        {
            "id": 2,
            "matches": [
                {
                    "id": 1
                }
            ],
            "name": "est",
            "country": "Tunisia"
        },
        {
            "id": 3,
            "matches": [
                {
                    "id": 2
                }
            ],
            "name": "ca",
            "country": "Tunisia"
        },
      ] ;
  const [showModal, setShowModal] = useState(false);
  const [TeamData, setTeamData] = useState(data);
  const [currentTeam, setCurrentTeam] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const addTeam = Team => {
    if (currentTeam) {
      setTeamData(TeamData.map(data => (data.id === Team.id ? Team : data)));
      setCurrentTeam(null);
      return;
    }
    Team.id = TeamData.length + 1;
    setTeamData([...TeamData, Team]);
  }

  const editTeamHandler = Team => {
    setCurrentTeam(Team);
    toggleModal();
  }

  const deleteTeam = Team => {
    setTeamData(TeamData.filter(item => item.name !== Team.name));
  }

   return (
    <div>
      <div className="header">
        <span className="title">Simple CRUD app</span>
        <button onClick={toggleModal}>Add new</button>
      </div>
      <DataItem data={TeamData} onEdit={editTeamHandler} onDelete={deleteTeam} />
      <Modal onCancel={toggleModal} onSubmit={addTeam} show={showModal} data={TeamData} editTeam={currentTeam} />
    </div>
  )
}

export default Home;
