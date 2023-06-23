import React, { useEffect, useContext } from 'react';
import { AuthContext } from "../context/AuthContext";
import Link from './Link';

export default function Client() {
const { linkToken, setLinkToken } = useContext(AuthContext);

useEffect(() => {
const generateLinkToken = async () => {
const response = await fetch("http://localhost:8080/api/create_link_token", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    });

const data = await response.json();
console.log("data:", data);
setLinkToken(data.link_token);
};

generateLinkToken();
}, []); // Empty dependency array to execute only once on component mount

return (
    <div>
    {linkToken !== null && <Link />}
    </div>
);
}