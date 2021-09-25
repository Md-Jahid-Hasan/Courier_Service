import React, {useState, useEffect, useContext} from 'react';
import {
    Row, Button,
    Col, CardBody
} from 'reactstrap';
import { Projects } from '../../components/dashboard';
import Cards from '../ui-components/cards';
import {GlobalContext} from "../../context/ProjectContext"


const Employee = () => {
    const [sortParam, setSortParam] = useState('Booked')
    const [parcels, setParcels] = useState([])
    const {authenticateUser} = useContext(GlobalContext)
    const [loading, setloading] = useState(false)


    useEffect(() => {
        setloading(true)
        let branchStatus = "bookedFrom"
        if(sortParam === "Recieved" || sortParam === "Delivered" || sortParam === "Expected Date")
            branchStatus = "sendTo"

        fetch(`http://localhost:4000/parcelApi/branchUser/${branchStatus}/${authenticateUser.branch.id}/${sortParam}`, {
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
            setloading(false)
            //console.log("fetch", data[0].data)
        })
        
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
                        <Button className="btn" color="primary" onClick={() => setSortParam("Sent")}>
                                Send
                        </Button>
                        <Button className="btn" color="warning" onClick={() => setSortParam("Recieved")}>
                                Recieved
                        </Button>
                        <Button className="btn" color="success" onClick={() => setSortParam("Delivered")}>
                                Delivered
                         </Button>  
                         <Button className="btn" color="success" onClick={() => setSortParam("Expected Date")}>
                                Expected Date
                         </Button>    
                    </div>
                </CardBody>
                
                    <Projects parcel={parcels} dataStatus={sortParam} loading={loading}/>
                </Col>
            </Row>
        </div>
    );
}

export default Employee;
