
import React, { useState,useParams  } from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toastmsg} from '../Helper';
import { useAuth } from "../context/auth";

const ChangePassword =()=>{
    let parts = window.location.pathname.split('/')
    let id =parts.pop() || parts.pop();
    console.log(window.location.pathname.split('/'),'sdfe')
     const [isLoggedIn, setLoggedIn] = useState(false);
     const [isError, setIsError] = useState('');
     const [password, setPassword] = useState('');
     const [confirmPassword, setConfirmPassword] = useState('')
     const { setAuthTokens } = useAuth();

     const handleSubmit = (event) => {
        event.preventDefault();

            axios({
                method: 'post',
                url: `http://18.237.7.208:3000/v1/auth/change-password`,
                // headers: {
                //     'Content-type': 'application/json',
                //   },
                data: `password=${password}&id=${id}`
              })
                .then(response => {
                  if (response.data.status === 1) {
                    toastmsg(response.data.message,toast.POSITION.TOP_CENTER,3000)
                    setTimeout(()=>{
                        setAuthTokens(response.data, password );
                        setLoggedIn(true);
                    },3000)
                   
                  }  else if(response.data.status == 0) {
                    toastmsg(response.data.message,toast.POSITION.TOP_CENTER,3000)
                    setIsError('')
                  }
                })
                .catch(e=>{
                    console.log(e,'error')})
    }

      

      if (isLoggedIn) {
           localStorage.setItem("username", password);
            return  <Redirect to="/sign-in" /> ;
        } 
          

    return(
        <section className="sign_in_area bg_color sec_pad">
            <div className="container">
                <div className="sign_info">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login_info">
                                <h2 className="f_p f_600 f_size_24 t_color3 mb_40">Change Password</h2>
                                <form onSubmit={handleSubmit} className="login-form sign-in-form">
                                    <div className="form-group text_box">
                                        <label className="f_p text_c f_400">New Password</label>
                                        <input type="password"
                                            value={password}
                                            onChange={e => {
                                            setPassword(e.target.value);
                                            }}
                                        className="form-control" placeholder="******" required />

                                    </div>
                                    {/* <div className="form-group text_box">
                                        <label className="f_p text_c f_400">Confirm Password</label>
                                        <input type="password"
                                            value={confirmPassword}
                                            onChange={e => {
                                            setConfirmPassword(e.target.value);
                                            }}
                                        className="form-control" placeholder="******" required />

                                    </div> */}
                                    <div className="extra mb_20">
                                       

                                        <span style={{color:"red"}}>{isError}</span>

                                    </div>


                                    <div className="d-flex justify-content-between align-items-center">
                                        <button type="submit" className="btn_three">Submit</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="col-lg-6">
                             <img className="dot_img img-fluid" src={require ('../img/click_login_img.png')} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer closeButton={false} hideProgressBar={true} />
        </section>
    )
}
export default ChangePassword;