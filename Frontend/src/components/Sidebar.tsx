import React from 'react';
import { Car, User, Settings } from 'lucide-react';

interface SidebarProps {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
    return (
        <div className="flex flex-col gap-6 w-full h-full">
            {/* AI Assistant Block */}
            <div onClick={() => setActiveTab('ai')} className="bg-blue-600 rounded-lg p-6 flex flex-col items-center justify-center text-center text-white min-h-[250px] shadow-lg border border-blue-500 transition-transform hover:scale-[1.02] cursor-pointer">
                <div className="w-full bg-white text-blue-600 font-bold py-2 mb-4 rounded hover:bg-blue-50 transition-colors">
                    Activate AI
                </div>
                <p className="text-xs font-semibold mb-4 text-blue-100">Your AI-powered driving assistant</p>
                <div className="w-32 h-32 bg-slate-200/20 rounded-full flex items-center justify-center border-4 border-blue-400 animate-[pulse_4s_ease-in-out_infinite] shadow-[0_0_15px_rgba(255,255,255,0.3)] cursor-pointer">
                    <span className="text-sm font-bold tracking-widest text-white shadow-sm">ACTIVE</span>
                </div>
            </div>

            {/* Menu */}
            <div className="bg-white rounded p-4 flex flex-col gap-2 border border-slate-200 text-sm">
                <button 
                    onClick={() => setActiveTab('driving')}
                    className={`flex items-center gap-3 w-full text-left font-bold px-3 py-3 rounded transition-all ${activeTab === 'driving' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-blue-500'}`}
                >
                    <Car size={20} className={activeTab === 'driving' ? 'text-blue-600' : ''} /> Driving Mode
                </button>
                {/* <button 
                    onClick={() => setActiveTab('profile')}
                    className={`flex items-center gap-3 w-full text-left font-bold px-3 py-3 rounded transition-all ${activeTab === 'profile' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-blue-500'}`}
                >
                    <User size={20} className={activeTab === 'profile' ? 'text-blue-600' : ''} /> Profile
                </button>
                <button 
                    onClick={() => setActiveTab('settings')}
                    className={`flex items-center gap-3 w-full text-left font-bold px-3 py-3 rounded transition-all ${activeTab === 'settings' ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-50 hover:text-blue-500'}`}
                >
                    <Settings size={20} className={activeTab === 'settings' ? 'text-blue-600' : ''} /> Settings
                </button> */}
            </div>
        </div>
    );
};

export default Sidebar;
