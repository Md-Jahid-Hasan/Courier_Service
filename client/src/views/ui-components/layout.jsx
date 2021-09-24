import React, {useState, useEffect, useContext} from 'react';
import { Container, Card, CardBody, CardTitle } from 'reactstrap';
import {GlobalContext} from "../../context/ProjectContext"



const LayoutComponent = () => {
    const [userData, setUserData] = useState({Email: "", Username:"", Password:"", Cpassword:""})
    const [branch, setBranch] = useState([])
    const {authenticateUser, setAlertData} = useContext(GlobalContext);
    const [createAlert, setAlert] = useState({msg:"", code:"", visibility:false})

    useEffect(() => {
        if(createAlert.visibility && !(createAlert.code === "success"))
            setAlert({...createAlert, visibility:false, code: "info"})
    }, [userData])
    

    useEffect(() => {
        const getBranchName = async() => {
            const res = await fetch('http://localhost:4000/branchApi/getBranch', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }) 

            const temp = await res.json()
            setBranch(temp)
        }
        getBranchName()
    }, [])


    const password_show_hide = () => {
        var x = document.getElementById("password");
        var show_eye = document.getElementById("show_eye");
        var hide_eye = document.getElementById("hide_eye");
        hide_eye.classList.remove("d-none");
        if (x.type === "password") {
          x.type = "text";
          show_eye.style.display = "none";
          hide_eye.style.display = "block";
        } else {
          x.type = "password";
          show_eye.style.display = "block";
          hide_eye.style.display = "none";
        }
    }

    const handleUserData = async(e) => {
        e.preventDefault()
        
        if(authenticateUser.IsSuperAdmin){
            userData['IsAdmin'] = true
        }
        const branch = document.getElementById('sel1').value
        const res = await fetch(`http://localhost:4000/userApi/user/${branch}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...userData
                })
            }) 
        
        const temp = await res.json()
        if(res.status === 200){
            setAlert({...createAlert, msg:"User Create Successfully", code:"success", visibility:true})
            setAlertData({message: "User Create Successfilly", code: "success"})
            setUserData({Email: "", Username:"", Password:"", Cpassword:""})
        } else{
            setAlert({...createAlert, msg:temp.message, code:"danger", visibility:true})
            setAlertData({message: temp.message, code: "danger"})
        }

        console.log(userData)
        console.log(temp)
    }

    return (
        <div>
            <Card>
                <CardTitle className="bg-light border-bottom p-3 mb-0">
                    <i className="mdi mdi-apps mr-2"> </i>
                    Create A User
                </CardTitle>

                <CardBody className="">
                    <Container>
                        {/* <Notification {...createAlert} /> */}
                   
                        <div className="container-fluid">
                            <div className="row d-flex justify-content-center align-items-center m-0">
                            <div className="login_oueter">
                                <form action="" method="post" id="login" autocomplete="off" 
                                    className="bg-light border p-3" onSubmit={(e) =>handleUserData(e)}>
                                <div className="form-row">
                                    <h4 className="title my-3">Register For an Account</h4>
                                    <div className="col-12">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1"><i className="fas fa-user"></i></span>
                                        </div>
                                        <input name="username" type="text" value={userData.Username} className="input form-control" id="username" 
                                        placeholder="Username" aria-label="Username" aria-describedby="basic-addon1" 
                                        onChange={(e) => {
                                            setUserData({...userData, Username: e.target.value})}}/>
                                    </div>
                                    </div>
                                    <div className="col-12">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1"><i className="fas fa-envelope"></i></span>
                                        </div>
                                        <input name="email" type="text" value={userData.Email} className="input form-control" id="email"
                                        placeholder="Enter Your Email" aria-label="Username" aria-describedby="basic-addon1" 
                                        onChange={(e) => setUserData({...userData, Email: e.target.value})}/>
                                    </div>
                                    </div>


                                    <div className="col-12">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1"><i className="fas fa-code-branch"></i></span>
                                        </div>
                                        <select className="form-control form-control-sm" id="sel1" defaultValue={'DEFAULT'}>
                                        <option value="DEFAULT" disabled hidden>
                                            Enter Your Branch
                                        </option>
                                        {branch.map((x, key) => 
                                            <option key={key} value={x._id}>{x.branch}</option>
                                        )}
                                        
                                        </select>
                                    </div>
                                    </div>


                                    <div className="col-12">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1"><i className="fas fa-lock"></i></span>
                                        </div>
                                        <input name="password" type="password" value={userData.Password} className="input form-control" id="password" 
                                        placeholder="password" required aria-label="password" aria-describedby="basic-addon1" 
                                        onChange={(e) => setUserData({...userData, Password: e.target.value})}/>
                                        <div className="input-group-append">
                                        <span className="input-group-text" onClick={() => password_show_hide()}>
                                            <i className="fas fa-eye" id="show_eye"></i>
                                            <i className="fas fa-eye-slash d-none" id="hide_eye"></i>
                                        </span>
                                        </div>
                                    </div>
                                    </div>
                                    <div className="col-12">
                                    <div className="input-group mb-3">
                                        <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1"><i className="fas fa-lock"></i></span>
                                        </div>
                                        <input name="confirm password" type="password" value={userData.Cpassword} className="input form-control" id="confirm password" 
                                        placeholder="confirm password" required aria-label="password" aria-describedby="basic-addon1" 
                                        onChange={(e) => setUserData({...userData, Cpassword: e.target.value})}/>
                                        <div className="input-group-append">
                                        <span className="input-group-text" onClick={() => password_show_hide()}>
                                            <i className="fas fa-eye" id="show_eye"></i>
                                            <i className="fas fa-eye-slash d-none" id="hide_eye"></i>
                                        </span>
                                        </div>
                                    </div>
                                    </div>
                                
                                    <div className="col-12" id="loginbtnDiv">
                                    <button className="btn btn" type="submit" id="signinbtn" name="signin">Login</button>
                                    </div>
                                </div>
                                </form>
                            </div>
                            </div>
                        </div>
                    </Container>
                </CardBody>
            </Card>
            {/* --------------------------------------------------------------------------------*/}
            {/* Row*/}
            {/* --------------------------------------------------------------------------------*/}

            {/* --------------------------------------------------------------------------------*/}
            {/* End Inner Div*/}
            {/* --------------------------------------------------------------------------------*/}
        </div>
    );
}

export default LayoutComponent;