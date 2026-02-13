import { createContext } from "react";
import api from "../api/api";
import EditPost from "../../EditPost";
import useWindowSize from "../hooks/useWindowSize";
import useAxiosFetch from "../hooks/useAxiosFetch";

const DataContext = createContext({});

export const DataProvider = ({ Children }) => {
  <DataContext.Provider value={{

  }}>{Children}</DataContext.Provider>
};


export default DataContext