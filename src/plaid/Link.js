import { useContext, useCallback, useState} from "react";
import { usePlaidLink } from "react-plaid-link";
import Button from '@mui/material/Button';
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

import { AuthContext } from "../context/AuthContext";

export default function Link() {
const { linkToken, linkSuccess, setLinkSuccess } = useContext(AuthContext);
const [isLoading, setIsLoading] = useState(false);
const [ transactions, setTransactions] = useState([]);

console.log("START LINK....")

const handleGetTransaction = async () => {
    setIsLoading(true);
    const response = await fetch("http://localhost:8080/api/transactions", {
        method: "GET",
    });
    const data = await response.json();
    if (!response.ok) {
    setIsLoading(false);

    }
    if (response.ok) {
        setIsLoading(false);
        setTransactions(data)
    }
}

const onSuccess = useCallback(
    (public_token) => {
    // If the access_token is needed, send public_token to server
    const exchangePublicTokenForAccessToken = async () => {
    const response = await fetch("http://localhost:8080/api/set_access_token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "public_token": public_token,
        }),
    })
    if (!response.ok) {
        throw new Error("No access_token retrieved")
    };
    const data = await response.json();
    console.log("data:", data)
    setLinkSuccess(true)
    }
    exchangePublicTokenForAccessToken();
    handleGetTransaction()
}, [])

const config = {
    token: linkToken,
    onSuccess,
};

const { open, ready } = usePlaidLink(config);

console.log("Transactions here:", transactions);

return (
    <div>
    <Button variant="outlined" onClick={open} disabled={!ready}>Link Account</Button>
    {isLoading ? (
        <Box sx={{ display: "flex" }}>
            <CircularProgress />
        </Box>
    ) : (
    <div>
    {linkSuccess ? (
    <Button variant="outlined" onClick={handleGetTransaction}>Get Transactions</Button>
    ) : (
    <Button variant="outlined" disabled>Get Transactions</Button>
    )}
    </div>)
    }

    </div>
    
);
}