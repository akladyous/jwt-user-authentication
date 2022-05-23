import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
    const [counter, setCounter] = useState(0)
    const [hashedPassword, setHashedPassword] = useState('')
    const [status, setState] = useState(false)
    
    useEffect(() => {
        const controller = new AbortController()
        if(status){
            const config = {
                method: "post",
                url: "http://localhost:4000/home",
                headers: { "Content-type": "application/json" },
                withCredentials: true,
                signal: controller.signal,
                data: JSON.stringify({
                    email: "paolo@milano.com",
                    password: "000000",
                }),
            };
            (async () => {
                try {
                    const response = await axios(config);
                    setCounter(response.data.counter);
                    setHashedPassword(response.data.password);
                    console.log("response : ", response);
                    return response.data;
                } catch (error) {
                    console.log("error : ", error);
                    // throw new Error(error);
                }
            })()
        }
        return ()=>{
            // controller.abort()
            setState(false)
        }
    }, [status]);


    // console.log()

    return (
        <>
            <div className="container">
                <h1>home page</h1>
                <div>
                    <p>{counter}</p>
                </div>
                <button onClick={()=>{setState(true)}}>seed</button>
            </div>
        </>
    );
}
