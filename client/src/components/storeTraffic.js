
const StoreTraffic = () => {
    const StoreTraffic = async () => {
        const response = await fetch('http://localhost:4000/')
        const json = await response.json()
    }
    StoreTraffic();
};
export default StoreTraffic;