import React from "react";
import {
  CDropdown,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { cilAccountLogout } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useAuth } from "../../context/auth/AuthContext";

const AppHeaderDropdown = () => {
  const { userName } = useAuth();

  const Logout = () => {
    localStorage.removeItem("Authorization");
    localStorage.removeItem("userName");
    window.location.href = "/#/Login";
  };
  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle className="py-0" caret={false}>
        {/* <CAvatar src={avatar8} size="md" /> */}
        <span key="userName" className="userNameMenu" color="green">
          {userName}
        </span>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0">
        <CDropdownHeader className="bg-light fw-semibold py-2">
          Settings
        </CDropdownHeader>
        <CDropdownItem onClick={Logout}>
          <CIcon icon={cilAccountLogout} className="me-2" />
          Logout
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
