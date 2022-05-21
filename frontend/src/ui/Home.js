import axios, {AxiosError} from "axios";
import { useEffect, useState } from "react";

export default function Home() {
    const [counter, setCounter] = useState(0)

    useEffect(() => {
        const config = {
            method: "get",
            url: "http://localhost:4000/home",
            headers: { "Content-type": "application/json" },
            withCredentials: true,
            data: JSON.stringify({
                email: "paolo@milano.com",
                password: "000000",
            }),
        };
        (async () => {
            try {
                const response = await axios(config);
                setCounter(response.data)
                console.log("response : ", response)
                return response.data;
            } catch (error) {
                console.log("error : ", error)
                // throw new Error(error);
            }
        })();
    }, []);

    return (
        <>
            <div className="container">
                <h1>home page</h1>
                <div>
                    <p>{counter}</p>
                </div>
                {/* <button onClick={handleSeed}>seed</button> */}
            </div>
        </>
    );
}
