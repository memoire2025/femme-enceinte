import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import api from "../../api/api";
import { Col, Form, Button, Alert } from "react-bootstrap";

export default function Login () {

    const [username, setUsername] = useState("");
    const [mdp, setmdp] = useState("");
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setMessage("");

        const btn = document.querySelector("#text-btn");
        const spinner = document.querySelector('#spinner');
        btn.disabled = true;
        btn.classList.add('d-none');
        spinner.classList.remove('d-none');
        try {
            
            const response = await api.post('/login', {username, mdp},{
                headers: { "Content-Type": "application/json" }
            });
            
            console.log(response.data.message);
            const { accessToken } = response.data;

            if (response.data.status === 'success') {
                if (accessToken) {

                    const userInfo = {
                        code : response.data.code,
                        role : response.data.role,
                        exp : response.data.exp,
                        accessToken : response.data.accessToken
                    };

                    localStorage.setItem("accessToken-femme-enceinte", accessToken);
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));

                    setTimeout(() => {
                        navigate('/home');
                    }, 2500);

                }
            } else {
                setMessage(response.data.message);
                spinner.classList.add('d-none');
                btn.classList.remove('d-none');
                btn.disabled = false;
            }
        } catch (error) {
            setMessage(error.response?.data?.message || "Erreur lors de la connexion !");
        }
    };

    return (
        <>
            <div className="d-flex justify-content-center align-items-center bg-light" style={{height : "100vh"}}>

                <div id="login-block" className="py-4 col-11 col-md-4 d-flex justify-content-center rounded-2 bg-white border">
                    <Form onSubmit={handleLogin} autoComplete="off" className="row justify-content-center col-12">
                        <div className="rounded-top col-md-12 my-2">
                            <h3 className="fw-bold text-center text-primary">Connexion</h3>
                            <hr />
                        </div>
                        <Form.Group as={Col} md='12' className="my-2">
                            <Form.Control type="text" autoComplete="off" className="form-control shadow-none rounded-2" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        </Form.Group>
                        <Form.Group as={Col} md='12' className="my-2">
                            <Form.Control type="password" autoComplete="off" className="form-control shadow-none rounded-2" placeholder="Mot de passe" value={mdp} onChange={(e) => setmdp(e.target.value)} required />
                        </Form.Group>

                        <div className="form-check ms-4 col-md-12 my-2">
                            <input type="checkbox" id="check" className="form-check-input shadow-none" />
                            <label htmlFor="check" className="form-check-label text-secondary">Se souvenir de  moi</label>
                        </div>
                        <Form.Group as={Col} md='12' className="my-2">
                            <Button type="submit" className="col-12 rounded-2 btn-submit"><span id="text-btn">Se connecter</span> <div className="spinner spinner-border d-none" id="spinner"></div></Button>
                        </Form.Group>
                        
                        { message && <Alert variant="danger" className="col-11 rounded-0 p-1 my-2">{message}</Alert> }
                        
                    </Form>
                </div>
                
            </div>
        </>
    )
}
