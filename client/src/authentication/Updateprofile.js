import React, { useContext, useState, useEffect } from 'react'
import { GlobalContext } from '../context/ProjectContext'
import BeatLoader from 'react-spinners/BeatLoader'
import { useHistory } from 'react-router-dom';
import test from '../assets/images/test.jpg'
const Updateprofile = () => {
    const history = useHistory()
    const { Email, branch, Username, _id, updateUser } = useContext(GlobalContext)
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        Username: Username, Email: Email, branch: branch
    })
    const [auth, setAuth] = useState({
        id: "", Name: "", Email: "", Branch: ""
    })
    const [updateToggle, setUpdateToggle] = useState(true)

    const updateInfo = () => {
        setUpdateToggle(!updateToggle)
    }
    const eventHandle = (e) => {
        let name
        let value
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value })
    }

    const updatedProfile = async () => {
        const { Username, Email } = user
        const res = await fetch(`http://localhost:4000/userApi/user/update/${_id}`, {
            method: "PUT",
            headers: {
                // 'Accept':"application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Username, Email
            })
        })

        const temp = await res.json()
        if (res.status === 200 && temp) {
            console.log("Updated Successfully")
            console.log(temp)
            updateUser(temp)
            setUpdateToggle(!updateToggle)
        }
        else {
            console.log(temp.message)
        }

    }
    const getInfo = async () => {

        const res = await fetch(`http://localhost:4000/authentication`, {
            method: "GET",
            headers: {
                'Accept': "application/json",
                "Content-Type": "application/json"
            },
            credentials: 'include'
        })

        const temp = await res.json()
        if (res.status === 200 && temp) {
            console.log("Updated Successfully")
            setAuth({ id: temp._id, Name: temp.Username, Email: temp.Email, Branch: temp.branch.branch })
            console.log(temp)
            setLoading(false)

        }
        else {
            history.push('/loggedin')
            console.log(temp.message)
        }

    }
    useEffect(() => {
        setLoading(true)
        getInfo()
    }, [])

    return (
        loading ? (<div className="show-pic"><BeatLoader color={"#36D7B7"} loading={loading} size={100} /></div>)
        :
        (
        <div class="main">
            <div class="container emp-profile">
                <form method="post">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="profile-img">
                                <img src={test} alt="" />
                                <div class="file btn btn-lg btn-primary">
                                    Change Photo
                                    <input type="file" name="file" />
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="profile-head">
                                {/* <h5>
                                    {auth.Name}
                                </h5> */}
                                {/* <h6>
                                    Web Developer and Designer
                                </h6> */}

                                <ul class="nav nav-tabs" id="myTab" role="tablist">
                                    <li class="nav-item">
                                        <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                                    </li>

                                </ul>
                            </div>
                            <div class="tab-content profile-tab" id="myTabContent">
                                <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>User Id</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{auth.id}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{auth.Name}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{auth.Email}</p>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Branch</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{auth.Branch}</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-md-2">
                            <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile" onClick={updateInfo} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
        )
    )




}

export default Updateprofile
