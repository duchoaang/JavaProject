import 'bootstrap/dist/css/bootstrap.min.css';

import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

const Footer = () => {
    return (
        <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
            <section className="" style={{ background: '#f4f6f8', color: 'black', paddingTop: '8px' }}>
                <MDBContainer className="text-center text-md-start mt-5">
                    <MDBRow className="mt-3">
                        <MDBCol md="3" lg="4" xl="3" className="mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">
                                <MDBIcon icon="gem" className="me-3" />
                            Quản lý tài liệu
                            </h6>
                            <p>
                                "Kiến thức là sức mạnh", vì vậy để chúng tôi cùng phát triển sức mạnh cùng bạn qua chặng
                                đường học tập cùng với những tài liệu
                            </p>
                        </MDBCol>

                        <MDBCol md="2" lg="2" xl="2" className="mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Products</h6>
                            <p>
                                <a href="#!" className="text-reset">
                                    Facebook
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                    Insagram
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                    Zalo
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                    Twiter
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md="3" lg="2" xl="2" className="mx-auto mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Useful links</h6>
                            <p>
                                <a href="#!" className="text-reset">
                                    Pricing
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                    Settings
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                    Orders
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                    Help
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md="4" lg="3" xl="3" className="mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">Liên hệ</h6>
                            <p>
                                <MDBIcon icon="home" className="me-2" />
                                TP Hồ Chí Minh, Gò Vấp, Phường 3
                            </p>
                            <p>
                                <MDBIcon icon="envelope" className="me-3" />
                                codeheroes@gmail.com
                            </p>
                            <p>
                                <MDBIcon icon="phone" className="me-3" />
                                0941720502
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className="text-center p-4" style={{ background: '#f4f6f8', color: 'black', paddingTop: '8px' }}>
                © 2023 Copyright:
                <a className="text-reset fw-bold" href="https://codeheroes.com/">
                    Codeheroes.com
                </a>
            </div>
        </MDBFooter>
    );
};

export default Footer;
