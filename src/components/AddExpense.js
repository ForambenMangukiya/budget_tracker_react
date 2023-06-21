import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import "./styles/addexpense.css";
import { Menu } from '@mui/material';

export default function AddExpense() {
  const [category, setCategory] = React.useState('');
  const [recurrence, setRecurrence] = React.useState('');
  const [date, setDate] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [amount, setAmount] = React.useState('');

  // const handleChange = (event) => {
  //   setAge(event.target.value);
  // };

  return (
    <>
    <Container maxWidth="sm">
    <Box sx={{ minWidth: 120,p:2 }}>
      <FormControl fullWidth>
        {/*Category Page */}
        <label id="category-label">Category</label>
        <Select
          labelId="category-label"
          id="category"
          value={category}
          onChange={e=>setCategory(e.target.value)}
        >
          <MenuItem value={"transport"}>Transport</MenuItem>
          <MenuItem value={"food"}>Food</MenuItem>
          <MenuItem value={"office"}>Office</MenuItem>
        </Select>
        </FormControl>
        <FormControl fullWidth>
          {/*Recurrence Page */}
        <InputLabel id="recurrence-label">Recurrence</InputLabel>
        <Select
          labelId="recurrence-label"
          id="recurrence"
          value={recurrence}
          label="Recurrence"
          onChange={e=>setRecurrence(e.target.value)}
        >
          <MenuItem value={"transport"}>Single Expense</MenuItem>
          <MenuItem value={"food"}>Recurrent Expense</MenuItem>
        </Select>

        </FormControl>
        
        {/*Date Page */}
        <label id="date-label">Date</label>
        <Select
          labelId="date-label"
          id="date"
          value={date}
          label="Date"
          onChange={e=>setDate(e.target.value)}
        >
          <MenuItem value={"transport"}>Transport</MenuItem>
          <MenuItem value={"food"}>Food</MenuItem>
          <MenuItem value={"office"}>Office</MenuItem>
        </Select>
        {/*Description Page */}
        <label id="description-select-label">Description</label>
        <Select
          labelId="description-select-label"
          id="description"
          value={description}
          label="Description"
          onChange={e=>setDescription(e.target.value)}
        >
          <MenuItem value={"transport"}>Transport</MenuItem>
          <MenuItem value={"food"}>Food</MenuItem>
          <MenuItem value={"office"}>Office</MenuItem>
        </Select>
        
        {/*Amount Page */}
        <label id="amount-label">Amount</label>
        <Select
          labelId="amount-label"
          id="amount"
          value={amount}
          defaultValue={amount}
          onChange={e=>setAmount(e.target.value)}
        >
          
          <MenuItem value={"transport"}>Transport</MenuItem>
          <MenuItem value={"food"}>Food</MenuItem>
          <MenuItem value={"office"}>Office</MenuItem>
        </Select>
        
        <Button variant="outlined">Button</Button>
     
    </Box>

    </Container>
    
    </>
    
  );
}
