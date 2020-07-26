
import React, { useState  } from "react";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toastmsg} from '../Helper';
import { useAuth } from "../context/auth";

const SignInFrom =()=>{

     const [isLoggedIn, setLoggedIn] = useState(false);
     const [isError, setIsError] = useState('');
     const [email, setUserName] = useState('');
     const [password, setPassword] = useState('');
     const { setAuthTokens } = useAuth();

     const handleSubmit = (event) => {
        event.preventDefault();
            // axios.post("https://fullstackdevpro.work/laravel-jwt-master/api/login", {
            //     email,
            //     password
            // }).then(result => {
            //     if (result.status === 200) {
            //         setAuthTokens(result.data, email );
            //         setLoggedIn(true);
            //     }
            // }).catch(e => {
            //   if(e.message==='Network Error') {
            //     setIsError(e.message)
            //   } else if (e.message==='Request failed with status code 400') {
            //     setIsError('Invalid Email or Password')
            // } else {
            //     setIsError('')
            //   }
            // });

            axios({
                method: 'post',
                url: `http://18.237.7.208:3000/v1/auth/login`,
                // headers: {
                //     'Content-type': 'application/json',
                //   },
                data: `email=${email}&password=${password}`
              })
                .then(response => {
                    console.log(response)
                  if (response.data.status === 1) {
                    toastmsg(response.data.message,toast.POSITION.TOP_CENTER,3000)
                    setTimeout(()=>{
                        setAuthTokens(response.data, email );
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
           localStorage.setItem("username", email);
            return  <Redirect to="/order" /> ;
        } 
          

    return(
        <section className="sign_in_area bg_color sec_pad">
            <div className="container">
                <div className="sign_info">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className="login_info">
                                <h2 className="f_p f_600 f_size_24 t_color3 mb_40">Sign In</h2>
                                <form onSubmit={handleSubmit} className="login-form sign-in-form">
                                    <div className="form-group text_box">
                                        <label className="f_p text_c f_400">Email or Name</label>
                                        <input type="text"
                                            value={email}
                                            onChange={e => {
                                                setUserName(e.target.value);
                                            }}
                                            className="form-control"
                                            placeholder="example@example.com" 
                                            required autoFocus/>
                                    </div>
                                    <div className="form-group text_box">
                                        <label className="f_p text_c f_400">Password</label>
                                        <input type="password"
                                            value={password}
                                            onChange={e => {
                                            setPassword(e.target.value);
                                            }}
                                        className="form-control" placeholder="******" required />

                                    </div>
                                    <div className="extra mb_20">
                                        {/* <div className="checkbox remember">
                                            <label>
                                                <input type="checkbox"/> Keep me Signed in
                                            </label>
                                        </div>*/}
                                       
                                        {/*<div className="forgotten-password">
                                            <a href="/#">Forgot Password?</a>
                                        </div> */}

                                        <span style={{color:"red"}}>{isError}</span>

                                    </div>


                                    <div className="d-flex justify-content-between align-items-center">
                                        <button type="submit" className="btn_three">Log in</button>
                                        <div className="social_text d-flex ">
                                            <div className="lead-text">
                                                <span className="float-right mt-3"> Don't have an account? 
                                                 <Link  to="/sign-up" > Create Now</Link></span></div>
                                            
                                        </div>
                                    </div>


                                    <div className="d-flex justify-content-between align-items-center">
                                        <div className="social_text d-flex ">
                                            <div className="lead-text"> <span className="float-right mt-3">    <Link  to="/forgot-password" > Forgot Password</Link></span></div>
                                            
                                        </div>
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
export default SignInFrom;