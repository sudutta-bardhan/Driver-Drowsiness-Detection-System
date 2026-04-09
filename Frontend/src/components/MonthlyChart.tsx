import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts"

const data = [
    { month: "Jan", alerts: 3 },
    { month: "Feb", alerts: 6 },
    { month: "Mar", alerts: 2 },
    { month: "Apr", alerts: 7 },
    { month: "May", alerts: 4 },
    { month: "Jun", alerts: 5 }
]

const MonthlyChart = () => {
    return (
        <div className="w-full h-full p-2 flex items-center justify-center text-xs">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#525d73" vertical={false} />
                    <XAxis dataKey="month" stroke="#94a3b8" tickSize={0} tickMargin={10} />
                    <YAxis stroke="#94a3b8" tickSize={0} tickMargin={10} />
                    <Tooltip 
                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc' }} 
                        itemStyle={{ color: '#38bdf8' }}
                        cursor={{fill: '#334155', opacity: 0.4}}
                    />
                    <Bar dataKey="alerts" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default MonthlyChart