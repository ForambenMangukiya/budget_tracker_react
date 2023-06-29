// export default function Budget() {
//   return <div>I'm in the Budget</div>;
// }
import React, { useState } from "react";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddIcon from "@mui/icons-material/Add";

export default function Budget() {
  const [open, setOpen] = useState(false);

  const handleAddBudget = () => {
    window.location.href = "/addbudget";
  };
  // for on open on close
  // const handleSpeedDialOpen = () => {
  //   setOpen(true);
  // };

  // const handleSpeedDialClose = () => {
  //   setOpen(false);
  // };

  //for clicking event it will appear and disappear also we have to change onlick
  const handleSpeedDialToggle = () => {
    setOpen(!open);
  };

  return <div></div>;
}
