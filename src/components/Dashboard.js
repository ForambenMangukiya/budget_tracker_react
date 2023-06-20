import { useJwt } from "react-jwt";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Dashboard() {
  const { token } = useContext(AuthContext);
  const { decodedToken } = useJwt(token);
  
  console.log("decodedToken", decodedToken )
  //TODO : there is no decodedToken.name. 
  // Need to fetch from user by user object id to get the name

  return (
    <div>
      I'm in the Dashboard
      <img src="../../public/img/bills"></img>
      {token !== null && (
          <div>
            {/* <span style={{ padding: "10px" }}>Hello, {decodedToken?.name}</span> */}
            <span style={{ padding: "10px" }}>Hello, {decodedToken?._id}</span>
          </div>
        )}
    </div>
  );
}
