import { useEffect, useState } from "react";
import axios from "axios";

export default function Index() {
    const [weather, setWeather] = useState<{
        main: {temp: number},
        weather: {description: string}[],
    } | null>(null);

    const [search, setSearch] = useState("");

    // hook - code will only run once when component first loads
    useEffect(() => {
        // basic structure of API request
        axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                appId: "4be7a366fb2556fb6f934fc59deff2e1",
                q: "New York"
            }
        }).then(res => {
            setWeather(res.data);
        }).catch(e => {
            console.log(e);
        });
    }, []);

    function onSearch() {
        axios.get("https://api.openweathermap.org/data/2.5/weather", {
            params: {
                appId: "4be7a366fb2556fb6f934fc59deff2e1",
                q: search,
            }
        }).then(res => {
            setWeather(res.data);
        }).catch(e => {
            console.log(e);
        });
    }

    return (
        <>
            <div className="px-4 mx-auto max-w-lg">
                <div className="flex items-center py-4">
                    <p className="font-bold">Weather App</p>
                    <input className="ml-auto border border-black text-sm p-1 mr-2"
                        type="text" placeholder="Add new location..."/>
                    <button className="px-2 py-1 text-sm bg-black text-white">Add</button>
                </div>
            </div>

            <input type="text" value={search} onChange={e => 
                setSearch(e.target.value)}/>
            <button onClick={onSearch}>Search</button>

            {weather ? (
                <>
                    <p>{Math.round((weather.main.temp - 276) * 9 / 5 + 32)} deg F</p>
                    <p>{weather.weather[0].description}</p>
                </>
            ) : (
                <p>Loading</p>
            )}
        </>
    );
}
