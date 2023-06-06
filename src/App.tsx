import React, { useState } from "react";
import axios from "axios";

// Define a type for our user data
type UserData = {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    name: string;
    location: string;
    bio: string;
    public_repos: number;
    followers: number;
    following: number;
    totalStars: number;
    totalForks: number;
    repos: number;
};

export const App: React.FC = () => {
    const [username, setUsername] = useState("");
    const [userData, setUserData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(false);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleButtonClick = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:3000/user/${username}`);
            setUserData(response.data);
        } catch (error) {
            console.error("Error fetching user data: ", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Enter username"
            />
            <button onClick={handleButtonClick} disabled={loading}>
                {loading ? "Loading..." : "Get User Profile"}
            </button>
            {userData && (
                <div style={{ margin: "1em 0", padding: "1em", border: "1px solid #ddd", borderRadius: "5px" }}>
                    <img src={userData.avatar_url} alt="User Avatar" style={{ width: "100px", borderRadius: "50%" }} />
                    <h2>{userData.name}</h2>
                    <p>{userData.bio}</p>
                    <p>Location: {userData.location}</p>
                    <p>Public Repositories: {userData.public_repos}</p>
                    <p>Followers: {userData.followers}</p>
                    <p>Following: {userData.following}</p>
                    <p>Total Stars: {userData.totalStars}</p>
                    <p>Total Forks: {userData.totalForks}</p>
                    <p>Number of Repos: {userData.repos}</p>
                    <a href={userData.html_url} target="_blank" rel="noopener noreferrer">View GitHub Profile</a>
                </div>
            )}
        </div>
    );
};
