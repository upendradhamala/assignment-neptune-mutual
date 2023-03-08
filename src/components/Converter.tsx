import React, { useState, FC, useEffect } from "react";
import { GrSync } from "react-icons/gr";

type converterProps = {
  showModel: boolean;
  setShowModel: Function;
};

const Converter: FC<converterProps> = ({ showModel, setShowModel }) => {
  const [nep, setNep] = useState<string>("");
  const [busd, setBusd] = useState<string>("");
  // conversion to NEP
  const handleChangeNep = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "" && parseFloat(e.target.value) >= 0) {
      setNep(e.target.value);
      let nepValue = (parseFloat(e.target.value) * 3).toFixed(2);
      setBusd(nepValue.toString());
    } else {
      setBusd("");
      setNep("");
    }
  };
  //   conversion to BUSD
  const handleChangeBusd = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "" && parseFloat(e.target.value) >= 0) {
      setBusd(e.target.value);
      let busdValue = (parseFloat(e.target.value) / 3).toFixed(2);
      setNep(busdValue.toString());
    } else {
      setNep("");
      setBusd("");
    }
  };

  // Increment the render count every time the component is rendered

  return (
    <>
      <div className="convert-inner">
        <h3>Crypto Converter</h3>
        <form>
          <div className="form-control">
            <label htmlFor="nep">NEP</label>
            <input
              type="number"
              name="nep"
              value={nep}
              onChange={handleChangeNep}
            />
          </div>
          <div className="sync-icon">
            <GrSync />
          </div>
          <div className="form-control">
            <label htmlFor="busd">BUSD</label>
            <input
              type="number"
              name="busd"
              value={busd}
              onChange={handleChangeBusd}
            />
          </div>
        </form>
        <button onClick={() => setShowModel(true)} className="btn">
          Check Wallet Details
        </button>
      </div>
    </>
  );
};

export default Converter;
