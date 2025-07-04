import React from "react";

const About = () => {
  return (
    <react-fragment>
      <div className="rts-breadcrumb-area bg_image rts-section-gap">
        <div className="container ptb--40">
          <div className="row">
            <div className="breadcrumb-area-wrapper">
              <h1 className="title">About Us</h1>
              <div className="nav-bread-crumb">
                <a href="https://html.themewant.com/">Home</a>
                <i className="fa-solid fa-chevron-right"></i>
                <a href="#" className="current">
                  About US
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="rts-about-area rts-section-gap">
        <div className="container">
          <div className="row">
            <div className="col-lg-5 mb_md--30 mb_sm--30">
              <div className="about-image-left-wrapper">
                <div className="thumbnail-main move-right wow">
                  <img src="assets/images/about/01.jpg" alt="about" />
                </div>
                <div className="review-area">
                  <img src="assets/images/about/02.jpg" alt="" />
                  <div className="stars-area">
                    <div className="wrapper">
                      <div className="single">
                        <i className="fa-sharp fa-solid fa-star"></i>
                      </div>
                      <div className="single">
                        <i className="fa-sharp fa-solid fa-star"></i>
                      </div>
                      <div className="single">
                        <i className="fa-sharp fa-solid fa-star"></i>
                      </div>
                      <div className="single">
                        <i className="fa-sharp fa-solid fa-star"></i>
                      </div>
                      <div className="single">
                        <i className="fa-sharp fa-solid fa-star"></i>
                      </div>
                    </div>
                    <div className="content">
                      <span>TrustScore 4.8</span> |<span>2k reviews</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1">
              <div className="about-content-wrapper-right">
                <div className="title-wrapper-left">
                  <span
                    className="pre wow fadeInUp"
                    data-wow-delay=".2s"
                    data-wow-duration=".8s"
                  >
                    About Us
                  </span>
                  <h2
                    className="title wow fadeInUp"
                    data-wow-delay=".4s"
                    data-wow-duration=".8s"
                  >
                    Providing Exceptional <br /> Healthcare with a focus <br />{" "}
                    on patient.
                  </h2>
                </div>
                <p
                  className="disc wow fadeInUp"
                  data-wow-delay=".6s"
                  data-wow-duration=".8s"
                >
                  At Mediweb, our mission is to provide exceptional healthcare
                  services with a focus on patient-centered care. We are
                  dedicated to improving the health and well-being of our
                  community through.
                </p>
                <div
                  className="button-wrapper wow fadeInUp"
                  data-wow-delay=".8s"
                  data-wow-duration=".8s"
                >
                  <a href="#" className="rts-btn btn-primary">
                    About Us{" "}
                    <img
                      src="assets/images/banner/icons/arrow--up-right.svg"
                      alt=""
                    />
                  </a>
                  <div className="signature">
                    <img
                      className="one"
                      src="assets/images/about/01.png"
                      alt="about"
                    />
                    <img
                      className="sign"
                      src="assets/images/about/02.png"
                      alt="about"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </react-fragment>
  );
};

export default About;
