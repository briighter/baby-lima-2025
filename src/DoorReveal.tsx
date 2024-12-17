import React, { useState } from "react";
import "./DoorReveal.css"; // Add the styles in a separate CSS file

interface DoorRevealProps {
  videoSrc: string;
}

const DoorReveal: React.FC<DoorRevealProps> = ({ videoSrc }) => {
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenPresent = () => {
    setIsOpened(true);
  };

  return (
    <div className="present-container">
      <div
        className={`present ${isOpened ? "opened" : ""}`}
        onClick={handleOpenPresent}
      >
        <div className="lid"></div>
        <div className="box"></div>
      </div>
      {isOpened && (
        <div className="video-container">
          <video
            src={videoSrc}
            autoPlay
            muted
            loop
            className="portrait-video"
          ></video>
        </div>
      )}
    </div>
  );
};

export default DoorReveal;
