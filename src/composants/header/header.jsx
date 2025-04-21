// import React, { useState } from 'react';
import logo from './../../assets/img/logoBens.png';
import {Link, NavLink, useNavigate} from "react-router-dom";
import { Navbar, Container, Row, Col, Nav, Button } from 'react-bootstrap';

function MainDesign ({children}) {
       
    return (
        <>
            <Navbar expand="xlg" bg='white' className='sticky-top border-bottom shadow-sm' style={{zIndex : '100', transition : '.7s ease-in-out'}}>
                <Container fluid className='mx-3'>
                    <Navbar.Brand as={Link} to="/home"><img className='img-fluid m-0 p-0' alt='logo' src={logo} height={30} width={65} /></Navbar.Brand>
                    
                    <Navbar.Toggle aria-controls="basic-navbar" className='text-white bg-light shadow-none' />
                    <Navbar.Collapse id="basic-navbar" className='justify-content-center'>
                        <Nav className='ms-auto nav-pills border-top'>
                            <NavbarContent />
                        </Nav>
                        <Deconnexion />
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Container fluid className='mt-2'>
                <Row className=''>
                    <Col md={12} className='m bg-light' style={{minHeight : '75vh'}}>
                        {children}
                    </Col>
                </Row>
            </Container>
        </>
    )
}

function Deconnexion () {
    const navigate = useNavigate();

    const HandleLogout = async (e) => {
        e.preventDefault();
        localStorage.removeItem("accessToken-femme-enceinte");
        localStorage.removeItem('userInfo');
        // localStorage.removeItem("refreshToken");
        navigate('/login');   
    }

    return(
        <>
            <Button onClick={HandleLogout} variant='danger' className="col-12 text-white fw-bold rounded ms-lg-auto my-2">
                <i className="fa-solid fa-right-from-bracket me-lg-1"></i>
                <span className='d-none d-lg-inline'>Déconnexion</span>
            </Button>
        </>
    )
}

export const NavbarContent = () => {
    return(
        <>
            <Nav.Link as={NavLink} to='/home' className='navlink rounded-0 m-0 p-1'><i className="fa-solid fa-house-chimney me-2"></i>Accueil</Nav.Link>
            <Nav.Link as={NavLink} to='/dossier' className='navlink rounded-0 m-0 p-1'><i className="fa-solid fa-folder-open me-2"></i>Dossier Médical</Nav.Link>
            <Nav.Link as={NavLink} to='/rendez-vous' className='navlink rounded-0 m-0 p-1'><i className="fa-solid fa-calendar-check me-2"></i>Rendez-vous</Nav.Link>
            
            <div className="accordion mt-3" id="accordionExample">
                <div className="accordion-item p-0 rounded-0">
                    <h2 className="accordion-header p-0" id="headingOne">
                        <button className="accordion-button shadow-none p-2 rounded-0 text-primary" type="button" data-bs-toggle="collapse" data-bs-target="#item-acordio" aria-expanded="false" aria-controls="item-acordio">
                        <i className="fa-solid fa-floppy-disk me-2"></i><span className='fw-bold'>Enregistrement</span>
                        </button>
                    </h2>
                    <div id="item-acordio" className="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                        <div className="accordion-body bg-light p-1">

                            <Nav.Link as={NavLink} to='/personnel#debut' className='navlink rounded-0'><i className="fa-solid fa-user-doctor me-2"></i>Personnels</Nav.Link>

                            <Nav.Link as={NavLink} to='/patientes' className='navlink rounded-0'><i className="fa-solid fa-person-pregnant me-2"></i>Patientes</Nav.Link>

                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
  
export default MainDesign;