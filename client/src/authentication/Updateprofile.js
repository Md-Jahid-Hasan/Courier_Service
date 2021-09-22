import React from 'react'
import test from '../assets/images/test.jpg'
const Updateprofile = () => {
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
                                    Md.Sumon Hossain
                                </h5>
                                <h6>
                                    Web Developer and Designer
                                </h6>

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
                                            <p>sumonsaiful24</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Name</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>Md.Sumon Hossain</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Email</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>sumon_hossain @coredevs.co</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Phone</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>123 456 7890</p>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-md-6">
                                            <label>Profession</label>
                                        </div>
                                        <div class="col-md-6">
                                            <p>Web Developer and Designer</p>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div class="col-md-2">
                            <input type="submit" class="profile-edit-btn" name="btnAddMore" value="Edit Profile" />
                        </div>
                    </div>
                </form>


            </div>
        </div>

    )
}

export default Updateprofile
