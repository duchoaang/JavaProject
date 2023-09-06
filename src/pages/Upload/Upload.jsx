import { useState, useEffect } from "react";
import classNames from "classnames/bind";
import styles from "./Upload.module.scss";
import Button from "@mui/material/Button";
import ClearIcon from "@mui/icons-material/Clear";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from 'axios';
import get from "~/utils/request/get";
import post from "~/utils/request/post";
import cookie from 'react-cookies'

const cx = classNames.bind(styles);

const InputGroup = ({ title, children, info }) => {
  return (
    <div className={cx("input-group")}>
      <label htmlFor={children.props ? children.props.id ?? "" : ""}>
        <b className="text-warning">
          {title}{" "}
          <span className="text-danger">
            {children.props ? (children.props.required ? "*" : "") : ""}
          </span>
        </b>
      </label>
      <div className={cx("input-group-field")}>{children}</div>
      {info ? <span className={cx("input-group-info")}>{info}</span> : null}
    </div>
  );
};

const INIT_FORM_DATA = {
  studentCode: "",
  title: "",
  major: [],
  description: "",
  author: "",
  mentor: [],
};

const Upload = () => {
  const [formData, setFormData] = useState(INIT_FORM_DATA);
  const [keywordTmp, setKeywordTmp] = useState("");
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Công nghệ thông tin",
    },
    {
      id: 2,
      name: "Hệ thống thông tin quản lý",
    },
    {
      id: 3,
      name: "Khoa học máy tính",
    },
  ]);
  const [mentor, setMentor] = useState([
    {
      id: 1,
      name: "Mentor 1",
    },
    {
      id: 2,
      name: "Mentor 2",
    },
    {
      id: 3,
      name: "Mentor 3",
    },
  ]);

  const [disableButton, setDisableButton] = useState(false);
  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "file" ? e.target.files[0] : e.target.value,
    });
  };


    useEffect(() => {
        try {
          get('/api/giangviens/',{ headers: { Authorization: cookie.load("token") }}).then((res) =>{
            console.log(res);
            let tmp = res.data;
            let tmp2;
            let i = 1;
            console.log("thanh cong");
            for(let t of tmp){
              
              let text = t.ho + " " + t.ten;
              let id = t.id;
              if(i === 1) {
                tmp2 = [{"id":id,"name":text}];
                i++;
              }
              else
                tmp2.push({"id":id,"name":text});
            }
           setMentor(tmp2);
          });
        } catch (ex) {
          console.error(ex);
          console.log(123)
        }
      }, []);
  
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // setDisableButton(true);

    // const data = new FormData();
    // Object.entries(formData).map(([key, value] = entry) => {
    //   switch (key) {
    //     case "categories":
    //       data.append(
    //         key,
    //         value.map((i) => categories[i].id)
    //       );
    //       break;
    //     case "mentor":
    //       data.append(
    //         key,
    //         value.map((i) => mentor[i].id)
    //       );
    //       break;
    //     default:
    //       data.append(key, value);
    //       break;
    //   }
    // });
    // console.log(data);
    
    post("/api/documents/upload/", formData).then((res) => {
      console.log(res);
      if (res === "OK") {
        alert("Upload tài liệu thành công");
      }
      else{
        console.log("failed to upload")
      }
    });
  };

  console.log(formData);

  return (
    <form className={cx("wrapper")} method="POST" onSubmit={handleSubmit}>
      <section className="border border-warning bg-warning">
        <InputGroup title="Mã số sinh viên" info="">
          <input
            type="text"
            name="studentCode"
            className="form-control"
            placeholder="Mã số sinh viên của bạn"
            value={formData.studentCode}
            onChange={handleFileChange}
            required
          />
        </InputGroup>
        <InputGroup title="Tên sinh viên" info="">
          <input
            type="text"
            name="author"
            className="form-control"
            placeholder="Tên người thực hiện luận"
            value={formData.author}
            onChange={handleFileChange}
            required
          />
        </InputGroup>
        <InputGroup title="Tên đề tài" info="Viết ngắn gọn">
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            placeholder="Tối thiểu 10 kí tự"
            minLength={10}
            value={formData.title}
            onChange={handleFileChange}
            required
          />
        </InputGroup>
        <InputGroup title="Chọn ngành" info="">
          {formData.major.map((c, index) => (
            <Button
              key={index}
              size="small"
              variant="outlined"
              endIcon={<ClearIcon />}
              onClick={() => {
                setFormData({
                  ...formData,
                  major: (() => {
                    formData.major.splice(index, 1);
                    return formData.major;
                  })(),
                });
              }}
            >
              {categories[c].name}
            </Button>
          ))}
          <select
            name="categories"
            id="categories"
            className="form-select"
            onChange={(e) => {
              setFormData({
                ...formData,
                major: (() => {
                  formData.major.push(e.target.value - 0);
                  return formData.major;
                })(),
                
              });
            }}
            required
          >
            <option hidden>--Chọn ngành--</option>
            {categories.map((c, index) =>
              formData.major.includes(index - 0) ? null : (
                <option key={index} value={index}>
                  {c.name}
                </option>
              )
            )}
          </select>
        </InputGroup>
        <InputGroup title="Giảng viên" info="">
          {formData.mentor.map((c, index) => (
            <Button
              key={index}
              size="small"
              variant="outlined"
              endIcon={<ClearIcon />}
              onClick={() => {
                setFormData({
                  ...formData,
                  mentor: (() => {
                    formData.mentor.splice(index, 1);
                    return formData.mentor;
                  })(),
                });
              }}
            >
              {/* {mentor[c].name} */}
            </Button>
          ))}
          <select
            name="mentor"
            id="mentor"
            className="form-select"
            onChange={(e) => {

              // console.log(formData.mentor);
              setFormData({
                ...formData,
                mentor: (() => {
                  // formData.mentor.push(e.target.value - 0);
                  formData.mentor.push(mentor[e.target.value].id);
                  // mentor: [...formData.mentor, selectedId - 0],
                  return formData.mentor;
                })(),
              });  
            }}
            required
          >
            <option hidden>--Chọn giảng viên--</option>
            {mentor.map((c, index) =>
              formData.mentor.includes(index - 0) ? null : (
                <option key={index} value={index}>
                  {c.name}
                </option>
              )
            )}
          </select>
        </InputGroup>
        <InputGroup title="Mô tả ngắn" info="Tối ưu từ 70 - 200 kí tự">
          <textarea
            name="description"
            className="form-control"
            placeholder="Tối thiểu 70 kí tự"
            maxLength={200}
            value={formData.description}
            onChange={handleFileChange}
            required
          />
        </InputGroup>
      </section>
      <section className="border border-info bg-info">
        {/* <input name="confirm" id="confirm" type="checkbox" /> */}
        <label htmlFor="confirm">
          &nbsp;Hãy kiểm tra các <span style={{color:'red', fontWeight:'600'}}>thông tin</span> trước khi đăng kí !
        </label>
        <br />
        <Button
          disabled={disableButton}
          variant="contained"
          type="submit"
          color="primary"
          startIcon={<CloudUploadIcon />}
        >
          Đăng kí ngay
        </Button>
      </section>
    </form>
  );
};

export default Upload;
