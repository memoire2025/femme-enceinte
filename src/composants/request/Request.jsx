import { useState, useEffect } from "react";
import { Button, Row, Col, Alert, Table, Form, InputGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import api from "../../api/api";



// Composant de générateur de formulaire
export const DataForm = ({ url, fields, onSuccess, className = "", submit = "Envoyer" }) => {
const initialState = fields.reduce((acc, field) => {
    acc[field.name] = field.defaultVal || "";
    return acc;
}, {});

  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [typeAlert, setTypeAlert] = useState("");

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;

    setFormData((prev) => {
      if (type === "checkbox") {
        const prevValues = Array.isArray(prev[name]) ? prev[name] : [];
        return {
          ...prev,
          [name]: checked
            ? [...prevValues, value]
            : prevValues.filter((v) => v !== value),
        };
      }

      if (type === "radio") {
        return { ...prev, [name]: value };
      }

      if (type === "file") {
        return { ...prev, [name]: files[0] };
      }

      return { ...prev, [name]: value };
    });

    // setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = new FormData();
    for (const key in formData) {
        dataToSend.append(key, formData[key])
    }

    try {
      const response = await api.post(url, dataToSend, {headers : {'Content-Type' : 'application/json'}});
      console.log(response.data.message);
      if (response.data.status === 'success') {
          onSuccess(response.data);
          setFormData({});
          setMessage(response.data.message);
          setTypeAlert("success");
  
      } else {
          setMessage(response.data.message);
          setTypeAlert("danger");
      }
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const renderField = (field) => {
    const { name, label, type = "text", options = [], className: fieldClass = "", placeholder, firstValSelect, classFormGroup, id, textBrute } = field;
    const value = formData[name] || "";
    let classLabel = "d-none block mb-1";
    if (label !== "") {
        classLabel = "d-block block mb-1";
    }
    switch (type) {
      case "textBrute" :
        return (
            <span key={type} className="text-secondary">
                {textBrute}
            </span>
        )
      case "select":
        return (
            <Form.Group key={name} className={classFormGroup}>
                <label className={classLabel}>{label}</label>
                <Form.Select
                name={name}
                value={value}
                onChange={handleChange}
                className={fieldClass}
                required
                >
                <option value="">-- {firstValSelect} --</option>
                {options.map((opt, idx) => (
                    <option key={idx} value={opt.value}>{opt.label}</option>
                ))}
                </Form.Select>
            </Form.Group>
        );
      case "textarea":
        return (
            <Form.Group key={name} as={Col} md={11} className={classFormGroup}>
                <label className={classLabel}>{label}</label>
                <Form.Control
                as="textarea"
                name={name}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                className={fieldClass}
                required
                />
          </Form.Group>
        );
        case "checkbox":
            return (
              <Form.Group key={name} className={classFormGroup}>
                <Form.Label htmlFor={id}>{label}</Form.Label>
                {options.map((opt, i) => (
                  <Form.Check
                    key={i}
                    type="checkbox"
                    label={opt.label}
                    name={name}
                    value={opt.value}
                    checked={value.includes(opt.value)}
                    onChange={handleChange}
                    id={id}
                    // isInvalid={!!error}
                    // feedback={error}
                    // feedbackType="invalid"
                    className={fieldClass}
                  />
                ))}
              </Form.Group>
            );

          case "radio":
            return (
              <Form.Group key={name} className={classFormGroup}>
                <Form.Label>{label}</Form.Label>
                {options.map((opt, i) => (
                  <Form.Check
                    key={i}
                    type="radio"
                    label={opt.label}
                    name={name}
                    value={opt.value}
                    checked={value === opt.value}
                    onChange={handleChange}
                    // isInvalid={!!error}
                    // feedback={error}
                    // feedbackType="invalid"
                    className={fieldClass}
                  />
                ))}
              </Form.Group>
            );
      default:
        return (
            <Form.Group key={name} className={classFormGroup}>
                <label className={classLabel}>{label}</label>
                <Form.Control
                type={type}
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleChange}
                className={fieldClass}
                required
                />
            </Form.Group>
        );
    }
  };

  return (
    <Form onSubmit={handleSubmit} autoComplete="off" className={className}>

      {fields.map(renderField)}

      <Form.Group as={Col} md={11} className="my-2">
        <Button className="col-12 rounded-0" variant="primary" id="btn-submit" type="submit" disabled={loading}>
            {loading ? "Envoi..." : submit}
        </Button>
      </Form.Group>

      <Form.Group as={Col} md={11} className="my-2">
        {message && <Alert variant={typeAlert} className={' p-2 rounded-0 my-2 fade-in-box text-'+typeAlert }>{message}</Alert>}
      </Form.Group>

    </Form>
  );
};



// Composant de générateur de données from bdd
export const TableData = ({url, headerItem, renderRow, code, id, typeReturn }) => {
    const [datas, setDatas] = useState([]);
    const [messageSer, setMessageSer] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect (() => {

        const getUser = async () => {

            const params = {
                page : currentPage,
                ...(id && {id : id}),
                ...(code && {code : code})
            }

            try {
                const response = await api.get(url, { params }, {headers : {'Content-Type' : 'application/json'}});
                console.log(response.data.message);
                if (response.data.status === 'success') {
                    const data = response.data.data;
                    setDatas(data);
                    setTotalPages(response.data.total_page);
                }else{
                    setMessageSer(response.data.message);
                }
            } catch (error) {
                setMessageSer(error.response?.data?.message || "Erreur lors de la connexion !");
            }

        }
        getUser();
    }, [url, currentPage, code, id]);

    switch (typeReturn) {
        case 'Table':
            return(
                <>
                  { messageSer ? <Alert variant="warning" className="rounded-0">{messageSer}</Alert> : 
                  <>
                    <Table responsive hover className="text-center mt-3 fade-in-box" id="table-default" >
                        <thead>
                            <tr>
                                {headerItem.map((item, idx) => (
                                    <th className="th" key={idx}>{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="tbody">
                            {datas.map((item, index) => renderRow (item, index))}
                        </tbody>
                    </Table>
                    <div className="d-flex justify-content-around my-3">
                        <Button 
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} 
                            disabled={currentPage === 1}
                            className="btn-sm"
                        >
                            <i className="fa-solid fa-backward"></i>
                        </Button>

                        <span className="text-secondary">Page {currentPage} / {totalPages}</span>

                        <Button 
                            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} 
                            disabled={currentPage === totalPages}
                            className="btn-sm"
                        >
                            <i className="fa-solid fa-forward"></i>
                        </Button>
                    </div>
                  </>
                  }
                </>
            );
        case "multiReturn" :
          return (
            <>
              {
                      datas.length === 0 ? <p className="text-center"><span className="spinner spinner-border mt-2"></span></p> : datas.map((item, index) => <div key={index}>{renderRow(item, index)}</div> )  
                }
            </>
          );
        default:
            return <>{ renderRow (datas)}</>;
    }
}


// Composant de générateur d'alerte
export const AlertInfo = ({message, type = "default", className}) => {
    return (
        <>
            <Alert variant={type} className={className}>
                {message ? message : 
                    <>
                        Des consigne ici <br />
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt reiciendis repellendus aspernatur, natus mollitia corporis quis possimus libero quos, non magni nulla quam, voluptate a deserunt quasi cupiditate! Labore, soluta!
                    </>
                } 
                <Alert.Link as={Link} to="/home"> Un lien pour alert</Alert.Link>
            </Alert>        
        </>
    )
}

// Composant de générateur de formulaire de recherche
export const FormSerch = ({search, setSearch}) => {
  return (
      <Row className="justify-content-end fade-in-box">
          <Form.Group className="my-2 col-md-3">
              <InputGroup className="recherche-block">
                  <Form.Control type="search" value={search} onChange={(e) => setSearch(e.target.value)}  className="shadow-none border-end-0" placeholder="Recherche" />
                  <InputGroup.Text as="span" className="loop bg-white border-start-0"><i className="fa-solid fa-magnifying-glass"></i></InputGroup.Text>
              </InputGroup>
          </Form.Group>
      </Row>
  )
} 

// Composant de générateur de fetch de données de la recherche
export const RechercheReq = ({ url, search, headerItem, renderRow}) => {
  const [messageSer, setMessageSer] = useState('');
  const [resultat, setResultat] = useState([]);
  const [status, setStatus] = useState("");
  
  useEffect(() => {
    
      setTimeout( async () => {
          if (search) {
              
              const response = await api.get(url, {params : { r : search }}, {headers : {'Content-Type' : 'application/json'}});
              const data = response.data.data;
              setStatus(response.data.status);
              // console.log(data);
              console.log(resultat);
              if (response.data.status === 'success') {
              
                  setResultat(data);
                  // setStatus(response.data.status);
              }else{
                  setMessageSer(response.data.message);
              }

          }
          
      }, 200);
  }, [search, resultat, url]);
  
  return (
      <>
          {status === "error" ?  messageSer === "Terme de recherche obligatoire" ? "" : 
              <Row><Alert variant="warning" className="rounded-0">{messageSer}</Alert></Row> :
              <Row className="bg-white my-2">
                  <Table responsive hover className="text-center mt-3" >
                    <thead>
                        <tr>
                            {headerItem.map((item, idx) => (
                                <th className="th" key={idx}>{item}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="tbody">
                        {
                          resultat.map((item, index) => <>{renderRow (item, index)}</>)
                        }
                    </tbody>
                  </Table>
              </Row>
          }
      </>
  )

}