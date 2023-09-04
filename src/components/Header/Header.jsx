import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import axios from 'axios';
import Button from '@/Button';
import Swal, { swal } from 'sweetalert2/dist/sweetalert2.js';
import 'sweetalert2/src/sweetalert2.scss';
import Btn from '@mui/material/Button';
import Input from '@/Input';
import Tooltip from '@mui/material/Tooltip';
import { useGoogleLogin, googleLogout } from '@react-oauth/google';
import GoogleButton from 'react-google-button';
const cx = classNames.bind(styles);
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import get from '~/utils/request/get';
import post from '~/utils/request/post';

import 'boxicons';


const ModalWrapper = ({ show, children }) => {
    return <div className={cx('modal-wrapper', { show })}>{children}</div>;
};

const UserController = ({ show, children }) => {
    return <div className={cx('user-controller', { show })}>{children}</div>;
};
const Header = () => {
    const [user, setUser] = useState(false);
    const [userGoogle, setUserGoogle] = useState([]);
    const [anchorEl, setAnchorEl] = useState(null);
    const [infoUser, setInfoUser] = useState([]);
    const [infoUserGoogle, setInfoUserGoogle] = useState([]);
    const [formDataLoginGoogle, setFormDataLoginGoogle] = useState([]);
    const [idUser, setIdUser] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [checkButton, setCheckbutton] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [errorMessage, setErrorMessage] = useState(false);
    const [showAlertConfirmEmail, setShowAlertConfirmEmail] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [ErrorUserNameEmail, setErrorUserNameEmail] = useState(false);
    const [results, setResults] = useState([]);
    const [loginFailed, setLoginFailed] = useState(false);
    const [loginByGG, setLoginByGG] = useState(false);
    const [resendEmail, setResendEmail] = useState(false);
    // const logOut = () => {
    //     googleLogout();
    //     setProfile(null);


    // };
    const open = Boolean(anchorEl);
  
   




    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUserGoogle(codeResponse);
            setLoginByGG(true);
        },

        onError: (error) => console.log('Login Failed:', error),
    });
    // gui thong tin user google len server
    useEffect(() => {
        if (formDataLoginGoogle.length !== 0) {
            post('users/loginGoogle', formDataLoginGoogle, { withCredentials: true })
                .then((response) => {
                    setUser(true);
                    setInfoUser({
                        id: response.id,
                        name: response.name,
                        avatar: response.avatar,
                    });
                    setShowModal(false);
                    setLoginFailed(false);
                    window.location.reload();
                })
                .catch((error) => {
                    // setLoginFailed(true);
               
                });
        }
    }, [formDataLoginGoogle]);
    const AlertConfirmEmail = () => {
        
        Swal.fire({
            title: 'Hãy xác thực email !',
            html: 'Cảm ơn bạn đã đăng kí. Chúng tôi đã gửi một mã xác thực qua gmail, vui lòng xác thực để có thể sử dụng dịch vụ! .',
            timer: 6000,
            timerProgressBar: true,
            didOpen: () => {
                Swal.showLoading();
            },
            willClose: () => {
                setShowAlertConfirmEmail(false); 

            },
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
              
            }
        });
    };

    useEffect(() => {
        setIsFormValid(
            userName !== '' && userPassword !== '' && userEmail !== '' && confirmPassword !== '' && checkButton,
        );
    }, [userName, userPassword, userEmail, confirmPassword, checkButton]);
    // form data dang ki
    const [formData, setFormData] = useState({
        // Khởi tạo giá trị mặc định của form
        name: userName,
        email: userEmail,
        password: userPassword,
    });
    // form data dang nhap
    const [formDataLogin, setFormDataLogin] = useState({
        taiKhoan: userName,
        matKhau: userPassword,
    });

    const handleLogin = () => {
        setShowModal(true);
        setShowRegister(false);
    };
    useEffect(() => {
        if (showRegister) {
            setFormData({
                name: userName,
                email: userEmail,
                password: userPassword,
            });
        } else
            setFormDataLogin({
                taiKhoan: userName,
                matKhau: userPassword,
            });
    }, [userName, userEmail, userPassword]);
    console.log(formDataLogin);
    const handleSubmit = (e) => {
        e.preventDefault();
        if (userPassword === confirmPassword) {
            setShowLoading(true);
            setErrorMessage(false);
          
            post('users/register', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
            })
                .then((data) => {
                    
                    if (data.status === 200) {
                        alert(data.message);
                        setShowRegister(false);
                        // setShowAlertConfirmEmail(true);
                        setConfirmEmail(true);
                    } else if (data.status === 404) {
                        alert(data.message);
                        setShowLoading(false);
                        setErrorUserNameEmail(true);
                        setConfirmEmail(false);
                    }
                })
                .catch((error) => {});
        } else setErrorMessage(true);
    };
    //search
    // resend-confirm
    // dang nhap
    const handleSubmitLogin = (e) => {
        e.preventDefault();
        console.log("da clcik")
        post('api/login/', formDataLogin)
            .then((response) => {
                console.log(response);
                
                // setUser(true);
                // setInfoUser({
                //     id: response.id,
                //     username: response.username,
                //     avatar: response.avatar,
                // });  
                // setShowModal(false);
                // setLoginFailed(false);
                // window.location.reload();
             
        })
            .catch((error) => {
                setLoginFailed(true);
                console.log(error);
            });
    };
    const handleRegister = () => {
        setShowAlertConfirmEmail(false);
        setErrorUserNameEmail(false);
        setUserPassword('');
        setUserEmail('');
        setUserName('');
        setConfirmPassword('');
        setShowLoading(false);
        setShowModal(false);
        setShowRegister(true);
    };

    const handleCancel = () => {
        setUserName('');
        setShowRegister(false);
        setShowModal(false);
    };

    const handleAlertClose = () => {
        setShowAlertConfirmEmail(false);
        setShowLoading(false);
    };
    const handleLogout = () => {
        post('users/logout', infoUser.id, { withCredentials: true })
            .then((response) => {
                setUser(false);
                const url = 'http://localhost:3000/';
                const link = document.createElement('a');
                link.href = url;
                link.click();
             })
            .catch((error) => {
                
            });
    };
    

    return (
        <>
            {showAlertConfirmEmail && <AlertConfirmEmail onClose={handleAlertClose} />}

            <ModalWrapper show={showModal}>
                <div className={cx('modal-inner')}>
                    <h2>Đăng nhập bằng </h2>
                    {loginFailed && <h2 style={{ fontSize: '16px', color: 'red' }}>Tài khoản hoặc mật khẩu sai !</h2>}
                    <span className={cx('cancel', 'material-icons')} onClick={handleCancel}>
                        cancel
                    </span>
                    <div className="d-flex g-2 justify-content-center">
                        <div id="signInGoogle">
                            <>
                                {/* <GoogleLogin /> */}
                                <GoogleButton
                                    type="dark"
                                    label="Đăng nhập với Google "
                                    size="small"
                                    onClick={() => login()}
                                />
                                {/* <button onClick={() => login()}>Sign in with Google 🚀 </button> */}
                            </>
                        </div>
                    </div>
                    <p className="mt-3">hoặc</p>

                    <form onSubmit={handleSubmitLogin}>
                        <div className="mb-3 text-start">
                            <label htmlFor="login-email" className="form-label">
                                Tên người dùng hoặc email
                            </label>
                            <input
                                onChange={(e) => setUserName(e.target.value)}
                                type="text"
                                className="form-control"
                                id="login-email"
                                placeholder="Tên tài khoản..."
                            />
                        </div>
                        <div className="text-start">
                            <label htmlFor="login-password" className="form-label">
                                Mật khẩu
                            </label>
                            <input
                                onChange={(e) => setUserPassword(e.target.value)}
                                type="password"
                                className="form-control"
                                id="login-password"
                                placeholder="Mật khẩu..."
                            />
                        </div>
                        {/* <div className="text-start">
                            <label htmlFor="login-password" className="form-label">
                               Resend Email
                            </label>
                            <button
                                onClick={(e) => {handleResendEmail}}
                               value="Gửi lại xác thực"
                            />
                        </div> */}
                        <div className="d-flex justify-content-between mt-3">
                            <div>
                                <input type="checkbox" id="login-remember" name="login-remember" />
                                <label htmlFor="login-remember">Ghi nhớ tôi</label>
                            </div>
                            <Link to="/">Quên mật khẩu</Link>
                        </div>
                        <Button className="w-100 mt-3">ĐĂNG NHẬP</Button>
                    </form>
                    <p className="text-center mt-3">
                        Đây là lần đầu tiên của bạn?&nbsp;
                        <b style={{ cursor: 'pointer' }} onClick={handleRegister}>
                            Đăng ký ngay
                        </b>
                    </p>
                </div>
            </ModalWrapper>

            <ModalWrapper show={showRegister}>
                <div className={cx('modal-inner')} style={{ height: '550px' }}>
                    <h2>Đăng ký</h2>
                    {errorMessage && (
                        <h2 style={{ fontSize: '18px', color: 'red', fontWeight: '600' }}>
                            Xác nhận mật khẩu không đúng !!
                        </h2>
                    )}
                    <span className={cx('cancel', 'material-icons')} onClick={handleCancel}>
                        cancel
                    </span>
                    {ErrorUserNameEmail && (
                        <h2 style={{ fontSize: '18px', color: 'red', fontWeight: '600' }}>
                            Tên người dùng hoặc email đã được sử dụng{' '}
                        </h2>
                    )}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3 text-start">
                            <label htmlFor="register-username" className="form-label">
                                Tên người dùng của bạn
                            </label>
                            <input
                                value={userName}
                                type="text"
                                onChange={(e) => setUserName(e.target.value)}
                                className="form-control"
                                id="register-username"
                                placeholder="username"
                            />
                        </div>
                        <div className="mb-3 text-start">
                            <label htmlFor="register-email" className="form-label">
                                Email của bạn
                            </label>
                            <input
                                value={userEmail}
                                type="email"
                                onChange={(e) => setUserEmail(e.target.value)}
                                className="form-control"
                                id="register-email"
                                placeholder="name@example.com"
                            />
                        </div>
                        <div className="text-start">
                            <label htmlFor="register-password" className="form-label">
                                Mật khẩu
                            </label>
                            <input
                                value={userPassword}
                                onChange={(e) => setUserPassword(e.target.value)}
                                type="password"
                                className="form-control"
                                id="register-password"
                            />
                        </div>
                        <div className="text-start">
                            <label htmlFor="register-confirm-password" className="form-label">
                                Xác nhận mật khẩu
                            </label>
                            <input
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                type="password"
                                className="form-control"
                                id="register-confirm-password"
                            />
                        </div>
                        <div className="d-flex justify-content-between mt-3">
                            <div>
                                <label htmlFor="acp-policy" style={{ marginRight: '10px' }}>
                                    Bạn đã đọc và đồng ý <Link to="/">điều khoản</Link> của Ba Tô Phở{' '}
                                </label>
                                <input
                                    onChange={() => setCheckbutton(!checkButton)}
                                    type="checkbox"
                                    id="acp-policy"
                                    name="acp-policy"
                                />
                            </div>
                        </div>

                        <Button type="submit" className="w-100 mt-3" disabled={!isFormValid} onClick={handleSubmit}>
                            {' '}
                            <h1 className={cx('register')}>
                                ĐĂNG KÝ{' '}
                                {showLoading && <span className={cx('loading', 'material-icons')}>refresh</span>}
                            </h1>
                        </Button>
                    </form>
                    <p className="text-center mt-3" style={{ paddingBottom: '20px' }}>
                        Bạn đã có tài khoản?&nbsp;
                        <b style={{ cursor: 'pointer' }} onClick={handleLogin}>
                            Đăng nhập
                        </b>
                    </p>
                </div>
            </ModalWrapper>

            {/* {confirmEmail && <AlertConfirmEmail />} */}

            <header className={cx('wrapper')}>
                <div className={cx('logo')}>
                    <Link to="/">
                        <img src="/src/assets/logo.png" alt="Logo" className="w-150 h-100" />
                     
                    </Link>
                </div>
                <div className={cx('input', 'd-flex align-items-center')} style={{ height: '40%',width:'100%' }}>
                    <div className={cx('search')}>
                        <Input placeholder="12123123" />
                    </div>

                    <button className="btn"></button>
                </div>

                <div className={cx('actions')}>
                    {true ? (
                        <>
                            <Link to="/upload">
                                <Button className="me-5 btn btn-warning border">Tải lên</Button>
                            </Link>

                            <Link to="/chat">
                                <Button className="me-5 btn btn-primary border">Chat ngay</Button>
                            </Link>

                            <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
                                <Tooltip title="Account settings">
                                    <IconButton
                                      
                                        size="small"
                                        sx={{ ml: 2 }}
                                        aria-controls={open ? 'account-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                    >
                                        <Link style={{ color: 'black' }} to={`/profile/${infoUser.id}`}>
                                           
                                           
                                        <Avatar sx={{ width: 32, height: 32 }}>
                                            <img className={cx('user_avatar')} src={infoUser.avatar} alt="" />
                                        </Avatar>
                                        </Link>
                                    </IconButton>
                                </Tooltip>
                            </Box>
                          
                            <Button onClick={handleLogout}>Logout</Button>
                        </>
                    ) : (
                        <>
                            <Btn
                                variant="contained"
                                className="me-2"
                                color="info"
                                onClick={() => {
                                    setShowModal(true);
                                }}
                            >
                                Đăng nhập
                            </Btn>

                            <Btn variant="contained" color="inherit" className="me" onClick={handleRegister}>
                                Đăng ký
                            </Btn>
                        </>
                    )}
                </div>
            </header>
            
        </>
    );
};

export default Header;
