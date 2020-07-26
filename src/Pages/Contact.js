import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import Breadcrumb from '../components/Breadcrumb';
import Contacts from '../components/Contacts';
import Footer from '../components/Footer/Footer';
import FooterData from '../components/Footer/FooterData';

const About = () => {
    return(
        <div className="body_wrapper">
            {/*<CustomNavbar slogo="sticky_logo" mClass="menu_four" nClass="w_menu ml-auto mr-auto"/>*/ }
            <CustomNavbar cClass="custom_container p0" hbtnClass="new_btn"/>
            <Breadcrumb breadcrumbClass="breadcrumb_area" imgName="breadcrumb/banner_bg.png" Ptitle="Contact Us" 
            Pdescription="Do you need someone to speak with? Just say the word."/>
            <Contacts/>
            <Footer FooterData={FooterData}/>
        </div>
    )
}
export default About;
