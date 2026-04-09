import React, { useState, useEffect } from "react"
import Sidebar from "./Sidebar"
import ProfileBlock from "./ProfileBlock"
import StatCard from "./StatCard"
import MonthlyChart from "./MonthlyChart"
import AlertBanner from "./AlertBanner"
import AIMapPage from "./AIMapPage"
import { requireAuth } from "../config/auth"

const Dashboard: React.FC = () => {
    requireAuth();
    const [isEmergency, setIsEmergency] = useState(false);
    const [showContactModal, setShowContactModal] = useState(false);
    const [activeTab, setActiveTab] = useState('driving');

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsEmergency(true);
        }, 15000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="min-h-screen bg-[#1c2025] text-white font-sans overflow-x-hidden p-4 md:p-8">
            <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-[250px_minmax(0,1fr)] lg:grid-cols-[300px_minmax(0,1fr)] gap-6 xl:gap-8 auto-rows-min">

                <div className="flex flex-col gap-6">
                    <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
                </div>

                <div className="flex flex-col gap-6 xl:gap-8 min-h-[80vh]">

                    {activeTab === 'driving' && (
                        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_350px] gap-6 xl:gap-8 h-full">

                            <div className="flex flex-col gap-4">

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <StatCard title="Driving Hours" value="10 hrs" />
                                    <StatCard title="Alertness Score" value="85%" />
                                    <StatCard title="Safe Driving Streak" value="5 Days" />
                                </div>

                                <StatCard title="Driving Patterns" className="h-[250px]">
                                    <MonthlyChart />
                                </StatCard>

                                <StatCard title="Fatigue Detection History" className="h-[250px]">
                                    <MonthlyChart />
                                </StatCard>

                                <div onClick={() => setShowContactModal(true)}>
                                    <StatCard title="Emergency Contact" value="John Doe" />
                                </div>
                            </div>

                            <div className="flex flex-col gap-6">
                                <ProfileBlock />

                                <StatCard title="Live GPS Navigation" className="h-[300px]" noPadding={true}>
                                    <div className="w-full h-full flex items-center justify-center p-6">
                                        <button
                                            onClick={() => setActiveTab('ai')}
                                            className="px-4 py-2 bg-blue-600 rounded text-white font-bold hover:bg-blue-700"
                                        >
                                            Activate AI
                                        </button>
                                    </div>
                                </StatCard>
                            </div>
                        </div>
                    )}

                    {activeTab === 'ai' && (
                        <AIMapPage
                            onBack={() => setActiveTab('driving')}
                            triggerEmergency={() => setShowContactModal(true)}
                        />
                    )}

                </div>
            </div>

            {showContactModal && (
                <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
                    <div className="bg-[#2a303c] p-6 rounded">
                        <h2>Emergency Contact</h2>
                        <p>John Doe: 1234567890</p>
                        <button onClick={() => setShowContactModal(false)}>Close</button>
                    </div>
                </div>
            )}

            <AlertBanner isActive={isEmergency} onCancel={() => setIsEmergency(false)} />
        </div>
    )
}

export default Dashboard