import React, { useState, useEffect } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Tooltip,
    Button
} from 'reactstrap';
import deliverd from '../../assets/images/background/d.png'
import not_deliverd from '../../assets/images/background/nd.png'
import moment from 'moment'

const TooltipComponent = () => {
    const [parcls, setParcel] = useState([])
    const [sortParam, setSortParam] = useState('createdAt')

    useEffect(() => {
        const getParcelData = async() => {
            const res = await fetch(`http://localhost:4000/parcelApi/deleteParcel/sorted?sortBy=${sortParam}:desc`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }) 
            const temp = await res.json()
            console.log(temp.data)
            setParcel(temp.data)
        }
        getParcelData()
    },[sortParam])

    const changeSortParam = (event) =>{
        setSortParam(event.target.value)
    }

    return (
        <div>
            {/* --------------------------------------------------------------------------------*/}
            {/* Row*/}
            {/* --------------------------------------------------------------------------------*/}
            <Card>
            <CardBody>
                <div className="d-md-flex no-block">
                    <CardTitle>Projects of the Month</CardTitle>
                    <div className="ml-auto">
                        <select className="custom-select" onChange={(e) => changeSortParam(e)}>
                            <option value="createdAt">Sort Based on Date</option>
                            <option value="status">Sort Based on Status</option>
                        </select>
                    </div>
                </div>
                <div className="table-responsive mt-2">
                    <table className="table stylish-table mb-0 mt-2 no-wrap v-middle">
                        <thead>
                            <tr>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Is Deliverd</th>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Product type</th>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Send To</th>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Booked From</th>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Reservation Day</th>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Payable Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcls.map((parcel, key) =>
                                <tr key={key}>
                                    <td><span className="round text-white d-inline-block text-center">
                                        <img src={parcel.status === "Delivered" ? deliverd : not_deliverd} alt="user"
                                         className="rounded-circle" width="50" /></span>
                                    </td>
                                    
                                    <td><h6 className="font-weight-medium mb-0 nowrap">{parcel.ProductType}</h6></td>
                                    <td>{parcel.SendTo}</td>
                                    <td>{parcel.BookedFrom}</td>
                                    <td>{moment(parcel.createdAt).format('DD MMM, YYYY')}</td>
                                    <td><span className="badge badge-light-success text-success">{parcel.PayableAmount}</span></td>
                           
                                </tr>
                            )}
                            
                        </tbody>
                    </table>
                </div>
            </CardBody>
        </Card>
            {/* -------------------------------------------------------------------------------- */}
            {/* Row */}
            {/* -------------------------------------------------------------------------------- */}
        </div>
    );
}

export default TooltipComponent;
