import axios from "axios";
import { createContext, useState, useEffect, useContext } from "react";

import { toast } from "sonner";

export const UserContext = createContext({})

export function useAuth() {
    return useContext(UserContext);
}

export function UserContextProvider({ children }) {
    const [currentUser, setCurrentUser] = useState("loading");
    const [userLoggedIn, setUserLoggedIn] = useState(false);
    const [fileList, setFileList] = useState();
    const [listAnalysis, setListAnalysis] = useState([]);
    const [jobList, setJobList] = useState([]);
    

    // function checkAdmin(email) {
    //     if (adminList.includes(email)) {
    //         dispatch(setAdmin(true));
    //     }
    // }

    async function fetchUser() {
        setCurrentUser("loading")
        const storedToken = localStorage.getItem("user_token");
        try {
            if (!currentUser || currentUser === "loading") {
                const { data } = await axios.get('/auth/users/me', { 
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                })
                if (data.username) {
                    setCurrentUser(data.username)
                    setUserLoggedIn(true);
                } else {
                    setCurrentUser(null);
                }
            }
        } catch (err) {
            // toast.error("Could not authenticate user");
            localStorage.removeItem("user_token");
            setCurrentUser(null)
        }
    }

    async function fetchAnalysis() {
        try {
            const {data} = await axios.get("/candidate/get_all_analysis")
            setListAnalysis(data);
        } catch(error) {
            toast.error("Could not fetch analysis")
        }
    }

    async function fetchJobs() {
        try {
            const {data} = await axios.get("/job/get_all_jobs")
            setJobList(data);
        } catch(error) {
            toast.error("Could not fetch jobs");
        }
    }

    // async function fetchFiles(parentId) {
    //     try {
    //         if (parentId) {
    //             const { data } = await axios.get(`/file/get?parentId=${parentId}`);
    //             setFileList(data)
    //         } else {
    //             const { data } = await axios.get(`/file/get?parentId=${null}`);
    //             // dispatch(setFileList(data));
    //             setFileList(data)
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // async function fetchAdmins() {
    //     try {
    //         const {data} = await axios.get('/admin/get')
    //         const adminEmail = data.filter(admin => admin.email);
    //         dispatch(setAdmin(adminEmail.some(admin => admin.email === user?.email)))
    //     } catch(error) {
    //         console.log(error)
    //     }
    // }

    // useEffect(() => {
    //     fetchAdmins();
    // }, [])
    // useEffect(() => {
    //     fetchAdmins();
    //     fetchUser();
    // }, [user]);

    useEffect(() => {
        if (currentUser === "loading") {
            fetchUser();
        }
        // fetchAdmins();
    }, [currentUser]);

    const valueToPass = {currentUser, setCurrentUser, userLoggedIn, setUserLoggedIn, fetchUser, fetchAnalysis, listAnalysis, fetchJobs, jobList}
    return (
        <UserContext.Provider value={valueToPass}>
            {children}
        </UserContext.Provider>
    )
}