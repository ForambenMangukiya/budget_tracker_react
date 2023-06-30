import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Home from './svg/IconHome';
import Planner from './svg/IconPlanner';
import Transactions from './svg/IconTransactions';
import Graph from './svg/IconGraph';
import Games from './svg/IconGame'
import Paper from '@mui/material/Paper';
import zIndex from '@mui/material/styles/zIndex';


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

        if (newValue === 'graph') {
            navigate("/reports");
        }
    
    };


    return (

    <Paper sx={{ position: 'fixed', bottom: 0, left: 150, right: 150, zIndex: 5 }} elevation={5}>
    {/* <Paper elevation={5}> */}
        <BottomNavigation value={value} onChange={handleChange}
          sx={{
            '& .MuiBottomNavigationAction-root': {
              minWidth: 0, // Remove the minimum width
              padding: '5px', // Increase the padding
            },
            '& .MuiSvgIcon-root': {
              fontSize: '90px', // Increase the icon size
            },
          }}
        >
        <BottomNavigationAction
        // label="Home"
        value="home"
        icon={<Home />}
        />
        <BottomNavigationAction
        // label="Planner"
        value="planner"
        icon={<Planner />}
        />
        <BottomNavigationAction
        // label="Transactions"
        value="transactions"
        icon={<Transactions />}
        />

        <BottomNavigationAction
        // label="Graph"
        value="graph"
        icon={<Graph />}
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