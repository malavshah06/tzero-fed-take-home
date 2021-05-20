import React, { useState } from "react";
import { func } from "prop-types";

import { Grid, Input, Button } from "semantic-ui-react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../axios";

const propTypes = {
  onSubmit: func.isRequired,
};

const OrderEntry = ({ onSubmit }) => {
  const [formData, SetStateFormData] = useState({});
  const [btnDisable, setStateBtnDisable] = useState(false);

  const submitBuy = async () => {
    try {
      await axios.post("/buy", formData);
      onSubmit();
    } catch (err) {
      toast.error("An error occured while buying product", {
        position: "bottom-left",
      });
    } finally {
      setStateBtnDisable(false);
    }
  };

  const submitSell = async () => {
    try {
      await axios.post("/sell", formData);
      onSubmit();
    } catch (err) {
      toast.error("An error occured while selling product", {
        position: "bottom-left",
      });
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
    SetStateFormData({ ...formData, [inputName]: event.target.value });
  };

  return (
    <>
      <Grid textAlign="center" padded="vertically">
        <Grid.Row columns={4}>
          <Grid.Column>
            <Input
              name="price"
              label="Price"
              placeholder="Price"
              onChange={(e) => handleInputChange(e, "price")}
            />
          </Grid.Column>
          <Grid.Column>
            <Input
              name="quantity"
              label="Quantity"
              placeholder="Quantity"
              onChange={(e) => handleInputChange(e, "quantity")}
            />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row columns={6} textAlign="center">
          <Grid.Column>
            <Button
              primary="true"
              onClick={handleSubmitBuy}
              disabled={btnDisable}
            >
              Buy
            </Button>
          </Grid.Column>
          <Grid.Column>
            <Button
              secondary="true"
              onClick={handleSubmitSell}
              disabled={btnDisable}
            >
              Sell
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <ToastContainer />
    </>
  );
};

OrderEntry.propTypes = propTypes;

export default OrderEntry;
