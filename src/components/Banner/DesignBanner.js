import React from "react";
import Reveal from "react-reveal/Reveal/";

const DesignBanner = () => {
  return (
    <section className="seo_home_area">
      <div className="home_bubble">
        <div className="bubble b_one"></div>
        <div className="bubble b_two"></div>
        <div className="bubble b_three"></div>
        <div className="bubble b_four"></div>
        <div className="bubble b_five"></div>
        <div className="bubble b_six"></div>
        <div className="triangle b_seven" data-parallax='{"x": 20, "y": 150}'>
          <img src={require("../../img/seo/triangle_one.png")} alt="" />
        </div>
        <div className="triangle b_eight" data-parallax='{"x": 120, "y": -10}'>
          <img src={require("../../img/seo/triangle_two.png")} alt="" />
        </div>
        <div className="triangle b_nine">
          <img src={require("../../img/seo/triangle_three.png")} alt="" />
        </div>
      </div>
      <div className="banner_top">
        <div className="container">
          <div className="row">
            <div className="col-md-8 ml-auto mr-auto text-center brand">
              <Reveal effect="fadeInUp" duration={500}>
                <h2>
                  Better traffic,
                  <br /> <span>for less than half the cost.</span>
                </h2>
              </Reveal>
              <Reveal effect="fadeInLeft" duration={1200}>
                <a
                  href="./"
                  className="seo_btn seo_btn_one btn_hover wow fadeInLeft"
                  data-toggle="modal" data-target="#exampleModal">
                  + Watch Video
                </a>
              </Reveal>

              <Reveal effect="fadeInUp" duration={1400}>
                <img
                  className="img-fluid banner-image"
                  src={require("../../img/seo/clicks-banner.png")}
                  alt=""
                />
              </Reveal>
            </div>
          </div>
        </div>
      </div>

      

<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-body">
      <video width="100%" height="100%" controls>
        <source src="vid.mp4" type="video/mp4" /> 
       </video>

     </div>
    </div>
  </div>
</div>
    </section>
  );
};
export default DesignBanner;
