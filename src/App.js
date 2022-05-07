
import './App.css';
import Login from './components/login/login';
// import Register from './components/register/register';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  // Link
} from 'react-router-dom';

import RequireAuth from './components/RequireAuth/RequireAuth';
import Layout from './components/Layout/Layout';
import Missing from './components/Missing/Missing';
import Unauthorized from './components/Unauthorized/Unauthorized';
import Home from './components/home/home';




const ROLES = {
          ROLE_USER : 'ROLE_USER',     
          ROLE_MODERATOR : 'ROLE_MODERATOR',
          ROLE_ADMIN : 'ROLE_ADMIN'
}


// import Contact from './components/contact/contact';
// import About from './components/about/about';

function App() {
  
  return (
    <main className="App">
      <Router>
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<RequireAuth allowedRoles={[ROLES.ROLE_USER]} />}>
          <Route path="/home" element={<Home />} />
        </Route>


        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
    </Router>
    </main>
  );
}

export default App;


