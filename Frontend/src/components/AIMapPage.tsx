import React, { useEffect, useState, useRef } from 'react'

interface AIMapPageProps {
  onBack: () => void
  triggerEmergency: () => void
}

const AIMapPage: React.FC<AIMapPageProps> = ({ onBack, triggerEmergency }) => {
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)

  const [status, setStatus] = useState<string>('LOADING...')
  const [confidence, setConfidence] = useState<number>(0)

  const lastSpoken = useRef("")

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude })
        },
        () => {
          setLocation({ lat: 37.7749, lng: -122.4194 })
        }
      )
    } else {
      setLocation({ lat: 37.7749, lng: -122.4194 })
    }
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("http://127.0.0.1:5001/status")
        .then(res => res.json())
        .then(data => {
          setStatus(data.status)
          setConfidence(data.confidence)

          if (data.status === "FAINTED") {
            triggerEmergency()
          }
        })
        .catch(err => console.log(err))
    }, 500)

    return () => clearInterval(interval)
  }, [triggerEmergency])

  useEffect(() => {
    if (status !== lastSpoken.current) {
      if (status === "DROWSY") {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Stay Awake"))
      }
      if (status === "FAINTED") {
        window.speechSynthesis.speak(new SpeechSynthesisUtterance("Emergency detected"))
      }
      lastSpoken.current = status
    }
  }, [status])

  const centerParam = location
    ? `${location.lat.toFixed(5)}%2C${location.lng.toFixed(5)}`
    : '37.77490%2C-122.41940'

  const getStatusColor = () => {
    if (status === "AWAKE") return "text-green-400"
    if (status === "DROWSY") return "text-yellow-400"
    if (status === "FAINTED") return "text-red-500"
    return "text-white"
  }

  return (
    <div className="w-full h-[80vh] flex gap-4">

      <div className="flex-1 bg-black rounded overflow-hidden">
        <iframe
          title="AI Map"
          src={`https://www.openstreetmap.org/export/embed.html?bbox=${
            location
              ? `${location.lng - 0.05}%2C${location.lat - 0.03}%2C${location.lng + 0.05}%2C${location.lat + 0.03}`
              : '-122.47%2C37.75%2C-122.37%2C37.80'
          }&layer=mapnik&marker=${centerParam}`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
        ></iframe>
      </div>

      <div className="w-[360px] bg-[#0f1724] rounded-lg p-6 border border-slate-700 flex flex-col gap-4">

        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center text-white font-bold text-xl">
            DR
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">AI Driving Monitor</h3>
            <p className="text-slate-400 text-sm">Realtime ML driving-status</p>
          </div>
        </div>

        <div className="bg-[#0b1220] p-4 rounded border border-slate-800 text-center">
          <p className="text-slate-300 text-sm mb-2">Status</p>
          <div className={`font-bold text-2xl ${getStatusColor()}`}>
            {status}
          </div>
          <p className="text-slate-400 text-sm mt-1">
            Confidence: {(confidence * 100).toFixed(1)}%
          </p>
        </div>

        <div className="flex justify-center">
          {status === "AWAKE" && <img src="https://cdn-icons-png.flaticon.com/512/4712/4712027.png" width="90" />}
          {status === "DROWSY" && <img src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png" width="90" />}
          {status === "FAINTED" && <img src="https://cdn-icons-png.flaticon.com/512/564/564619.png" width="90" />}
        </div>

        <div className="text-center">
          {status === "AWAKE" && <div className="text-green-400">Driver is alert</div>}
          {status === "DROWSY" && <div className="text-yellow-300">Driver is drowsy</div>}
          {status === "FAINTED" && <div className="text-red-400">Emergency detected</div>}
        </div>

        <div className="mt-auto flex justify-between">
          <button onClick={onBack} className="px-4 py-2 border border-slate-600 rounded">
            Back
          </button>
          <button onClick={() => window.open('https://www.google.com/maps', '_blank')} className="px-4 py-2 bg-blue-600 rounded">
            Open in Maps
          </button>
        </div>

      </div>
    </div>
  )
}

export default AIMapPage