import { useState, useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";
import styles from "./Profile.module.scss";
import classNames from "classnames/bind";
const cx = classNames.bind(styles);
import Button from "@mui/material/Button";
<link
  href="https://fonts.googleapis.com/icon?family=Material+Icons"
  rel="stylesheet"
></link>;
<link
  rel="stylesheet"
  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0"
/>;
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";
import Moment from 'react-moment';
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
} from "mdb-react-ui-kit";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import TextField from "@mui/material/TextField";

import get from "~/utils/request/get";
import post from "~/utils/request/post";
import patch from "~/utils/request/patch";
import MyUserReducer from "../../components/Reducers/MyUserReducer";
import cookie from "react-cookies";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccessTimeFilledIcon from "@mui/icons-material/AccessTimeFilled";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CallToActionIcon from "@mui/icons-material/CallToAction";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";

const Profile = () => {
  const [value, setValue] = useState(0);
  const [infoUser, setInfoUser] = useState({
    id: "",
    name: "",
    avt: "",
    infoKhoaLuan: {
      tenHoiDong: "",
      tenKhoaLuan: "",
      ngayGhiNhan: "",
      ngayKetThuc: "",
    },
    giaoVu: {
      tenGiaoVu: "",
      email: "",
    },
    nganh: "",
    email: "",
  });
  const [docsType, setDocsType] = useState("userDocs");
  const [listDocs, setListDocs] = useState([]);
  const [infoUserChange, setInfoUserChange] = useState({
    matKhau: "",
    sdt: "",
  });
  const [tinhTrangKhoaLuan, setTinhTrangKhoaLuan] = useState(false);
  const [user, dispatch] = useReducer(
    MyUserReducer,
    cookie.load("user") || null
  );
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (user != null) {
      
      setInfoUser({
        id: user.data.id,
        name: user.data.ten,
        avt: user.data.avatar,
      
        nganh: user.data.nganh,
      
        email: user.data.email,
      });
    }
    if(user.data.khoaLuanId != null){
      setTinhTrangKhoaLuan(true);
      setInfoUser({
        ...infoUser,
        id: user.data.id,
        name: user.data.ten,
        avt: user.data.avatar,
        infoKhoaLuan: {
          tenHoiDong: user.data.khoaLuanId.tenKhoaLuan,
          ngayGhiNhan: user.data.khoaLuanId.ngayGhiNhan,
          ngayKetThuc: user.data.khoaLuanId.ngayKetThuc,
        },
        giaoVu: {
          tenGiaoVu: user.data.khoaLuanId.giaoVuId.ten,
          email: user.data.khoaLuanId.giaoVuId.email,
        },
      })
    }
    else{
      setTinhTrangKhoaLuan(false);
    }
  }, []);
  console.log(infoUserChange);
  // useEffect(() => {
  //     const fetchData = async () => {
  //         try {
  //             const response = await get(`profile/${decodeId}`);

  //             if (handleDocsType.hasOwnProperty(docsType)) {
  //                 handleDocsType[docsType](response);
  //             }
  //         } catch (error) {}
  //     };

  //     fetchData();
  // }, [docsType]);
  console.log(infoUser);
  console.log(user.data);

  const handleChangeInfo = () => {
    post("/api/updateUser/", infoUserChange).then((res) => {
      if (res === 200) {
        alert("Update thong tin thanh cong ");
      } else {
        console.log("failed to update");
      }
    });
  };

  return (
    <section style={{ backgroundColor: "#eee" }}>
      <MDBContainer className="py-5">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem>
                <a href="#">Home</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem>
                <a href="#">{infoUser.name}</a>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem active>User Profile</MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src={infoUser.avt}
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <p className="">{infoUser.name} </p>
                <p className="">Email: {infoUser.email} </p>

                {(!infoUser.confirmEmail && (
                  <div className="d-flex justify-content-center mb-2">
                    <Button
                      variant="contained"
                      style={{ fontSize: "13px", marginTop: "-10px" }}
                    >
                      Hỗ trợ
                    </Button>
                  </div>
                )) || (
                  <div className="d-flex justify-content-center mb-2">
                    <Button
                      variant="contained"
                      onClick={handleResend}
                      style={{ fontSize: "13px", marginTop: "-10px" }}
                    >
                      Tài khoản đã xác thực
                    </Button>
                  </div>
                )}
              </MDBCardBody>
            </MDBCard>
            <MDBCard className="mb-4 mb-lg-0">
              <Box
                component="form"
                sx={{
                  "& > :not(style)": { m: 1, width: "50%" },
                }}
                noValidate
                autoComplete="off"
              >
                <div className={cx("changeInfo", "changePhone")}>
                  <h1>Thay đổi mật khẩu</h1>
                  <TextField
                    type="password"
                    style={{ width: "96%" }}
                    size="small"
                    id="outlined-basic"
                    placeholder="Mật khẩu"
                    variant="outlined"
                    value={infoUserChange.password}
                    onChange={(e) =>
                      setInfoUserChange({
                        ...infoUserChange,
                        id: user.data.id,
                        matKhau: e.target.value,
                      })
                    }
                  />
                </div>
                <div className={cx("changeInfo", "changePhone")}>
                  <h1>Thay đổi số điện thoại</h1>
                  <TextField
                    type="text"
                    style={{ width: "96%" }}
                    size="small"
                    id="outlined-basic"
                    placeholder="Số điện thoại"
                    variant="outlined"
                    value={infoUserChange.sdt}
                    onChange={(e) =>
                      setInfoUserChange({
                        ...infoUserChange,
                        id: user.data.id,
                        sdt: e.target.value,
                      })
                    }
                  />
                </div>
              </Box>
              <div className={cx("btnChangeInfo")}>
                <Button
                  onClick={handleChangeInfo}
                  variant="contained"
                  color="success"
                  size="small"
                >
                  Lưu
                </Button>
                <Button variant="contained" color="inherit" size="small">
                  Hủy
                </Button>
              </div>
            </MDBCard>
          </MDBCol>
          <MDBCol style={{ background: "#fff" }} lg="8">
            <div className="div" style={{ width: "100%", background: "#fff" }}>
              <Box sx={{ width: "100%", bgcolor: "background.paper" }}>
                <Tabs
                  className={cx("tabController")}
                  value={value}
                  onChange={handleChange}
                  centered
                >
                  <Tab
                    name="userDocs"
                    style={{ fontSize: "13px" }}
                    // onClick={(e) => setDocsType(e.target.name)}
                    label={`Xem khóa luận `}
                  />
                  <Tab
                    name="waitDocs"
                    style={{ fontSize: "13px" }}
                    // onClick={(e) => setDocsType(e.target.name)}
                    label={`Khóa luật chờ duyệt`}
                  />
                  <Tab
                    name="resultDocs"
                    style={{ fontSize: "13px" }}
                    // onClick={(e) => setDocsType(e.target.name)}
                    label={`Kết quả duyệt`}
                  />
                  {/* <Tab
                                        name="favDocs"
                                        style={{ fontSize: '13px' }}
                                        onClick={(e) => setDocsType(e.target.name)}
                                        label={`Tài liệu yêu thích (${infoUser.docsCount.favDocs})`}
                                    /> */}
                </Tabs>
              </Box>
            </div>

            {/* <div className={cx('searchParent')}>
                            <span className={cx('iconSearch', 'material-icons')}>search</span>
                            <input className={cx('search')} type="text" placeholder="Tìm kiếm tài liệu của bạn..." />
                        </div> */}
            <div className="contentDocs">
             {
              tinhTrangKhoaLuan && 
              <List
              key={1}
              sx={{
                height: "100%",
                width: "100%",
                bgcolor: "background.paper",
              }}
            >
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <ImageIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <h1 className={cx("khoaLuan_wrapper_header")}>
                      <CallToActionIcon />
                      <h3>
              
                        Tên khóa luận : {infoUser.infoKhoaLuan.tenHoiDong}
                      </h3>
                    </h1>
                  }
                  secondary={
                    <h1 className={cx("khoaLuan_wrapper")}>
                      <h3>
                        <AccessTimeFilledIcon />
                        <h4>Ngày ghi nhận :  <Moment locale="vi" fromNow>{infoUser.infoKhoaLuan.ngayGhiNhan}</Moment> </h4>
                      </h3>

                      <h3>
                        <AccessTimeIcon />
                        <h4>
                          Ngày kết thúc : <Moment locale="vi" fromNow>{infoUser.infoKhoaLuan.ngayKetThuc}</Moment> 
                        </h4>{" "}
                      </h3>
                      <h3>
                        <PersonOutlineIcon />{" "}
                        <h4>Tên giáo vụ: {infoUser.giaoVu.tenGiaoVu}</h4>{" "}
                      </h3>
                      <h3>
                        <MailOutlineIcon />{" "}
                        <h4>Email Giáo vụ: {infoUser.giaoVu.email}</h4>
                      </h3>
                    </h1>
                  }
                ></ListItemText>
              </ListItem>
              <Divider variant="inset" component="li" />
            </List>

             }
             {!tinhTrangKhoaLuan && <h1 style={{fontSize:'20px', marginTop:'10px'}}>Sinh viên chưa đăng kí khóa luận ! </h1>}
              {/* <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                  sx={{ height: 140 }}
                  image="/static/images/cards/contemplative-reptile.jpg"
                  title="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    <CallToActionIcon />
                    <h3> Tên khóa luận : {infoUser.infoKhoaLuan.tenHoiDong}</h3>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size="small">Share</Button>
                  <Button size="small">Learn More</Button>
                </CardActions>
              </Card> */}
              <div className={cx("khoaLuan_wrapper")}>
                <h1></h1>

                {tinhTrangKhoaLuan && <Button  variant="contained" color="warning" size="small">
                  Liên hệ giáo vụ
                </Button>}
              </div>

         
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};
export default Profile;
