import React, { useCallback, useEffect, useState } from "react";
import CryptoParam from "./CryptoParam";
import "./IntervalExample.css";

const IntervalExample: React.FC = () => {
  const url = "https://api.pancakeswap.info/api/v2/pairs";
  const [tokensToCompare, setTokensToCompare] = useState<any>([]);
  const [newlyAddedTokens, setNewlyAddedTokens] = useState<any>([]);
  const [updatedAt, setUpdatedAt] = useState<any>("");
  const [initial, setInitial] = useState<boolean | undefined>(undefined);
  const fetchAndSetTokens = async () => {
    try {
      const response = await fetch(url);
      const rawData = await response.json();
      const dataPrepared = Object.entries(rawData.data);
      setUpdatedAt(rawData.updated_at);
      console.log("rendering");
      setTokensToCompare((prevState: any) => {
        let updatedState;
        if (prevState.length === 0) {
          updatedState = [];
          updatedState.push(dataPrepared);
          console.log("0");
          return updatedState;
        }
        if (prevState.length === 1) {
          updatedState = [...prevState];
          updatedState.push(dataPrepared);
          console.log("1");
          return updatedState;
        }
        if (prevState.length === 2) {
          setInitial(true);
          updatedState = [...prevState];
          updatedState.push(dataPrepared);
          updatedState.shift();
          console.log("2");
          return updatedState;
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const findAndSetNewlyListedTokens = useCallback(
    (arrayOne: Array<any>, arrayTwo: Array<any>) => {
      const arrayAddressOne = arrayOne.map((el) => el[0]);
      const arrayAddressTwo = arrayOne.map((el) => el[0]);
      let difference = arrayAddressTwo.filter(
        (el: any) => !arrayAddressOne.includes(el)
      );
      if (difference.length === 0) {
        console.log("no new token has been added");
      } else {
        setNewlyAddedTokens((prevState: any) => {
          let updatedState;
          if (prevState.length === 0) {
            updatedState = [];
            return updatedState.push(difference);
          }
          updatedState = [...prevState, difference];
          return updatedState;
        });
      }
    },
    []
  );

  useEffect(() => {
    const interval = setInterval(() => {
      fetchAndSetTokens();
    }, 5000);
    return () => clearInterval(interval);
  });

  useEffect(() => {
    if (initial) {
      findAndSetNewlyListedTokens(tokensToCompare[0], tokensToCompare[1]);
    }
  }, [updatedAt, initial, tokensToCompare, findAndSetNewlyListedTokens]);

  const updateLocal = new Date(updatedAt).toLocaleTimeString("en-US");

  return (
    <>
      <div>
        {newlyAddedTokens.length > 0 ? (
          newlyAddedTokens.map((el: any, i: number) => (
            <p key={i} style={{ fontSize: "25px" }}>
              {el}
            </p>
          ))
        ) : (
          <p style={{ fontSize: "25px" }}>There are no new tokens added</p>
        )}
      </div>
      <div className="main-container">
        {initial && (
          <>
            <CryptoParam tokens={tokensToCompare} param="pair_address" />
            <CryptoParam tokens={tokensToCompare} param="base_name" />
            <CryptoParam tokens={tokensToCompare} param="base_symbol" />
            <CryptoParam tokens={tokensToCompare} param="base_address" />
            <CryptoParam tokens={tokensToCompare} param="price" />
            <CryptoParam tokens={tokensToCompare} param="base_volume" />
          </>
        )}
      </div>
    </>
  );
};

export default IntervalExample;
