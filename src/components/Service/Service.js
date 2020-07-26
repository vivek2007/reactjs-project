import React from 'react';
import SeoTitle from '../Title/SeoTitle';
import Fade from 'react-reveal/Fade';

const Service = () => {
    return(
        <React.Fragment>
            <section className="seo_service_area sec_pad">
                <div className="container">
                    <SeoTitle Title='Get Results with Better Traffic' TitleP='When you get started with Clicks, you are getting traffic from qualified leads that are curated to buy what you’re selling.'/>
                    <div className="row seo_service_info">
                        <Fade bottom duration={500}>
                            <div className="col-lg-4 col-md-6">
                                <div className="seo_service_item text-center">
                                    <img src={require('../../img/box1.png')} alt=""/>
                                    <a href=".#">
                                        <h4>Dedicated Super Computing</h4>
                                    </a>
                                    <p>Clicks is hosted on privatized cloud computing servers that is able to manage millions of clicks served every second.</p>
                                    {/*<a href=".#"><i className="arrow_right"></i></a>*/}
                                </div>
                            </div>
                        </Fade>
                        <Fade bottom duration={700} >
                            <div className="col-lg-4 col-md-6">
                                <div className="seo_service_item text-center">
                                    <img src={require('../../img/box2.png')} alt=""/>
                                    <a href=".#">
                                        <h4>All Encompassing Traffic Generation</h4>
                                    </a>
                                    <p>Built with the customers perspective, Clicks provides the tools, analytics and support to turn every campaign into a success.</p>
                                  {/*<a href=".#"><i className="arrow_right"></i></a>*/}
                                </div>
                            </div>
                        </Fade>
                        <Fade bottom duration={1000}>
                            <div className="col-lg-4 col-md-6">
                                <div className="seo_service_item text-center">
                                    <img src={require('../../img/box3.png')} alt=""/>
                                    <a href=".#">
                                        <h4>Email Marketing</h4>
                                    </a>
                                    <p>The dedicated Clicks staff works around the clock to guarantee every click delivered, is of the highest standard of visitor that matches the website entered for every campaign.</p>
                                    {/*<a href=".#"><i className="arrow_right"></i></a>*/}
                                </div>
                            </div>
                        </Fade>
                        { /*<div className="col-lg-12 text-center mt_40">
                            <a href=".#" className="seo_btn seo_btn_one btn_hover">All Features</a>
                         </div> */ }
                    </div>
                </div>
                <div id="how-it-works"></div>
            </section>
           
        </React.Fragment>
    )
}

export default Service;
