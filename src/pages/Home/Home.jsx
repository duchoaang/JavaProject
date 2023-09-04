import styled from "@emotion/styled";
import "./Home.css";

const Home = () => {
  return (
    <>
      <div className="main_body">
        <div class="cover bg-light">
          <div class="container px-2">
            <div class="row">
              <div class="col-lg-6">
                <div class="mt-5 pt-lg-5">
                  <h1
                    class="intro-title marker aos-init aos-animate"
                    data-aos="fade-left"
                    data-aos-delay="50"
                  >
                    Hệ thống <span style={{color:'red'}}>quản lý khóa luận</span> trường Đại Học Mở TPHCM.{" "}
                  </h1>
                  <p
                    class="lead fw-normal mt-4 aos-init aos-animate"
                    data-aos="fade-up"
                    data-aos-delay="100"
                  >
                   Hệ thống đăng kí, theo dõi, quản lý khóa luận của sinh viên. Sinh viên vui lòng đọc rõ các quy định trước khi đăng kí khóa luận
                  </p>
                  <div
                    class="mt-3 aos-init aos-animate"
                    data-aos="fade-up"
                    data-aos-delay="200"
                  >
                    <a
                      class="btn btn-primary shadow-sm mt-1 me-2"
                      href="#contact"
                    >
                    Giới thiệu <i class="fas fa-arrow-right ms-1"></i>
                    </a>
                    <a
                      class="btn btn-outline-secondary mt-1"
                      data-bigpicture='{"ytSrc": "aqz-KE-bpKQ"}'
                      href="#"
                    >
                      <i class="fas fa-play-circle me-1"></i>Xem tin tức
                    </a>
                  </div>
                </div>
              </div>
              <div
                class="col-lg-6 p-3 pe-lg-0 aos-init aos-animate"
                data-aos="fade-left"
                data-aos-delay="100"
              >
                <img
                  class="pt-2 img-fluid"
                  src="https://demo.templateflip.com/super/images/illustrations/building_websites.svg"
                  alt="hello"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="body_wrapper">
          <div class="text-center mb-4">
            <h2 class="marker marker-center">Quản lý khóa luận</h2>
          </div>
          <div class="text-center">
            <p class="">
              Đăng kí, theo dõi, hỗ trợ, báo cáo các vấn đề liên quan đến khóa luận 
            </p>
          </div>
          <div class="row py-3">
            <div
              class="col-md-6 col-lg-3 text-center aos-init aos-animate"
              data-aos="fade-up"
              style={{cursor:'pointer'}}
              data-aos-delay="100"
            >
              <div class="border rounded p-3 bg-light mb-3">
                <div class="text-center text-secondary display-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-palette-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M12.433 10.07C14.133 10.585 16 11.15 16 8a8 8 0 1 0-8 8c1.996 0 1.826-1.504 1.649-3.08-.124-1.101-.252-2.237.351-2.92.465-.527 1.42-.237 2.433.07zM8 5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm4.5 3a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zM5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm.5 6.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                  </svg>
                </div>
                <h3 class="h4 mt-2">Đăng kí khóa luận</h3>
                <p class="text-small">
                  Đăng kí thực hiện khóa luận
                  Kiểm tra kĩ các thông tin trước khi đăng kí
                </p>
              </div>
            </div>
            <div
              class="col-md-6 col-lg-3 text-center aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="200"
              style={{cursor:'pointer'}}
            >
              <div class="border rounded p-3 bg-light mb-3">
                <div class="text-center text-secondary display-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-chat-left-text"
                    viewBox="0 0 16 16"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H4.414A2 2 0 0 0 3 11.586l-2 2V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12.793a.5.5 0 0 0 .854.353l2.853-2.853A1 1 0 0 1 4.414 12H14a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                    <path d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />
                  </svg>
                </div>
                <h3 class="h4 mt-2">Báo cáo</h3>
                <p class="text-small">
                  Báo cáo các vấn đề liên quan đến khóa luận.
                 Báo cáo nếu có sự cố
                </p>
              </div>
            </div>
            <div
              class="col-md-6 col-lg-3 text-center aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="300"
              style={{cursor:'pointer'}}
            >
              <div class="border rounded p-3 bg-light mb-3">
                <div class="text-center text-secondary display-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-calendar-check-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4V.5zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2zm-5.146-5.146-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 0 1 .708-.708L7.5 10.793l2.646-2.647a.5.5 0 0 1 .708.708z" />
                  </svg>
                </div>
                <h3 class="h4 mt-2">Theo dõi </h3>
                <p class="text-small">
                  Theo dõi tình trạng của khóa luận.
                 Kiểm tra các thông tin liên quan.
                </p>
              </div>
            </div>
            <div
              class="col-md-6 col-lg-3 text-center aos-init aos-animate"
              data-aos="fade-up"
              data-aos-delay="400"
              style={{cursor:'pointer'}}
            >
              <div class="border rounded p-3 bg-light mb-3">
                <div class="text-center text-secondary display-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    fill="currentColor"
                    class="bi bi-people-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7Zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216ZM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />
                  </svg>
                </div>
                <h3 class="h4 mt-2">Hỗ trợ</h3>
                <p class="text-small">
                  Liên hệ hỗ trợ trực tuyến.
                 Các vấn đề liên quan đến khóa luận
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
