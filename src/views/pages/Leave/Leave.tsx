import react, { useState } from "react";
import "./Leave.scss";
import "@coreui/coreui/dist/css/coreui.min.css";
import {
  CButton,
  CForm,
  CFormCheck,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CContainer,
} from "@coreui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { DataTable } from "../../../components/DataTable";
import client from "../../../react-query-client";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { LEAVE_APPLY } from "../../../utils/urlUtils";

function Leave() {
  let location = useLocation();
  const passedData = location.state;
  const [fromDate, setfromDate] = useState<any>();
  const [toDate, settoDate] = useState<any>();
  const [noOfDays, setnoOfDays] = useState<any>();
  const [leaveType, setleaveType] = useState<any>();
  const [reason, setreason] = useState<any>();
  const [toast, setToast] = useState<any>({
    toastText: "",
    visible: false,
  });

  const [cssMessage, setcssMessage] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [validated, setValidated] = useState<boolean>(false);

  const [leave, setleave] = useState({
    empId: 1,
    fromDate: "",
    toDate: "",
    remarkId: 1,
    noOfDays: 0,
    leaveTypeId: "",
    employeeReason: "",
    adminReason: "",
    createdOn: new Date().toISOString().split("T")[0],
    createdby: 1,
    emp: "",
    leaveType: 0,
    remark: "",
  });

  const [error, setError] = useState<any>({
    fromdate: "",
    toDate: "",
    leaveType: "",
    employeeReason: "",
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

  // const fetcher = async (url: string, method = "GET") => {
  //     return await axios
  //         .get(url, getOptions(method))
  //         .then((res) => res.data)
  //         .catch((err) => setToast({ toastText: err.message, visible: true }));
  // };

  const { mutate: addleave } = useMutation(
    (data: any) => post(LEAVE_APPLY, data),
    {
      onSuccess: (data) => {
        if (data.isSuccess) {
          setcssMessage("sucessfulMsg");
          //handleClear();
          alert(data.displayMessage);
          handleClear();
          setValidated(false);
        } else {
          setcssMessage("errorMsg");
        }
        setMessage(data.message);
        console.log(data.message);
        window.scrollTo(0, 0);
      },
    }
  );

  const handleClear = () => {
    setfromDate("");
    settoDate("");
    setnoOfDays("");
    setleaveType("");
    setreason("");
    setleave({
      ...leave,
      empId: 1,
      fromDate: "",
      toDate: "",
      remarkId: 1,
      leaveTypeId: "",
      employeeReason: "",
      adminReason: "",
      createdOn: "",
      createdby: 1,
      emp: "",
      leaveType: 0,
      remark: "",
    });
  };
  const handleSave = (e: any) => {
    setMessage("");
    if (
      leave.fromDate === "" ||
      leave.toDate === "" ||
      leave.leaveType === 0 ||
      leave.employeeReason === ""
    ) {
      setError({
        fromdate: leave.fromDate === "" ? "Start date is required" : "",
        toDate: leave.toDate === "" ? "End date is required" : "",
        leaveType: leave.leaveType === 0 ? "Leave type is required" : "",
        reason: leave.employeeReason === "" ? "Reason is required" : "",
      });
    } else {
      setError({
        fromdate: "",
        toDate: "",
        leaveType: "",
        reason: "",
        noOfDays: "",
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
        empId: leave.empId,
        fromDate: fromDate,
        toDate: toDate,
        noOfDays: noOfDays,
        remarkId: leave.remarkId,
        leaveTypeId: leaveType,
        employeeReason: reason,
        adminReason: leave.adminReason,
        createdOn: leave.createdOn,
        createdby: leave.createdby,
      };
      console.log(data);
      setleave({
        ...leave,
        empId: leave.empId,
        fromDate: leave.fromDate,
        toDate: leave.toDate,
        noOfDays: leave.noOfDays,
        remarkId: leave.remarkId,
        employeeReason: leave.employeeReason,
        adminReason: leave.adminReason,
        createdOn: leave.createdOn,
        createdby: leave.createdby,
        emp: leave.emp,
        remark: leave.remark,
      });
      addleave(data);
    }
  };

  let From: any;
  let To: any;
  let Noofdays: any;

  const params: any = client.getQueryData(["params"]);

  if (params !== undefined) {
    From = params.FromDate;
    To = params.ToDate;
    Noofdays = params.NoofDays;
  }

  const [dateSearch, setdateSearch] = useState({
    fromDate: From,
    toDate: To,
    noOfDays: Noofdays,
  });
  // const handleChanges = (e: any) => {
  //     setdateSearch({ ...dateSearch, [e.target.name]: e.target.value });
  //     //getDayDiff()
  //     //let r= getDayDiff(dateSearch.fromDate,dateSearch.toDate);
  //     //setdateSearch({ ...dateSearch, [dateSearch.noOfDaysnoOfDays]: r });
  //     //setdateSearch(dateSearch => ({...dateSearch, [e.target.name]: e.target.value}));
  // };

  const fromDatehandleChanges = (e: any) => {
    setfromDate(e.target.value);

    let res: any;
    let todaysDate = new Date();
    let date1 = new Date(e.target.value);
    let date2 = new Date(toDate);
    if (date1 > date2) {
      alert("End Date should not be a greater than Start Date");
      setnoOfDays("");
      setfromDate("");
    } else {
      res = getDayDiffCount(date1, date2);
      setnoOfDays(res);
    }
    // if (date1 !== undefined && date2 !== undefined) {
    //     if (date1.setHours(0, 0, 0, 0) == date2.setHours(0, 0, 0, 0)) {
    //         setnoOfDays("1");
    //     }
    //     else if (date1.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
    //         setfromDate("");
    //         setnoOfDays("");
    //     }
    //     else if (date1.setHours(0, 0, 0, 0) <= todaysDate.setHours(0, 0, 0, 0)) {
    //         setfromDate("");
    //         setnoOfDays("");
    //     }
    //     else {
    //         res = getDayDiffCount(date1, date2);
    //         setnoOfDays(res);
    //     }
    // }
  };
  const toDatehandleChanges = (e: any) => {
    settoDate(e.target.value);
    debugger;
    let res: any;
    let todaysDate = new Date();
    let date1 = new Date(fromDate);
    let date2 = new Date(e.target.value);
    if (date1 > date2) {
      alert("End Date should not be a greater than Start Date");
      setnoOfDays("");
      settoDate("");
    } else {
      res = getDayDiffCount(date1, date2);
      setnoOfDays(res);
    }
    // if (date1 !== undefined && date2 !== undefined) {
    //     if (date1.setHours(0, 0, 0, 0) == date2.setHours(0, 0, 0, 0)) {
    //         setnoOfDays("1");
    //     }
    //     else if (date2.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
    //         alert("You can not select todays date");
    //         settoDate("");
    //         setnoOfDays("");
    //     }
    //     else if (date2.setHours(0, 0, 0, 0) <= todaysDate.setHours(0, 0, 0, 0)) {
    //         alert("You can not select oldest date");
    //         settoDate("");
    //         setnoOfDays("");
    //     }
    //     else {
    //         res = getDayDiffCount(date1, date2);
    //         setnoOfDays(res);
    //     }
    // }
  };

  const leaveTypehandleChanges = (e: any) => {
    setleaveType(e.target.value);
  };
  const reasonhandleChanges = (e: any) => {
    setreason(e.target.value);
  };

  // const getDayDiffCount1 = () => {
  //     const msInDay = 24 * 60 * 60 * 1000;
  //     let res: any;
  //     let end = new Date(toDate);
  //     let start = new Date(fromDate);
  //     console.log("start", start);
  //     console.log("end", end);
  //     if (fromDate !== undefined && toDate !== undefined) {
  //         res = Math.round(
  //             Math.abs(Number(end) - Number(start)) / msInDay
  //         );
  //     }
  //     setnoOfDays(res);
  //     console.log(res);
  //     return res;
  // }

  const getDayDiffCount = (dDate1: Date, dDate2: Date) => {
    //debugger;
    //let dDate2 = new Date(toDate);
    //let dDate1 = new Date(fromDate);
    if (
      dDate1.toString() === "Invalid Date" ||
      dDate2.toString() === "Invalid Date"
    ) {
      return 0;
    }
    if (dDate1 !== undefined && dDate2 !== undefined) {
      let count = 0;
      let curDate = dDate1;
      while (curDate <= dDate2) {
        let dayOfWeek = curDate.getDay();
        let isWeekend = dayOfWeek == 6 || dayOfWeek == 0;
        if (!isWeekend) count++;
        curDate = addDays(curDate, 1);
      }
      return count;
    }
  };

  const addDays = (date: Date, days: number): Date => {
    let result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  // const getDayDiff = () => {
  //     const msInDay = 24 * 60 * 60 * 1000;
  //     let res: any;
  //     let end = dateSearch.toDate;
  //     let start = dateSearch.fromDate;
  //     if (start !== undefined && end !== undefined) {
  //         res = Math.round(
  //             Math.abs(Number(dateSearch.toDate) - Number(dateSearch.fromDate)) / msInDay
  //         );
  //     }
  //     setdateSearch(dateSearch => ({ ...dateSearch, noOfDays: res }));
  //     console.log(res);
  //     return res;
  // }

  const renderLeaveOptions = () => {
    return (
      <CFormSelect
        className="rondedzero"
        name="leaveType"
        feedbackInvalid={error.leaveType}
        value={leaveType}
        onChange={leaveTypehandleChanges}
        style={{ width: "50%" }}
        required
      >
        <option> Select</option>
        <option value="1">Privilege Leave</option>
        <option value="2">Casual Leave</option>
        <option value="3">Sick Leave</option>
        <option value="4">Paid Leave</option>
        <option value="5">Maternity Leave</option>
      </CFormSelect>
    );
  };

  return (
    <CContainer fluid className="vertical-center">
      <div className=" basicdetailsFrame pt-3 ">
        <div className="row col-md-12 d-flex justify-content-center">
          <div className="d-flex">
            <div className="row col-md-8 p-2">
              <div>
                <h5 className="headerColor p-1">Apply Leave</h5>
              </div>
              <div className="row">
                <hr style={{ marginLeft: "12px" }}></hr>
              </div>
              <div className="col-md">
                <div>
                  <div className="row inputfrom">
                    <CForm
                      noValidate
                      validated={validated}
                      onSubmit={handleSave}
                    >
                      <div className="row">
                        <div className="row paddingBtoom">
                          <div className="col-md-2 labelTitle">
                            <span>
                              Start Date <span className="redCss">*</span>
                            </span>
                          </div>
                          <div className="col-md">
                            <CFormInput
                              value={fromDate}
                              feedbackInvalid={error.fromdate}
                              name="fromDate"
                              type="Date"
                              className="form-control rondedzero"
                              style={{ width: "50%" }}
                              onChange={fromDatehandleChanges}
                              required
                            />
                          </div>
                        </div>

                        <div className="row paddingBtoom">
                          <div className="col-md-2 labelTitle">
                            <span>
                              End Date <span className="redCss">*</span>
                            </span>
                          </div>
                          <div className="col-md">
                            <CFormInput
                              value={toDate}
                              feedbackInvalid={error.toDate}
                              name="toDate"
                              type="Date"
                              className="form-control rondedzero"
                              style={{ width: "50%" }}
                              onChange={toDatehandleChanges}
                              required
                            />
                          </div>
                        </div>

                        <div className="row paddingBtoom">
                          <div className="col-md-2 labelTitle">
                            <span>
                              Leave Type <span className="redCss">*</span>
                            </span>
                          </div>
                          <div className="col-md">
                            <div className="">{renderLeaveOptions()}</div>
                          </div>
                        </div>

                        <div className="row paddingBtoom">
                          <div className="col-md-2 labelTitle">
                            <span>
                              No Of Days <span className="redCss">*</span>
                            </span>
                          </div>
                          <div className="col-md">
                            <CFormInput
                              value={noOfDays}
                              name="noOfDays"
                              type="text"
                              className="form-control rondedzero"
                              style={{ width: "50%" }}
                              readOnly
                              disabled
                            />
                          </div>
                        </div>

                        <div className="row paddingBtoom">
                          <div className="col-md-2 labelTitle">
                            <span>
                              Reason <span className="redCss">*</span>
                            </span>
                          </div>
                          <div className="col-md">
                            <CFormTextarea
                              value={reason}
                              feedbackInvalid={error.reason}
                              name="reason"
                              className="form-control rondedzero"
                              onChange={reasonhandleChanges}
                              required
                            />
                          </div>
                        </div>

                        <div className="col-md-12 textalignCenter paddingTop paddingBtoom">
                          <CButton
                            className="btnHrms paddingBtoom"
                            type="submit"
                          >
                            Submit
                          </CButton>

                          <CButton className="btnHrms" onClick={handleClear}>
                            Reset All
                          </CButton>

                          <CButton href="leavelist" className="btnGreenOCS">
                            Cancel
                          </CButton>
                        </div>
                      </div>
                    </CForm>
                    {message}
                  </div>
                </div>
              </div>
            </div>

            <div className="row col-md-4  " style={{ marginLeft: "56px" }}>
              <div>
                <div className="">
                  <h5 className="headerColor pt-2">Available Leave</h5>
                </div>
                <hr></hr>
                <div className="col-md-12">
                  <div className="row col-md-12">
                    <div className="inputfrom">
                      <div className="row">
                        <CFormLabel className="samelineleavelable col-md-8">
                          Total Leaves
                        </CFormLabel>
                        <CFormLabel className="samelineleaveinput col-md-2">
                          15
                        </CFormLabel>
                      </div>
                      <div className="row">
                        <CFormLabel className="samelineleavelable col-md-8">
                          Balance Leaves
                        </CFormLabel>
                        <CFormLabel className="samelineleaveinput col-md-2">
                          10
                        </CFormLabel>
                      </div>
                      <div className="row">
                        <CFormLabel className="samelineleavelable col-md-8">
                          Used Leave
                        </CFormLabel>
                        <CFormLabel className="samelineleaveinput col-md-2">
                          5
                        </CFormLabel>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </CContainer>
  );
}
export default Leave;
