import React, {useState, useEffect, useContext} from 'react'
import {
    Card,
    CardBody,
    CardTitle
} from 'reactstrap';
import { useHistory } from 'react-router-dom';
import {GlobalContext} from "../../context/ProjectContext"

function BranchList() {
    const [branchList, setBranchList] = useState([])
    const [searchedBranchList, setSearchedBranchList] = useState()
    const [toogle, setToggle] = useState("Create")
    const [editable, setEditable] = useState("")
    const {authenticateUser, setAlertData} = useContext(GlobalContext);
    const [createBranch, setCreateBranch] = useState({branch:"",contact:""})
    const history = useHistory()
    let branches = searchedBranchList ? searchedBranchList : branchList


    useEffect(() => {
        fetch("http://localhost:4000/branchApi/getBranch", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => response.json())
        .then(data => setBranchList(data))
        
    }, [])
  
    const deleteBranch = async(id) => {
        const res = await fetch(`http://localhost:4000/branchApi/deleteBranch/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const temp = await res.json()
        if(res.status === 200){
            setAlertData({message: "Delete Successfully", code: "success"})
            let temp = branchList
            temp = temp.filter(i => i._id !== id)
            setBranchList(temp)
        } else if(res.status === 400){
            setAlertData({message: temp.message, code: "danger"})
        } else {
            setAlertData({message: "Something Wrong", code: "danger"})
        }
        
    }
    
    const changeBranchData = (event) => {
        console.log(event.target.name);
        setCreateBranch({...createBranch, [event.target.name]:event.target.value})
    }

    const handleCreateParcel = (event) => {
        event.preventDefault()
        fetch("http://localhost:4000/branchApi/createBranch", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...createBranch
            })
        })
        .then(response => response.json())
        .then(data => {
            setBranchList(branchList =>[...branchList, data.branch])
            setCreateBranch({branch:"",contact:""})
            setAlertData({message: "Branch Create Successfully", code: "success"})
        })
    }   

    const handleSearchParcel = (event) => {
        event.preventDefault()
        let temp = branchList
        temp = temp.filter(i => i.branch.startsWith(event.target.value))
        setSearchedBranchList(temp)
    }

    const searchField = () => {
        return (
            <>
            <form onChange={(e)=>{handleSearchParcel(e)}}>
                <li className="list-inline-item">
                    <input className="input form-control" placeholder="Search By Branch Name" name="branch"/>
                </li>
            </form>
        </>
        )
    }

    const addBranchField = () => {
        return(<>
            <form onSubmit={(e)=>handleCreateParcel(e)}>
                <li className="list-inline-item">
                    <input className="input form-control" placeholder="Enter Branch Name" name="branch" autoFocus
                    value={createBranch.branch} onChange={(e) => changeBranchData(e)}/>
                </li>
                <li className="list-inline-item">
                    <input className="input form-control" placeholder="Enter Branch Contact Number" name="contact"
                    value={createBranch.contact} onChange={(e) => changeBranchData(e)}/>
                </li>
                <li className="list-inline-item">
                    <button type="submit" className="btn btn-info">Create</button>
                </li>
            </form>
        </>)
    }

    const editData = async(id) => {
        console.log("working")
        setEditable("")
        console.log(createBranch)
        const res = await fetch(`http://localhost:4000/branchApi/updateBranch/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                ...createBranch
            })
        })

        const temp = await res.json()
        console.log(temp)
        setCreateBranch({branch:"", contact:""})

        let temp_branches = branches
        temp_branches = temp_branches.map(i => {
            if(i._id === id){
                console.log("if", i, temp)
                return temp
            }
            else{
                console.log("else", i)
                return i
            }})
        setBranchList(temp_branches)
    }

    const makeEditable = (branch) => {
        setEditable(branch._id)
        setCreateBranch({branch:branch.branch, contact:branch.contact})
    }

    return (
        <Card>
            <CardBody>
                <div className="d-md-flex no-block">
                    <CardTitle>Projects of the Month</CardTitle>
                    <div className="ml-auto form-between">
                        {toogle === "Search" ? addBranchField() : searchField()}
                     
                        <li className="list-inline-item ml-3">
                            <button className="btn btn-info" onClick={() => {toogle === "Create" ? setToggle("Search"): setToggle("Create")}}>{toogle}</button>
                        </li>
                    </div>
                </div>
                <div className="table-responsive mt-2">
                    <table className="table stylish-table mb-0 mt-2 no-wrap v-middle">
                        <thead>
                            <tr>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Name</th>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Contact</th>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Delete</th>
                                <th className="font-weight-normal text-muted border-0 border-bottom">Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {branches.map((branch, key) => (
                            <tr key={key}>
                        
                                    {editable === branch._id ? 
                                    <>
                                        <td><input className="input form-control" style={{width:"40%"}} placeholder="Enter Branch Name" name="branch"
                                            value={createBranch.branch} onChange={(e) => changeBranchData(e)}/></td>
                                        <td><input className="input form-control" style={{width:"40%"}} placeholder="Enter Branch Name" name="contact"
                                            value={createBranch.contact} onChange={(e) => changeBranchData(e)}/></td>
                                    </> : 
                                    <>
                                        <td><h6 className="font-weight-medium mb-0 nowrap">{branch.branch}</h6></td>
                                        <td><span className="d-inline-block text-center">{branch.contact}</span></td>
                                    </>}
                                
                                <td><button onClick={() => {editable ? setEditable("") : deleteBranch(branch._id)}}>{editable ? "Cancel" : "Delete"}</button></td>
                                <td><button onClick={() => {editable ? editData(branch._id) : makeEditable(branch)}}>{editable ? "Save" : "Edit"}</button></td>

                             
                            </tr>
                            ))}
                            
                        </tbody>
                    </table>
                    
                </div>
            </CardBody>
        </Card>
    )
}

export default BranchList
