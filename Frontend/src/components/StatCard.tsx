import React from 'react';

interface StatCardProps {
    title: string;
    value?: string | React.ReactNode;
    children?: React.ReactNode;
    className?: string;
    noPadding?: boolean;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, children, className = '', noPadding = false }) => {
    return (
        <div className={`bg-[#363f4e] rounded border border-[#444f63] flex flex-col overflow-hidden ${noPadding ? '' : 'p-4'} ${className}`}>
            {!noPadding && <h3 className="text-sm font-bold text-white mb-2">{title}</h3>}
            {noPadding && <div className="p-4 pb-0"><h3 className="text-sm font-bold text-white">{title}</h3></div>}
            
            {value && <div className={`text-lg text-slate-200 font-medium ${noPadding ? 'px-4' : ''}`}>{value}</div>}
            <div className={`flex-grow ${noPadding ? 'mt-0' : 'mt-2'}`}>
                {children}
            </div>
        </div>
    );
};

export default StatCard;
