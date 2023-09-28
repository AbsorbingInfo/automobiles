import { useEffect, useState, useContext } from "react"
import { Box } from '@mui/material';
import { SidebarContext } from '../../utils/context/SidebarContext';

const StyledBox = ({ children }) => {
  const { sidebarCollapse } = useContext(SidebarContext);
  const [width, setWidth] = useState(270);

  useEffect(() => {
    if(sidebarCollapse){
      setWidth(71);
    }else{
      setWidth(270);
    }
  }, [sidebarCollapse]);

  return (
    <Box
      m="10px 0 0 0"
      height="75vh"
      width={`calc(100vw - ${width + 35}px)`}
      className="scrollbar-visible"
      sx={{
        "& .MuiDataGrid-root": {
          border: "none",
        },
        "& .MuiDataGrid-cell": {
          border: "1px solid #33404c",
          fontSize: "16px",
        },
        "& .MuiDataGrid-columnHeaders": {
          backgroundColor: "#B42B51",
          borderBottom: "none",
        },
        "& .MuiDataGrid-virtualScroller": {
          backgroundColor: '#00101f',
        },
        "& .MuiDataGrid-footerContainer": {
          borderTop: "none",
          backgroundColor: "#B42B51",
        },
        "& .MuiCheckbox-root": {
          color: `white !important`,
        },
        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
          color: `white !important`,
        },
        "&::-webkit-scrollbar": {
          display: "none !important",
        }
      }}
    >
      {children}
    </Box>
  );
};

export default StyledBox;