import React, { useEffect, useState } from "react"

const AvatarAlert: React.FC = () => {

    const [alert, setAlert] = useState(false)

    useEffect(() => {

        const timer = setTimeout(() => {

            setAlert(true)

        }, 10000)

        return () => clearTimeout(timer)

    }, [])

    return (

        <div className="bg-white p-4 rounded shadow">

            <h2 className="font-bold">Driver Alert</h2>

            {alert ?

                <p className="text-red-500 font-bold">
                    ⚠ Driver inactive for 10 seconds
                </p>

                :

                <p className="text-green-500">
                    Driver Active
                </p>

            }

        </div>

    )

}

export default AvatarAlert