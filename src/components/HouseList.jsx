import { useEffect, useState } from "react";
import HouseRow from "./HouseRow";

const noHouse = [];
const houseArray = [
    {
        id: 1,
        address: "12 Valley of Kings, Geneva",
        country: "Switzerland",
        price: 900000,
    },
    {
        id: 2,
        address: "89 Road of Forks, Bern",
        country: "Switzerland",
        price: 500000,
    },
];

const headerStyle = {
    fontStyle: "bold",
    fontSize: "x-large",
    color: "coral"
}

const HouseList = () => {
    const [houses, setHouses] = useState([]);

    useEffect(() => {
    const fetchHouses = async () => {
        try {
            const response = await fetch(
                "http://localhost:8080/house", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTc5MTExNDQ5MSwiZXhwIjoxNzkxMTE4MDkxfQ.FDRdBjl74MNqhhB0HBNVVtL74stewVHCk8flxv6idgo`,
                        "Content-Type": "application/json"
                    }
                }
            );

            console.log("Response:", response);
            console.log("Status:", response.status);

            const data = await response.json();
            const houseList = data.list;

            console.log("DATA:", data);
            console.log("Is array?", Array.isArray(data));

            setHouses(houseList);
        } catch (error) {
            console.error("FETCH ERROR:", error);
        }
    };

    fetchHouses();
}, []);
    const addHouses = () => {
        setHouses([
            ...houses,
            {
                id: 6,
                address: "32 Valley Way, New York",
                country: "USA",
                price: 100000, 
            },
        ]);
    };
    return (
        <>
            <div className="row mb-2" style={headerStyle}>
                <h5 className="themeFontColor text-center">
                    Houses currently on the market
                </h5>
            </div>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th>Address</th>
                        <th>Country</th>
                        <th>Asking Price</th>
                    </tr>
                </thead>
                <tbody>
                    {houses.map(h => <HouseRow key={h.id} house={h} />)}
                </tbody>
            </table>
            <button onClick={addHouses} className="btn btn-primary">
                Add
            </button>
        </>
    )
};

export default HouseList;