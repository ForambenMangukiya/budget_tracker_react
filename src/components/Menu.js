import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
        <BottomNavigation value={value} onChange={handleChange}>
        <BottomNavigationAction
        label="Home"
        value="home"
        icon={<RestoreIcon />}
        />
        <BottomNavigationAction
        label="Planner"
        value="planner"
        icon={<FavoriteIcon />}
        />
        <BottomNavigationAction
        label="Transactions"
        value="transactions"
        icon={<LocationOnIcon />}
        />

        <BottomNavigationAction
        label="Graph"
        value="graph"
        icon={<LocationOnIcon />}
        />

        <BottomNavigationAction 
        label="Games" 
        value="games" 
        icon={<FolderIcon />} />
        </BottomNavigation>     
    )
}