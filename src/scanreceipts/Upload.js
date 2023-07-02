import { useState } from "react";
import { Modal, Button, TextField, Container, Typography, Box, Input } from "@mui/material";
import { styled } from "@mui/system";
import axios from "axios";
import { Label } from "recharts";
import Mindee from "./Mindee"


// const CustomFileInput = styled("input")({
//   display: "none",
// });
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
console.log("outside the function")

export default function Upload({ flag, setFlag }) {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false)
  const [url, setUrl] = useState("")

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  console.log("starting UPLOAD")

  const onSubmit = async (e) => {
    console.log("submit button clicked")
    e.preventDefault();
    try {
      const formData = new FormData();

      formData.append("picture", image, image.name);
      formData.append("desc", description);
      console.log("posting image", formData )
      const res = await axios.post("http://localhost:8080/api/upload", formData);
      console.log("postin DONE!!!!!", res )
      const image = await res.data.url
      setUrl(image)
      setError(false);
      handleClose();
      setFlag(!flag);
      setOnSuccess(true)
    } catch (error) {
      setError(true);
      setOnSuccess(false)
    }
  };

  const fileData = () => {
    if (image)
      return (
        <h5>
          <em>{image.name}</em>
        </h5>
      );
    return null;
  };

  return (
    <Container>

        <Button variant="contained" color="primary"
        onClick={handleShow}>Upload Receipts</Button>
        <Modal
            open={show}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
            Format (.jpg, .jpeg, .png)
            </Typography>

          <form onSubmit={onSubmit}>
            <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                fullWidth
                sx={{ mb: 2 }}
            />
                <Input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                id="image"
                sx={{ display: "none" }}
                inputProps={{ "aria-label": "Upload Image" }}
                />

                <label className="custom-file-label" htmlFor="image">
                {image ? fileData() : "Choose File"}
                </label>        

                <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Submit
                </Button>

            {error ? (
            <div className="text-danger">
                {" "}
                An error occurred uploading the file{" "}
            </div>
            ) : null}
    
          </form>
       

        <Button variant="secondary" onClick={handleClose}>
            Close
        </Button>
        </Box>

      </Modal>  

      {onSuccess && <Mindee />}
      
    </Container>
  );
}
