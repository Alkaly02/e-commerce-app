import React, { useEffect } from "react";
import useFile from "../../hooks/useFile";

const ProgressBar = ({ file, setFile }) => {
  const { imgUrl, per } = useFile(file);
  console.log(per, imgUrl);
  useEffect(() => {
    if(imgUrl){
      setFile(null)
    }
  }, [imgUrl])
  return (
    <div
      style={{
        width: per + "%",
        height: "2px",
        backgroundColor: "rgb(75, 180, 180)",
        marginTop: '1rem'
      }}
    >
    </div>
  );
};

export default ProgressBar;
