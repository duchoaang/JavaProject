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
import List from "@mui/material/List";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import Divider from "@mui/material/Divider";
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
        infoKhoaLuan: {
          tenHoiDong: user.data.khoaLuanId.tenKhoaLuan,
          ngayGhiNhan: user.data.khoaLuanId.ngayGhiNhan,
          ngayKetThuc: user.data.khoaLuanId.ngayKetThuc,
        },
        nganh: user.data.nganh,
        giaoVu: {
          tenGiaoVu: user.data.khoaLuanId.giaoVuId.ten,
          email: user.data.khoaLuanId.giaoVuId.email,
        },
        email: user.data.email,
      });
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
    const headers = {
      'Authorization': cookie.load("token")
    };
    post("/api/updateUser/", infoUserChange, {
      headers: headers
    }).then((res) => {
        
        if (res.status === 200) {
          alert("Update thong tin thanh cong ");
        }
        else{
          console.log("failed to update")
        }
      });
  }

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
                    placeholder="Số điện thoại"
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
                <Button onClick ={handleChangeInfo} variant="contained" color="success" size="small">
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
                <div>
                    <h1>Tên khóa luận : {infoUser.infoKhoaLuan.tenHoiDong}</h1>
                    <h3>Ngày ghi nhận : {infoUser.infoKhoaLuan.ngayGhiNhan}</h3>
                    <h3>Ngày kết thúc : {infoUser.infoKhoaLuan.ngayKetThuc}</h3>
                    <h3>Tên giáo vụ: {infoUser.giaoVu.tenGiaoVu}</h3>
                    <h3>Email Giáo vụ: {infoUser.giaoVu.email}</h3>
                    <button>Liên hệ giáo vụ</button>
                </div>
             

              {/* {listDocs.map((docs, index) => (
                                
                              
                            ))} */}
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
};
export default Profile;
