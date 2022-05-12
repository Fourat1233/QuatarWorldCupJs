import React, { useState , useEffect} from 'react';
import './../../index.css';
import DataItem from '../data-item/data-item';
import Modal from '../modal/Modal';
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import GameItem from '../game-item/game-item';
import GameModal from '../game-modal/game-modal';

// import axios from '../../api/axios';
// import AuthContext from "../../context/AuthProvider";
// import useAuth from '../../hooks/useAuth';

const Games = () => {

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
        }
      ] ;

  const [showModal, setShowModal] = useState(false);
  const [TeamData, setTeamData] = useState(data);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [teams, setteams] = useState(data);
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  const toggleModal = () => {
    setShowModal(!showModal);
  }

  const addTeam = async(Game) => {
    if (currentTeam) {
      setTeamData(TeamData.map(data => (data.id === Game.id ? Game : data)));
      setCurrentTeam(null);
      return;
      }
      console.log(Game);
      try {
           const response = await axiosPrivate.post('/apiGame/addgame', {

              "team1": {
                  "id": parseInt( Game.team1)
              },
              "team2": {
                  "id": parseInt(Game.team2)
              }
        }); 

   
    } catch (err) {
        console.error(err);
       
    }
    Game.id = TeamData.length + 1;
    setTeamData([...TeamData, Game]);
  }

  const editTeamHandler = Game => {
    setCurrentTeam(Game);
    toggleModal();
  }

  const deleteTeam = async (Game) => {
    setTeamData(TeamData.filter(item => item.id !== Game.id));
    try {
      const response = await axiosPrivate.delete(`/apiGame/game/${Game.id}`);
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
            const response = await axiosPrivate.get('/apiTeam/teams');
           // console.log(response.data);
            isMounted && setteams(response.data);
        } catch (err) {
            console.error(err);
    
        }
    }

    getTeams();

    const getGames = async () => {
        try {
            const response = await axiosPrivate.get('/apiGame/games', {
                signal: controller.signal
            });
           // console.log(response.data);
            isMounted && setTeamData(response.data);
        } catch (err) {
            console.error(err);
            navigate('/login', { state: { from: location }, replace: true });
        }
    }

    getGames();

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
      <GameItem data={TeamData} onEdit={editTeamHandler} onDelete={deleteTeam} />
      <GameModal onCancel={toggleModal} onSubmit={addTeam} show={showModal} data={TeamData} teams={teams} editTeam={currentTeam} />
    </div>
  )
}

export default Games;
