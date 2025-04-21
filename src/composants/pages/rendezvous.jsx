import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, Modal } from "react-bootstrap";
import { DataForm, TableData, RechercheReq, AlertInfo, FormSerch } from "../request/Request";

export default function Rdv () {
    const className = "shadow-none rounded-0"
    const [show, setShow] = useState(false);
    const [codePatiente, setCodePatiente] = useState("");
    const [userselected, setUserselected] = useState("");
    const [search, setSearch] = useState("");

    const handleShow = (nom, code) => {
        setUserselected(nom);
        setCodePatiente(code);
        setShow(true);
    }
    const handlClose = () => {
        setShow(false);
    }

    return (
        <>
            <div className="d-flex justify-content-center position-relative align-items-center mt-3 mb-3">
                <div className="row justify-content-center px-2 px-md-5">
                    <Row>
                        <div className="rounded-top p-2">
                            <h3 className="text-secondary">Organisation des <span className="text-success fw-bold fs-2">Rendez-vous <i className="fa-solid fa-calendar-check fs-1"></i></span></h3>
                            <hr />
                        </div>
                    </Row>
                    <Row>
                        <AlertInfo type="primary" className="fade-in-box" />
                    </Row>
                    
                    <FormSerch search={search} setSearch={setSearch} />

                    {
                        search.trim() === "" ? (
                            <Row className="justify-content-center p-0 border bg-white">
                            <TableData 
                                url="/get_patiente"
                                typeReturn="Table"
                                headerItem={['N°', 'Noms', 'Date dern. règle', 'Date acc. prévu', 'Action']}
                                renderRow={(user, index) => (
                                    <tr key={index}>
                                        <td key={user.id}>{user.id}</td>
                                        <td>{user.nom} {user.prenom}</td>
                                        <td>{user.date_dernieres_regles}</td>
                                        <td>{user.date_accouchement_prevue}</td>
                                        <td>
                                            <Button variant="primary" title={"Créer le dossier pour "+user.nom} onClick={() => handleShow(user.nom, user.code)} className="rounded-0 btn-sm my-1 my-md-0">
                                                <i className="fa-solid fa-calendar-check"></i> <span className="d-none d-md-inline">Créer un rendez-vous</span>
                                            </Button>
                                            <Button as={Link} variant="success" to={{
                                                pathname : '/liste-rdv',
                                                search : '?nom='+user.nom+'&code='+user.code,
                                                state : {fromDashboard : true}
                                            }} title={"Voir le dossier de "+user.nom} className=" ms-2 rounded-0 btn-sm my-1 my-md-0"> <i className="fa-solid fa-eye"></i> <span className="d-none d-md-inline">Voir rendez-vous</span></Button>
                                        </td>
                                        
                                    </tr>
                                )}
                            />
                            
                        </Row>
                        ) : (
                            <RechercheReq
                                url='/recherche_dossier'
                                search={search}
                                headerItem={['N°', 'Noms', 'Date dern. règle', 'Date acc. prévu', 'Action']}
                                renderRow={(user, index) => (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.nom} {user.prenom}</td>
                                        <td>{user.date_dernieres_regles}</td>
                                        <td>{user.date_accouchement_prevue}</td>
                                        <td>
                                            <Button variant="primary" title={"Créer le dossier pour "+user.nom} onClick={() => handleShow(user.nom, user.code)} className="rounded-0 btn-sm my-1 my-md-0">
                                                <i className="fa-solid fa-calendar-check"></i> <span className="d-none d-md-inline">Créer un rendez-vous</span>
                                            </Button>
                                            <Button as={Link} variant="success" to={{
                                                pathname : '/liste-rdv',
                                                search : '?nom='+user.nom+'&code='+user.code,
                                                state : {fromDashboard : true}
                                            }} title={"Voir le dossier de "+user.nom} className=" ms-2 rounded-0 btn-sm my-1 my-md-0"> <i className="fa-solid fa-eye"></i> <span className="d-none d-md-inline">Voir rendez-vous</span></Button>
                                        </td>
                                        
                                    </tr>
                                )}
                            />
                        )
                    }
                    <Row className="mt-4 border bg-white">
                        <Col className="row justify-content-center" lg="12">
                            
                            <Modal 
                                show={show}
                                onHide={handlClose}
                                backdrop="static"
                                // keybord={false}
                                centered
                                className="bg-dark bg-opacity-50"      
                            >
                                
                                {/* <Modal.Dialog className="py-0"> */}
                                    <Modal.Header className="mt-0 bg-transparent" closeButton>
                                        <Modal.Title>Rendez-vous</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body className="">
                                        <p>Rendez-vous pour Mme/Msl {userselected}</p>
                                        <DataForm
                                            url='/add_rdv'
                                            className="row px-2 py-1 justify-content-center fade-in-box"
                                            onSuccess={(data) => console.log("Rdv ajouter avec succès", data)}
                                            submit="Créer le rendez-vous"
                                            fields={[
                                                {
                                                    name : "date_heure",
                                                    type : "date",
                                                    label : "Date du rendez-vous",
                                                    className : className,
                                                    classFormGroup : "my-2 col-md-11"
                                                },
                                                {
                                                    name : "motif",
                                                    type : "textarea",
                                                    className : className,
                                                    placeholder : "Motif du rendez-vous"
                                                },
                                                {
                                                    name : "code_patiente",
                                                    type : "hidden",
                                                    defaultVal : codePatiente
                                                }
                                            ]}
                                        />
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="warning" onClick={handlClose}>Fermer</Button>
                                    </Modal.Footer>
                                {/* </Modal.Dialog> */}
                            </Modal>
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}