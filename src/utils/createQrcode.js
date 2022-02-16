import Qrcode from "qrcode";
import { userInfo } from "@/store/index.js";

export const createQrcode = (url) => {
  Qrcode.toDataURL(url, {
    margin: 1,
  })
    .then((res) => {
      console.log(res);
      userInfo.qrcodeUrl = res;
      return res;
    })
    .catch((err) => {
      console.log(err);
    });
};
