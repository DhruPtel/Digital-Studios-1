import { useQuery } from "@apollo/client";
import { Contract } from "@ethersproject/contracts";
import { shortenAddress, useCall, useEthers, useLookupAddress } from "@usedapp/core";
import React, { useEffect, useState } from "react";

import { Body, Button, Container, Header, Image, Link } from "./components";
import logo from "./DigitalStudio1.png";
import exp1 from "./Experience#1.png";
import exp2 from "./Experience#2.png";
import exp3 from "./Experience#3.png";
import scene from "./forestNeon7.png";
import lake from "./lake.png";
import enlight from "./logo.png";
import videoBg from "./Haza.mp4";
import { Divider } from "antd";
import { Card } from "react-bootstrap";
import "./App.css";

import { addresses, abis } from "@my-app/contracts";
import GET_TRANSFERS from "./graphql/subgraph";

function App() {
  // Read more about useDapp on https://usedapp.io/
  const [rendered, setRendered] = useState("");
  const [test, setTest] = useState(false);
  const [showVideo, setVideo] = useState(false);

  const ens = useLookupAddress();
  const { account, activateBrowserWallet, deactivate, error } = useEthers();

  useEffect(() => {
    if (ens) {
      setRendered(ens);
    } else if (account) {
      setRendered(shortenAddress(account));
      setTest(true);
      setVideo(true);
      setInterval(() => {
        setVideo(false);
      }, 4000);
    } else {
      setRendered("");
    }
  }, [account, ens, setRendered]);

  useEffect(() => {
    if (error) {
      console.error("Error while connecting wallet:", error.message);
    }
  }, [error]);

  console.log(test);

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

  if(!test) {
    return (
      <div className="App">
        <Header>
          <Button
            onClick={() => {
              if (!account) {
                activateBrowserWallet();
                console.log(rendered);
              } else {
                deactivate();
                console.log(rendered);
              }
            }}
          >
            {rendered === "" && "Connect Wallet"}
            {rendered !== "" && rendered}
          </Button>
        </Header>
        <Body>
          <Image src={logo} alt="ethereum-logo" />
          <Divider />
        </Body>
        <Container className="bobert">
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
  } else {
    return (
      <div className="App">
        <Body>
          {showVideo && <video src={videoBg} autoPlay loop muted />}
          <img src={scene} className="forest" />
        </Body>
        <img src={enlight} alt="logo" className="logo" />
        <div className="buttonHolder">
          <Button
            onClick={() => {
              if (!account) {
                activateBrowserWallet();
                console.log(rendered);
              } else {
                deactivate();
                console.log(rendered);
              }
            }}
          >
            {rendered === "" && "Connect Wallet"}
            {rendered !== "" && rendered}
          </Button>
        </div>
        <Container style={{
          backgroundImage: `url(${lake})`,
          backgroundSize: 'cover'
        }}>
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
}

export default App;
