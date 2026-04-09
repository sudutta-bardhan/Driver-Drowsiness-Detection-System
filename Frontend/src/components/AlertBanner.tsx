import React from 'react';

interface AlertBannerProps {
    isActive: boolean;
    onCancel: () => void;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ isActive, onCancel }) => {
    if (!isActive) return null;

    return (
        <div className="fixed bottom-0 left-0 w-full bg-[#ef4444] text-white p-6 z-50 flex flex-col items-center shadow-2xl animate-[pulse_2s_ease-in-out_infinite]">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide mb-1">Driver Unresponsive</h1>
            <p className="text-lg md:text-xl mb-6">Calling Emergency Contact...</p>
            
            <div className="flex flex-col gap-2 w-full max-w-sm">
                <div className="w-full bg-white h-2 mb-2 rounded"></div>
                <button 
                    onClick={onCancel}
                    className="w-full bg-[#f97316] hover:bg-orange-600 text-white font-bold py-3 px-4 text-lg border-2 border-[#ea580c]"
                >
                    Cancel
                </button>
                <button 
                    onClick={onCancel}
                    className="w-full bg-[#10b981] hover:bg-green-600 text-white font-bold py-3 px-4 text-lg border-2 border-[#059669]"
                >
                    Confirm
                </button>
            </div>
        </div>
    );
};

export default AlertBanner;
