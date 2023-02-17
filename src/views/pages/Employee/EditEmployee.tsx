import {
  CButton,
  CContainer,
  CForm,
  CFormInput,
  CFormSelect,
} from "@coreui/react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  EMPLOYEE_GETEMPLOYEEBYID,
  EMPLOYEE_SAVEEMPLOYEE,
} from "../../../utils/urlUtils";
import "./basicdetails.scss";

const EditEmployee = () => {
  let location = useLocation();
  const passedData = location.state;

  const [toast, setToast] = useState<any>({
    toastText: "",
    visible: false,
  });

  const [cssMessage, setcssMessage] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

  const [employee, setemployee] = useState({
    empId: 0,
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
    maritalStatus: "",
    status: "",
    speciallyAbled: "",
    gender: "",
  });

  const [error, setError] = useState({
    employeeNo: "",
    name: "",
  });

  const [Authorization, setAuthorization] = useState<string>(
    localStorage.getItem("Authorization") || ""
  );

  const getOptions = (method = "GET") => {
    return {
      method: method,
      headers: {
        "Content-Type": "application/json",
        Authorization: Authorization,
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

  const fetcher = async (url: string, method = "GET") => {
    return await axios(url, getOptions(method))
      .then((res) => res.data)
      .catch((err) => setToast({ toastText: err.message, visible: true }));
  };

  const fetchEmployeeById = async (empId: number) => {
    let employeeDetails = await fetcher(`${EMPLOYEE_GETEMPLOYEEBYID}/${empId}`);

    setemployee({
      ...employee,
      empId: employeeDetails.result.empId,
      employeeNo: employeeDetails.result.employeeNo,
      name: employeeDetails.result.name,
      email: employeeDetails.result.email,
      mobileNo: employeeDetails.result.mobileNo,
      experience: employeeDetails.result.experience,
      designation: employeeDetails.result.designation,
      doj: employeeDetails.result.doj,
      dateofRelieving: employeeDetails.result.dateofRelieving,
      team: employeeDetails.result.team,
      dob: employeeDetails.result.dob,
      emergencyContact: employeeDetails.result.emergencyContact,
      currentAddress: employeeDetails.result.currentAddress,
      permanentAddress: employeeDetails.result.permanentAddress,
      nationality: employeeDetails.result.nationality,
      bloodgroup: employeeDetails.result.bloodGroup,
      maritalStatus: employeeDetails.result.maritalStatus,
      status: employeeDetails.result.status,
      speciallyAbled: employeeDetails.result.speciallyAbled,
      gender: employeeDetails.result.gender,
    });
    employeeDetails(passedData);
    // console.log('check : ' + employeeDetails)
  };

  // const { isLoading } = useQuery(["employeeList"], () =>
  //   fetcher(EMPLOYEE_GETEMPLOYEES)
  // );

  // const data: any = client.getQueryData(["employeeList"]);

  const { mutate: addEmployee } = useMutation(
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

  useEffect(() => {
    fetchEmployeeById(passedData);
  }, []);

  const handleSave = (e: any) => {
    setMessage("");
    if (employee.employeeNo === "" || employee.name === "") {
      setError({
        employeeNo: employee.employeeNo === "" ? "Employee ID is required" : "",
        name: employee.name === "" ? "Name is required" : "",
      });
    }

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }
    setValidated(true);
    e.preventDefault();

    if (form.checkValidity() === true) {
      const data = {
        empId: employee.empId,
        employeeNo: employee.employeeNo,
        name: employee.name,
        email: employee.email,
        dob: employee.dob,
        mobileNoNo: employee.mobileNo,
        emergencyContactNo: employee.emergencyContact,
        experience: employee.experience,
        currentAddress: employee.currentAddress,
        permanentAddress: employee.permanentAddress,
        designation: employee.designation,
        doj: employee.doj,
        nationality: employee.nationality,
        bloodGroup: employee.bloodgroup,
        dateofRelieving: employee.dateofRelieving,
        team: employee.team,
        maritalStatus: employee.maritalStatus,
        status: employee.status,
        speciallyAbled: employee.speciallyAbled,
        gender: employee.gender,
      };
      console.log(data);
      setemployee({
        ...employee,
        empId: employee.empId,
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
        maritalStatus: employee.maritalStatus,
        status: employee.status,
        speciallyAbled: employee.speciallyAbled,
        gender: employee.gender,
      });
      addEmployee(data);
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
      speciallyAbled: "",
    });
  };

  //   const handleRemoveSkill = (id: number) => {
  //     setemployee({
  //         ...employee,
  //         skills: employee.skills.filter((item) => item != id),
  //     });
  // };

  const renderGenderOptions = () => {
    return (
      <CFormSelect
        className="rondedzero"
        name="gender"
        value={employee.gender}
        onChange={handleChanges1}
      >
        <option>Select</option>
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
        onChange={handleChanges1}
      >
        <option>Select</option>
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
        onChange={handleChanges1}
      >
        <option>Select</option>
        <option>Married</option>
        <option>Unmarried</option>
      </CFormSelect>
    );
  };

  const renderAbledOptions = () => {
    return (
      <CFormSelect
        className="rondedzero"
        name="speciallyAbled"
        value={employee.speciallyAbled}
        onChange={handleChanges1}
      >
        <option>Select</option>
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
        onChange={handleChanges1}
      >
        <option>Select</option>
        <option value={1}>Fresher</option>
        <option value={2}>Experienced</option>
      </CFormSelect>
    );
  };

  return (
    <>
      <div className="">
        <div className=" basicdetailsFrame">
          <h1 className="headerColor mx-5 pt-3">Edit Details</h1>
          {/* {message && <div className={cssMessage}>{message}</div>} */}
          <CContainer>
            <div className="">
              <hr></hr>
              {message && <div className={cssMessage}>{message}</div>}
              <div className="row">
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
                          EmployeeId <span className="redCss">*</span>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <CFormInput
                          value={employee.employeeNo}
                          feedbackInvalid={error.employeeNo}
                          disabled
                          name="employeeNo"
                          type="text"
                          className="form-control rondedzero"
                          //    style={{ textTransform: 'uppercase' }}
                          onChange={handleChanges1}
                          // onBlur={() => setToggle(!toggle)}
                        />
                        {/* {validSESA && (
                      <div className="validSESA">Valid SESA ID</div>
                    )} */}
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
                          disabled
                          name="name"
                          type="text"
                          className="form-control rondedzero"
                          onChange={handleChanges1}
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
                          name="email"
                          type="text"
                          className="form-control rondedzero"
                          onChange={handleChanges1}
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
                          name="dob"
                          type="Date"
                          className="form-control rondedzero"
                          onChange={handleChanges1}
                        />
                      </div>
                    </div>

                    <div className="row paddingBtoom">
                      <div className="col-md-2 labelTitle">
                        <span>
                          mobileNo <span className="redCss">*</span>
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
                          className="rondedzero form-control"
                          name="mobileNo"
                          onChange={handleChanges1}
                        />
                      </div>

                      <div className="col-md-2 labelTitle">
                        <span>
                          Emergency mobileNo <span className="redCss">*</span>
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
                          className="rondedzero form-control"
                          name="emergencyContact"
                          onChange={handleChanges1}
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
                          type="text"
                          className="form-control rondedzero"
                          disabled
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
                          type="text"
                          className="form-control rondedzero"
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
                          disabled
                          type="Date"
                          className="form-control rondedzero"
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
                          type="text"
                          className="form-control rondedzero"
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
                          name="team"
                          type="text"
                          className="form-control rondedzero"
                          onChange={handleChanges1}
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
                          name="nationality"
                          type="text"
                          className="form-control rondedzero"
                          onChange={handleChanges1}
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
                          type="text"
                          className="form-control rondedzero"
                          onChange={handleChanges1}
                        />
                      </div>

                      <div className="col-md-2 labelTitle">
                        <span>
                          Specially Abled <span className="redCss">*</span>
                        </span>
                      </div>
                      <div className="col-md-4">
                        <div className="">{renderAbledOptions()}</div>
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
                          name="dateofRelieving"
                          type="Date"
                          className="form-control rondedzero"
                          onChange={handleChanges1}
                        />
                      </div>
                    </div>

                    <div className="col-md-12 textalignCenter paddingTop paddingBtoom">
                      <CButton className="btnGreenOCS" type="submit">
                        Update
                      </CButton>

                      <CButton href="employeelist" className="btnGreenOCS">
                        Cancel
                      </CButton>
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

export default EditEmployee;
