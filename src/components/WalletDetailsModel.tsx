import { FC, useState, useEffect } from "react";
import { ethers } from "ethers";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
type props = {
  setShowModel: Function;
};
const WalletDetailsModel: FC<props> = ({ setShowModel }) => {
  const [defaultAccount, setDefaultAccount] = useState<string>("");
  const [userBalance, setUserBalance] = useState<string>("");
  const [chainId, setChainId] = useState<string>("");
  const [iswalletConnected, setIsWalletConnected] = useState<boolean>(false);
  useEffect(() => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      if (window.ethereum && window.ethereum.selectedAddress) {
        setIsWalletConnected(true);
      }
    }
  }, []);
  useEffect(() => {
    if (iswalletConnected) {
      connectWalletHandler();
    }
  }, [iswalletConnected]);

  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      if (window.ethereum && window.ethereum.selectedAddress) {
        setIsWalletConnected(true);
      }
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then(accountChangedHandler)

        .catch((error: any) => {
          toast.error(
            "Previous request still pending. Please connect wallet from the extension"
          );
        });
    } else {
      toast.error("Please install MetaMask browser extension to interact");
    }
  };
  const getAccountBalance = (accountAddress: string) => {
    window.ethereum
      .request({ method: "eth_getBalance", params: [accountAddress, "latest"] })
      .then((balance: Array<string>) => {
        setUserBalance(ethers.formatEther(balance[0]));
      })
      .catch((error: any) => {
        toast.error(error.message);
      });
  };
  const accountChangedHandler = (accountAddress: Array<string>) => {
    if (accountAddress.length) {
      setIsWalletConnected(true);
      getChainId();
      window.ethereum.selectedAddress = accountAddress[0];
      setDefaultAccount(accountAddress[0]);
      getAccountBalance(accountAddress[0].toString());
    } else {
      setIsWalletConnected(false);
      setDefaultAccount("");
      setUserBalance("");
      setShowModel(false);
    }
  };
  const getChainId = async () => {
    await window.ethereum
      .request({ method: "eth_chainId" })
      .then((result: string) => {
        setChainId(result);
      })
      .catch((err: any) => {
        toast.error(err.message);
      });
  };
  if (window.ethereum) {
    window.ethereum.on("accountsChanged", accountChangedHandler);
  }

  const disconnectHandler = () => {
    setIsWalletConnected(false);
    setShowModel(false);
    window.ethereum.selectedAddress = null;
    toast.success("Wallet Disconnected Successfully");
  };
  return (
    <>
      <div className="model-container">
        <div className="model">
          <h3>Wallet Details</h3>
          <div className="close-btn">
            <AiOutlineClose onClick={() => setShowModel(false)} />
          </div>
          {!iswalletConnected ? (
            <>
              <div className="warn-msg">
                Wallet not Connected. Please click the "Connect" button below.
              </div>
              <div className="btn-section">
                <button
                  className="btn-action btn-primary"
                  onClick={() => connectWalletHandler()}
                >
                  Connect
                </button>
                <button
                  onClick={() => setShowModel(false)}
                  className="btn-action btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </>
          ) : (
            <div className="wallet-details">
              <table>
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Account</td>
                    <td>
                      {defaultAccount.slice(0, 4)}....{defaultAccount.slice(-4)}
                    </td>
                  </tr>
                  <tr>
                    <td>Chain ID</td>
                    <td>{chainId}</td>
                  </tr>
                  <tr>
                    <td>Balance</td>
                    <td>{userBalance}</td>
                  </tr>
                </tbody>
              </table>
              <button
                onClick={disconnectHandler}
                className="btn-action btn-secondary w-100"
              >
                Disconnect
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default WalletDetailsModel;
