import React, {useState, useEffect, useContext} from 'react';
import {
    Row, Button,
    Col, CardBody, CardTitle
} from 'reactstrap';
import { Projects } from '../../components/dashboard';
import Cards from '../ui-components/cards';
import {GlobalContext} from "../../context/ProjectContext"
import DatePicker from "react-datepicker";


const Employee = () => {
    const [sortParam, setSortParam] = useState('Booked')
    const [parcels, setParcels] = useState([])
    const {authenticateUser} = useContext(GlobalContext)
    const [loading, setloading] = useState(false)
    const [search, setSearch] = useState("")
    const [dateParam, setDateParam] = useState(new Date())


    useEffect(() => {
        setloading(true)
        let branchStatus = "bookedFrom"
        if(sortParam === "Recieved" || sortParam === "Delivered" || sortParam === "Expected")
            branchStatus = "sendTo"

        fetch(`http://localhost:4000/parcelApi/branchUser/${branchStatus}/${authenticateUser.branch.id}/${sortParam}/${dateParam}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log("adad",data)
            if(data.message) setParcels([])
            else if(data.length !== 0)
                setParcels(data)
            else setParcels([])
            setloading(false)
        })
    },[sortParam, authenticateUser.branch.id])

  
    const setSearchData = () => {
        setSearch(document.getElementsByName('search')[0].value)
    }
  
    return (
        <div>
            <Cards/>
            <Row>
                <Col sm={12}>
                <CardBody className="">
                    <div className="">
                   
                         <div class="form-row">
                         <div class="form-group form-inline col-md-6">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" name="search"/>
                            <button class="btn btn-outline-success my-2 my-sm-0" onClick={() => setSearchData()}>Search</button>
                        </div>
                            <div className="form-group col-md-3">
                                <select className="custom-select"  onChange={(e) => setSortParam(e.target.value)}>
                                    <option value="Booked">Booked Parcel</option>
                                    <option value="Sent">Send Parcel</option>
                                    <option value="Recieved">Recieved Parcel</option>
                                    <option value="Delivered">Delivered Parcel</option>
                                    <option value="Expected">Expected to Recieve</option>
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                            <Button className="btn p-0 m-0" color="light">
                                <DatePicker selected={dateParam} onChange={(date) => setDateParam(date)} />   
                            </Button></div>
                        </div>  
                    </div>
                </CardBody>
                    <Projects parcel={parcels} dataStatus={sortParam} loading={loading} search={search}/>
                </Col>
            </Row>
        </div>
    );
}

export default Employee;
