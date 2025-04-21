import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { TableData, AlertInfo, DataForm, RechercheReq, FormSerch } from "../request/Request";
import { QRCodeCanvas } from "qrcode.react";

export default function Patientes () {
    const className = "shadow-none rounded-0";
    const classFormGroup = "my-2 col-md-11";
    const [search, setSearch] = useState("");

    return (
        <>
            <div className="d-flex justify-content-center position-relative align-items-center mt-3 mb-3">
                <div className="row justify-content-center px-2 px-md-5">
                    <Row>
                        <div className="rounded-top p-2">
                            <h3 className="text-secondary">Enregistrement de femmes enceintes</h3>
                            <hr />
                        </div>
                    </Row>
                    <Row>
                        <AlertInfo 
                            type="primary"
                            className="rounded-0 text-primary fade-in-box"
                            message=""
                        />
                    </Row>


                    <Row className="justify-content-center p-0 border my-2 mb-5">

                        <DataForm
                           url="/add_patiente"
                           className="row px-2 py-4 justify-content-center bg-white fade-in-box"
                           onSuccess={(data) => console.log("Patiente ajouté avec succès", data)}
                           fields={[
                             {
                                name : "nom", className : className, classFormGroup : classFormGroup, placeholder : "Nom patiente"
                             },
                             {
                                name : "prenom", className : className, classFormGroup : classFormGroup, placeholder : "Prénom patiente"
                             },
                             {
                                name : "naissance", type : "date", className : className, classFormGroup : classFormGroup, label : "Date de naissance de la patiente"
                             },
                             {
                                name : "telephone", type : "tel", className : className, classFormGroup : classFormGroup, placeholder : "Téléphone patiente"
                             },
                             {
                                name : "mdp", type : "password", className : className, classFormGroup : classFormGroup, placeholder : "Mot de passe de connexion patiente"
                             },
                             {
                                name : "email",
                                type : "email",
                                className : className,
                                classFormGroup : classFormGroup,
                                placeholder : "Email patiente"
                             },
                             {
                                name : "date_dernieres_regles",
                                type : "date",
                                className : className,
                                classFormGroup : classFormGroup,
                                label : "Date dernières règles"
                             },
                             {
                                name : "date_accouchement_prevue",
                                type : "date",
                                className : className,
                                classFormGroup : classFormGroup,
                                label : "Date prévu pour l'accouchement"
                             }
                           ]}

                        />
                        
                    </Row>
                    <FormSerch search={search} setSearch={setSearch} />
                    <Row className="mt-1 border bg-white">
                        <Col className="row justify-content-center" lg="12">
                            <TableData 
                                url="/get_patiente"
                                typeReturn="Table"
                                headerItem={['N°', 'Noms', 'Nom d\'utilisateur', 'Date de nais.', 'Téléphone', 'Date dern. règle', 'Date acc. prévu', 'QrCode']}
                                renderRow={(user, index) => (
                                    <tr key={index}>
                                        <td key={user.id}>{user.id}</td>
                                        <td>{user.nom} {user.prenom}</td>
                                        <td>{user.username}</td>
                                        <td>{user.naissance}</td>
                                        <td>{user.telephone}</td>
                                        <td>{user.date_dernieres_regles}</td>
                                        <td>{user.date_accouchement_prevue}</td>
                                        
                                        <td>
                                            <QRCodeCanvas value={JSON.stringify({
                                                nom : user.nom,
                                                email : user.email,
                                                user_name : user.username
                                            })} />
                                        </td>
                                    </tr>
                                )}
                            />
                        </Col>
                    </Row>
                </div>
            </div>
        </>
    );
}