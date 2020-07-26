import React, { useState  } from "react";
import axios from 'axios';
//import { useAuth } from "../context/auth";
import CustomNavbar from '../components/CustomNavbar';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer/Footer';
import FooterData from '../components/Footer/FooterData';
import Slider from 'react-slick/';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
  };

const Order = () => {


   // const [isLoggedIn, setLoggedIn] = useState(false);
    const [isError, setIsError] = useState('');
   // const { setAuthTokens } = useAuth();

    const [totalclikcs, setTotalClikcs] = useState('');
    const [websiteurl, setWebsiteUrl] = useState('');
    const [card, setCard] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');
    const [cvc, setCvc] = useState('');
    const [amt, setAmt] = useState('');
   
    const customer_id = Math.floor(50000 + Math.random() * 900000);
    const expire_date = year  + '-' + month;
    const invoice_number = Math.floor(100000 + Math.random() * 900000);
    
    /*data: {id:customer_id,amount: totalamount, cardNumber: cardnumber,expirationDate:expire_date,
        cardCode:cvccode,invoiceNumber:invoice_number,firstName:firstname,lastName:lastname,
        address,address,city:city,state:state,zip:zipcode,country:country,email:email,
        mode:'live'} */

    const handleSubmit = (event) => {
        event.preventDefault();
            axios.post("https://climatechangepartnership.com/payment-api/", {
                id: customer_id,
                amount: amt,
                cardNumber: card,
                expirationDate : expire_date,
                cardCode: cvc,
                invoiceNumber : invoice_number,
                

            }).then(result => {
                if (result.status === 200) {

                }
            }).catch(e => {
             
             
            if(e.message==='Network Error') {
                setIsError(e.message)
              }   else {
                setIsError('')
              }
            });
    }


    return(
        <div className="body_wrapper">
            <CustomNavbar cClass="custom_container p0" hbtnClass="new_btn"/>
            <Breadcrumb breadcrumbClass="breadcrumb_area" 
            imgName="breadcrumb/banner_bg.png"
             Ptitle="Order Form" Pdescription="Better traffic, for less than half the cost."/>

        <section className="sign_in_area bg_color sec_pad">
        <div className="container">
                <div className="sign_info">
                    <div className="row">
                    

                    <div className="col-lg-6">
                             <img className="dot_img img-fluid" src={require ('../img/click_login_img.png')} alt=""/>
                    </div>

                    <div className="col-lg-6">

                        <div className="login_info form-group text_box">

                        <h5 className="text-success  form-h5">
                            <img className="dot_img img-fluid" src={require ('../img/green-click.png')} alt=""/>ORDER NOW USING SECURE SERVERS</h5>   
                        
                        <form onSubmit={handleSubmit}>

                        <div className="form-row">

                        <input type="number"
                            value={totalclikcs}
                            onChange={e => {
                                setTotalClikcs(e.target.value);
                                setAmt(e.target.value * 1);
                            }}
                            className="order-form-control"
                            placeholder="Number of Clicks" 
                            required autoFocus />

                        </div>

                    
                        <div className="form-row">
                        <input type="url"
                            value={websiteurl}
                            onChange={e => {
                            setWebsiteUrl(e.target.value);
                            }}
                            className="order-form-control"
                            placeholder="Website URL" 
                            required />
                    
                        </div>

                        <div className="form-row">
                        <input type="number"
                            value={card}
                            onChange={e => {
                            setCard(e.target.value);
                            }}
                            className="order-form-control"
                            placeholder="Enter Credit Card Number" 
                            required />

                        </div>
                        <div className="form-row">
                            <div className="col">
                                    <input type="number"
                                    value={month}
                                    onChange={e => {
                                    setMonth(e.target.value);
                                    }}
                                    className="order-form-control"
                                    placeholder="Exp. Month" 
                                    required />

                         </div>
                            <div className="col">
                                    <input type="number"
                                    value={year}
                                    onChange={e => {
                                        setYear(e.target.value);
                                    }}
                                    className="order-form-control"
                                    placeholder="Exp. Year" 
                                    required />
                                 </div>
                            <div className="col">
                              <input type="number"
                                    value={cvc}
                                    onChange={e => {
                                    setCvc(e.target.value);
                                    }}
                                    className="order-form-control"
                                    placeholder="Enter CVV/CCV" 
                                    maxLength="3"
                                    required />

                                 </div>
                        </div>
                        <input type="number"
                                    value={amt}
                                    onChange={e => {
                                    setAmt(e.target.value);
                                    }}
                                    className="order-form-control"
                                    placeholder="Amount" 
                                    required 
                                    readOnly  />

                        <p className="text-left">
                            <label className="text-dark">TERMS AND CONDITIONS</label>
                        </p>
                        <div className="form-group" >
                            <textarea id="term-box" readOnly className="form-control rounded-0" rows="3" placeholder="Clicks is a results oriented service, they do their best job to deliver the highest quality visitors to match every order. There is no comparison 
                            in quality with any other related service or software available. Being the most sought after traffic oriented service with a growing 
                            number of reviews for building email lists, getting paying customers for business opportunities, make money online offers, 
                            home based businesses, multi-level marketing and in general people looking to actively make money online,
                            there has never been a time where Clicks did not have a steady demand of customers or an overwhelming number of orders in queue 
                            for delivering high quality traffic to users. You are solely responsible to ensure the website you entered on Clicks 
                            is accurate. Clicks will not refund or reimburse clicks delivered for invalid entries. You agree that there is a strict no refund 
                            policy. Once a website is entered into the Clicks network it cannot be changed unless your account is eligible to
                            make those changes. You agree to receive periodic emails from Clicks which include, but are not limited to, system notifications, 
                            promotional emails and updates for the service. Data may be used by Clicks at their discretion. Clicks reserves the right to terminate 
                            or pursue legal action against any users found exploiting their systems or for any reason under our discretion, which may include click 
                            jacking or fraudulent referral compensations. You agree Clicks undergoes maintenance or upgrades periodically and that Clicks is not 
                            responsible to deliver their service all of the time. Clicks is an independent traffic network that is integrated and partnered with 
                            other leading services within the industry to provide the best possible experience to customers."></textarea>
                        </div>
                         <label>
                            <input type="checkbox" required /> I agree to terms and conditions of this website.
                        </label>
                            <button className="btn btn-secondry my-4 btn-block payment-btn" type="submit">Confirm</button>

                            {isError}
                        </form>
                  </div>
                </div>

                  
            </div>
        </div>
            </div>
             
            
            <div className="container">
            <div className="row">
                <div className="col-md-10 ml-auto mr-auto">
                    <section className="text-center my-5 p-1">
                        <h2 className="h1-responsive font-weight-bold my-5 testimonials-title">We've heard things like</h2>




                        <Slider {...settings} className="case_studies_slider">
                    <div className="iitem">
                        <div className="studies_item">
                                <div className="card testimonial-card">
                                    <div className="card-up info-color"></div>
                                    <div className="avatar mx-auto white"> <img src={require ('../img/Anthony-Andranik-Moumjian.jpeg')}  alt ="avator" className="rounded-circle img-fluid" /> </div>
                                    <div className="card-body">
                                        <h4 className="font-weight-bold mb-4">Anthony Andranik Moumjian </h4>
                                        <small>ClickBank Vendor, Social Media Influencer</small>
                                        <hr />
                                        <p className="dark-grey-text mt-4"><i className="fas fa-quote-left pr-2"></i>
                                        Ever since I started using Clicks for my business, the sales for my products and services finally started to see a return on investment, by a landslide! This chick digs Clicks!</p>
                                    </div>
                                </div>

                        </div>
                    </div>
                    <div className="iitem">
                        <div className="studies_item">
                                <div className="card testimonial-card">
                                    <div className="card-up blue-gradient"> </div>
                                    <div className="avatar mx-auto white"> <img src={require ('../img/alexandraisenegger.jpeg')}  alt ="avator" className="rounded-circle img-fluid" /> </div>
                                    <div className="card-body">
                                        <h4 className="font-weight-bold mb-4">Alexandria Isenegger</h4>
                                        <small>Creator of Moms and Marketers</small>
                                        <hr />
                                        <p className="dark-grey-text mt-4"><i className="fas fa-quote-left pr-2"></i>
                                        I bought 100,000 clicks by Clicks, a catchy phrase to say I know, "clicks by Clicks!" That tagline alone had me sold! Worth every penny. These commission checks and my vacation pictures on Instagram are proof.</p>
                                    </div>
                                </div>
                        </div>
                    </div>
                    <div className="iitem">
                        <div className="studies_item">
                                <div className="card testimonial-card">
                                    <div className="card-up indigo"></div>
                                    <div className="avatar mx-auto white"> <img src={require ('../img/Ray-Schilling.jpeg')} alt ="avator" className="rounded-circle img-fluid" /> </div>
                                    <div className="card-body">
                                        <h4 className="font-weight-bold mb-4">Ray Schilling</h4>
                                        <small>Affiliate Marketing Guru, Amazon FBA Seller</small>
                                        <hr />
                                        <p className="dark-grey-text mt-4"><i className="fas fa-quote-left pr-2"></i>
                                        I started with Amazon 3 years ago and grew my business to $10 million in revenue. I reinvested my profits to Clicks to drive sales for my FBA course to teach newbies how to make money on Amazon and it became a number one seller on JVZoo.</p>
                                       </div>
                                </div>
                    </div>
                    </div>
                    <div className="iitem">
                        <div className="studies_item">
                            <div className="card testimonial-card">
                                 <div className="card-up indigo"></div>
                                     <div className="avatar mx-auto white"> <img src={require ('../img/jerome.jpg')} alt ="avator"                             className="rounded-circle img-fluid" /> </div>
                                     <div className="card-body">
                                        <h4 className="font-weight-bold mb-4">Jerome Wallace</h4>
                                        <small>Founder of Retired by 40</small>
                                        <hr />
                                        <p className="dark-grey-text mt-4"><i className="fas fa-quote-left pr-2"></i>
                                        I thought it was impossible to make money online without falling for product launch after product launch. That switch flipped ever since I started using Clicks. I entered my affiliate link for the product I was promoting and voila, my first dollar online!</p>
                                    </div>
                                </div>
                        </div>
                    </div>
                </Slider>
</section>
                </div>
            </div>
        </div>
        
    </section>

    



            <Footer FooterData={FooterData}/>
        </div>
    )
}
export default Order;
