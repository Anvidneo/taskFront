import React from 'react';
import Cookies from 'universal-cookie';
import { Nav, Navbar, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/App.css';

const cookies = new Cookies();

export const NavbarComponent = () => {
    const logout = async () => {
        cookies.remove('token');
        window.location.href='./';
    }

    return (
        <Navbar className='navbar' expand="md">  
            <Container>  
                <Navbar.Brand className='navbar-title'>Task App</Navbar.Brand>  
                <Navbar.Toggle aria-controls="basic-navbar-nav" />  
                <Navbar.Collapse id="basic-navbar-nav">  
                    <Nav className="me-auto">
                        <Nav.Link></Nav.Link>   
                    </Nav>  
                    <Nav className='navbar-text'>
                        <Nav.Link onClick={logout}>Logout</Nav.Link>   
                    </Nav>  
                </Navbar.Collapse>
            </Container>  
        </Navbar>
    )
}

export default NavbarComponent 