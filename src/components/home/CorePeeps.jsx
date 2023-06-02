import React, { useState, useEffect } from "react"
import { nanoid } from "nanoid"
import axios  from "axios";


const core_API = "https://shastra-api.onrender.com/coreMembers";
export default function CorePeeps() {
    const [core, setCore] = useState([])
    const [loading, setLoading] = useState(true);

    const fetchcoreUser = async(url) => {
        axios.get(url, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(response => {
                const data = response.data;
                if (data.length > 0) {
                    setCore(data);
                    setLoading(false);
                } else {
                    throw new Error("No data found");
                }
            })
            .catch(error => {
                console.error(error);
            });
    }

    useEffect(() => {
        fetchcoreUser(core_API);
    }, [])

    return (
        <div className="flex flex-col self-center">
            <span className="pb-7 self-center  uppercase font-bold text-2xl md:text-4xl select-none inline-block w-max gradient-txt">Core Peeps</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 gap-x-10 sm:gap-x-8 sm:gap-8 md:gap-10 lg:gap-x-20 lg:gap-y-10 md:mx-2">
                {   loading ? "Loading..." :
                    core &&
                    core.map(member => (
                        <div
                            key={nanoid()}
                            className="flex flex-col items-center aspect-square justify-center space-y-2"
                        >
                            <span className="uppercase font-bold text-lg sm:text-2xl md:text-3xl lg:text-4xl text-center mx-auto inline-block w-max gradient-txt"></span>
                            <img src={member.image} className="inline-block aspect-square h-32 sm:h-28 md:h-36 lg:h-60 rounded-3xl border border-black"/>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}