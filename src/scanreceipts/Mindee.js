const auth = `Token ${process.env.REACT_APP_MINDEE_API_KEY}`
console.log("MINDEE API KEY:", auth)

// parseReceipt accepts a public url and returns parsed data in MINDEE format
async function parseReceipt(imageURL){
    let mindeeResponse = {}
    try {
        mindeeResponse = await fetch(
            "https://api.mindee.net/v1/products/mindee/expense_receipts/v5/predict",
            {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: auth
                },
                body: JSON.stringify({ 
                    document: imageURL
                }),
            }
        )
    } catch(e){
        console.log("ERROR: MINDEE responded with error", e)
        return 
    }
    
    console.log("INFO: MINDEE responded ok", mindeeResponse)
    const mindeeResponseBody = await mindeeResponse.json()
    console.log("INFO: MINDEE body is", mindeeResponseBody)

    return mindeeResponseBody
}

// testing
// parseReceipt("https://res.cloudinary.com/dg2u7fmoc/image/upload/v1688314566/ldivnf51ofanou5v8bqy.jpg")

export default {
    parseReceipt: parseReceipt
}
