import React, { useState } from 'react';
import { toast } from 'react-toastify';

// import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
// import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import axios from '../axios';

const OrderEntry = () => {
  const [formData, SetStateFormData] = useState({});
  const [btnDisable, setStateBtnDisable] = useState(false);

  const submitBuy = async () => {
    try {
      await axios.post('/buy', formData);
    } catch(err) {
      toast.error('An error occured while buying product');
    } finally {
      setStateBtnDisable(false);
    }
  };

  const submitSell = async () => {
    try {
      await axios.post('/sell', formData);
    } catch(err) {
      toast.error('An error occured while selling product');
    } finally {
      setStateBtnDisable(false);
    }
  };

  const handleSubmitBuy = async () => {
    setStateBtnDisable(true);
    await submitBuy();
  };

  const handleSubmitSell = async () => {
    setStateBtnDisable(true);
    await submitSell();
  };

  const handleInputChange = (event, inputName) => {
    SetStateFormData({...formData, [inputName]:event.target.value});
  };

  console.log(formData);
  return (
    <Grid container sm={12} justify="center" style={{height:'100px', marginTop:'20px', marginBottom:'50px'}}>
      <Grid item sm={12} justify="space-evenly" alignItems="flex-start">
        <TextField id="price" label="Price" variant="outlined" onChange={e => handleInputChange(e,'price')}/>
        <TextField id="quantity" label="Quantity" variant="outlined" onChange={e => handleInputChange(e, 'quantity')}/>
      </Grid>
      <Grid item xs={12} justify="center" alignItems="flex-start" style={{marginTop:'20px'}}>
        <Button variant="contained" onClick={handleSubmitBuy} disabled={btnDisable}>Buy</Button>
        <Button variant="contained" onClick={handleSubmitSell} disabled={btnDisable}>Sell</Button>
      </Grid>
    </Grid>
  );
};

export default OrderEntry;