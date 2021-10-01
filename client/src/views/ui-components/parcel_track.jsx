import React, {useState, useEffect} from 'react'
import {useParams} from "react-router"

function ParcelTrack() {
    const {pid} = useParams()
    const [status, setStatus] = useState()
    const [error, setError] = useState("")
    let percentge = status && (status.status === "Booked" ? "25%" : status.status === "Sent" ? "50%" :
                    status.status === "Recieved" ? "75%" : status.status === "Delivered" ? "100%" : "0%")
    
    
    let text = status && (status.status === "Booked" ? `Your parcel is now in our ${status.BookedFrom.branch} warehouse` :
             status.status === "Sent" ? `Your parcel is on the way to ${status.SendTo.branch}` :
            status.status === "Recieved" ? `Your parcel is now in our ${status.SendTo.branch} warehouse` : status.status === "Delivered" ? `Your parcel Received by ${status.Recievername}` : "Something Wrong")

    useEffect(() => {
        fetch(`http://localhost:4000/parcelApi/see/${pid}`, {
            method: "GET",
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
            if(data.message){
                setError(data.message)
            } else setStatus(data.parcel)
        })
    }, [])
    console.log(status)
    return (
        <div>
            {text}
            {error && <p>{error}</p>}
            {status && <div class="progress" style={{height:"35px"}}>
                <div class="progress-bar" role="progressbar" style={{width: percentge}} aria-valuenow={percentge} aria-valuemin="0" aria-valuemax="100">{status.status}</div>
            </div>}
        </div>
    )
}

export default ParcelTrack
