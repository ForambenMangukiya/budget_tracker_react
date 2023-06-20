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
import "./styles/addexpense.css";
import { Menu } from '@mui/material';

export default function AddExpense() {
  const [category, setCategory] = React.useState('');
  const [recurrence, setRecurrence] = React.useState('');
  const [date, setDate] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState();

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

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
        <InputLabel id="date-label">Date</InputLabel>
        <Select required labelId="date-label" id="date" value={date} label="Date" onChange={e=>setDate(e.target.value)}>
          <MenuItem value={"transport"}>Single Expense</MenuItem>
          <MenuItem value={"food"}>Recurrent Expense</MenuItem>
         </Select>
        </FormControl>

        {/*Description Page */}
        <FormControl fullWidth>
        <TextField id="outlined-basic" label="Description" variant="outlined"  value={description}  onChange={e=>setDescription(e.target.value)}/>
        {/* <InputLabel id="description-label">Description</InputLabel>
        <Select labelId="description-label" id="description" value={description} label="Description" onChange={e=>setDescription(e.target.value)}>
          <MenuItem value={"transport"}>Single Expense</MenuItem>
          <MenuItem value={"food"}>Recurrent Expense</MenuItem>
         </Select>
         */}
        </FormControl> 
        
        {/*Amount Page */}
        {/* <FormControl fullWidth>
        <InputLabel id="amount-label">Amount</InputLabel>
        <TextField 
            labelId="amount-label"
          id="outlined-number"
          
          type="number"
          value={amount}
          onChange={e=>setAmount(e.target.value)}
         
        />
         <InputLabel id="amount-label">Amount</InputLabel>
        <Select labelId="amount-label" id="amount" value={amount} label="Amount" onChange={e=>setAmount(e.target.value)}>
          <MenuItem value={"transport"}>Single Expense</MenuItem>
          <MenuItem value={"food"}>Recurrent Expense</MenuItem>
         </Select> 
        </FormControl> */}

        <FormControl fullWidth>
          <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
            label="Amount"
          />
        </FormControl>
     
        <Button variant="outlined" onClick={()=>setAmount()}>Button</Button>
     
    </Box>

    </Container>
    
    </>
    
  );
}
