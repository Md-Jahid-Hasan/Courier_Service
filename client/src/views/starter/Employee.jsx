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
            console.log(data)
        })
        
    },[sortParam])

    const setSearchData = () => {
        setSearch(document.getElementsByName('search')[0].value)
    }
    console.log(sortParam)
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
                {/* <CardBody>
                <div className="d-md-flex no-block">
                    <CardTitle>Projects of the Month</CardTitle>
                    <div className="ml-auto">
                        <div class="form-inline">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)}/>
                            <button class="btn btn-outline-success my-2 my-sm-0" onClick={() => searchParcel()}>Search</button>

                            <div className="ml-auto">
                                <select className="custom-select">
                                    <option value="createdAt">Sort Based on Date</option>
                                    <option value="status">Sort Based on Status</option>
                                </select>
                            </div>
                        </div>
                        
                    </div>
                </div>
                
                    <Projects parcel={parcels} dataStatus={sortParam} loading={loading}/>
                    </CardBody> */}<Projects parcel={parcels} dataStatus={sortParam} loading={loading} search={search}/>
                </Col>
            </Row>
        </div>
    );
}

export default Employee;
