import { Container } from "@mui/material"
import Camera from "./Camera"
import Upload from "./Upload"
import { useState } from "react";

export default function Scan() {
    const [flag, setFlag] = useState(false)
    return (
        <Container
        maxWidth="sm"
        sx={{
          paddingTop: "100px",
        }}
        >
            <h1>Scan Receipts</h1>
            <Upload flag={flag} setFlag={setFlag} />
            <Camera />

        </Container>
    )
}