import React, { useState, useEffect, useContext } from 'react';
import {
    Card,
    CardBody,
    CardTitle,
    Button
} from 'reactstrap';
import moment from 'moment'
import {GlobalContext} from "../../../context/ProjectContext"
import CircleLoader from "react-spinners/CircleLoader";

const TooltipComponent = (props) => {
    const [parcels, setParcel] = useState([])
    const [sortParam, setSortParam] = useState('createdAt')
    const {authenticateUser, setAlertData, auth} = useContext(GlobalContext);

   
    useEffect(() => {
        setParcel(props.parcel)
    },[props.parcel])

    const chageParcelStatus = async (status, id) => {
        let tag = ""
        if(status === "Booked"){
            tag = "Sent"
        }
        else if(status === "Sent"){
            tag = "Recieved"
        }
        else if(status === "Recieved"){
            tag = "Delivered"
        }
        const data = {status:tag}
        
        const res = await fetch(`http://localhost:4000/parcelApi/updateParcel/${id}`, {
          method: "PUT",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({
              ...data
          })
        })
        const temp = await res.json()
        if(res.status === 200){
          setAlertData({message: "Parcel Create Successfully", code: "success"})
        } else {
          setAlertData({message: temp.message, code: "danger"})
        }
       
        
    }

    const statusShow = (status) =>{
        let tag = "info";
        if(status === "Booked"){
            tag = "info"
        }
        else if(status === "Sent"){
            tag = "primary"
        }
        else if(status === "Recieved"){
            tag = "warning"
        }
        else if(status === "Delivered"){
            tag = "success"
        }
        return (
            <td><span className={`badge badge-light-${tag} text-${tag}`}>{status}</span></td>
        )
    }

    return (
        <div>
            <Card>
            <CardBody>
                <div className="d-md-flex no-block">
                    <CardTitle>Projects of the Month</CardTitle>
                    <div className="ml-auto">
                        <form class="form-inline">
                            <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        
                    </div>
                </div>
                <div className="table-responsive mt-2">
                    <table className="table stylish-table mb-0 mt-2 no-wrap v-middle">
                        <thead>
                            <tr>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Product type</th>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Send To</th>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Booked From</th>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Reservation Day</th>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Payable Amount</th>
                                <th className="font-weight-normal text-muted border-0 border-bottom">{props.nav ? null : "Change"} Status</th>
                                
                            </tr>
                        </thead>
                        <tbody>
                            { props.loading ? <tr><CircleLoader loading={true} size={75} /></tr> :
                            parcels.map((parcel, key) =>
                                <tr key={key}>
                                    
                                    <td><h6 className="font-weight-medium mb-0 nowrap">{parcel.ProductType}</h6></td>
                                    <td>{parcel.SendTo.branch}</td>
                                    <td>{parcel.BookedFrom.branch}</td>
                                    <td>{moment(parcel.createdAt).format('DD MMM, YYYY')}</td>
                                    <td><span 
                                    className={`badge badge-light-${parcel.PayableAmount===0?"success":"danger"} text-${parcel.PayableAmount===0?"success":"danger"}`}>
                                        {parcel.PayableAmount}</span></td>
                                    
                                    {props.nav ? statusShow(parcel.status) :  props.dataStatus === "Sent" || props.dataStatus === "Delivered" ? null :<td>
                                        <Button className=" btn btn-sm" color="danger" onClick={() => chageParcelStatus(parcel.status, parcel._id)}>
                                            Change Status
                                        </Button>
                                    </td> }
                           
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
