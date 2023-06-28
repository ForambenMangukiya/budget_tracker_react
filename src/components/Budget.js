// export default function Budget() {
//   return <div>I'm in the Budget</div>;
// }
import React, { useState } from "react";
import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@material-ui/lab";
import AddIcon from "@material-ui/icons/Add";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  speedDialButton: {
    width: 40,
    height: 40,
    position: "absolute",
    left: 500,
    top: 150,
    backgroundColor: "#C80048",
  },
  customSpeedDialAction: {
    width: 30,
    height: 10,
    position: "absolute",
    left: 492,
    top: 140,
    backgroundColor: "#e6e6e6",
  },
  addBudgetText: {
    fontSize: 12,
    color: "black",
  },
}));

export default function Budget() {
  const classes = useStyles();

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

  return (
    <div>
      <SpeedDial
        ariaLabel="SpeedDial example"
        icon={<SpeedDialIcon />}
        onClick={handleSpeedDialToggle}
        open={open}
        // onOpen={handleSpeedDialOpen}
        // onClose={handleSpeedDialClose}
        className={classes.speedDial}
        FabProps={{
          className: classes.speedDialButton,
        }}
      >
        <SpeedDialAction
          key="Add Budget"
          icon={<AddIcon />}
          onClick={handleAddBudget}
          className={classes.customSpeedDialAction}
        />
      </SpeedDial>

      {open && (
        <div className={classes.addBudgetContainer}>
          <p className={classes.addBudgetText}>Add Budget</p>
        </div>
      )}

      {/* {open && (
        <div>
          <p>Add Budget</p>
          <AddIcon />
        </div>
      )} */}
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}
