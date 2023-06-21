import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "./styles/addexpense.css";
import { Menu } from '@mui/material';
import { CoPresent } from '@mui/icons-material';

export default function AddExpense() {
  const [category, setCategory] = React.useState('');
  const [recurrence, setRecurrence] = React.useState('');
  const [date, setDate] = React.useState();
  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState();
  const [error,setError] = React.useState(null)
  const [isLoading,setIsLoading] = React.useState(null)

  const handleSubmit = async () => {
    console.log("category:",category)
    console.log("recurrence:",recurrence)
    console.log("date:",date)
    console.log("description:",description)
    console.log("amount:",amount)
    try {
        setIsLoading(true)
        setError(false)
        const res = await fetch("http://localhost:8080/transaction/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: {
                category,
                recurrence,
                date,
                description,
                amount
            }
        })
    } catch (error) {
        setIsLoading(false)
        setError(error)
    }
  }

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  //email: '3@4.de', password: 'Pw12345!'

  //TO DOs
  //Error Modal oder Error Nachricht einblenden
  //Loading Spinnger hinzufügen
  //Amount -> Type Number
  //Logic Fetch Post
  //text-align category/recurrence LEFT! 

  return (
    <>
    <Container maxWidth="sm">
    <Box sx={{ minWidth: 120,p:2 }} className="addexp_box">
    {/*Category Page */}
        <FormControl fullWidth>
            <InputLabel id="category-label">Category</InputLabel>
            <Select required labelId="category-label" id="category" value={category} label="Category" onChange={e=>setCategory(e.target.value)}>
                <MenuItem value={"transport"}>Transport</MenuItem>
                <MenuItem value={"food"}>Food</MenuItem>
                <MenuItem value={"bills"}>Bills</MenuItem>
                <MenuItem value={"energy"}>Energy</MenuItem>
                <MenuItem value={"groceries"}>Groceries</MenuItem>
            </Select>
        </FormControl>
     {/*Recurrence Page */}
        <FormControl fullWidth>
            <InputLabel id="recurrence-label">Recurrence</InputLabel>
            <Select required labelId="recurrence-label" id="recurrence" value={recurrence} label="Recurrence" onChange={e=>setRecurrence(e.target.value)}>
                <MenuItem value={"single"}>Single Expense</MenuItem>
                <MenuItem value={"recurrent"}>Recurrent Expense</MenuItem>
            </Select>
        </FormControl>
        
        {/*Date Page */}
        <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                
            <DatePicker label="Date" inputFormat="DD/MM/YYYY" onChange={selectedDate=>setDate(selectedDate)}/* sx={{'& input': {color: 'black'}}} */ />
            </LocalizationProvider>
            {/* <InputLabel id="date-label">Date</InputLabel>
            <Select required labelId="date-label" id="date" value={date} label="Date" onChange={e=>setDate(e.target.value)}>
            <MenuItem value={"transport"}>Single Expense</MenuItem>
            <MenuItem value={"food"}>Recurrent Expense</MenuItem>
            </Select> */}
        </FormControl>

        {/*Description Page */}
        <FormControl fullWidth>
            <TextField id="outlined-basic" label="Description" variant="outlined"  value={description}  onChange={e=>setDescription(e.target.value)}/>
        </FormControl> 
        
        {/*Amount Page */}
        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
            onChange={e=>setAmount(e.target.value)}
            value={amount}
          />
        </FormControl>
     
        <Button variant="outlined" onClick={()=>handleSubmit()}>Add Expense</Button>
     
    </Box>

    </Container>
    
    </>
    
  );
}
