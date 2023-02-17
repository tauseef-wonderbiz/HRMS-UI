import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilLockLocked, cilUser } from "@coreui/icons";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useAuth } from "../../../context/auth/AuthContext";
import { AUTH_LOGIN } from "../../../utils/urlUtils";

const Login = () => {
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

  const { isLoading, mutate: LoginMutate } = useMutation(loginAxios, {
    onSuccess: (data: any) => {
      if (data.status === 200) {
        if (data.data.isSuccess) {
          login(data.data);
          navigate("/#/employeelist");
        }
      }
      setErrorResponse(data.data.message);
    },
  });
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Welcome</h1>
                    <p className="text-medium-emphasis">
                      Sign In to your account
                    </p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        type="email"
                        onChange={handleChange}
                        placeholder="EmployeeId"
                        name="userName"
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        onChange={handleChange}
                        type="password"
                        placeholder="Password"
                        name="password"
                      />
                    </CInputGroup>

                    {isLoading ? (
                      <div className="row">
                        <div className="col-md-12 d-flex justify-content-center">
                          <div className="spinner-border m-5 text-dark" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <CRow>
                          <div className="d-grid gap-2 col-6 mx-auto">
                            <CButton
                              type="submit"
                              className="loginButton "
                              onClick={() => LoginMutate()}
                              disabled={isLoading}
                              color="primary"
                            >
                              Log In
                            </CButton>
                          </div>
                        </CRow>
                      </>
                    )}
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
