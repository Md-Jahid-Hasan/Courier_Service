import React,{useContext,useState,useEffect} from 'react'
import { GlobalContext } from '../context/ProjectContext'
import test from '../assets/images/test.jpg'
const Updateprofile = () => {
    const {Email,branch,Username,_id,updateUser} = useContext(GlobalContext)
    const [user,setUser] = useState({
        Username:Username,Email:Email,branch:branch
    })
    const [branchName,setBranch]=useState([])
    const [updateToggle,setUpdateToggle] = useState(true)

    const updateInfo =()=>{
        setUpdateToggle(!updateToggle)
    }
    const eventHandle = (e)=>{
        let name
        let value
        name=e.target.name;
        value=e.target.value;
        setUser({...user,[name]:value})
    }
    
    const updatedProfile =async ()=>{
        const {Username,Email} = user
        const res = await fetch(`http://localhost:4000/userApi/user/update/${_id}`, {
                method: "PUT",
                headers: {
                    // 'Accept':"application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    Username,Email
                })
            }) 
        
        const temp = await res.json()
        if(res.status===200 && temp){
            console.log("Updated Successfully")
            console.log(temp)
            updateUser(temp)
            setUpdateToggle(!updateToggle)
            // console.log()
        }
        else{
            console.log(temp.message)
        }
        
    }


    if(updateToggle){
        return (
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
                                <h5>
                                    {Username}
                                </h5>
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
                                            <p>{_id}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{Username}</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{Email}</p>
                                        </div>
                                    </div>
                                    
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Branch</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>{branch}</p>
                                        </div>
                                    </div>
                                </div>
    
                            </div>
                        </div>
                        <div class="col-md-2">
                            <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile" onClick={updateInfo}/>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        )
    }
    else{
        return (
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
                                <h5>
                                    {Username}
                                </h5>
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
                                            <label>Name</label>
                                        </div>
                                        <div class="col-md-6">
                                        <input name="Username" type="text" value={user.Username} class="input form-control" id="eamil" placeholder="Enter Your Email" aria-label="Username" aria-describedby="basic-addon1" onChange={eventHandle} />
                                            {/* <p>{Username}</p> */}
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div class="col-md-6">
                                        <input name="Email" type="email" value={user.Email} class="input form-control" id="eamil" placeholder="Enter Your Email" aria-label="Username" aria-describedby="basic-addon1" onChange={eventHandle} />
                                            {/* <p>{Email}</p> */}
                                        </div>
                                    </div>
                                    
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                </form>


            </div>
            <div class="col-md-2">
                            {/* <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile" onClick={updateInfo}/> */}
                            <button className="btn btn-primary" onClick={updatedProfile}>Update</button>
                        </div>
        </div>
        
        )

    }

    
    
}

export default Updateprofile
