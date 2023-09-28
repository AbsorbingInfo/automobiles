import { useState, useRef, useEffect, useContext } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import DiscountIcon from '@mui/icons-material/Discount';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import BuildIcon from '@mui/icons-material/Build';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import EngineeringIcon from '@mui/icons-material/Engineering';
import { SidebarContext } from '../../../utils/context/SidebarContext';
import ReceiptIcon from '@mui/icons-material/Receipt';
import SendIcon from '@mui/icons-material/Send';
import BatteryCharging90Icon from '@mui/icons-material/BatteryCharging90';

const Item = ({ title, to, icon, selected, setSelected }) => {
  return (
    <MenuItem
      active={selected === title}
      style={{
        color: "#e0e0e0",
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { setSidebarCollapse } = useContext(SidebarContext);

  useEffect(() => {
    const currentPath = location.pathname;
    if(currentPath === '/admin/services'){
      setSelected('Current Services');
    }else if(currentPath === '/admin/allservices'){
      setSelected('All Services');
    }else if(currentPath === '/admin/customers'){
      setSelected('Customers');
    }else if(currentPath === '/admin/offers'){
      setSelected('Offers');
    }else if(currentPath === '/admin/battery'){
      setSelected('Batteries');
    }else if(currentPath === '/admin/customerform'){
      setSelected('Add Customer');
    }else if(currentPath === '/admin/offerform'){
      setSelected('Add Offer');
    }else if(currentPath === '/admin/mechanicform'){
      setSelected('Add Mechanic');
    }else if(currentPath === '/admin/invoiceform'){
      setSelected('Add Invoice');
    }else if(currentPath === '/admin/batteryform'){
      setSelected('Add Battery');
    }else if(currentPath === '/admin/mechanic'){
      setSelected('Mechanics');
    }else if(currentPath === '/admin/sendmessages'){
      setSelected('Ad Campaign');
    }
  })
  
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      const shouldCollapse = screenWidth < 870; 
      setIsCollapsed(shouldCollapse);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isCollapsed]);

  useEffect(() => {
    setSidebarCollapse(isCollapsed);
    console.log('ProSidebar :', isCollapsed);
  }, [isCollapsed]);
  return (
  
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `#00101f !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#78C1F3 !important",
        },
        "& .pro-menu-item.active": {
          color: "#45CFDD !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: "#e0e0e0",
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={"#e0e0e0"}>
                  ADMIN
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon sx={{color: "white"}}/>
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/admin"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={"#a3a3a3"}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Data
            </Typography>
            <Item
              title="Current Services"
              to="/admin/services"
              icon={<WatchLaterIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="All Services"
              to="/admin/allservices"
              icon={<BuildIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Batteries"
              to="/admin/battery"
              icon={<BatteryCharging90Icon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Customers"
              to="/admin/customers"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Mechanics"
              to="/admin/mechanic"
              icon={<EngineeringIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Offers"
              to="/admin/offers"
              icon={<DiscountIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={"#a3a3a3"}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Add Data
            </Typography>
            <Item
              title="Add Invoice"
              to="/admin/invoiceform"
              icon={<ReceiptIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Battery"
              to="/admin/batteryform"
              icon={<BatteryCharging90Icon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Ad Campaign"
              to="/admin/sendmessages"
              icon={<SendIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Customer"
              to="/admin/customerform"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Mechanic"
              to="/admin/mechanicform"
              icon={<EngineeringIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Add Offer"
              to="/admin/offerform"
              icon={<LocalOfferIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
