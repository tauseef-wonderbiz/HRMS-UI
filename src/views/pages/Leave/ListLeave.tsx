import { useState } from "react";
import client from "../../../react-query-client";
import axios from "axios";
import "../../resources/css/Style.css";
import { CContainer, CButton } from "@coreui/react";
import "react-toggle/style.css";
import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import ErrorToast from "../../../components/ErrorToast";
import { DataTable } from "../../../components/DataTable";
import { useQuery } from "@tanstack/react-query";
import { LEAVE_APPLY } from "../../../utils/urlUtils";

const LeaveList = () => {
  let navigate = useNavigate();
  const [toast, setToast] = useState<any>({
    toastText: "",
    visible: false,
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

  const fetcher = async (url: string) => {
    return await axios(url, getOptions())
      .then((res) => res.data)
      .catch((err) => setToast({ toastText: err.message, visible: true }));
  };

  const { isLoading } = useQuery(["leaveList"], () => fetcher(LEAVE_APPLY));

  const data: any = client.getQueryData(["leaveList"]);

  const handleAddButton = () => {
    navigate("/leavepage");
  };

  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("srNo", {
      header: () => "Sr No",
      cell: (info: any) => {
        return info.row.index + 1;
      },
    }),
    columnHelper.accessor("employeeName", {
      header: () => "Name",
      cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor("fromDate", {
      header: () => "Start Date",
      cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor("toDate", {
      header: () => "End Date",
      cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor("noOfDays", {
      header: () => "# Days",
      cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor("ManagerName", {
      header: () => "Manager",
      cell: (info: any) => " GC",
      //cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor("remark", {
      header: () => "Remark",
      cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor("Status", {
      header: () => "Status",
      cell: (info: any) => "Pending",
      //cell: (info: any) => info.getValue(),
      enableSorting: false,
    }),
  ];
  return (
    <>
      <div className="pt-5">
        <CContainer className="col-md-8">
          <h5 className="headerColor ">
            Leave List
            <CButton onClick={handleAddButton} className="btnColor floatRight">
              Add
            </CButton>
          </h5>
          <hr></hr>
          <ErrorToast prop={toast} />
          {!isLoading && data ? (
            <CContainer className="tablecss">
              <DataTable
                data={data.result}
                columns={columns}
                pageName=""
                showSearch="false"
              />
            </CContainer>
          ) : (
            <CContainer>
              <div className="row">
                <div className="col-md-12 d-flex justify-content-center">
                  <div
                    className="spinner-border m-5 text-success"
                    role="status"
                  />
                </div>
              </div>
            </CContainer>
          )}
        </CContainer>
      </div>
    </>
  );
};

export default LeaveList;
