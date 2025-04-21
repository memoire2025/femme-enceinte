import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { TableData, DataForm, RechercheReq, AlertInfo, FormSerch } from "../request/Request";

export default function Personnel () {
    const defautInputClass = "shadow-none rounded-0";
    const classFormGroup = "my-2 col-md-11";
    
    const [search, setSearch] = useState("");
    return (
        <>
            <div className="d-flex justify-content-center align-items-center mt-3 mb-3">
                <div className="row justify-content-center px-2 px-md-5">
                    <Row>
                        <div className="rounded-top p-2">
                            <h3 className="text-secondary">Enregistrer users</h3>
                        </div>
                    </Row>
                    <Row className="justify-content-center p-0 border mb-5">
                        
                        <DataForm
                          url="/add_user"
                          className="row px-2 py-4 justify-content-center bg-white"
                          onSuccess={(data) => console.log("Partenaire ajouté", data)}
                          fields={[
                            {
                                name : "nom",
                                className : defautInputClass,
                                classFormGroup : classFormGroup,
                                placeholder : "Nom personnel"
                            },
                            {
                                name : "prenom",
                                className : defautInputClass,
                                classFormGroup : classFormGroup,
                                placeholder : "Prénom personnel"
                            },
                            {
                                name : "username",
                                className : defautInputClass,
                                classFormGroup : classFormGroup,
                                placeholder : "Username personnel"
                            },
                            {
                                name : "email",
                                type : "email",
                                className : defautInputClass,
                                classFormGroup : classFormGroup,
                                placeholder : "Email personnel"
                            },
                            {
                                name : "mdp",
                                type : "password",
                                className : defautInputClass,
                                classFormGroup : classFormGroup,
                                placeholder : "Mot de passe personnel"
                            },
                            {
                                name : "sexe",
                                type : "select",
                                className : "shadow-none form-select rounded-0",
                                classFormGroup : classFormGroup,
                                options : [
                                    {value : "M", label : "M"},
                                    {value : "F", label : "F"},
                                ],
                                firstValSelect : "Sexe",
                            },
                            {
                                name : "role",
                                type : "select",
                                className : "shadow-none form-select rounded-0",
                                classFormGroup : classFormGroup,
                                options : [
                                    {value : "admin", label : "Admin"},
                                    {value : "user", label : "User"},
                                ],
                                firstValSelect : "Rôle",
                            }
                          ]}

                        />

                    </Row>

                    <FormSerch search={search} setSearch={setSearch} />
                    
                    <Row className="mt-1 border bg-white">
                        <Col className="row justify-content-center" lg="12" id="debut">

                            <TableData
                                url="/get_user"
                                typeReturn="Table"
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


