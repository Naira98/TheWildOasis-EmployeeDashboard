import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import ButtonIcon from "../../ui/ButtonIcon";
import { useLogout } from "./useLogout";

const Logout = () => {
  const { logout, isLoading } = useLogout();

  return (
    <>
    <ButtonIcon disabled={isLoading} onClick={logout}>
      <LogoutOutlinedIcon />
    </ButtonIcon>
    </>
  );
};

export default Logout;
