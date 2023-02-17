import {
  CButton,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
} from "@coreui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import client from "../../../react-query-client";
import { EMPLOYEE_SAVEEMPLOYEE } from "../../../utils/urlUtils";
import "./basicdetails.scss";

const BasicDetails = () => {
  const [toast, setToast] = useState<any>({
    toastText: "",
    visible: false,
  });

  const [cssMessage, setcssMessage] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [validated, setValidated] = useState<boolean>(false);

  const [employee, setemployee] = useState({
    employeeNo: "",
    name: "",
    email: "",
    dob: 0,
    mobileNo: "",
    emergencyContact: "",
    experience: 0,
    currentAddress: "",
    permanentAddress: "",
    designation: "",
    doj: 0,
    nationality: "",
    bloodgroup: "",
    dateofRelieving: 0,
    team: "",
    gender: "",
    maritalStatus: "",
    status: 0,
    speciallyAbled: "",
    isActive: true,
  });

  const [error, setError] = useState({
    employeeNo: "",
    name: "",
    email: "",
    dob: "",
    mobileNo: "",
    emergencyContact: "",
    experience: "",
    currentAddress: "",
    permanentAddress: "",
    designation: "",
    doj: "",
    nationality: "",
    bloodgroup: "",
    dateofRelieving: "",
    team: "",
    gender: "",
    maritalStatus: "",
    status: "",
    speciallyAbled: "",
  });

  // const [Authorization, setAuthorization] = useState<string>(
  //   localStorage.getItem("Authorization") || ""
  // );

  const getOptions = (method = "GET") => {
    return {
      method: method,
      headers: {
        "Content-Type": "application/json",
        // Authorization: Authorization,
      },
      mode: "cors" as RequestMode,
    };
  };

  const post = async (url: string, data: any) => {
    return await axios
      .post(url, data, getOptions("POST"))
      .then((res) => res.data)
      .catch((err) => setToast({ toastText: err.message, visible: true }));
  };

  const { mutate: addSkillFamily } = useMutation(
    (data: any) => post(EMPLOYEE_SAVEEMPLOYEE, data),
    {
      onSuccess: (data) => {
        if (data.isSuccess) {
          setcssMessage("sucessfulMsg");
          handleClear();
          setValidated(false);
        } else {
          setcssMessage("errorMsg");
        }
        setMessage(data.message);
        window.scrollTo(0, 0);
      },
    }
  );

  const handleSave = (e: any) => {
    if (
      employee.employeeNo === "" ||
      employee.name === "" ||
      employee.status === 0
    ) {
      setError({
        employeeNo: employee.employeeNo === "" ? "Employee ID is required" : "",
        name: employee.name === "" ? "Name is required" : "",
        email: employee.email === "" ? "Email is required" : "",
        dob: employee.dob === 0 ? "Date of Birth is required" : "",
        mobileNo: employee.mobileNo === "" ? "Mobile No is required" : "",
        emergencyContact:
          employee.emergencyContact === ""
            ? "Emergency Contact is required"
            : "",
        experience: employee.experience === 0 ? "Experience is required" : "",
        currentAddress:
          employee.currentAddress === "" ? "Current Address is required" : "",
        permanentAddress:
          employee.permanentAddress === ""
            ? "Permanent Address is required"
            : "",
        designation:
          employee.designation === "" ? "Designation is required" : "",
        doj: employee.doj === 0 ? "Date of Joining is required" : "",
        gender: employee.gender === "" ? "Gender is required" : "",
        maritalStatus:
          employee.maritalStatus === "" ? "Marital Status is required" : "",
        status: employee.status === 0 ? "Status is required" : "",
        speciallyAbled:
          employee.speciallyAbled === "" ? "Specially Abled is required" : "",
        nationality:
          employee.nationality === "" ? "Nationality is required" : "",
        bloodgroup: employee.bloodgroup === "" ? "Blood Group is required" : "",
        dateofRelieving:
          employee.dateofRelieving === 0 ? "Date of Relieving is required" : "",
        team: employee.team === "" ? "Team is required" : "",
      });
    }
    // } else  if (employee.map((c: any) => c.employeeNo).includes(employee.employeeNo)) {
    //   setEmployeeMessage("Duplicate SESA ID");
    //   return;
    // } else if (employee.sesaId.length <= 6) {
    //   setEmployeeMessage("Please enter valid SESA ID");
    //   return;
    // } else if (employee.sesaId.substring(0, 4).toUpperCase().trim() != "SESA") {
    //   setEmployeeMessage("Please enter valid SESA ID");
    //   return;
    // } else if (!/^\d+$/.test(employee.sesaId.substring(4, len))) {
    //   setEmployeeMessage("Please enter valid SESA ID");
    //   return;
    // } else if (employee.emailId !== "" && validateEmailAddress(email) === -1) {
    //   setEmployeeMessage("Please enter correct Email Id");
    //   return;
    // }

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    e.preventDefault();

    if (form.checkValidity() === true) {
      const data = {
        employeeNo: employee.employeeNo,
        name: employee.name,
        email: employee.email,
        dob: employee.dob,
        mobileNo: employee.mobileNo,
        emergencyContact: employee.emergencyContact,
        experience: employee.experience,
        currentAddress: employee.currentAddress,
        permanentAddress: employee.permanentAddress,
        designation: employee.designation,
        doj: employee.doj,
        nationality: employee.nationality,
        bloodGroup: employee.bloodgroup,
        dateofRelieving: employee.dateofRelieving,
        team: employee.team,
        gender: employee.gender,
        maritalStatus: employee.maritalStatus,
        status: employee.status,
        speciallyAbled: employee.speciallyAbled,
        isActive: employee.isActive,
      };
      console.log(data);
      setemployee({
        ...employee,
        employeeNo: employee.employeeNo,
        name: employee.name,
        email: employee.email,
        dob: employee.dob,
        mobileNo: employee.mobileNo,
        emergencyContact: employee.emergencyContact,
        experience: employee.experience,
        currentAddress: employee.currentAddress,
        permanentAddress: employee.permanentAddress,
        designation: employee.designation,
        doj: employee.doj,
        nationality: employee.nationality,
        bloodgroup: employee.bloodgroup,
        dateofRelieving: employee.dateofRelieving,
        team: employee.team,
        gender: employee.gender,
        maritalStatus: employee.maritalStatus,
        status: employee.status,
        speciallyAbled: employee.speciallyAbled,
        isActive: employee.isActive,
      });
      addSkillFamily(data);
    }
  };

  // const handleChanges = (e: any) => {
  //   setdateSearch({ ...dateSearch, [e.target.name]: e.target.value });
  // };

  const handleChanges1 = (e: any) => {
    setemployee({ ...employee, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setemployee({
      ...employee,
      employeeNo: "",
      name: "",
      email: "",
      mobileNo: "",
      experience: 0,
      currentAddress: "",
      permanentAddress: "",
      designation: "",
      doj: 0,
      dateofRelieving: 0,
      team: "",
      dob: 0,
      emergencyContact: "",
      status: 0,
      maritalStatus: "",
      speciallyAbled: "",
      isActive: true,
    });
  };

  const renderGenderOptions = () => {
    return (
      <CFormSelect
        className="rondedzero"
        value={employee.gender}
        feedbackInvalid={error.gender}
        name="gender"
        onChange={handleChanges1}
        required
      >
        <option value="">Select</option>
        <option>Male</option>
        <option>Female</option>
        <option>Others</option>
      </CFormSelect>
    );
  };

  const renderStatusOptions = () => {
    return (
      <CFormSelect
        className="rondedzero"
        name="status"
        value={employee.status}
        feedbackInvalid={error.status}
        onChange={handleChanges1}
        required
      >
        <option value="">Select</option>
        <option>Onboard</option>
        <option>FNF</option>
        <option>Notice Period</option>
        <option>Resigned</option>
        <option>Abscond</option>
        <option>Terminated</option>
      </CFormSelect>
    );
  };

  const rendermaritalOptions = () => {
    return (
      <CFormSelect
        className="rondedzero"
        name="maritalStatus"
        value={employee.maritalStatus}
        feedbackInvalid={error.maritalStatus}
        onChange={handleChanges1}
        required
      >
        <option value="">Select</option>
        <option>Married</option>
        <option>Unmarried</option>
      </CFormSelect>
    );
  };

  const renderspeciallyAbled = () => {
    return (
      <CFormSelect
        className="rondedzero"
        name="speciallyAbled"
        value={employee.speciallyAbled}
        feedbackInvalid={error.speciallyAbled}
        onChange={handleChanges1}
        required
      >
        <option value="">Select</option>
        <option>Yes</option>
        <option>No</option>
      </CFormSelect>
    );
  };

  const renderExperienceOptions = () => {
    return (
      <CFormSelect
        className="rondedzero"
        name="experience"
        value={employee.experience}
        feedbackInvalid={error.experience}
        onChange={handleChanges1}
        required
      >
        <option value="">Select</option>
        <option value={1}>Fresher</option>
        <option value={2}>Experienced</option>
      </CFormSelect>
    );
  };

  return (
    <>
      <div className="">
        <div className=" basicdetailsFrame ">
          <h1 className="headerColor mx-5 pt-3"> Basic Details</h1>
          {message && <div className={cssMessage}>{message}</div>}
          <CContainer>
            <div className="">
              <hr></hr>
              {/* {message && <div className={cssMessage}>{message}</div>} */}
              <div className="row d-flex">
                <CForm
                  className="row g-3 mx-4 needs-validation"
                  noValidate
                  validated={validated}
                  onSubmit={handleSave}
                >
                  <div className="row">
                    <div className="row paddingBtoom">
                      <div className="col-md-2 labelTitle">
                        <span>
                          EmployeeNo <span className="redCss">*</span>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <CFormInput
                          value={employee.employeeNo}
                          feedbackInvalid={error.employeeNo}
                          name="employeeNo"
                          type="text"
                          required
                          className="form-control rondedzero"
                          onChange={handleChanges1}
                        />
                      </div>

                      <div className="col-md-2 labelTitle">
                        <span>
                          Name <span className="redCss">*</span>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <CFormInput
                          value={employee.name}
                          feedbackInvalid={error.name}
                          name="name"
                          type="text"
                          className="form-control rondedzero"
                          onChange={handleChanges1}
                          required
                        />
                      </div>
                    </div>

                    <div className="row paddingBtoom">
                      <div className="col-md-2 labelTitle">
                        <span>
                          Email ID <span className="redCss">*</span>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <CFormInput
                          value={employee.email}
                          feedbackInvalid={error.email}
                          name="email"
                          type="text"
                          className="form-control rondedzero"
                          onChange={handleChanges1}
                          required
                        />
                      </div>

                      <div className="col-md-2 labelTitle">
                        <span>
                          DOB <span className="redCss">*</span>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <CFormInput
                          value={employee.dob}
                          feedbackInvalid={error.dob}
                          name="dob"
                          type="Date"
                          className="form-control rondedzero"
                          onChange={handleChanges1}
                          required
                        />
                      </div>
                    </div>

                    <div className="row paddingBtoom">
                      <div className="col-md-2 labelTitle">
                        <span>
                          Contact <span className="redCss">*</span>
                        </span>
                      </div>
                      <div className="col-md-4 ">
                        <CFormInput
                          type="text"
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          maxLength={10}
                          value={employee.mobileNo}
                          feedbackInvalid={error.mobileNo}
                          className="rondedzero form-control"
                          name="mobileNo"
                          onChange={handleChanges1}
                          required
                        />
                      </div>

                      <div className="col-md-2 labelTitle">
                        <span>
                          Emergency Contact <span className="redCss">*</span>
                        </span>
                      </div>
                      <div className="col-md-4 ">
                        <CFormInput
                          type="text"
                          onKeyPress={(event) => {
                            if (!/[0-9]/.test(event.key)) {
                              event.preventDefault();
                            }
                          }}
                          maxLength={10}
                          value={employee.emergencyContact}
                          feedbackInvalid={error.emergencyContact}
                          className="rondedzero form-control"
                          name="emergencyContact"
                          onChange={handleChanges1}
                          required
                        />
                      </div>
                    </div>

                    <div className="row paddingBtoom">
                      <div className="col-md-2 labelTitle">
                        <span>
                          Current Address <span className="redCss">*</span>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <CFormInput
                          name="currentAddress"
                          value={employee.currentAddress}
                          feedbackInvalid={error.currentAddress}
                          type="text"
                          className="form-control rondedzero"
                          onChange={handleChanges1}
                          required
                        />
                      </div>

                      <div className="col-md-2 labelTitle">
                        <span>
                          Permanent Address <span className="redCss">*</span>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <CFormInput
                          name="permanentAddress"
                          value={employee.permanentAddress}
                          feedbackInvalid={error.permanentAddress}
                          type="text"
                          className="form-control rondedzero"
                          onChange={handleChanges1}
                          required
                        />
                      </div>
                    </div>

                    <div className="row paddingBtoom">
                      <div className="col-md-2 labelTitle">
                        <span>
                          DOJ <span className="redCss">*</span>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <CFormInput
                          name="doj"
                          value={employee.doj}
                          feedbackInvalid={error.doj}
                          type="Date"
                          className="form-control rondedzero"
                          onChange={handleChanges1}
                          required
                        />
                      </div>

                      <div className="col-md-2 labelTitle">
                        <span>
                          Designation <span className="redCss">*</span>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <CFormInput
                          name="designation"
                          value={employee.designation}
                          feedbackInvalid={error.designation}
                          type="text"
                          className="form-control rondedzero"
                          onChange={handleChanges1}
                          required
                        />
                      </div>
                    </div>

                    <div className="row paddingBtoom">
                      <div className="col-md-2 labelTitle">
                        <span>Gender</span>
                      </div>
                      <div className="col-md-4">
                        <div className="">{renderGenderOptions()}</div>
                      </div>

                      <div className="col-md-2 labelTitle">
                        <span>Marital Status</span>
                      </div>
                      <div className="col-md-4">
                        <div className="">{rendermaritalOptions()}</div>
                      </div>
                    </div>

                    <div className="row paddingBtoom">
                      <div className="col-md-2 labelTitle">
                        <span>
                          Team <span className="redCss">*</span>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <CFormInput
                          value={employee.team}
                          feedbackInvalid={error.team}
                          name="team"
                          type="text"
                          className="form-control rondedzero"
                          onChange={handleChanges1}
                          required
                        />
                      </div>

                      <div className="col-md-2 labelTitle">
                        <span>
                          Nationality <span className="redCss">*</span>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <CFormInput
                          value={employee.nationality}
                          feedbackInvalid={error.nationality}
                          name="nationality"
                          type="text"
                          className="form-control rondedzero"
                          onChange={handleChanges1}
                          required
                        />
                      </div>
                    </div>

                    <div className="row paddingBtoom">
                      <div className="col-md-2 labelTitle">
                        <span>
                          Blood Group<span className="redCss">*</span>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <CFormInput
                          name="bloodgroup"
                          value={employee.bloodgroup}
                          feedbackInvalid={error.bloodgroup}
                          type="text"
                          className="form-control rondedzero"
                          onChange={handleChanges1}
                          required
                        />
                      </div>

                      <div className="col-md-2 labelTitle">
                        <span>
                          Specially Abled <span className="redCss">*</span>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <div className="">{renderspeciallyAbled()}</div>
                      </div>
                    </div>

                    <div className="row paddingBtoom">
                      <div className="col-md-2 labelTitle">
                        <span>
                          Experience <span className="redCss">*</span>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <div className="">{renderExperienceOptions()}</div>
                      </div>

                      <div className="col-md-2 labelTitle">
                        <span>
                          Status <span className="redCss">*</span>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <div className="">{renderStatusOptions()}</div>
                      </div>
                    </div>

                    <div className="row paddingBtoom">
                      <div className="col-md-2 labelTitle">
                        <span>
                          Relieving Date <span className="redCss">*</span>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <CFormInput
                          value={employee.dateofRelieving}
                          feedbackInvalid={error.dateofRelieving}
                          name="dateofRelieving"
                          type="Date"
                          className="form-control rondedzero"
                          onChange={handleChanges1}
                          required
                        />
                      </div>

                      <div className="col-md-12 textalignCenter paddingTop paddingBtoom">
                        <CButton className="btnGreenOCS" type="submit">
                          Save
                        </CButton>

                        <CButton href="employeelist" className="btnGreenOCS">
                          Cancel
                        </CButton>
                      </div>
                    </div>
                  </div>
                </CForm>
              </div>
            </div>
          </CContainer>
        </div>
      </div>
    </>
  );
};

export default BasicDetails;
