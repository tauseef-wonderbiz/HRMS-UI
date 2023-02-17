import { useEffect, useState } from "react";
import client from "../../../react-query-client";
import axios from "axios";
import "../../../resources/css/Style.css";
import { CContainer, CButton, CTooltip } from "@coreui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import "react-toggle/style.css";
import { createColumnHelper } from "@tanstack/react-table";
import { useNavigate } from "react-router-dom";
import ErrorToast from "../../../components/ErrorToast";
import { DataTable } from "../../../components/DataTable";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  EMPLOYEE_DELETEEMPLOYEE,
  EMPLOYEE_GETEMPLOYEES,
} from "../../../utils/urlUtils";
import DeleteModal from "../../../components/Models/Deletemodel";

const ListEmployee = () => {
  console.log(import.meta.env.VITE_REACT_APP_API_URL);
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

  const post = async (url: string, data: any) => {
    return await axios
      .post(url, data, getOptions("POST"))
      .then((res) => res)
      .catch((err) => err.message);
  };

  const { isLoading } = useQuery(["employeeList"], () =>
    fetcher(EMPLOYEE_GETEMPLOYEES)
  );

  const data: any = client.getQueryData(["employeeList"]);

  // const [data, setData] = useState<any>(result);
  // useEffect(() => {
  //     if (result?.displayMessage === "Employees retrieved successfully.") {
  //         setData(result);
  //     }
  //     if (data) {
  //         setData({ ...data, result: data?.result.filter((item: any) => item.empId !== deleteId) });
  //     }
  // }, [result]);

  const [displayConfirmationModal, setDisplayConfirmationModal] =
    useState<boolean>(false);
  const [modalMessage, setModalMessage] = useState<any>(null);
  const [deleteId, setDeleteId] = useState<any>(null);
  const [deleteItem, setDeleteItem] = useState<any>(null);

  const showDeleteModal = (id: any, item: any, employeeName: any) => {
    setDeleteId(id);
    setDeleteItem(item);
    setModalMessage(
      `Are you sure you want to delete ${employeeName} as a Employee?`
    );
    setDisplayConfirmationModal(true);
  };

  const handleClick = async (item: any) => {
    navigate(`/employeeedit`, { state: item });
  };

  const hideConfirmationModal = () => {
    setDisplayConfirmationModal(false);
  };

  const handleDeleteUser = (id: any) => {
    closeEmployee(id);
    hideConfirmationModal();
  };

  const { mutate: closeEmployee } = useMutation(
    (data: any) => post(EMPLOYEE_DELETEEMPLOYEE + "?id=", data),
    {
      onSuccess: (res) => {
        client.removeQueries(["employeeList"], res);
      },
    }
  );

  const handleAddButton = () => {
    navigate("/employeedetails");
  };
  const columnHelper = createColumnHelper<any>();
  const columns = [
    columnHelper.accessor("employeeId", {
      header: () => "Id",
      cell: (info: any) => {
        return info.row.index + 1;
      },
    }),
    columnHelper.accessor("employeeNo", {
      header: () => "Employee No",
      cell: (info: any) => {
        return info.getValue();
      },
    }),
    columnHelper.accessor("name", {
      header: () => "Name",
      cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor("email", {
      header: () => "Email",
      cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor("team", {
      header: () => "Team",
      cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor("designation", {
      header: () => "Designation",
      cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor("dob", {
      header: () => "DOB",
      cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor("doj", {
      header: () => "DOJ",
      cell: (info: any) => info.getValue(),
    }),
    columnHelper.accessor("empId", {
      header: () => "Edit",
      cell: (info: any) => (
        <CTooltip content={"Edit"} placement={"top"}>
          <CButton
            color="normal"
            style={{ padding: "0rem" }}
            onClick={() => handleClick(info.getValue())}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
          </CButton>
        </CTooltip>
      ),
    }),
    columnHelper.accessor("empId", {
      header: () => "Delete",
      cell: (info: any) => (
        <CTooltip content={"Delete"} placement={"top"}>
          <CButton
            onClick={() =>
              showDeleteModal(
                info.getValue(),
                info.row.original.empId,
                info.row.original.name
              )
            }
            color="normal"
            style={{ padding: "0rem" }}
          >
            <FontAwesomeIcon icon={faTrashCan} />
          </CButton>
        </CTooltip>
      ),
    }),
  ];
  return (
    <>
      <DeleteModal
        showModal={displayConfirmationModal}
        confirmModal={handleDeleteUser}
        hideModal={hideConfirmationModal}
        message={modalMessage}
        id={deleteId}
        item={deleteItem}
      />

      <div className="row pt-3">
        <h5 className="headerColor">
          <CButton onClick={handleAddButton} className=" btnHrms floatRight">
            Add
          </CButton>
        </h5>
        <hr></hr>
        <ErrorToast prop={toast} />
        {!isLoading && data ? (
          <>
            <DataTable
              data={data.result}
              columns={columns}
              pageName=""
              showSearch="true"
            />
          </>
        ) : (
          <CContainer>
            <div className="row">
              <div className="col-md d-flex justify-content-center">
                <div className="spinner-border m-5 text-dark" />
              </div>
            </div>
          </CContainer>
        )}
      </div>
    </>
  );
};

export default ListEmployee;
