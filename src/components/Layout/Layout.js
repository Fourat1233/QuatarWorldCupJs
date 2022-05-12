import { Outlet } from "react-router-dom"
import Menu from "../menu/menu"

const Layout = () => {
    return (
     <>  <Menu></Menu>
        <main className="App">
           
            <Outlet />
        </main>
        </> 
    )
}

export default Layout