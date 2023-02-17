import {
  CToast,
  CToastBody,
  CToastClose,
} from "@coreui/react";

const NetworkErrorToast = ({prop} : any) => {
    const {toastText, visible} = prop
      return (
    <>
      {visible && (
        <CToast
          autohide={false}
          visible={visible}
          color="danger"
          className="rounded-0 text-white"
        >
          <div className="d-flex">
            <CToastBody>{toastText}</CToastBody>
            <CToastClose className="me-2 m-auto" white/>
          </div>
        </CToast>
      )}
    </>
  );
};

export default NetworkErrorToast;
