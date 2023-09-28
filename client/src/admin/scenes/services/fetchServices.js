import { useEffect, useState } from "react";
import { useAuthContext } from "../../../utils/hooks/useAuthContext"

const useFetchServices = (status) => {
  const [services, setServices] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [serviceData, setServiceData] = useState([]);
  const { user } = useAuthContext();

  const fetchNewServices = async () => {
    try {
      const response = await fetch("http://localhost:4000/service", {
        headers: {'Authorization' : `Bearer ${user.token}`,
                  'Status' : status},
      });
      if (response.ok) {
        const servicesData = await response.json();
        setServices(servicesData);
        const customerIds = servicesData.map((service) => service.customerId);
        if (customerIds.length > 0) {
          const responseCustomers = await fetch(
            `http://localhost:4000/customer/multiple/${customerIds.join(",")}`, {
              headers: {'Authorization': `Bearer ${user.token}`},
            }
          );
          if (responseCustomers.ok) {
            const customersData = await responseCustomers.json();
            setCustomers(customersData);
          }
        }
      } else {
        console.log("fetchNewServices failed")}
    } catch (error) {
      console.error(error)
    }
  };

  useEffect(() => {
    fetchNewServices();
  }, []);

  useEffect(() => {
    const mergedData = services.map((service) => {
      const customer = customers.find((customer) => customer._id === service.customerId);
      if (customer) {
        return { ...service, ...customer, _id: service._id };
      }
      return service;
    });
    setServiceData(mergedData);
  }, [customers,services]);

  const updateServiceStatus = async (id, status) => {
    try {
      const response = await fetch(`http://localhost:4000/service/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ id, status }),
      });

      const updatedService = await response.json();
      if (response.ok) {
        setServices((prevServiceData) =>
          prevServiceData.map((service) =>
          service._id === updatedService._id ? { ...service, status: updatedService.status } : service
          )
        );
        setServices((prevServiceData) =>
          prevServiceData.map((service) =>
            service.status === 'Delivered'  ? null : service).filter(Boolean)
        );
      }
    } catch (error) {
      console.error('Error updating service status:', error);
    }
  };

  const updateMechanic = async (id, mechanic) => {
    try {
      const response = await fetch(`http://localhost:4000/service/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${user.token}`
        },
        body: JSON.stringify({ id, mechanic }),
      });

      const updatedService = await response.json();
      if (response.ok) {
        setServices((prevServiceData) =>
          prevServiceData.map((service) =>
          service._id === updatedService._id ? { ...service, mechanic: updatedService.mechanic } : service
          )
        );
      }
    } catch (error) {
      console.error('Error updating service status:', error);
    }
  };
  
  return { serviceData, updateMechanic, updateServiceStatus };
};

export default useFetchServices;
