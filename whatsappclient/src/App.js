import { React, useState, createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/Forms/LoginForm";
import RegisterForm from "./components/Forms/RegisterForm";
import MainScreen from "./components/Forms/MainScreen";
import ChatsScreen from './components/Chat/ChatsScreen';

export const UserContext = createContext()

export default function App() {
    // Creates an active user and a setter using useState to share across paths.
    const [activeUser, setActiveUser] = useState('');

    return (
        <UserContext.Provider value={setActiveUser}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<MainScreen />} />
                    <Route path="/login" element={<LoginForm setActiveUser={setActiveUser} />} />
                    <Route path="/register" element={<RegisterForm setActiveUser={setActiveUser} />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                    <Route path="/chats" element={<ChatsScreen activeUser={activeUser} />} />
                    {/* <Route path="*" element={<Navigate to="/chats" replace />} /> */}
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}
