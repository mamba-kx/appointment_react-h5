import { Toast } from "antd-mobile";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import "./index.css";
import { userInfo } from "@/store/index.js";

const Session = () => {
  const navigate = useNavigate();
  // 场次时间
  let [sessionList, setSessionList] = useState([]);

  // componentDidMounted
  useEffect(() => {
    getSessionDay();
    // eslint-disable-next-line
  }, []);

  // 获取场次时间
  const getSessionDay = async () => {
    try {
      const getSessionDayRes = await api.getSessionDay();
      if (getSessionDayRes.data.code === 200) {
        const { data } = getSessionDayRes.data;
        console.log("获取场次时间成功", data);
        setSessionList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // 具体场次列表
  const renderSessionList = sessionList.map((item) => (
    <li key={item.id}>
      <span>{item.sessionTime}</span>
      <span
        style={{ color: item.isAppointment === 1 ? "blue" : "red" }}
        onClick={() => appointment(item)}
      >
        {item.isAppointment === 1 ? "预约" : "已约满"}
      </span>
    </li>
  ));

  // 预约
  const appointment = async (data) => {
    const appointmentRes = await api.appointment({
      id: data.id,
      name: localStorage.getItem("userName"),
    });
    console.log("预约结果", appointmentRes.data);
    const { code } = appointmentRes.data;
    if (code === 5001) {
      return Toast.show({
        content: "您已预约",
        position: "center",
      });
    }
    if (code === 5002) {
      return Toast.show({
        content: "该场次不可预约",
        position: "center",
      });
    }
    Toast.show({
      content: "预约成功",
      position: "center",
    });
    userInfo.sessionInfo = await appointmentRes.data.data;
    navigate("/myAppointment");
  };

  return (
    <>
      <div className="sessionTime">
        <div className="logo"></div>
        <ul>{renderSessionList}</ul>
      </div>
    </>
  );
};

export default Session;
