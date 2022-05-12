import { Container, Nav, Navbar } from "react-bootstrap"

const Menu = () => {
  const auth = JSON.parse(localStorage.getItem("user"));

    return ( 
      auth ?
    <Navbar bg="dark" variant="dark">
    <Container>
    <Navbar.Brand href="#home">{auth.user}</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="/home">Teams</Nav.Link>
      <Nav.Link href="/games">Games</Nav.Link>
      <Nav.Link href="/login">Logout</Nav.Link>
    </Nav>
    </Container>
  </Navbar> : 

<Navbar bg="dark" variant="dark">
<Container>
<Navbar.Brand href="#home">Hello Stranger</Navbar.Brand>
<Nav className="me-auto">
  <Nav.Link href="/home">Teams</Nav.Link>
  <Nav.Link href="/games">Games</Nav.Link>
  <Nav.Link href="/login">login</Nav.Link>
</Nav>
</Container>
</Navbar>

 
    )
}

export default Menu