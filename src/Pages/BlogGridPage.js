import React from 'react';
import CustomNavbar from '../components/CustomNavbar';
import Breadcrumb from '../components/Breadcrumb';
import BlogGrid from '../components/Blog/BlogGrid';
import FooterTwo from '../components/Footer/FooterTwo';
import FooterData from '../components/Footer/FooterData';

const BlogGridPage = () => {
    return(
        <div className="body_wrapper">
            <CustomNavbar slogo="sticky_logo" mClass="menu_four" nClass="w_menu ml-auto mr-auto"/>
            <Breadcrumb breadcrumbClass="breadcrumb_area" imgName="breadcrumb/banner_bg.png" Ptitle="Learn" Pdescription="Get the latest news and marketing strategies."/>
            <BlogGrid/>
            <FooterTwo FooterData={FooterData}/>
        </div>
    )
}
export default BlogGridPage;
