import React, { useEffect, useState } from 'react';
import { string } from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import axios from '../axios';
import { toast } from 'react-toastify';

const propTypes = {
  title: string.isRequired,
  subtitle1: string.isRequired,
  subtitle2: string.isRequired,
};

const OrderBook = ({ title, subtitle1, subtitle2 }) => {
  const [availableData, setStateAvailableData] = useState({});

  const getBooks = async () => {
    try {
      const { data } = await axios.get('/book');
      console.log(data);
      setStateAvailableData(data);
    } catch {
      toast.error('An error occured while fetching books data');
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  // const rednerBuys = () => {};
  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Paper square>
          <Typography>{(title = "Buys")}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper square>
          <Typography>{(subtitle1 = "Quantity")}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Paper square>
          <Typography>{(subtitle2 = "Price")}</Typography>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
          <Paper>
            <Typography></Typography>
          </Paper>
      </Grid>
      <Grid item xs={12} sm={6}>
          <Paper>xs=6 sm=3</Paper>
      </Grid>
    </Grid>
  );
};

OrderBook.propTypes = propTypes;

export default OrderBook;
