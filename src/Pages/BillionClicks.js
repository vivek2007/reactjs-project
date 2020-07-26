import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import Breadcrumb from '../components/Breadcrumb';
import Footer from '../components/Footer/Footer';
import FooterData from '../components/Footer/FooterData';

const BillionClicks = () => {
    return(
        <div className="body_wrapper">
            <CustomNavbar cClass="custom_container p0" hbtnClass="new_btn"/>
            <Breadcrumb breadcrumbClass="breadcrumb_area" imgName="breadcrumb/banner_bg.png" Ptitle="1 Billion Clicks" 
            Pdescription="We've served over 1 billion clicks."/>

        <section className="faq_area bg_color sec_pad">
            <div className="container">
                <div className="row">
                   <div className="col-lg-12">
                 
                   <iframe title="1BillionClicks" width="1280" height="720"
                   src="https://www.youtube.com/embed/0M8urdszSqk" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>


                    </div>
                </div>
            </div>
        </section>

            <Footer FooterData={FooterData}/>
        </div>
    )
}
export default BillionClicks;
