import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../CSS/Stepper.css";
import { setKirtan, setShortCut } from "../Slice/kirtanSlice";
import CkEditorTextArea from "./CkEditorTextArea";

const AddKirtanStepper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addStepperKirtan = useSelector(
    (state) => state.addStepperSlice.addStepperKirtan
  );
  const addStepperShortCutsObject = useSelector(
    (state) => state.addStepperSlice.addStepperShortCutsObject
  );

  const addKirtanWithPredefinedShortCuts = useSelector(
    (state) => state.kirtan.addKirtanWithPredefinedShortCuts
  );

  const [isValid, setIsValid] = React.useState(false);

  const handleSubmitClick = () => {
    localStorage.setItem("kirtan", JSON.stringify(addStepperKirtan));
    localStorage.setItem(
      "shortCutsObject",
      JSON.stringify(addStepperShortCutsObject)
    );

    localStorage.setItem(
      "addKirtanWithPredefinedShortCuts",
      JSON.stringify(addKirtanWithPredefinedShortCuts)
    );

    dispatch(setKirtan(addStepperKirtan));
    dispatch(setShortCut(addStepperShortCutsObject));
    navigate("/");
  };

  useEffect(() => {
    setIsValid(addStepperKirtan.trim() !== "" && addStepperKirtan !== "fgg");
  }, [addStepperKirtan]);

  return (
    <div className="w-full h-screen bg-gray-100">
      <div className="container pt-3">
        <Box sx={{ width: "100%" }}>
          <Box className="flex justify-end item-end w-full gap-3 pb-2">
            <Button
              variant="outlined"
              color="inherit"
              onClick={() => navigate("/")}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmitClick}
              color="primary"
              disabled={!isValid}
            >
              Submit
            </Button>
          </Box>
          <div className="mt-2 mb-1">
            <CkEditorTextArea />
          </div>
        </Box>
      </div>
    </div>
  );
};

export default AddKirtanStepper;
