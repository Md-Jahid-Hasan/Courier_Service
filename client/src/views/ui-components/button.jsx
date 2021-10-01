import React, {useState, useEffect, useContext} from 'react'
import {GlobalContext} from "../../context/ProjectContext"
import {
    Card,
    CardBody,
    CardTitle
} from 'reactstrap';
import { useHistory } from 'react-router-dom';


function EmployeeList() {
    const {authenticateUser, setAlertData} = useContext(GlobalContext)
    const [userList, setUserList] = useState([])
    const [branch, setBranch] = useState([])
    const [selectedBranch, setSelectedBranch] = useState("")
    const history = useHistory()

    useEffect(() => {
        getBranchName()
        let url = `http://localhost:4000/userApi/user/getUser`
        let branch_url = `http://localhost:4000/userApi/user/getUserbranch/${selectedBranch}`
        let subAdmin_branch_emp = `http://localhost:4000/userApi/user/getUserbranch/${authenticateUser.branch.id}`
        let main = authenticateUser.IsSuperadmin && selectedBranch ? branch_url : url
        fetch(authenticateUser.IsAdmin ? subAdmin_branch_emp : main, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => {
           setUserList(data)
           console.log(data)
        })
    }, [selectedBranch, authenticateUser.branch.id])

    const getBranchName = async() => {
        const res = await fetch('http://localhost:4000/branchApi/getBranch', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }) 

        const temp = await res.json()
        console.log(temp)
        setBranch(temp)
    }

    const deleteUser = (id) => {
        fetch(`http://localhost:4000/userApi/user/delete/${id}`, {
            method: "DELETE",
            headers:{
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if(response.status === 200){
                setAlertData("User Delete Successfully")
            }
            let temp = userList
            temp = temp.filter(i => i._id !== id)
            setUserList(temp)
        })
    }

    return (
        <Card>
            <CardBody>
                <div className="d-md-flex no-block">
                    <CardTitle>Projects of the Month</CardTitle>
                    <div className="ml-auto">
                        <select className="custom-select" onChange={(e) => setSelectedBranch(e.target.value)}>
                        <option value="" defaultValue>All User</option>
                        {branch.map((branch, key) => (
                            <option value={branch._id}>{branch.branch}</option>
                        ))}
                        </select>
                    </div>
                </div>
                <div className="table-responsive mt-2">
                    <table className="table stylish-table mb-0 mt-2 no-wrap v-middle">
                        <thead>
                            <tr>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Email</th>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Username</th>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Branch</th>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Delete</th>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userList.map((user, key) => (
                            <tr>
                                <td><span className="d-inline-block text-center">{user.Email}</span></td>
                                <td>
                                    <h6 className="font-weight-medium mb-0 nowrap">{user.Username}</h6></td>
                                <td>{user.branch.branch}</td>
                                <td><button onClick={() => deleteUser(user._id)}>Delete</button></td>
                                <td><button onClick={() => history.push(`update-employee/${user._id}`)}>Edit</button></td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </CardBody>
        </Card>
    )
}

export default EmployeeList
