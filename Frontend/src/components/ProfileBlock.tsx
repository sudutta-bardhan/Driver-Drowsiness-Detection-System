import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ProfileBlock: React.FC = () => {
    const [user, setUser] = useState<any>({});
    const [isEditing, setIsEditing] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    
    // Sync profile state with user data
    const [profile, setProfile] = useState({
        name: "",
        emergency: ""
    });

    // Fetch User Data
    const fetchUserData = () => {
        axios.get("http://localhost:2000/getUser", {
            headers: {
                Authorization: `Bearer ${window.localStorage.getItem("token")}`
            }
        }).then((res) => {
            const userData = res.data.user;
            setUser(userData);
            setProfile({
                name: userData?.userName || "",
                emergency: userData?.contactNumber || ""
            });
            window.localStorage.setItem("user", JSON.stringify(userData));
        }).catch(err => console.error("Error fetching user:", err));
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleSubmit = async () => {
        if (isEditing) {
            try {
                // Logic to update user details in Backend
                const response = await axios.put("http://localhost:2000/updateUser", 
                {
                    userName: profile.name,
                    contactNumber: profile.emergency
                }, 
                {
                    headers: {
                        Authorization: `Bearer ${window.localStorage.getItem("token")}`
                    }
                });

                if (response.data.user) {
                    setUser(response.data.user);
                    setShowSuccess(true);
                    setIsEditing(false);
                    setTimeout(() => setShowSuccess(false), 3000);
                }
            } catch (error) {
                console.error("Update failed:", error);
                alert("Failed to update profile. Please try again.");
            }
        } else {
            setIsEditing(true);
        }
    };

    return (
        <div className="bg-[#2a303c] rounded p-6 shadow border border-slate-700 h-full flex flex-col relative overflow-hidden">
            {showSuccess && (
                <div className="absolute top-0 left-0 w-full bg-green-500 text-white text-center py-1 text-sm font-bold animate-pulse z-10">
                    Profile Updated Successfully!
                </div>
            )}

            <div className="bg-white h-12 mb-6 mt-2 rounded flex items-center justify-center text-slate-800 font-bold px-4">
                Driver Record
            </div>

            <div className="flex flex-col gap-4 text-sm flex-grow">
                <div className="flex flex-col gap-1 border-b border-slate-700 py-1">
                    <span className="text-slate-400 text-xs uppercase tracking-wider">Name</span>
                    {isEditing ? (
                        <input 
                            value={profile.name} 
                            onChange={e => setProfile({ ...profile, name: e.target.value })} 
                            className="bg-[#1e2329] border border-slate-600 rounded px-2 py-1 text-white outline-none focus:border-blue-500" 
                        />
                    ) : (
                        <span className="text-slate-200">{user?.userName}</span>
                    )}
                </div>

                {!isEditing && (               
                    <div className="flex flex-col gap-1 border-b border-slate-700 py-1">
                        <span className="text-slate-400 text-xs uppercase tracking-wider">Email</span>
                        <span className="text-slate-200">{user?.email}</span>
                    </div>
                )}

                <div className="flex flex-col gap-1 py-1">
                    <span className="text-slate-400 text-xs uppercase tracking-wider">Contact</span>
                    {isEditing ? (
                        <input 
                            value={profile.emergency} 
                            onChange={e => setProfile({ ...profile, emergency: e.target.value })} 
                            className="bg-[#1e2329] border border-slate-600 rounded px-2 py-1 text-white outline-none focus:border-blue-500" 
                        />
                    ) : (
                        <span className="text-slate-200">{user?.contactNumber}</span>
                    )}
                </div>
            </div>

            <button
                onClick={handleSubmit}
                className={`w-full text-white font-bold py-3 mt-4 rounded transition-colors shadow ${isEditing ? 'bg-green-600 hover:bg-green-700' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
                {isEditing ? 'Save Changes' : 'Update Profile'}
            </button>
        </div>
    );
};

export default ProfileBlock;