import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Backdrop from '@mui/material/Backdrop';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import Container from '@mui/material/Container';
import ScanReceipt from './svg/IconScanReciept';
import LinkAccount from './svg/IconPayWithCard';
import ManualEntry from './svg/IconManuallyEnter'; 

const actions = [
    { icon: <LinkAccount />, name: 'Link', route: '/link' },
    { icon: <ManualEntry/>, name: 'Expense', route: '/addexpense' },
    { icon: <ManualEntry />, name: 'Income', route: '/addincome' },
    { icon: <ScanReceipt />, name: 'Scan', route: '/'},
];

export default function Transactions() {
const [open, setOpen] = useState(false);
const navigate = useNavigate();

const handleOpen = () => {
    setOpen(true);
}
const handleClose = () => {
    setOpen(false);
}

const handleActionClick = (route) => {
    navigate(route);
    handleClose();
};

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     const response = await fetch("http://localhost:8080/transaction", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         category_name,
//         tran_description,
//         tran_amount,
//         tran_sign,
//         tran_curency,
//         tran_date,
//       }),
//     });
//     const data = await response.json();
//   };
return (
<Container maxWidth="sm">
<Box sx={{ height: 330, transform: 'translateZ(0px)', flexGrow: 1 }}>
    <Backdrop open={open} />
    <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />}
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
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

}
