import { createContext, useState } from "react";

export const UserUpdateContext = createContext(null);

const UserUpdateProvider = ({ children }) => {
  //states for profile menu
  const [openProfile, setOpenProfile] = useState(false);

  //states for conditional rendering of modal forms
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);

  //state for opening modal
  const [openModal, setOpenModal] = useState(false);

  //states for email changing
  const [newEmail, setNewEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  //states for password changing
  const [oldPassword, setOldPassword] = useState("");

  const [newPassword, setNewPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  //states for password confirmation
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [pwdConfirmFocus, setPwdConfirmFocus] = useState(false);

  const [success, setSuccess] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  //reset all states to initial values when closing modal
  const handleClose = () => {
    setOpenModal(false);
    setChangeEmail(false);
    setChangePassword(false);
    setDeleteUser(false);
    setOldPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setNewEmail("");
    setSuccess(false);
    setErrMsg("");
  };

  return (
    <UserUpdateContext.Provider
      value={{
        openProfile,
        setOpenProfile,
        changeEmail,
        setChangeEmail,
        changePassword,
        setChangePassword,
        deleteUser,
        setDeleteUser,
        openModal,
        setOpenModal,
        newEmail,
        setNewEmail,
        validEmail,
        setValidEmail,
        oldPassword,
        setOldPassword,
        newPassword,
        setNewPassword,
        validPassword,
        setValidPassword,
        pwdFocus,
        setPwdFocus,
        confirmPassword,
        setConfirmPassword,
        passwordMatch,
        setPasswordMatch,
        pwdConfirmFocus,
        setPwdConfirmFocus,
        success,
        setSuccess,
        errMsg,
        setErrMsg,
        handleClose,
      }}
    >
      {children}
    </UserUpdateContext.Provider>
  );
};

export default UserUpdateProvider;
