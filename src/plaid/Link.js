import { useContext, useCallback, useState} from "react";
import { usePlaidLink } from "react-plaid-link";
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { DataContext } from "../context/DataContext";

export default function Link({ id }) {
const { linkToken, linkSuccess, setLinkSuccess } = useContext(AuthContext);
const { refresh, setRefresh } = useContext(DataContext)
const [isLoading, setIsLoading] = useState(false);
const [transactions, setTransactions] = useState([]);
const [syncSuccess, setSyncSuccess] = useState(false)
const [syncCount, setSyncCount] = useState(1);
const navigate = useNavigate();

console.log("START LINK....", id)

const handleGetTransaction = async () => {
    setIsLoading(true);
    setSyncSuccess(false);
    const response = await fetch(`https://piggybank-api.onrender.com/api/transactions/${id}`, {
      // const response = await fetch(`http://localhost:8080/api/transactions/${id}`, {
        method: "GET",
    });
    const data = await response.json();
    
    if (!response.ok) {
      setIsLoading(false);
      setSyncSuccess(false);
      setSyncCount(syncCount + 1);    
    }

    if (response.ok) {
        setIsLoading(false);
        setTransactions(data)
        setSyncSuccess(true);
        setSyncCount(1); 
        setRefresh(!refresh);
    }
}

const onSuccess = useCallback(
    (public_token) => {
    // If the access_token is needed, send public_token to server
    const exchangePublicTokenForAccessToken = async () => {
        const response = await fetch("https://piggybank-api.onrender.com/api/set_access_token", {
        // const response = await fetch("http://localhost:8080/api/set_access_token", {  
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "public_token": public_token,
            }),
        })
        if (!response.ok) {
            return (
            <Alert severity="error">
                Linking to bank is not successful. Try again later.
            </Alert>
            );
        };
        const data = await response.json();
        console.log("data:", data)
        setLinkSuccess(true)
    }
    exchangePublicTokenForAccessToken();
}, [])

const config = {
    token: linkToken,
    onSuccess,
};

const { open, ready } = usePlaidLink(config);

console.log("Transactions here:", transactions);

const handleGoBack = () => {
  navigate("/transactions");
};

const handleClose = () => {
  navigate("/transactions");
};

return (
<Container maxWidth="sm"
   sx={{
    paddingTop: "100px",
    paddingBottom: "100px",
  }}
>
  {syncSuccess ? (
    <Alert
      action={
        <Button color="inherit" size="small" onClick={handleGoBack}>
          CLOSE
        </Button>
      }
    >
      Sync Transactions complete.
    </Alert>
  ) : (
    <div>
      {syncCount > 1 ? (
        <div>
            <Alert severity="warning"
            action={
              <Button color="inherit" size="small" onClick={handleGoBack}>
                CLOSE
              </Button>
            }>
              Cannot sync transactions — <strong>Try again Later!</strong>
            </Alert>
        </div>
      ) : (
        <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
          <Button
            variant="outlined"
            onClick={open}
            disabled={!ready}
            sx={{ color: "#453f78", borderColor: "#453f78" }}
          >
            Link Account
          </Button>

          <Box>
            <Button onClick={handleClose}> CLOSE </Button>
          </Box>
        </Box>
      )}

      {isLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
          <CircularProgress sx={{ color: "#b9b9b9" }} />
        </Box>
      ) : (
        <div>
          {linkSuccess ? (
            <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
              <Button
                variant="outlined"
                onClick={handleGetTransaction}
                sx={{ color: "#453f78", borderColor: "#453f78" }}
              >
                Sync Transactions
              </Button>
            </Box>
          ) : (
            <Box sx={{ display: "flex", justifyContent: "center", padding: "20px" }}>
              <Button
                variant="outlined"
                disabled
                sx={{ color: "#453f78", borderColor: "#453f78" }}
              >
                Sync Transactions
              </Button>
            </Box>
          )}
        </div>
      )}
    </div>
  )}
</Container>


    
);
}