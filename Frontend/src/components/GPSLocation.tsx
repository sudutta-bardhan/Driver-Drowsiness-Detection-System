import React, { useEffect, useState } from "react"

const GPSLocation: React.FC = () => {

    const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null)

    useEffect(() => {

        navigator.geolocation.getCurrentPosition((pos) => {

            setLocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            })

        })

    }, [])

    return (

        <div className="bg-white p-4 rounded shadow">

            <h2 className="font-bold">GPS Location</h2>

            {location && (

                <p>
                    Lat: {location.lat} <br />
                    Lng: {location.lng}
                </p>

            )}

        </div>

    )

}

export default GPSLocation