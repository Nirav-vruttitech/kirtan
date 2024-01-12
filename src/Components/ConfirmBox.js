import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Modal from "@mui/material/Modal";
import React, { useEffect } from "react";

const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
};

const ConfirmBox = ({ open, handleClose, handleConfirm }) => {
  const handleKeyPress = (event) => {
    if (open && event.key === "Enter") {
      handleConfirm();
      handleClose(false);
    }
  };

  useEffect(() => {
    open && window.addEventListener("keydown", handleKeyPress);

    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [open]);

  return (
    <Modal open={open} onClose={() => handleClose(false)}>
      <Box sx={style} className="rounded-2xl">
        <Box className="flex items-center justify-between w-full bg-red-600 px-4 py-3 rounded-t-xl">
          <p className="text-white font-medium text-xl">Confirm Action</p>
          <IconButton className="text-white" onClick={() => handleClose(false)}>
            <i className="fa-solid fa-circle-xmark"></i>
          </IconButton>
        </Box>
        <Box className="px-4 py-3">
          <p className="text-gray-600 text-lg">
            Are you sure you want to delete this Kirtan?
          </p>
        </Box>

        <Box className="flex justify-end items-center w-full gap-3 px-4 py-3 rounded-b-xl">
          <button
            className="px-4 py-2 rounded-md border-2 border-black text-black"
            onClick={() => handleClose(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md border-2 border-red-500"
            onClick={() => handleConfirm()}
          >
            Confirm
          </button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmBox;
