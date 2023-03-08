import { useState } from "react";
import Converter from "./components/Converter";
import WalletDetailsModel from "./components/WalletDetailsModel";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const App = () => {
  const [showModel, setShowModel] = useState<boolean>(false);
  return (
    <>
      <div className="container">
        <div className="logo-section">
          <img src="./logo.png" alt="neptune-mutual-logo" />
        </div>
        <div className="currency-convert-section">
          <Converter showModel={showModel} setShowModel={setShowModel} />
        </div>
        {showModel && <WalletDetailsModel setShowModel={setShowModel} />}
        <ToastContainer autoClose={1000} />
      </div>
    </>
  );
};

export default App;
