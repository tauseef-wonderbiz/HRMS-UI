import { CButton, CForm, CFormInput, CFormLabel } from "@coreui/react";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import "./Login.scss";
import "@coreui/coreui/dist/css/coreui.min.css";
import { useNavigate } from "react-router-dom";
import "../../../resources/css/Style.css";
import { AUTH_LOGIN } from "../../../utils/urlUtils";

import axios from "axios";
import { useAuth } from "../../../context/auth/AuthContext";

const LoginOldie = () => {
  const [toast, setToast] = useState<any>({
    toastText: "",
    visible: false,
  });

  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    userName: "",
    password: "",
  });
  const [errorResponse, setErrorResponse] = useState<string>("");
  const [emailErrMsg, setEmailErrMsg] = useState<string>("");
  const [passwordErrMsg, setPasswordErrMsg] = useState<string>("");

  const handleChange = (e: any) => {
    JSON.stringify(
      setLoginData({ ...loginData, [e.target.name]: e.target.value })
    );
  };

  const { login } = useAuth();

  const loginAxios = async () => {
    if (loginData.userName === "") {
      setEmailErrMsg("Please enter Employee Id");
    } else if (loginData.password === "") {
      setPasswordErrMsg("Please enter password");
      setEmailErrMsg("");
    } else {
      setEmailErrMsg("");
      setPasswordErrMsg("");
      setErrorResponse("");

      return await axios
        .post(AUTH_LOGIN, loginData, {
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
            encoding: "utf-8",
          },
        })
        .then((res) => {
          console.log(res);
          return res;
        })
        .catch((err) =>
          setErrorResponse(
            "There is some internal error, Please try again later"
          )
        );
    }
  };

  const { isLoading, mutate } = useMutation(loginAxios, {
    onSuccess: (data: any) => {
      console.log(data);
      if (data.status === 200) {
        if (data.data.isSuccess) {
          login(data.data);
          navigate("/employeelist");
        }
      }
      setErrorResponse(data.data.message);
    },
  });

  return (
    <div className="row">
      <div className="row vertical-center justify-content-center align-items-center">
        <div className="  loginframeNew ">
          <div className="row">
            <div className="col-md-12 loginLabel">
              <span>Welcome</span>
            </div>
          </div>

          <div className="row justify-content-center align-items-center">
            <img
              src="/wonderbiz-technologies.png"
              alt=""
              className="userimage"
            />
          </div>

          <div className="row">
            <div className="col-md-12 companyname">
              <span>WonderBiz Technologies</span>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
              <div className="inputForm">
                <CForm className="row g-3 needs-validation" noValidate>
                  <div>
                    <span>
                      Employee Id <span className="redCss">*</span>
                    </span>
                    <CFormInput
                      type="email"
                      onChange={handleChange}
                      name="userName"
                    />
                    <span className="redCss">{emailErrMsg}</span>
                  </div>
                  <div className="mb-3 label">
                    <span>
                      Password <span className="redCss">*</span>
                    </span>
                    <CFormInput
                      type="password"
                      onChange={handleChange}
                      name="password"
                    />
                    <span className="redCss">{passwordErrMsg}</span>
                  </div>
                  <div>
                    {isLoading ? (
                      <div className="row">
                        <div className="col-md-12 d-flex justify-content-center">
                          <div className="spinner-border m-5 text-dark" />
                        </div>
                      </div>
                    ) : (
                      <div className="pb-5">
                        <span className="redCss">{errorResponse}</span>
                        <CButton
                          type="submit"
                          className="loginButton "
                          onClick={() => mutate()}
                          disabled={isLoading}
                        >
                          <span className="loginlabel ">Sign In</span>
                        </CButton>
                      </div>
                    )}
                  </div>
                </CForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginOldie;
