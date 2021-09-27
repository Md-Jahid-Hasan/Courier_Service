import React, {useEffect, useState} from 'react';
import { Badge, Button, Card, CardBody, CardTitle, Row, Col } from 'reactstrap';
import { TotalRevenue } from '../../components/dashboard';
import Cards from '../ui-components/cards';
import DatePicker from "react-datepicker";

const Admin = () => {
    const [amount, setAmount] = useState([])
    const [dateParam, setDateParam] = useState(new Date())
    const [periodParam, setPeriodParam] = useState("Monthly")

    useEffect(() => {
        fetch(`http://localhost:4000/parcelApi/subAdmin/dashboard/${dateParam}/${periodParam}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => setAmount(data))
    },[periodParam, dateParam])
    
    
    const dashboarSorting = () => {
        return(<>
            <li className="list-inline-item">
                <button onClick={() => periodParam === "Monthly" ? setPeriodParam("Yearly") : setPeriodParam("Monthly")}>
                    {periodParam}
                </button>
            </li>
            <li className="list-inline-item">
                <Button className="btn p-0 m-0" color="light">
                    <DatePicker selected={dateParam} onChange={(date) => setDateParam(date)} />   
                </Button>
            </li>
        </>)
    }
    return (
        <div>
            <Cards/>
            <Row>
                <Col sm={12} lg={12}>
                    <TotalRevenue data={amount} period={periodParam} sortingParam={dashboarSorting}/>
                </Col>
            </Row>
        </div >
    );
}

export default Admin;
