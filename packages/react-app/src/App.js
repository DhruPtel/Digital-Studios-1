import { useQuery } from "@apollo/client";
import { Contract } from "@ethersproject/contracts";
import { shortenAddress, useCall, useEthers, useLookupAddress } from "@usedapp/core";
import React, { useEffect, useState } from "react";

import { Body, Button, Container, Header, Image, Link } from "./components";
import logo from "./DigitalStudio1.png";
import exp1 from "./Experience#1.png";
import exp2 from "./Experience#2.png";
import exp3 from "./Experience#3.png";
import { Divider } from "antd";
import { Card } from "react-bootstrap";
import "./App.css";

import { addresses, abis } from "@my-app/contracts";
import GET_TRANSFERS from "./graphql/subgraph";

function WalletButton() {
  const [rendered, setRendered] = useState("");

  const ens = useLookupAddress();
  const { account, activateBrowserWallet, deactivate, error } = useEthers();

  useEffect(() => {
    if (ens) {
      setRendered(ens);
    } else if (account) {
      setRendered(shortenAddress(account));
    } else {
      setRendered("");
    }
  }, [account, ens, setRendered]);

  useEffect(() => {
    if (error) {
      console.error("Error while connecting wallet:", error.message);
    }
  }, [error]);

  return (
    <Button
      onClick={() => {
        if (!account) {
          activateBrowserWallet();
        } else {
          deactivate();
        }
      }}
    >
      {rendered === "" && "Connect Wallet"}
      {rendered !== "" && rendered}
    </Button>
  );
}

function App() {
  // Read more about useDapp on https://usedapp.io/
  const { error: contractCallError, value: tokenBalance } =
    useCall({
       contract: new Contract(addresses.ceaErc20, abis.erc20),
       method: "balanceOf",
       args: ["0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C"],
    }) ?? {};

  const { loading, error: subgraphQueryError, data } = useQuery(GET_TRANSFERS);

  useEffect(() => {
    if (subgraphQueryError) {
      console.error("Error while querying subgraph:", subgraphQueryError.message);
      return;
    }
    if (!loading && data && data.transfers) {
      console.log({ transfers: data.transfers });
    }
  }, [loading, subgraphQueryError, data]);

  return (
    <div className="App">
      <Header>
        <WalletButton />
      </Header>
      <Body>
        <Image src={logo} alt="ethereum-logo" />
        <Divider />
      </Body>
      <Container>
        <Link href="https://www.dior.com/en_us/fashion">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={exp1} />
            <Card.Body>
              <Card.Title>???????</Card.Title>
              <Card.Text>
                ???? ????? ??????? ???? ?? ????? ?? ??? ???? ????? ??? ???? ?? ??? ???? ??
                ??? ????'? ???????.
              </Card.Text>
              <Button variant="primary">???</Button>
            </Card.Body>
          </Card>
        </Link>
        <Link href="https://www.streetfighter.com/en/">
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={exp2} />
            <Card.Body>
              <Card.Title>?????????</Card.Title>
              <Card.Text>
                ??????????? ???? ??? ??????? ??? ??? ?????????? ?? ??????????? ?? ??????.
              </Card.Text>
              <Button variant="primary">???</Button>
            </Card.Body>
          </Card>
        </Link>
        <Link href="https://www.oxfordlearnersdictionaries.com/us/definition/american_english/empathy#:~:text=noun-,noun,empathy%20(between%20A%20and%20B)" >
          <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src={exp3} />
            <Card.Body>
              <Card.Title>???????</Card.Title>
              <Card.Text>
                ???? ????? ??? ???? ?? ??? ?? ????? ???? ????? ??? ???? ?? ??? ???? ??'?
                ???? ????; ???, ???, ???.
              </Card.Text>
              <Button href="https://www.dior.com/en_us" variant="primary">???</Button>
            </Card.Body>
          </Card>
        </Link>
      </Container>
    </div>
  );
}

export default App;
