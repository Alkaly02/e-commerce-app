import React, { useEffect } from "react";
import useFile from "../../hooks/useFile";
import PropTypes from 'prop-types'

const ProgressBar = ({ file, setFile }) => {
  const { imgUrl, per } = useFile(file);
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

ProgressBar.propTypes = {
  file: PropTypes.object.isRequired,
  setFile: PropTypes.func.isRequired
}
