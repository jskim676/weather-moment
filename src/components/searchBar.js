import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "./api";

const SearchBar = () => {
    const [cityData, setCityData] = useState(null);

    const handleOnChange = (cityName) => {
        setCityData(cityName);
    }

    const loadOptions = async (inputValue) => {
        try {
            const response = await fetch(
            `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`,
            geoApiOptions
            );
            const responseData = await response.json();
            if (!responseData.data) {
                return { options: [] };
            }
            return {
                options:responseData.data.map((city)=>({
                    value: `${city.latitude} ${city.longitude}`,
                    label: `${city.name}, ${city.country}`,
                }))
            }
        } catch (error) {
            console.error(error);
        }
    };
    

    return (
        <AsyncPaginate
            placeholder="city"
            value={cityData}
            onChange={handleOnChange}
            loadOptions={loadOptions}
            debounceTimeout={600}
        />
    )
}

export default SearchBar;