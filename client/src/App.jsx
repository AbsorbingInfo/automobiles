import { useState,useEffect } from 'react';
import { Navigate, useLocation, createBrowserRouter, Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import BookService from './pages/BookService';
import ServiceBooked from './pages/ServiceBooked';
import AdminLogin from './pages/AdminLogin';
import ProductListing from './pages/ProductListing';
import Offers from './pages/Offers';
import Sidebar from './admin/scenes/global/Sidebar';
import Dashboard from './admin/scenes/dashboard';
import Services from './admin/scenes/services';
import Customers from './admin/scenes/customers';
import AllServices from './admin/scenes/allServices';
import AdminOffers from './admin/scenes/offers';
import Batteries from './admin/scenes/batteries';
import Mechanics from './admin/scenes/mechanics';
import MechanicDetails from './admin/scenes/mechanics/MechanicDetails';
import BatteryReplacement from './admin/scenes/batteries/BatteryReplacement';
import Invoices from './admin/scenes/customers/CustomerInvoices';
import Bar from './admin/scenes/bar';
import AdCampaign from './admin/scenes/adCampaign';
import CustomerForm from './admin/scenes/addCustomerForm';
import MechanicForm from './admin/scenes/addMechanicForm';
import OfferForm from './admin/scenes/addOfferForm';
import InvoiceForm from './admin/scenes/addInvoiceForm';
import BatteryForm from './admin/scenes/addBatteryForm'
import Line from './admin/scenes/line';
import Pie from './admin/scenes/pie';
import Geography from './admin/scenes/geography';
import { useTheme } from './admin/theme';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useAuthContext } from './utils/hooks/useAuthContext'
import { SidebarProvider } from './utils/context/SidebarContext';

function App() {
  const [ theme ] = useTheme()
  const [isSidebar, setIsSidebar] = useState(window.location.pathname === '/admin')
  const location = useLocation()

  useEffect(() => {
    const currentPath = location.pathname;
    setIsSidebar(currentPath.startsWith('/admin'));
    if(currentPath.startsWith('/admin/batteryreplacement') || currentPath.startsWith('/admin/mechanicdetails') || currentPath.startsWith('/admin/customerinvoices')){
      setIsSidebar(false)
    }
    if(!currentPath.startsWith('/admin')){
      setIsSidebar(false)
    }
  }, [location.pathname]);

  return (
    <ThemeProvider theme={theme}>
    <SidebarProvider>
      <CssBaseline />
        <Header />
        <div className="flex">
          {isSidebar && (
            <Sidebar />
          )}
          <div className="flex-1 overflow-auto">
            <Outlet />
          </div>
        </div>
        <Footer />
      </SidebarProvider>
    </ThemeProvider>
  );
}

const VerifyAdmin = () => {
  const user = useAuthContext();
  return user.user ?  <Outlet /> : <Navigate to="/login" />;
};

const appRouter = createBrowserRouter([
  {
    path:'/',
    element: <App />,
    children:[
      {
        path:'/',
        element: <Home />
      },
      {
        path:'about',
        element: <Home />
      },
      {
        path:'service',
        element:<BookService />
      },
      {
        path: 'servicebooked',
        element: <ServiceBooked />
      },
      {
        path:'spareparts',
        element:<ProductListing />
      },
      {
        path:'offers',
        element:<Offers />
      },
      {
        path:'login',
        element: <AdminLogin />
      },
      {
        path:'admin',
        element: <VerifyAdmin />,
        children:[
          {
            path:'',
            element: <Dashboard />
          },
          {
            path:'services',
            element: <Services />,
          },
          {
            path:'customers',
            element: <Customers />,
          },
          {
            path:'allservices',
            element: <AllServices />,
          },
          {
            path:'offers',
            element: <AdminOffers />,
          },
          {
            path:'battery',
            element: <Batteries />,
          },
          {
            path:'mechanic',
            element: <Mechanics />,
          },
          {
            path:'mechanicdetails',
            element: <MechanicDetails />,
          },
          {
            path:'batteryreplacement',
            element: <BatteryReplacement />,
          },
          {
            path:'customerinvoices',
            element: <Invoices />,
          },
          {
            path:'bar',
            element: <Bar />,
          },
          {
            path:'customerform',
            element: <CustomerForm />,
          },
          {
            path:'line',
            element: <Line />,
          },
          {
            path:'pie',
            element: <Pie />,
          },
          {
            path:'sendmessages',
            element: <AdCampaign />,
          },
          {
            path:'batteryreplacement',
            element: <BatteryReplacement />,
          },
          {
            path:'offerform',
            element: <OfferForm />,
          },
          {
            path:'invoiceform',
            element: <InvoiceForm />,
          },
          {
            path:'mechanicform',
            element: <MechanicForm />,
          },
          {
            path:'batteryform',
            element: <BatteryForm />,
          },
          {
            path:'geography',
            element: <Geography />,
          }
        ]
      },
    ]
  }
])

export default appRouter;