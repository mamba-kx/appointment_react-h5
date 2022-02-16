import React from "react";
import { Button, Toast } from "antd-mobile";
import { useNavigate } from "react-router-dom";
import "./index.css";
import { userInfo } from "@/store/index.js";
import api from "../../api";
import { createQrcode } from "@/utils/createQrcode.js";

export default function MyAppointment() {
  const navigate = useNavigate();
  const { id, sessionTime, sessionQrcode } = userInfo.sessionInfo;
  console.log(userInfo);
  // 渲染二维码
  if (sessionQrcode) {
    createQrcode(sessionQrcode);
  }
  // 退出登陆
  function exit() {
    localStorage.removeItem("userName");
    navigate("/");
  }
  // 取消预约
  const cancelAppointment = async () => {
    console.log(userInfo);
    try {
      const cancelAppointmentRes = await api.cancelAppointment({
        id: id,
        name: localStorage.getItem("userName"),
      });
      console.log("取消预约成功", cancelAppointmentRes);

      navigate("/session");
      Toast.show({
        content: "取消成功",
        position: "center",
      });
    } catch (error) {
      console.log(error.errors);
    }
  };
  // 跳转预约页面
  const skipAppointment = () => {
    navigate("/session");
  };
  return (
    <div className="myAppointmentWrapper">
      <div className="exit" onClick={exit}></div>
      <p className="userName">尊敬的：{localStorage.getItem("userName")}</p>
      <p className="userSession">您已经预定{sessionTime}场次凭此二维码入场</p>
      <div
        className="qrcodeBox"
        style={{ backgroundImage: "url(" + userInfo.qrcodeUrl + ")" }}
      ></div>
      <div className="btn">
        <Button size="large" color="success" onClick={cancelAppointment}>
          取消预约
        </Button>
        <Button size="large" color="success" onClick={skipAppointment}>
          预约场次
        </Button>
      </div>
    </div>
  );
}
