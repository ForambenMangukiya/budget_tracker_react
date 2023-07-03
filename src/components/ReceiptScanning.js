import React from "react";
import axios from "axios";

const ReceiptScanning = () => {
  const mindeeSubmit = (evt) => {
    evt.preventDefault();
    let myFileInput = document.getElementById("my-file-input");
    let myFile = myFileInput.files[0];
    if (!myFile) {
      return;
    }

    let data = new FormData();
    data.append("document", myFile, myFile.name);

    axios
      .post(
        "https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict",
        data,
        {
          headers: {
            Authorization: "Token my-api-key-here",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <form onSubmit={mindeeSubmit}>
        <input type="file" id="my-file-input" name="file" />
        <input type="submit" />
      </form>
    </div>
  );
};

export default ReceiptScanning;