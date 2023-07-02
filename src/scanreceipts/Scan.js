import { Container } from "@mui/material"
import Camera from "./Camera"

export default function Scan() {
    return (
        <Container
        maxWidth="sm"
        sx={{
          paddingTop: "100px",
        }}
        >
            <h1>Scan Receipts</h1>
            <Camera />

        </Container>
    )
}