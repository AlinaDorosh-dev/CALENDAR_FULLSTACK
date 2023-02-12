import { createContext,useState } from "react";

export const UserUpdateContext = createContext(null);

const UserUpdateProvider = ({ children }) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [changeEmail, setChangeEmail] = useState(false);
  const [changePassword, setChangePassword] = useState(false);
  const [deleteUser, setDeleteUser] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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
      }}
    >
      {children}
    </UserUpdateContext.Provider>
  );
};

export default UserUpdateProvider;
