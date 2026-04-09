import React, { useState, useEffect } from "react"

const DriverStatus: React.FC = () => {

    const [status, setStatus] = useState("Awake")

    useEffect(() => {

        const interval = setInterval(() => {

            const states = ["Awake", "Drowsy"]

            setStatus(states[Math.floor(Math.random() * 2)])

        }, 5000)

        return () => clearInterval(interval)

    }, [])

    return (

        <div className="bg-white p-4 rounded shadow">

            <h2 className="text-xl font-bold">Driver Status</h2>

            <p className={`text-2xl ${status === "Awake" ? "text-green-500" : "text-red-500"}`}>
                {status}
            </p>

        </div>

    )

}

export default DriverStatus