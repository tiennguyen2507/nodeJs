import { useContext } from "react"
import { Navbar, Nav, Container,Button} from "react-bootstrap"
// import logo from '../../image/logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from "../../contexts/AuthContext"
// import { useHistory } from "react-router-dom"



const NavbarMenu = () => {
    const {authState: {user:{userName}}} = useContext(AuthContext) 
    // const history = useHistory()
    // const logOut = () => {
    //     // localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
    //     history.push('/login')

    // }
    return (
        <Navbar collapseOnSelect expand="lg" bg="info" variant="dark">
            <Container>
                <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link to = '/dashboard'  as = {Link}>dashboard</Nav.Link>
                        <Nav.Link to = '/about'  as = {Link}>about</Nav.Link>
                    </Nav>
                    <Nav>
                        <Nav.Link eventKey={2} >
                            welcome {userName}
                        </Nav.Link>
                        <Button>
                            Log Out
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavbarMenu