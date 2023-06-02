import React, { useEffect, useState } from "react"
import { nanoid } from "nanoid"

import TeamCard from "../components/Card/TeamCard"
import axios  from "axios";

const core_API = "https://shastra-api.onrender.com/coreMembers";
const subcore_API = "https://shastra-api.onrender.com/subcoreMembers";

export default function Team() {
    const [core, setCore] = useState([])
    const [subCore, setSubCore] = useState([])
    const [loading, setLoading] = useState(true);

    const fetchTeam = async(url, setTeam) => {
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
                    setTeam(data);
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
        fetchTeam(core_API, setCore);
        fetchTeam(subcore_API, setSubCore)
    }, [])

    return (
        <div className="relative z-10 min-h-[100%]">
            <div className="fixed rounded-b-[30px] md:rounded-b-[40px] top-0 z-10 sm:h-[5.5rem] h-20 md:h-24 w-full bg-home shadow-[0_8px_10px_0_rgba(0,0,0,0.25)]"></div>

            <div className="relative mt-32 mb-16 w-full flex flex-col">
                <h1 className="uppercase font-bold text-2xl mx-auto w-max md:text-4xl mb-7 gradient-txt">Know the Core</h1>

                <div className="team--core-grid team-card"
                >
                    {   loading ? "Loading..." :
                        core &&
                        core.map(member => (
                            <TeamCard 
                                key={nanoid()}
                                id={member.id}
                                image={member.image}
                                name={member.name}
                                designation={member.designation}
                                linkedin={member.linkedin}
                            />
                        ))
                    }
                </div>
            </div>

            <div className="relative mt-8 mb-16 w-full flex flex-col">
                <h1 className="uppercase font-bold text-2xl mx-auto w-max md:text-4xl mb-7 gradient-txt">Sub-Core</h1>
                
                <div className="team--subcore-grid team-card"
                >
                    {   loading ? "Loading..." :
                        subCore && 
                        subCore.map(member => (
                            <TeamCard 
                                key={nanoid()}
                                id={member.id}
                                image={member.image}
                                name={member.name}
                                designation={member.designation}
                                linkedin={member.linkedin}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}   