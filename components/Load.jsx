import { CircularProgress } from "@mui/material";

import { useContext } from "react";

import { animated as a } from "react-spring";

import { MainContext } from "./Contexts";

const Load = ({ style }) => {
  const mainContext = useContext(MainContext);
  return (
    <>
      <div className="w-full h-full fixed bg-slate-400/40 dark:bg-slate-900/80"></div>
      <a.div
        style={style}
        className="w-full h-full grid justify-center content-center items-center justify-items-center fixed">
        <span className="absolute text-6xl mx-14 my-16 opacity-40">🪐</span>
        <CircularProgress
          sx={{ color: "#e25a4890" }}
          size={200}
          className="rounded-3xl"
          variant={mainContext.progress === 0 ? "indeterminate" : "determinate"}
          value={mainContext.progress}
        />
      </a.div>
    </>
  );
};

export default Load;
