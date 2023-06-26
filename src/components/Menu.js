import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import Home from './svg/IconHome';
import Planner from './svg/IconPlanner';
import Transactions from './svg/IconTransactions';
import Graph from './svg/IconGraph';
import Games from './svg/IconGame'
import Container from '@mui/material/Container';

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
    <Box sx={{ maxWidth: "600px"  }}>
    {/* <Box> */}
        <BottomNavigation value={value} onChange={handleChange}>
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

        <BottomNavigationAction 
        // label="Games" 
        value="games" 
        icon={<Games />} />
        </BottomNavigation>  

    </Box>
    )
}