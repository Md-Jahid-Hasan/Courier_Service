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
    const [loading, setloading] = useState(false)
    const [search, setSearch] = useState("")
    const [status, setStatus] = useState('')
    const {authenticateUser} = useContext(GlobalContext)
    
    useEffect(() => {
        setloading(true)
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
                setloading(false)
                console.log("1st")
            })
            .then(data => console.log("testing", data))
        if(status !== ""){
            let temp = parcels
            temp = temp.filter(i => i.status === status)
            setParcels(temp)
        }
    },[sortParam, status])


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
                                <select className="custom-select"  onChange={(e) => setStatus(e.target.value)}>
                                    <option value="">Search By Status </option>
                                    <option value="Booked">Booked Parcel</option>
                                    <option value="Sent">Send Parcel</option>
                                    <option value="Recieved">Recieved Parcel</option>
                                    <option value="Delivered">Delivered Parcel</option>
                                    <option value="Expected">Expected to Recieve</option>
                                </select>
                            </div>
                            <div className="form-group col-md-3">
                            <Button className="btn p-0 m-0" color="light">
                                <DatePicker selected={sortParam} onChange={(date) => setSortParam(date)} />   
                            </Button></div>
                        </div>  
                    </div>
                </CardBody>
                    <Projects parcel={parcels} nav="branch history" loading={loading} search={search}/>
                </Col>
            </Row>
        </div>
    );
}

export default Starter;
