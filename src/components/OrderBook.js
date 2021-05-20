import React, { useEffect, useState } from "react";
import { bool, func } from "prop-types";
import { merge } from "lodash";

import { Table } from "semantic-ui-react";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "../axios";

const propTypes = {
  refetch: bool.isRequired,
  onRefetch: func.isRequired,
};

const OrderBook = ({ refetch, onRefetch }) => {
  const [data, setData] = useState([]);

  const getBooks = async () => {
    try {
      const { data } = await axios.get("/book");
      const { buys, sells } = data;

      let formattedBuys = [];
      Object.keys(buys).map((key) =>
        formattedBuys.push({ priceBuy: key, quantityBuy: buys[key] })
      );
      formattedBuys.sort((a, b) => b.priceBuy - a.priceBuy);
      formattedBuys = formattedBuys.filter((i) => i.quantityBuy !== 0);

      let formattedSells = [];
      Object.keys(sells).map((key) =>
        formattedSells.push({ priceSell: key, quantitySell: sells[key] })
      );
      formattedSells.sort((a, b) => a.priceSell - b.priceSell);
      formattedSells = formattedSells.filter((i) => i.quantitySell !== 0);
      const mergedValues = merge(formattedBuys, formattedSells);

      setData(mergedValues);
    } catch {
      toast.error("An error occured while fetching books data", {
        position: "bottom-left",
      });
    }
    onRefetch();
  };

  useEffect(() => {
    getBooks();
  }, []);

  useEffect(() => {
    if (refetch) {
      getBooks();
    }
  }, [refetch]);

  return (
    <>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell colSpan="2" textAlign="center">
              Buys
            </Table.HeaderCell>
            <Table.HeaderCell colSpan="2" textAlign="center">
              Sells
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell textAlign="left">Quantity</Table.Cell>
            <Table.Cell textAlign="left">Price</Table.Cell>
            <Table.Cell textAlign="left">Price</Table.Cell>
            <Table.Cell textAlign="left">Quantity</Table.Cell>
          </Table.Row>
          {data &&
            data.map((item) => {
              return (
                <Table.Row key={item.priceBuy || item.priceSell}>
                  <Table.Cell textAlign="right">
                    {item.quantityBuy}
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {item.priceBuy}
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {item.priceSell}
                  </Table.Cell>
                  <Table.Cell textAlign="right">
                    {item.quantitySell}
                  </Table.Cell>
                </Table.Row>
              );
            })}
        </Table.Body>
      </Table>
      <ToastContainer />
    </>
  );
};

OrderBook.propTypes = propTypes;

export default OrderBook;
