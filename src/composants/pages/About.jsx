import { useState } from "react";
// import { useNavigate } from 'react-router-dom';
import { Row, Col } from "react-bootstrap";
import { ListUser } from "./Home";
import api from "../../api/api";

export default function About () {

    // const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [typeAlert, setTypeAlert] = useState("");

    const [formData, setFormData] = useState({
        nom : "", prenom : "", email : "", mdp : "", role : ""
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
                    <Row className="mt-4">
                        <Col className="row justify-content-center" lg="12">
                            <ListUser />
                        </Col>
                    </Row>
                    <Lorem />
                </div>
            </div>
        </>
    )
}

export function Lorem () {
    return (
        <>
            <Row className="my-3 border bg-white p-3 fade-in-box">
                <p style={{textAlign : "justify"}}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, animi architecto? Tempora ducimus molestias nihil nulla laborum ipsum voluptates tempore fugit enim quo dolores, architecto non deleniti dicta nisi consequatur!
                    Quos soluta nobis numquam natus voluptate, consequatur sint perspiciatis quasi? Unde aut ullam molestias natus officia corrupti amet, animi mollitia autem pariatur non velit quia accusantium. Vel quos magni laboriosam!
                    Voluptas laborum odio, libero quasi qui voluptatum quis perspiciatis temporibus expedita delectus excepturi vitae natus quisquam, ab asperiores sint unde tempora dolor dolorem dolore totam, commodi odit fuga? Tenetur, saepe.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit iusto harum delectus officiis atque illum similique ea perspiciatis pariatur expedita numquam incidunt suscipit, quisquam aliquam quos ad at id nostrum.
                    Facilis ad voluptas neque possimus repellat. Consequuntur velit perspiciatis, architecto in minus aspernatur doloribus odio consectetur harum illum vel autem facere quam minima similique modi magni, cupiditate earum iste eaque.
                    Itaque, corporis tempore! Iure, at ipsum doloribus nostrum fugiat nobis molestiae eius sint soluta necessitatibus provident. Ratione at tempore voluptatem cupiditate magnam, quaerat excepturi earum incidunt vel blanditiis sit quibusdam?
                    Ipsum labore, sint consequatur neque optio, incidunt velit veritatis cumque excepturi nobis consequuntur sed illo, aspernatur eligendi magni fugiat? Debitis quod sint maiores, voluptates eveniet quibusdam magnam non soluta eaque.
                    Eum id quibusdam deserunt! Quidem esse quia, fuga debitis, velit provident aliquam omnis harum illo iusto pariatur eius laborum perferendis tempore! Beatae rerum dignissimos fugiat commodi quidem laboriosam dolorum quae!
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae, aperiam. Iusto eveniet praesentium, odio fugiat quisquam nam aperiam quia voluptates blanditiis omnis. Exercitationem officia modi pariatur corporis ea animi? Magnam.
                    Tempore distinctio quis a voluptates molestias ex quaerat. Esse nihil quos enim doloremque voluptates perferendis, cum laudantium cupiditate fugiat, laboriosam eaque nostrum pariatur harum reprehenderit, illo iure labore est aliquid.
                    Omnis praesentium debitis sunt? Molestias nisi ducimus cum fugiat asperiores, nulla reprehenderit accusantium vero natus voluptatem in adipisci modi maxime corporis provident dolor cumque! Voluptates quam nulla optio perferendis et!
                </p>
                <p className="my-4" style={{textAlign : "justify"}}>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eum, animi architecto? Tempora ducimus molestias nihil nulla laborum ipsum voluptates tempore fugit enim quo dolores, architecto non deleniti dicta nisi consequatur!
                    Quos soluta nobis numquam natus voluptate, consequatur sint perspiciatis quasi? Unde aut ullam molestias natus officia corrupti amet, animi mollitia autem pariatur non velit quia accusantium. Vel quos magni laboriosam!
                    Voluptas laborum odio, libero quasi qui voluptatum quis perspiciatis temporibus expedita delectus excepturi vitae natus quisquam, ab asperiores sint unde tempora dolor dolorem dolore totam, commodi odit fuga? Tenetur, saepe.
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit iusto harum delectus officiis atque illum similique ea perspiciatis pariatur expedita numquam incidunt suscipit, quisquam aliquam quos ad at id nostrum.
                    Facilis ad voluptas neque possimus repellat. Consequuntur velit perspiciatis, architecto in minus aspernatur doloribus odio consectetur harum illum vel autem facere quam minima similique modi magni, cupiditate earum iste eaque.
                    Itaque, corporis tempore! Iure, at ipsum doloribus nostrum fugiat nobis molestiae eius sint soluta necessitatibus provident. Ratione at tempore voluptatem cupiditate magnam, quaerat excepturi earum incidunt vel blanditiis sit quibusdam?
                    Ipsum labore, sint consequatur neque optio, incidunt velit veritatis cumque excepturi nobis consequuntur sed illo, aspernatur eligendi magni fugiat? Debitis quod sint maiores, voluptates eveniet quibusdam magnam non soluta eaque.
                    Eum id quibusdam deserunt! Quidem esse quia, fuga debitis, velit provident aliquam omnis harum illo iusto pariatur eius laborum perferendis tempore! Beatae rerum dignissimos fugiat commodi quidem laboriosam dolorum quae!
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Recusandae, aperiam. Iusto eveniet praesentium, odio fugiat quisquam nam aperiam quia voluptates blanditiis omnis. Exercitationem officia modi pariatur corporis ea animi? Magnam.
                    Tempore distinctio quis a voluptates molestias ex quaerat. Esse nihil quos enim doloremque voluptates perferendis, cum laudantium cupiditate fugiat, laboriosam eaque nostrum pariatur harum reprehenderit, illo iure labore est aliquid.
                    Omnis praesentium debitis sunt? Molestias nisi ducimus cum fugiat asperiores, nulla reprehenderit accusantium vero natus voluptatem in adipisci modi maxime corporis provident dolor cumque! Voluptates quam nulla optio perferendis et!
                </p>
            </Row>
        </>
    )
}
