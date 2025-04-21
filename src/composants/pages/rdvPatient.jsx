import { Row, Col } from "react-bootstrap";
import { AlertInfo, TableData } from "../request/Request";
import { useLocation } from "react-router-dom";

export default function RdvPatiente () {

    const location = useLocation();

    const params = new URLSearchParams(location.search);
    const nom = params.get('nom');
    const code = params.get('code');

    return (
        <>
            <div className="d-flex justify-content-center position-relative align-items-center mt-3 mb-3">
                <div className="row justify-content-center px-2 px-md-5">
                    <Row>
                        <div className="rounded-top p-2">
                            <h3 className="text-secondary"><span className="text-success fw-bold fs-2">Rendez-vous</span> Pour {nom}</h3>
                            <hr />
                        </div>
                    </Row>
                    <Row>
                        <AlertInfo 
                            type="primary"
                            className="text-primary rounded-0 fade-in-box"
                            message={
                                <>
                                    Vous devez fournir beaucoup d'effort pour y arriver
                                </>
                            } 
                        />
                    </Row>
                    <Row className="mt-4 border bg-white">
                        <Col className="row justify-content-center" lg="12">
                            <TableData
                                url="/get_rdv_by_patiente"
                                code={code}
                                typeReturn="multiReturn"
                                renderRow={(user, index) => (
                                    
                                    <div key={index} className="card col-lg-12 m-3 shadow p-2">
                                        <div className="card-head">
                                            Rendez-vous de la patiente
                                        </div>
                                        <div className="card-body">
                                            <p className="card-text my-1"><span>Nom :</span> <span className="fw-bold">{user.nom}</span></p>
                                            <p className="card-text my-1"><span>Prénom :</span> <span className="fw-bold">{user.prenom}</span></p>
                                            <p className="card-text my-1"><span>Date : </span> <span className="fw-bold">{user.date_heure}</span></p>
                                            <hr />
                                            <p className="card-text my-1"><span>Motif :</span> <span className="fw-bold">{user.motif}</span></p>
                                        </div>
                                        {console.log(user)}
                                    </div>
                                    
                                )}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    )
}