import React from "react";
import Login from "./components/Login";
import Connected from "./components/Connected";
import Finished from "./components/Finished";
import { useEffect, useState } from "react";
import { contract__Address, contract__Abi } from "./constants/constant";
import { ethers } from "ethers";

const App = () => {
  const [provider, setProider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [candidates, setCandidates] = useState([]);
  const [remainingTime, setRemainingTime] = useState([]);
  const [ContractInstances, setContractInstances] = useState(null);
  const [status, setStatus] = useState(false);
  const [Number, setNumber] = useState();
  const [voteStatus, setVoteStatus] = useState(false);
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    const initializeContract = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const ContractInstances = new ethers.Contract(
        contract__Address,
        contract__Abi,
        signer
      );
      setContractInstances(ContractInstances);
      await getCandidateDetails(ContractInstances);
      await getRemainingTime(ContractInstances);
      await getStatus(ContractInstances);
      if (account) {
        canVote(ContractInstances);
      }
      setIsDataLoaded(true);
    };

    initializeContract();

    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChange);
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChange);
      }
    };
  }, [account]);

  async function getCandidateDetails(ContractInstances) {
    if (ContractInstances) {
      const candidateLists = await ContractInstances.getAllVotesOfCandiates();
      const formatCandidates = candidateLists.map((candidate, index) => {
        return {
          index: index,
          name: candidate.name,
          voteCount: candidate.voteCount.toNumber(),
        };
      });
      setCandidates(formatCandidates);
    }
  }

  async function getRemainingTime(ContractInstances) {
    if (ContractInstances) {
      const time = await ContractInstances.getRemainingTime();
      setRemainingTime(parseInt(time, 16));
    }
  }

  async function getStatus(ContractInstances) {
    if (ContractInstances) {
      const status = await ContractInstances.getVotingStatus();
      setStatus(status);
    }
  }

  function handleAccountsChange(accounts) {
    console.log(accounts);
    setIsConnected(false);
    setAccount(null);
    canVote(ContractInstances);
  }

  async function connectToMetamask() {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const SignerAddress = await signer.getAddress();

        setProider(provider);
        setSigner(signer);
        setIsConnected(true);
        setAccount(SignerAddress);

        canVote(ContractInstances);
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("Error :: Metamask is not connected");
    }
  }

  function handleNumberChange(e) {
    setNumber(e.target.value);
  }

  async function voteFunction() {
    console.log(Number);
    const vote = await ContractInstances.vote(Number);
    await vote.wait();
    canVote(ContractInstances);
  }

  async function canVote(ContractInstances) {
    if (ContractInstances && account) {
      const voteStat = await ContractInstances.voters(account);
      console.log(voteStatus)
      setVoteStatus(voteStat);
      // console.log("vote status set")
      // console.log(voteStatus)
    }
  }

  return (
    <div className="">
      {isDataLoaded ? (
        status ? (
          <>
            {isConnected ? (
              <Connected
                address={account}
                candidatesList={candidates}
                remainingTime={remainingTime}
                voteStatus={voteStatus}
                number={Number}
                handleNumberChange={handleNumberChange}
                voteFunction={voteFunction}
              />
            ) : (
              <Login connectWallet={connectToMetamask} />
            )}
          </>
        ) : (
          <Finished candidatesList={candidates} />
        )
      ) : (
        <div className="m-auto">Loading...</div>
      )}
    </div>
  );
};

export default App;