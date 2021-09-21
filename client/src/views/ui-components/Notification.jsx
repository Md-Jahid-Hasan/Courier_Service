import React, {useState, useEffect, useContext} from 'react';
import { Container, Alert, Row, Card, CardBody, CardTitle } from 'reactstrap';
import {GlobalContext} from "../../context/ProjectContext"


const Notification = (props) => {
    console.log(props)
    const [msgStatus, setMsgStatus] = useState(true)
    const [msg, setMsg] = useState("")
    const [status, setStatus] = useState("info")

    useEffect(() => {
        console.log("use Effect")
        setMsg(props.msg)
        setMsgStatus(props.visibility)
        setStatus(props.code)
    },[props])

    return (
        <div>
            <Alert
                color={status}
                isOpen={msgStatus}
                toggle={() => setMsgStatus(!msgStatus)}
            >
                {msg}
            </Alert>
        </div>
    )
}
export default Notification