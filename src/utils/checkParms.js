import { Toast } from "antd-mobile";

const checkParams = {
  /**
   * @default 检测用户注册和登录参数
   * @param {*} value 用户信息（手机号、身份证号）
   */
  checkRegisterOrLogin: (value) => {
    return new Promise((resolve, reject) => {
      if (value.name) {
        if (value.phone) {
          if (
            /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
              value.phone
            )
          ) {
            if (value.idcard) {
              if (
                /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/.test(
                  value.idcard
                )
              ) {
                resolve(true);
              } else {
                return Toast.show({
                  content: "请检查身份证号格式",
                  position: "center",
                });
              }
            } else {
              return Toast.show({
                content: "身份证号不能为空",
                position: "center",
              });
            }
          } else {
            return Toast.show({
              content: "请检查手机格式",
              position: "center",
            });
          }
        } else {
          return Toast.show({
            content: "手机号码不能为空",
            position: "center",
          });
        }
      }else{
        return Toast.show({
          content:"用户名不能为空",
          position:"center"
        })
      }
    });
  },
};

export default checkParams;
