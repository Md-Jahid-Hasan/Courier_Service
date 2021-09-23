import React, {useState, useEffect} from 'react';
import {
    Row, Button,
    Col, CardBody
} from 'reactstrap';
import { Projects } from '../../components/dashboard';
import Cards from '../ui-components/cards';


const Starter = () => {
    const [sortParam, setSortParam] = useState('createdAt')
    const [parcels, setParcels] = useState([])
    
    useEffect(() => {
        fetch(`http://localhost:4000/parcelApi/deleteParcel/sorted?sortBy=${sortParam}:desc`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => setParcels(data.data))
    },[sortParam])

    return (
        <div>
            <Cards/>
            <Row>
                <Col sm={12}>
                <CardBody className="">
                    <div className="button-group d-flex justify-content-around">
                        <Button className="btn" color="info" onClick={() => setSortParam("Booked")}>
                                Booked
                        </Button>
                        <Button className="btn" color="primary" onClick={() => setSortParam("Send")}>
                                Send
                        </Button>
                        <Button className="btn" color="warning" onClick={() => setSortParam("Recieved")}>
                                Recieved
                        </Button>
                        <Button className="btn" color="success" onClick={() => setSortParam("Delivered")}>
                                Delivered
                         </Button>    
                    </div>
                </CardBody>
                    <Projects parcel={parcels}/>
                </Col>
            </Row>
        </div>
    );
}

export default Starter;
