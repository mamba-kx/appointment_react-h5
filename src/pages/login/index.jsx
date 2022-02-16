import React, { useState } from "react";
import api from "../../api/index";
import { Toast } from "antd-mobile";
import checkParams from "../../utils/checkParms";
import { useNavigate } from "react-router-dom";
import "./index.css";

function LoginStyle(props) {
  const { form } = props;
  const [isLogin, setIslogin] = useState(true);

  // 用于路由跳转
  const navigate = useNavigate();

  // 登陆
  const login = (e) => {
    checkParams.checkRegisterOrLogin(form).then(async () => {
      try {
        const userLoginRes = await api.userLogin(form);
        if (userLoginRes.data.code === 200) {
          console.log("userLoginRes", userLoginRes);
          Toast.show({
            content: "登陆成功",
            position: "center",
          });
          localStorage.setItem("userName", form.name);
          navigate("/session");
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  // 注册
  const register = () => {
    checkParams.checkRegisterOrLogin(form).then(async () => {
      try {
        const registerRes = await api.userRegister(form);
        if (registerRes.data.code === 200) {
          console.log("registerRes", registerRes);
          Toast.show({
            content: "注册成功",
            position: "center",
          });
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  return isLogin ? (
    <div>
      <button onClick={login}>登录</button>
      <p onClick={() => setIslogin(false)}>注册</p>
    </div>
  ) : (
    <div>
      <button onClick={register}>注册</button>
      <p onClick={() => setIslogin(true)}>登录</p>
    </div>
  );
}

function Login() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    idcard: "",
  });

  return (
    <div className="loginWrapper">
      <div className="logo"></div>
      <div className="loginBox">
        <input
          type="text"
          value={form.name}
          placeholder="姓名"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          value={form.phone}
          type="text"
          maxLength="11"
          placeholder="手机号"
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          value={form.idcard}
          type="text"
          placeholder="身份证号码"
          onChange={(e) => setForm({ ...form, idcard: e.target.value })}
          maxLength="18"
        />
        <LoginStyle form={form} />
      </div>
    </div>
  );
}

export default Login;
