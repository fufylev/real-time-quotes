import React, { useReducer } from 'react';
import {CHANGE_AUDUSD, CHANGE_EURUSD, CHANGE_GBPUSD, CHANGE_GOLD, CHANGE_USDCAD, CHANGE_USDCHF, CHANGE_USDJPY} from "./types";
import { MainContext } from "./MainContext";
import { MainReducer } from "./MainReducer";

export const MainState = ({ children }) => {
  const initialSate = {
    EURUSD: {},
    GBPUSD: {},
    USDJPY: {},
    USDCHF: {},
    USDCAD: {},
    AUDUSD: {},
    GOLD: {},
  };

  const [state, dispatch] = useReducer(MainReducer, initialSate);


  const setData = (data) => {
    const quoteName = `CHANGE_${data.symbol}`
    dispatch({type: quoteName, payload: data})
  }

  return (
    <MainContext.Provider
      value={{
        EURUSD: state.EURUSD,
        GBPUSD: state.GBPUSD,
        USDJPY: state.USDJPY,
        USDCHF: state.USDCHF,
        USDCAD: state.USDCAD,
        AUDUSD: state.AUDUSD,
        GOLD: state.GOLD,
        setData
      }}
    >
      {children}
    </MainContext.Provider>
  );
};