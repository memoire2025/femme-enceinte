import React, { useState, useEffect } from "react";
import { Lorem } from "./About";
import { ListGroup, Button } from "react-bootstrap";
import api from "../../api/api";

export default function Home () {  

    return (
        <div className='container'>
            <div className='justify-content-center py-3'>
                <h1 className='text-success fs-5'>Hello Word</h1>
                <p className='text-secondary'>
                    Vous êtes dans la page <span className='text-primary fs-5'>home</span>
                </p>
            </div>
            <Lorem />
        </div>
    )
}

export function ListUser () {

    const [data, setData] = useState([]);
    const [idUser, setIdUser] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        
        const fetchData = async () => {
            try {
                
                const response = await api.get(`/get_user?page=${currentPage}`, {headers : {"Content-Type" : "appication/json"}});

                console.log(response.data.message + ' ' + response.data.user_role);
                setData(response.data.data);
                setTotalPages(response.data.total_page);

            } catch (error) {
                console.error("Erreur lors de la récupération des données :", error);
            }
        };

        fetchData();
        // const interval = setInterval(fetchData, 1000);
        // return () => clearInterval(interval);

    }, [currentPage]);

    const handleUser = (id) => {
        setIdUser(null);    
        setIdUser(id); 

    }

    return(
        <>
            <ListGroup>
                {idUser && (<p className="my-3 text-secondary" >L'id de l'utilisateur séléctionné : {idUser}</p>)}
                {data.map((user) => (
                    <ListGroup.Item key={user.id} onClick={() => handleUser(user.code)} className="list-group-item-action cursor-pointer">
                        {user.nom} - {user.email}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <div className="d-flex justify-content-around mt-3">
                <Button 
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
                    disabled={currentPage === 1}
                >
                    Précédent
                </Button>

                <span>Page {currentPage} sur {totalPages}</span>

                <Button 
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                    disabled={currentPage === totalPages}
                >
                    Suivant
                </Button>
            </div>
        </>
    )
}