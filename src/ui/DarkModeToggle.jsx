import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WbSunnyOutlinedIcon from "@mui/icons-material/WbSunnyOutlined";

import ButtonIcon from "./ButtonIcon";

import { useDarkMode } from "../context/DarkModeContext";

const DarkModeToggle = () => {
  const { isDarkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {isDarkMode ? <WbSunnyOutlinedIcon /> : <DarkModeOutlinedIcon />}
    </ButtonIcon>
  );
};

export default DarkModeToggle;
