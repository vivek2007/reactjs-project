import React, { Component } from "react";
import { Link , NavLink } from "react-router-dom";
import Sticky from "react-stickynode";

class CustomNavbar extends Component {
 
  render() {
   
    var { mClass, nClass, cClass, slogo, hbtnClass } = this.props;
    return (
      <>
      <Sticky top={0} innerZ={9999} activeClass="navbar_fixed">

        
        <header className="header_area">
          <nav className={`navbar navbar-expand-lg menu_one ${mClass}`}>
            <div className={`container ${cClass}`}>
              <a className={`navbar-brand ${slogo}`} href="/">
                <img src={require("../img/clicklogo.png")} alt="" />
                <img src={require("../img/clicklogo.png")} alt="logo" />
              </a>
              <button
                className="navbar-toggler collapsed"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
              >
                <span className="menu_toggle">
                  <span className="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                  <span className="hamburger-cross">
                    <span></span>
                    <span></span>
                  </span>
                </span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className={`navbar-nav menu ml-auto ${nClass}`}>
                <li className="dropdown submenu nav-item">
                  <a title="Home" className="nav-link"  href="/">
                     Home
                  </a>
                  </li>

                  <li className="dropdown submenu nav-item">
                    <a className="nav-link" href="/#how-it-works">How it Works</a>
                   </li>
                  <li className="dropdown submenu nav-item">
                  <a title="Pricing" className="nav-link"  data-toggle="modal" data-target="#exampleModal2">
                     1 Billion Clicks
                  </a>
                  </li>
                  <li className="dropdown submenu nav-item">
                  <NavLink title="Pricing" className="nav-link" to="/faq">
                        FAQ
                  </NavLink>
                   
                  </li>
                  <li className="nav-item dropdown submenu">
                    <NavLink title="Pricing" className="nav-link" to="/learn">
                       Learn
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink title="Pricing" className="nav-link" to="/contat">
                      Contact
                    </NavLink>
                  </li>
                </ul>
                <NavLink title="Pricing" className={`btn_get btn_hover ${hbtnClass}`} to="/order">
                   Order Now
                </NavLink>
                
              </div>
            </div>
          </nav>
  </header>

      </Sticky>
      

      <div className="modal fade" id="exampleModal2" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
    <div className="modal-content">
      <div className="modal-body">
      <video width="100%" height="100%" controls>
        <source src="vid2.mp4" type="video/mp4" /> 
       </video>

     </div>
    </div>
  </div>
</div>


      </>



    );
  }
}

export default CustomNavbar;
