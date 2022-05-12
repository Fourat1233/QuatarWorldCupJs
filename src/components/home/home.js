import React, { useState , useEffect} from 'react';
import './../../index.css';
import DataItem from '../data-item/data-item';
import Modal from '../modal/Modal';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";

// import axios from '../../api/axios';
// import AuthContext from "../../context/AuthProvider";
// import useAuth from '../../hooks/useAuth';

const Home = () => {

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
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const addTeam = async(Team) => {
    if (currentTeam) {
      setTeamData(TeamData.map(data => (data.id === Team.id ? Team : data)));
   


      setCurrentTeam(null);
      return;
    }
          try {
        const response = await axiosPrivate.post('/apiTeam/addTeam',Team);
        console.log(response.data);
   
    } catch (err) {
        console.error(err);
       
    }
    Team.id = TeamData.length + 1;
    setTeamData([...TeamData, Team]);
  }

  const editTeamHandler = Team => {
    
    setCurrentTeam(Team);
    toggleModal();
  }

  const deleteTeam = async (Team) => {
    setTeamData(TeamData.filter(item => item.name !== Team.name));
    try {
      const response = await axiosPrivate.delete(`/apiTeam/team/${Team.id}`);
      console.log(response.data);
 
  } catch (err) {
      console.error(err);
     
  }
  }






  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getTeams = async () => {
        try {
            const response = await axiosPrivate.get('/apiTeam/teams', {
                signal: controller.signal
            });
           // console.log(response.data);
            isMounted && setTeamData(response.data);
        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    getTeams();

    return () => {
        isMounted = false;
       // controller.abort();
    }
}, [])









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
