import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import Breadcrumb from '../components/Breadcrumb';
import ChangePassword from '../components/ChangePassword';
import Footer from '../components/Footer/Footer';
import FooterData from '../components/Footer/FooterData';

const SignIn = () => {
    return(
        <div className="body_wrapper">
            {/*<CustomNavbar slogo="sticky_logo" mClass="menu_four" nClass="w_menu ml-auto mr-auto"/>*/}
            <CustomNavbar cClass="custom_container p0" hbtnClass="new_btn"/>
              <Breadcrumb breadcrumbClass="breadcrumb_area" imgName="breadcrumb/banner_bg.png"
             Ptitle="Change Password" Pdescription="Login using our secure servers."/>

            
            <ChangePassword/>

            <Footer FooterData={FooterData}/>
        </div>
    )
}
export default SignIn;
