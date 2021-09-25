import React, {useState, useEffect, useContext} from 'react';
import {
    Row, Button,
    Col, CardBody
} from 'reactstrap';
import { Projects } from '../../components/dashboard';
import Cards from '../ui-components/cards';
import { GlobalContext } from '../../context/ProjectContext';
import DatePicker from "react-datepicker";


const Starter = () => {
    const [sortParam, setSortParam] = useState(new Date())
    const [parcels, setParcels] = useState([])
    const {authenticateUser} = useContext(GlobalContext)
    
    useEffect(() => {
        fetch(`http://localhost:4000/parcelApi/branchUser/${authenticateUser._id}/${sortParam}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                if(data.length !== 0)
                    setParcels(data[0].data)
                else setParcels([])
            })
    },[sortParam])
    
    return (
        <div>
            <Cards/>
            <Row>
                <Col sm={12}>
                <CardBody className="">
                    <div className="button-group d-flex justify-content-around">
                        <Button className="btn" color="info">
                                Booked
                        </Button>
                        <Button className="btn" color="primary">
                                Send
                        </Button>
                        <Button className="btn" color="warning">
                                Recieved
                        </Button>
                        <Button className="btn" color="success">
                                Delivered
                         </Button> 
                         <Button className="btn p-0 m-0" color="light">
                            <DatePicker selected={sortParam} onChange={(date) => setSortParam(date)} />   
                         </Button>
                    </div>
                </CardBody>
                    <Projects parcel={parcels} nav="branch history"/>
                </Col>
            </Row>
        </div>
    );
}

export default Starter;
