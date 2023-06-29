// // export default function Budget() {
// //   return <div>I'm in the Budget</div>;
// // }
// import React, { useState } from "react";
// import { SpeedDial, SpeedDialIcon, SpeedDialAction } from "@material-ui/lab";
// import AddIcon from "@material-ui/icons/Add";
// import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles((theme) => ({
//   speedDialButton: {
//     width: 40,
//     height: 40,
//     position: "absolute",
//     left: 520,
//     top: 200,
//     backgroundColor: "#C80048",
//   },
//   customSpeedDialAction: {
//     width: 35,
//     height: 10,
//     position: "absolute",
//     left: 514,
//     top: 150,
//     backgroundColor: "#e6e6e6",
//   },
//   addBudgetText: {
//     fontSize: 12,
//     color: "black",
//     left: 440,
//     position: "absolute",
//     top: 160,
//   },
// }));

// export default function Budget() {
//   const classes = useStyles();

//   const [open, setOpen] = useState(false);

//   const handleAddBudget = () => {
//     window.location.href = "/addbudget";
//   };
//   // for on open on close
//   // const handleSpeedDialOpen = () => {
//   //   setOpen(true);
//   // };

//   // const handleSpeedDialClose = () => {
//   //   setOpen(false);
//   // };

//   //for clicking event it will appear and disappear also we have to change onlick
//   const handleSpeedDialToggle = () => {
//     setOpen(!open);
//   };

//   return (
//     <div>
//       <SpeedDial
//         ariaLabel="SpeedDial example"
//         icon={<SpeedDialIcon />}
//         onClick={handleSpeedDialToggle}
//         open={open}
//         // onOpen={handleSpeedDialOpen}
//         // onClose={handleSpeedDialClose}
//         className={classes.speedDial}
//         FabProps={{
//           className: classes.speedDialButton,
//         }}
//       >
//         <SpeedDialAction
//           key="Add Budget"
//           icon={<AddIcon />}
//           onClick={handleAddBudget}
//           className={classes.customSpeedDialAction}
//         />
//       </SpeedDial>

//       {open && (
//         <div className={classes.addBudgetContainer}>
//           <p className={classes.addBudgetText}>Add Budget</p>
//         </div>
//       )}

//       {/* {open && (
//         <div>
//           <p>Add Budget</p>
//           <AddIcon />
//         </div>
//       )} */}
//       <br />
//       <br />
//       <br />
//       <br />
//     </div>
//   );
// }
// export default function Budget() {
//   return <div>I'm in the Budget</div>;
// }
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@mui/material/Backdrop";
import ManualEntry from "./svg/IconManuallyEnter";
import AddIcon from "@mui/icons-material/Add";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
=======
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import AddIcon from "@mui/icons-material/Add";

export default function Budget() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const actions = [
    { icon: <ManualEntry />, name: "Add Budget", route: "/addbudget" },
  ];

  const handleActionClick = (route) => {
    navigate(route);
    setOpen(false);
  };
  const paperStyles = {
    // Customize the background color here
    background: "linear-gradient(#c80048, #961c48)",
  };

  return (
    <Container>
      <Box sx={{ height: 600, transform: "translateZ(0px)", flexGrow: 1 }}>
        <Backdrop open={open} />
        <SpeedDial
          ariaLabel="SpeedDial tooltip example"
          sx={{ position: "absolute", bottom: 16, right: 16 }}
          icon={<SpeedDialIcon sx={{ color: "#FFFF" }} />}
          onClose={() => {
            setOpen(false);
          }}
          onOpen={() => {
            setOpen(true);
          }}
          open={open}
          FabProps={{
            style: paperStyles,
          }}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              tooltipOpen
              onClick={() => handleActionClick(action.route)}
            />
          ))}
        </SpeedDial>
      </Box>
    </Container>
  );
=======
  return <div></div>;
}
