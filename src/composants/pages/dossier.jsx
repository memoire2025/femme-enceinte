import { useState } from "react";
import { Row, Button, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AlertInfo, DataForm, TableData, RechercheReq, FormSerch } from "../request/Request";

export default function Dossier () {
    const defautInputClass = "shadow-none rounded-0";
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
                            <h3 className="text-secondary">Gestion de dossiers de <span className="fs-1 text-success">Patientes <i className="fa-solid fa-folder-open"></i></span></h3>
                            <hr />
                        </div>
                    </Row>
                    <Row>
                        <AlertInfo 
                            type="primary"
                            className="fade-in-box"
                        />
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
                                            <i className="fa-solid fa-folder-plus"></i> <span className="d-none d-md-inline">Ajouter</span>
                                            </Button>
                                            <Button as={Link} variant="success" to={{
                                                pathname : '/dossier_patiente',
                                                search : '?nom='+user.nom+'&code='+user.code,
                                                state : {fromDashboard : true}
                                            }} title={"Voir le dossier de "+user.nom} className=" ms-2 rounded-0 btn-sm my-1 my-md-0"><i className="fa-solid fa-eye"></i> <span className="d-none d-md-inline">Voir le dossier</span></Button>
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
                                                <i className="fa-solid fa-folder-plus"></i> <span className="d-none d-md-inline">Ajouter</span>
                                            </Button>
                                            <Button as={Link} variant="success" to={{
                                                pathname : '/dossier_patiente',
                                                search : '?nom='+user.nom+'&code='+user.code,
                                                state : {fromDashboard : true}
                                            }} title={"Voir le dossier de "+user.nom} className=" ms-2 rounded-0 btn-sm my-1 my-md-0"><i className="fa-solid fa-eye"></i> <span className="d-none d-md-inline">Voir le dossier</span></Button>
                                        </td>
                                        
                                    </tr>
                                )}
                            />
                        )
                    }

                    <Modal 
                        show={show}
                        onHide={handlClose}
                        backdrop="static"
                        size=""
                        centered
                        className="bg-dark bg-opacity-50"      
                    >    
                        <Modal.Header className="mt-0 bg-transparent" closeButton>
                            <Modal.Title className="text-primary">Dossier Médical</Modal.Title>
                        </Modal.Header>
                        <Modal.Body className="">
                            <p className="text-secondary">Dossier médical pour la patiente {userselected}</p>
                            <DataForm 
                                url="/add_dossier"
                                className="row px-2 py-4 justify-content-center bg-white fade-in-box"
                                onSuccess={(data) => console.log("Partenaire ajouté", data)}
                                fields={[
                                    {
                                        name: "alergique",
                                        label: "Alergique au:",
                                        type: "checkbox",
                                        className : defautInputClass,
                                        classFormGroup : "my-1 col-11",
                                        options: [
                                            { value: "soda", label: "Boisson Soda" },
                                            { value: "Coca", label: "Boisson Coca" }
                                        ]
                                    },
                                    {
                                        name: "groupe_sanguin",
                                        label: "Groupe sanguin:",
                                        type: "radio",
                                        className : defautInputClass,
                                        classFormGroup : "my-1 col-11",
                                        options: [
                                        { value: "A", label: "Groupe A", id : "soda" },
                                        { value: "B", label: "Groupe B", id : "coca" },
                                        { value: "AB", label: "Groupe AB"},
                                        { value: "O", label: "Groupe O"}
                                        ]
                                    },
                                    {
                                        name : "antecedant",
                                        type : "textarea",
                                        className : defautInputClass,
                                        classFormGroup : "my-1",
                                        placeholder : "Antécédant médical"
                                    },
                                    {
                                        name : "code_patiente",
                                        type : "hidden",
                                        defaulVal : codePatiente
                                    }
                                    
                                ]}
                            />
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="warning" onClick={handlClose}>Fermer</Button>
                        </Modal.Footer>
                    </Modal>

                </div>
            </div>
        </>
    )
}
