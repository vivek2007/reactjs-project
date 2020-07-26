import React, { useState  } from "react";
import { Link,Redirect } from "react-router-dom";
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {toastmsg} from '../Helper';
import axios from 'axios';
import { useAuth } from "../context/auth";


const SignUpForm =()=>{

    const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState('');
    const [username, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setAuthTokens } = useAuth();

    const handleSubmit = (event) => {

        event.preventDefault();
            // axios.post("http://18.237.7.208:3000/api/v1/auth/signup", {
            //     username,
            //     email,
            //     password
            // }).then(result => {
            //     if (result.status === 200) {
            //         setAuthTokens(result.data, email );
            //         setLoggedIn(true);
            //     }
            // }).catch(e => {
            //     console.log(e.message);
            //   if(e.message==='Network Error') {
            //     setIsError(e.message)
            //   } else if (e.message==='Request failed with status code 400') {
            //     setIsError('Email has already been taken')
            // } else {
            //     setIsError('')
            //   }
            // });


            axios({
                method: 'post',
                url: `http://18.237.7.208:3000/v1/auth/signup`,
                // headers: {
                //     'Content-type': 'application/json',
                //   },
                data: `username=${username}&email=${email}&password=${password}`
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
                                <h2 className="f_p f_600 f_size_24 t_color3 mb_40">Sign Up</h2>
                                <form onSubmit={handleSubmit} className="login-form sign-in-form">
                                    <div className="form-group text_box">
                                        <label className="f_p text_c f_400">Username</label>
                                        <input type="text"
                                            value={username}
                                            onChange={e => {
                                                setName(e.target.value);
                                            }}
                                            className="form-control"
                                            placeholder="e.g Jhon Day" 
                                            required autoFocus/>

                                    </div>
                                    <div className="form-group text_box">
                                        <label className="f_p text_c f_400">Email Address</label>
                                        <input type="email"
                                            value={email}
                                            onChange={e => {
                                                setEmail(e.target.value);
                                            }}
                                            className="form-control"
                                            placeholder="example@example.com" 
                                            required autoFocus/>

                                    </div>
                                    <div className="form-group text_box">
                                        <label className="f_p text_c f_400">Password</label>
                                        <input type="password"
                                            value={password}
                                            minLength="6"
                                            onChange={e => {
                                            setPassword(e.target.value);
                                            }}
                                        className="form-control" placeholder="******" required />

                                    </div>

                                    <span style={{color:"red"}}>{isError}</span>

                                    <div className="extra mb_20">
                                        <div className="checkbox remember">
                                            <label>
                                                <input type="checkbox" required /> I agree to terms and conditions of this website.
                                            </label>
                                        </div>
                                        
                                        <div className="forgotten-password">
                                        { /* <Link to ="/#"> Forgot Password?</Link>*/ }
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between align-items-center">
                                        <button type="submit" className="btn_three">Sign Up</button>
                                        <div className="social_text d-flex ">
                                            <div className="lead-text"> <span className="float-right mt-3">  Or  <Link  to="/sign-in" > Sing In</Link></span></div>
                                            
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
                <ToastContainer closeButton={false} hideProgressBar={true} />
            </div>
        </section>
    )
}
export default SignUpForm;