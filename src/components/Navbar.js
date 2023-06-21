import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Fragment } from "react";
import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Login from '@mui/icons-material/Login'
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';


export default function Navbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = () => {
    localStorage.removeItem("token");
    logout();
    navigate("/");
  };

  const handleClickAvatar = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/signup");
  };


  return (
    <Container maxWidth="sm"  sx={{ backgroundColor: '#C80048', height: '100%', padding: '2px', display: 'flex', alignItems: 'flex-start', boxSizing: 'border-box' }}>
      <Fragment>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClickAvatar}
            size="small"
            sx={{ ml: 1 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <MenuIcon sx={{ width: 25, height: 25 }} />
  
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      > 
        <MenuItem onClick={handleClose}>
          <Box onClick={handleLogin}> 
          <ListItemIcon>
            <Login />.Login
          </ListItemIcon>
          </Box>
        </MenuItem>
        
        <Divider />
        <MenuItem onClick={handleClose}>

        <Box onClick={handleSignup} >
          <ListItemIcon>
              <PersonAdd fontSize="small" />.Signup
          </ListItemIcon>
        </Box>
        
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />.Settings
          </ListItemIcon> 
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <Box onClick={handleClick}>
            <ListItemIcon>
              <Logout fontSize="small" />.Logout   
            </ListItemIcon>
            
          </Box>
  
          
        </MenuItem>
      </Menu>
    </Fragment>
  
      {/* <div className="title">
        <Link to="/">PiggyBank</Link>
      </div> */}
      {/* <nav>
        {token !== null && (
          <div>
            <span style={{ padding: "10px" }}>Hello, {decodedToken?.name}</span>
            <button onClick={handleClick}>Log out</button>
          </div>
        )}
        {token === null && (
          <div>
            <Link to="login">Login</Link>
            <Link to="signup">Signup</Link>
          </div>
        )}
      </nav> */}
    </Container>
  );
}
