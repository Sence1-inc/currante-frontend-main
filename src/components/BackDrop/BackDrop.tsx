import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { useAppSelector } from "../../redux/store";

const BackDrop = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const isLoading = useAppSelector((state) => state.isLoading);

  useEffect(() => {
    setIsOpen(isLoading);
  }, [isLoading]);

  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={isOpen}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackDrop;
