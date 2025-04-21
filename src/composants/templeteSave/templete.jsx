import { useState, useEffect, use } from "react";
// import { useNavigate } from 'react-router-dom';
import { Form, Button, Fade, Row, Col, Alert, Table } from "react-bootstrap";
import { TableData, DataForm } from "./Request";
import { type } from "@testing-library/user-event/dist/type";
// import api from "../../api/api";

export default function Personnel () {

    // const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [typeAlert, setTypeAlert] = useState("");

    const [formData, setFormData] = useState({
        nom : "", prenom : "", username : "", email : "", mdp : "", sexe : "", role : ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData, [e.target.name] : e.target.value,
        });
    }

    const handleRegister = async (e) => {
        e.preventDefault();
        
        try {

            const response = await api.post("/add_user", formData, { headers: { "Content-Type" : "application/json" }
            });
            console.log(response.data.message);
            if (response.data.status == 'success') {
    
                setMessage(response.data.message);
                setTypeAlert("success");
        
            } else {
                setMessage(response.data.message);
                setTypeAlert("danger");
            }
        } catch (error) {
            setMessage("Erreur lors de la connexion " + error);
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center position-relative align-items-center mt-3 mb-3">
                <div className="row justify-content-center px-2 px-md-5">
                    <Row>
                        <div className="rounded-top p-2">
                            <h3 className="text-secondary">Enregistrer users</h3>
                        </div>
                    </Row>
                    <Row className="justify-content-center p-0 border">
                        

                        <Form onSubmit={handleRegister} className="row px-2 py-4 justify-content-center bg-white">
                            <Form.Group as={Col} md={11} className="my-2">
                                <Form.Control name="nom" type="text" className="shadow-none" placeholder="Nom" value={formData.nom} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group as={Col} md={11} className="my-2">
                                <Form.Control name="prenom" type="text" className="shadow-none" placeholder="Prenom" value={formData.prenom} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group as={Col} md={11} className="my-2">
                                <Form.Control name="username" type="text" className="shadow-none" placeholder="Username" value={formData.username} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group as={Col} md={11} className="my-2">
                                <Form.Control name="email" type="email" className="shadow-none" placeholder="E-mail" value={formData.email} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group as={Col} md={11} className="my-2">
                                <Form.Control name="mdp" type="password" className="shadow-none" placeholder="Mot de passe" value={formData.mdp} onChange={handleChange} required />
                            </Form.Group>
                            <Form.Group as={Col} md={11} className="my-2">
                                <Form.Select name="sexe" className="form-select shadow-none" value={formData.sexe}onChange={handleChange}>
                                    <option value="">Sexe</option>
                                    <option value="M">M</option>
                                    <option value="F">F</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md={11} className="my-2">
                                <Form.Select name="role" className="form-select shadow-none" value={formData.role} onChange={handleChange}>
                                    <option value="">Séléctionnez un rôle</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">user</option>
                                </Form.Select>
                            </Form.Group>
                            <Form.Group as={Col} md={11} className="my-2">
                                <Button type="submit" className="col-12 btn-submit">Se connecter</Button>
                            </Form.Group>
                            
                            {message && <Fade in={message}><Alert variant={typeAlert} className='col-lg-10  p-2 rounded-0 my-2'>{message}</Alert></Fade>}
                            
                        </Form>
                    </Row>
                    
                    <Row className="mt-4">
                        <Col className="row justify-content-center" lg="12">

                            <TableData
                                url="/get_user"
                                headerItem={['N°', 'Noms', 'Rôle', 'Sexe', 'Email', 'Action']}
                                renderRow={(user, index) => (
                                    <tr key={index}>
                                        <td>{user.id}</td>
                                        <td>{user.nom} {user.username}</td>
                                        <td>{user.role}</td>
                                        <td>{user.sexe}</td>
                                        <td>{user.email}</td>
                                        <td>Action</td>
                                    </tr>
                                )}
                            />
                            
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}





// localStorage.removeItem("refreshToken");

// if (refreshToken) {
//     try {<
//         // Obtenir un nouveau access token
//         const response = await axios.post("http://myapptestreact.test/refresh_token", { refreshToken });
//         localStorage.setItem("accessToken", response.data.accessToken);
//         accessToken = response.data.accessToken;
//         console.log(response.data.message);
//     } catch (error) {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//         window.location.href = "/login";
//         return Promise.reject(error);
//     }
// } else {
//     localStorage.removeItem("accessToken");
//     localStorage.removeItem("refreshToken");
//     window.location.href = "/login";
//     return Promise.reject(new Error("No refresh token"));
// }