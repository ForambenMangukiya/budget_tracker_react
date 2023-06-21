// export default function Transactions() {
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError(null);

//     const response = await fetch("http://localhost:8080/transaction", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         category_name,
//         tran_description,
//         tran_amount,
//         tran_sign,
//         tran_curency,
//         tran_date,
//       }),
//     });
//     const data = await response.json();
//   };
//   return <div>I'm in the Transactions</div>;
// }
