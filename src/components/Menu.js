import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import Home from './svg/IconHome';
// import Planner from './svg/IconPlanner';
// import Transactions from './svg/IconTransactions';
// import Graph from './svg/IconGraph';
// import Games from './svg/IconGame'
import Paper from '@mui/material/Paper';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import SyncAltOutlinedIcon from '@mui/icons-material/SyncAltOutlined';
import DonutSmallOutlinedIcon from '@mui/icons-material/DonutSmallOutlined';


export default function Menu() {
    const [value, setValue] = useState('home');
    const navigate = useNavigate();

    const handleChange = (event, newValue) => {
        setValue(newValue);
        console.log("value", newValue)

        if (newValue === 'home') {
            navigate("/dashboard");
        }

        if (newValue === 'planner') {
            navigate("/budget");
        }

        if (newValue === 'transactions') {
            navigate("/transactions");
        }

        if (newValue === 'reports') {
            navigate("/reports");
        }
    
    };


    return (

      <Paper
      style={{
        position: 'fixed',
        zIndex: 5,
        left: '50%',
        transform: 'translateX(-50%)',
        minWidth: "500px",
        maxWidth: "600px",
        padding: "5px",
      }}
      sx={{ bottom: 0, left: 5, right: 5,  }}
      elevation={5}
    >
        <BottomNavigation value={value} onChange={handleChange}
          showLabels
          sx={{
            '& .MuiBottomNavigationAction-root': {
              minWidth: 0, // Remove the minimum width
              padding: '2px', // Increase the padding
            },
            '& .MuiSvgIcon-root': {
              fontSize: '900px', // Increase the icon size
            },
          }}
        >
        <BottomNavigationAction
        label="Home"
        value="home"
        icon={<HomeOutlinedIcon style={{ color: "#453F78", fontSize: 40 }} />}
        />
        <BottomNavigationAction
        label="Planner"
        value="planner"
        icon={<ListAltOutlinedIcon style={{ color: "#453F78", fontSize: 40 }} />}
        />
        <BottomNavigationAction
        label="Transactions"
        value="transactions"
        icon={<SyncAltOutlinedIcon style={{ color: "#453F78", fontSize: 40 }} />}
        />

        <BottomNavigationAction
        label="Reports"
        value="reports"
        icon={<DonutSmallOutlinedIcon style={{ color: "#453F78", fontSize: 40 }}  />}
        />
{/* 
        <BottomNavigationAction 
        // label="Games" 
        value="games" 
        icon={<Games />} /> */}
        </BottomNavigation>  

    </Paper>
    )
}