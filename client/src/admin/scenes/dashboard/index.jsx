import { Box, Button, IconButton, Typography } from "@mui/material";
import BatteryCharging90Icon from '@mui/icons-material/BatteryCharging90';
import FacebookIcon from '@mui/icons-material/Facebook';
import { mockTransactions } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import GroupIcon from '@mui/icons-material/Group';
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import GeographyChart from "../../components/GeographyChart";
import BuildIcon from '@mui/icons-material/Build';
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import useFetchCustomersCount from "./fetchCustomersCount";
import useFetchServicesCount from "./fetchServicesCount";
import useFetchTrafficCount from "./fetchTrafficCount"
import useFetchHolidays from "./fetchHolidays"
import useFetchBatteryCount from "./fetchBatteryCount"
import useFetchRevenueCount from "./fetchRevenue"
import LogoutIcon from '@mui/icons-material/Logout';
import { useState, useEffect } from "react";
import { useLogout } from "../../../utils/hooks/useLogout";

const Dashboard = () => {
  const [customerCount, setCustomerCount] = useState(0);
  const [serviceCount, setServiceCount] = useState(0);
  const [trafficCount, setTrafficCount] = useState(0);
  const [batteryCount, setBatteryCount] = useState(0);
  const [holidays, setHolidays] = useState([]);
  const customerData = useFetchCustomersCount();
  const serviceData = useFetchServicesCount();
  const trafficData = useFetchTrafficCount()
  const holidaysData = useFetchHolidays()
  const batteryData = useFetchBatteryCount()
  const { totalRevenue, gstRevenue, noGstRevenue, mechanicRevenue } = useFetchRevenueCount()
  const { logout } = useLogout()

  useEffect(()=>{
    setBatteryCount(batteryData);
  },[batteryData])
  console.log("s",batteryData,batteryCount)

  useEffect(()=>{
    setHolidays(holidaysData);
  },[holidaysData])

  useEffect(()=>{
    setTrafficCount(trafficData.count);
  },[trafficData])

  useEffect(()=>{
    setCustomerCount(customerData.count);
  },[customerData])

  useEffect(()=>{
    setServiceCount(serviceData.count);
  },[serviceData])


  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Dashboard" />
        <Box className='my-2'>
          <Button
          onClick={logout}
            sx={{
              backgroundColor: '#45CFDD',
              color: "#292929",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              '&:hover': {
                backgroundColor: '#B42B51',
                color: "#e0e0e0"
              }
            }}
          >
            <LogoutIcon sx={{ mr: "10px" }} />
            Sign out
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(10, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 2"
          backgroundColor='#00101f'
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={trafficCount}
            subtitle="Website Traffic"
            icon={
              <TrafficIcon
                sx={{ color: '#45CFDD', fontSize: "26px"}}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor= '#00101f'
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={customerCount}
            subtitle="Total Customers"
            icon={
              <GroupIcon
                sx={{ color: '#45CFDD', fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor='#00101f'
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={serviceCount}
            subtitle="Service Booked"
            icon={
              <BuildIcon
                sx={{ color: '#45CFDD', fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor='#00101f'
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={batteryCount}
            subtitle="Batteries sold"
            icon={
              <BatteryCharging90Icon
                sx={{ color: '#45CFDD', fontSize: "26px"}}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 2"
          backgroundColor='#00101f'
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={trafficCount}
            subtitle="Page Followers"
            icon={
              <FacebookIcon size='large' 
              sx={{color : '#4267B2', fontSize: "30px"}}
              />
            }
          />
        </Box>
        {/* ROW 2 */}
        <Box
          gridColumn="span 7"
          gridRow="span 2"
          backgroundColor='#00101f'
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h4"
                fontWeight="600"
                color={"#e0e0e0"}
              >
                Revenue Analytics
              </Typography>
              <Typography
                variant="h3"
                fontWeight="bold"
                color={"#4cceac"}
              >
               ₹ {totalRevenue}
              </Typography>
            </Box>
          </Box>
          <Box height="250px" m="-20px 0 0 0">
            <LineChart isDashboard={true} />
          </Box>
        </Box>
        <Box gridColumn="span 3"
          gridRow="span 2"
          backgroundColor='#00101f'
          
          >
            <Box
            mt="25px"
            p="0 30px"
          >
            <Typography
                variant="h3"
                fontWeight="bold"
                color={"#e0e0e0"}
              >
                Revenue Generated
              </Typography>
              <Box 
              className="grid my-auto grid-cols-2 grid-rows-3 gap-4 pt-10 pl-3"
              >
              <Typography
                variant="h4"
                fontWeight="bold"
                color={"#4cceac"}
              >
                Spare parts
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                color={"#4cceac"}
              >
                ₹ {gstRevenue}
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
                color={"#4cceac"}
              >
                Miscellaneous
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
                color={"#4cceac"}
              >
                ₹ {noGstRevenue}
              </Typography>

              <Typography
                variant="h4"
                fontWeight="bold"
                color={"#4cceac"}
              >
                Mechanics
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                color={"#4cceac"}
              >
                ₹ {mechanicRevenue}
              </Typography>

              </Box>
          </Box>
          

        </Box>
        {/* Row 3 */}
        <Box
          gridColumn="span 5"
          gridRow="span 2"
          backgroundColor='#00101f'
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${"#141b2d"}`}
            colors={"#e0e0e0"}
            p="15px"
          >
            <Typography color={"#e0e0e0"} variant="h4" fontWeight="600">
              Upcoming Holidays
            </Typography>
          </Box>
          {holidays.map((holiday) => (
            <Box
              key={`${holiday.urlid}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${"#141b2d"}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={"#4cceac"}
                  variant="h5"
                  fontWeight="600"
                >
                  {holiday.name}
                </Typography>
              </Box>
              <Box color={"#e0e0e0"}>
                <strong className="text-lg">
                  {holiday.date.datetime.day}/{holiday.date.datetime.month}/{holiday.date.datetime.year}
                </strong>
              </Box>
            </Box>
          ))} 
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor='#00101f'
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Campaign
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={"#4cceac"}
              sx={{ mt: "15px" }}
            >
              $48,352 revenue generated
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
