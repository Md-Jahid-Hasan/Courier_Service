import React, { useEffect, useState } from 'react';
import {
    Card,
    CardText,
    CardTitle,
    Button,
    Row,
    Col
} from 'reactstrap';
import BranchList from './branch_list';

const Cards = () => {
    const [time, setTime] = useState(Date.now())
    const [data, setData] = useState([])
    const [test, setTest] = useState({Booked:0, Recieved:0, Delivered:0, Sent:0})
    const [branch, setBranch] = useState([])
    const[selectBranch,setSelectBranch]=useState("")

    const getCard = async () => {
        const res = await fetch(`http://localhost:4000/parcelApi/admin/dashboard/cardAll/totalshow`, {
            method: "GET",
            headers: {
                'Accept': "application/json",
                "Content-Type": "application/json"
            }

        })
        var temp = await res.json()
        setData(temp)
        temp.map((val, key) => setTest(prevState =>({...prevState, [val._id]:val.Total})))
    }
    //console.log(test)

    const getBranchName = async () => {
        const res = await fetch('http://localhost:4000/branchApi/getBranch', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const temp = await res.json()
        setBranch(temp)
    }
    // /parcelApi/admin/dashboard/sendTo/totalShowbranch/cardBranch/:branch
    const Show =async ()=>{
        const res = await fetch(`http://localhost:4000/parcelApi/admin/dashboard/sendTo/totalShowbranch/cardBranch/${selectBranch}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const temp = await res.json()
        setData(temp)
        setTest({Booked:0, Recieved:0, Delivered:0, Sent:0})
        temp.map((val, key) => val._id === "Recieved" && setTest(prevState => ({...prevState, [val._id]:val.Total})))

        const res1 = await fetch(`http://localhost:4000/parcelApi/admin/dashboard/cardBranch/${selectBranch}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })

        const temp1 = await res1.json()
        console.log(temp, temp1)
        temp1.map((val, key) => val._id !== "Recieved" &&  setTest(prevState => ({...prevState, [val._id]:val.Total})))
    }


    useEffect(() => {
        getCard()
        getBranchName()

    }, [])

    return (
        <div>
            <select className="form-select form-select-sm mt-5" aria-label=".form-select-sm example"
                onChange={(e) => {
                    const selectedbranch = e.target.value
                    setSelectBranch(selectedbranch)
                    console.log(selectedbranch)
                }} defaultValue={'DEFAULT'}>
                    <option value="DEFAULT" disabled hidden>
                                Enter Your Branch
                            </option>
                {
                    branch.map((val, ind) => {
                        return <option value={val._id}>{val.branch}</option>
                    })
                }

            </select>
            <button type="button" class="btn btn-primary"onClick ={Show}>Show</button>
                    

            <Row>
                <Col xs="12" md="3">
                    {/* --------------------------------------------------------------------------------*/}
                    {/* Card-1*/}
                    {/* --------------------------------------------------------------------------------*/}
                    <Card body>
                        <CardTitle>Booked</CardTitle>
                        <CardText><p>{test.Booked}</p>
                            {/* {
                                data.map((val, ind) => {
                                    if (val._id === "Booked")
                                        return (
                                            <>
                                                <p>{val.Total}</p>
                                            </>
                                        )

                                })
                            } */}
                        </CardText>

                    </Card>
                </Col>
                <Col xs="12" md="3">
                    {/* --------------------------------------------------------------------------------*/}
                    {/* Card-1*/}
                    {/* --------------------------------------------------------------------------------*/}
                    <Card body className="text-center">
                        <CardTitle>Recieved</CardTitle>
                        <CardText><p>{test.Recieved}</p>
                            {/* {
                                data.map((val, ind) => {
                                    if (val._id === "Recieved")
                                        return (
                                            <>
                                                <p>{val.Total}</p>
                                            </>
                                        )

                                })
                            } */}
                        </CardText>

                    </Card>
                </Col>
                <Col xs="12" md="3">
                    {/* --------------------------------------------------------------------------------*/}
                    {/* Card-1*/}
                    {/* --------------------------------------------------------------------------------*/}
                    <Card body className="text-right">
                        <CardTitle>Delivered</CardTitle>
                        <CardText><p>{test.Delivered}</p>
                            {/* {
                                data.map((val, ind) => {
                                    if (val._id === "Delivered")
                                        return (
                                            <>
                                                <p>{val.Total}</p>
                                            </>
                                        )

                                })
                            } */}
                        </CardText>

                    </Card>
                </Col>

                <Col xs="12" md="3">
                    {/* --------------------------------------------------------------------------------*/}
                    {/* Card-1*/}
                    {/* --------------------------------------------------------------------------------*/}
                    <Card body className="text-right">
                        <CardTitle>Sent</CardTitle>
                        <CardText><p>{test.Sent}</p>
                            {/* {
                                data.map((val, ind) => {
                                    if (val._id === "Sent")
                                        return (
                                            <>
                                                <p>{val.Total}</p>
                                            </>
                                        )

                                })
                            } */}
                        </CardText>

                    </Card>
                </Col>
            </Row>
            

        </div>
    );
}

export default Cards;


