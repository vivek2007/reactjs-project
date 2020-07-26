import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import DesignBanner from '../components/Banner/DesignBanner';
import Service from '../components/Service/Service';
import Featuresitems from '../components/Features/Featuresitems';
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

export const Home = () => (

    <div className="body_wrapper">
        <CustomNavbar cClass="custom_container p0" hbtnClass="new_btn"/>
        <DesignBanner/>
        <Service />
        <section className="process_area bg_color sec_pad" >
        <h2 className="text-center" style={{color:"#000"}} >How Clicks Works</h2>
                <div className="container">
                    <div className="features_info">
                    
                        <img className="dot_img" src={require ('../img/dot.png')} alt=""/>
                        <Featuresitems rowClass="row flex-row-reverse" aClass="pr_70 pl_70"
                          fimage="process_1.png" iImg="icon01.png"
                          ftitle="What Is Clicks?" 
                          descriptions="Clicks is a historically effective and proven solution that can make you more money than you could imagine. Contractually obligated with exclusive partnershipsfor leading placements for digital media including banners and contextual link placements, Clicks has successfully secured the most premium brands and online entrepreneurs socan expect the perfect visitor to match your business, brand and offer with every purchase."/>

                        <Featuresitems rowClass="row" aClass="pl_100" fimage="process_2.png" iImg="icon02.png" 
                        ftitle="How Do You Get Traffic?" 
                        descriptions="Clicks is an exclusive membership network that has poured millions of dollars in development, creating the perfect traffic system for marketers and online entrepreneurs. There are only 250 active memberships allowed on the Clicks platform, due to overwhelming interest. In order to create an account, users are required to purchase a minimum set of 100 clicks. The Clicks dashboard provides state of the art display, tracking, analytics and conversion software for an exceptional user experience."/>

                        <Featuresitems rowClass="row flex-row-reverse" aClass="pr_70 pl_70" fimage="process_3.png" iImg="icon3.png"
                         ftitle="Why Should You Use Clicks?" 
                        descriptions="Clicks stands head and shoulders above the competition in the traffic generation arena. Buyers are getting exposure from publishers that would otherwise cost you millions. Far ahead of solo ads, pay per click networks, banner networks, email marketing and the like, Clicks has created a proprietary and unique process that will leave you with better leads, more traffic and a higher number of sales. All at less than half the cost traditional publishers would charge."/>

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
