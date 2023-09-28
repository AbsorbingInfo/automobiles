import { Box } from "@mui/material";

const ProgressCircle = ({ progress = "0.75", size = "40" }) => {
  const angle = progress * 360;
  return (
    <Box
      sx={{
        background: `radial-gradient(#00101f 55%, transparent 56%),
            conic-gradient(transparent 0deg ${angle}deg, #E6A2B2 ${angle}deg 360deg),
            #E41749`,
        borderRadius: "50%",
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default ProgressCircle;
