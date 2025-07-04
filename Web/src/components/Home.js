import React from "react";

const Home = () => {
  return (
    <react-fragment>
      <div className="banner-area-start">
        <div className="container-full-header">
          <div className="row">
            <div className="col-lg-12">
              <div className="banner-area-one rts-section-gap bg_image">
                <div className="banner-content-area">
                  <div
                    className="pre-title wow fadeInUp"
                    data-wow-delay=".0s"
                    data-wow-duration=".8s"
                  >
                    <img src="assets/images/banner/icon/08.svg" alt="icons" />
                    <span>Your Health Our Priority</span>
                  </div>
                  <h1
                    className="title wow fadeInUp"
                    data-wow-delay=".2s"
                    data-wow-duration=".8s"
                  >
                    Your Health <br />
                    Our Priority
                  </h1>
                  <p
                    className="disc wow fadeInUp"
                    data-wow-delay=".4s"
                    data-wow-duration=".8s"
                  >
                    We provide comprehensive healthcare services with a personal
                    touch, ensuring you receive the best care possible.
                  </p>
                </div>
                <div className="person-image">
                  <img src="assets/images/banner/01.png" alt="heart" />
                  <div
                    className="single-tag wow zoomIn"
                    data-wow-delay=".2s"
                    data-wow-duration=".8s"
                  >
                    <img
                      src="assets/images/banner/icons/heart.svg"
                      alt="heart"
                    />
                    <span>Cardiology</span>
                  </div>
                  <div
                    className="single-tag two wow zoomIn"
                    data-wow-delay=".4s"
                    data-wow-duration=".8s"
                  >
                    <img
                      src="assets/images/banner/icons/neuron.svg"
                      alt="heart"
                    />
                    <span>Neurology</span>
                  </div>
                  <div
                    className="single-tag three wow zoomIn"
                    data-wow-delay=".6s"
                    data-wow-duration=".8s"
                  >
                    <img
                      src="assets/images/banner/icons/orthopedics.svg"
                      alt="heart"
                    />
                    <span>Orthopedics</span>
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

export default Home;
