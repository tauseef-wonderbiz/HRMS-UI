import {
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CButton,
  } from "@coreui/react";
  
  const DeleteModal = ({
    showModal,
    hideModal,
    confirmModal,
    message,
    item,
    id,
  }: any) => {
    return (
        <CModal style={{borderRadius: "0px"}} visible={showModal} onClose={hideModal}>
          <CModalHeader closeButton>
            <CModalTitle>Delete {item}?</CModalTitle>
          </CModalHeader>
          <CModalBody>
            <div className="alert alert-danger rounded-0">{message}</div>
          </CModalBody>
          <CModalFooter>
          <CButton className="rounded-0" color="default"  onClick={() => confirmModal(id)}>
              Yes
            </CButton>
            <CButton className="rounded-0" color="default" onClick={hideModal}>
              No
            </CButton>
            
          </CModalFooter>
        </CModal>
    );
  };
  
  export default DeleteModal;
  