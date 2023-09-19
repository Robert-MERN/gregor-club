import { createContext, useContext, useState } from 'react'
import { toast } from 'react-toastify';
import axios from "axios";
import cryptojs from "crypto-js";
import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';


const StateContext = createContext();



export const ContextProvider = ({ children }) => {
    const router = useRouter();

    const [landing_page_form, set_landing_page_form] = useState("signin");



    const handle_landing_page_form = (target) => {
        set_landing_page_form(target);
    };


    const [openSidebar, setOpenSidebar] = useState(true);
    const handleSidebar = () => {
        setOpenSidebar(prev => !prev);
    }
    const [sidebarTabs, setSidebarTabs] = useState("Mail Sender");
    const switchSidebarTabs = (target) => {
        setSidebarTabs(target);
    }

    const defaultModals = {
        select_players_modal: false,
        edit_campaign_modal: false,
        logout_modal: false,
        subscription_status_modal: false,
        add_edit_guests_fees_modal: false,
        restrict_hours_modal: false,
    };
    const [modals, setModals] = useState(defaultModals);
    const openModal = (key) => {
        setModals({ ...defaultModals, [key]: true });
    };
    const closeModal = (key) => {
        setModals({ ...defaultModals, [key]: false });
    };


    // loading state and error toastify for all api calls
    const [APIloading, setAPIloading] = useState(false);

    const toastConfig = {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        theme: "colored",
    }

    // user retreived from cookies
    const [cookieUser, setCookieUser] = useState(null);


    // logging in api
    const handleLoginAPI = async (user, redirect_url) => {
        setAPIloading(true)
        try {
            const res = await axios.post("/api/login", user);
            router.push("/home");
            toast.success(res.data.message, { ...toastConfig, toastId: "loginSuccess" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "loginFailure" });
        } finally {
            setAPIloading(false)
        }
    }

    // signing up api
    const [signupUser, setSignupUser] = useState(null);
    const handleSignupAPI = async (user) => {
        setAPIloading(true);
        try {
            const res = await axios.post("/api/signup", user);
            if (!user.adminAddingUser) router.push("/home");
            setSignupUser(null);
            deleteCookie("signupUser");
            toast.success(res.data.message, { ...toastConfig, toastId: "signupSuccess" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "signupFailure" });
            setSignupUser(null);
            deleteCookie("signupUser");
        } finally {
            setAPIloading(false)
        }
    }
    const [verificationCode, setVerificationCode] = useState("")

    const generateRandomNumber = () => {
        var minm = 100000;
        var maxm = 999999;
        return Math.floor(Math
            .random() * (maxm - minm + 1)) + minm;
    }

    const sendVerifyCodeToMail = async (KEY, email) => {
        const code6Digit = generateRandomNumber()
        setAPIloading(true)
        try {
            setVerificationCode(code6Digit.toString());
            // encryptingCode
            const encryptedCode = cryptojs.AES.encrypt(code6Digit.toString(), KEY).toString();

            const res = await axios.post("/api/sendAuthCode", { code: encryptedCode, email });
            toast.success(res.data.message, { ...toastConfig, toastId: "sendAuthCodeSuccess" });
        } catch (err) {
            setSignupUser(null);
            toast.error(err.response.data.message, { ...toastConfig, toastId: "sendAuthCodeFailure" });
            deleteCookie("signupUser");
        } finally {
            setAPIloading(false)
        }
    }


    // updating user api
    const handleUpdateUserAPI = async (obj, setUpdatingStatus, passwordStateRevert) => {
        setAPIloading(true);
        try {
            const res = await axios.put(`/api/updateUser/?userId=${cookieUser.id}`, {
                ...obj,
                _id: cookieUser.id,
            });
            passwordStateRevert();
            setUpdatingStatus(false);
            setCookieUser(res.data.updatedUser);
            toast.info(res.data.message, { ...toastConfig, toastId: "userUpdateSuccesfull" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "userUpdateFailure" });
        } finally {
            setAPIloading(false);
        }
    };



    // sending Mail API
    const handleSendingMail = async (data, reverse_states) => {
        setAPIloading(true)
        try {
            const res = await axios.post("/api/sendMail", data);
            toast.success(res.data.message, { ...toastConfig, toastId: "sendMailSuccess" });
            reverse_states();
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "sendMailFailure" });
        } finally {
            setAPIloading(false)
        }
    }







    // Campaigns State
    const [campaigns, setCampaigns] = useState([]);
    const [campaignsEmails, setCampaignsEmails] = useState([]);
    const [targetEditContact, setTargetEditContact] = useState(null);
    // Get All Campaigns API
    const handleGetAllCampaigns = async (userId, setLoading, limit, setCount, keywords) => {
        setLoading(true)
        try {
            const res = await axios.get(`/api/getAllCampaigns?userId=${userId}&limit=${limit}&keywords=${keywords}`);
            if (keywords) {
                setCampaigns(res.data);
            } else {
                setCampaigns(res.data.data);
                if (setCount) setCount(res.data.count);
            }
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "getAllCampaignFailure" });
        } finally {
            setLoading(false)
        }
    }

    // Creating Campaign API
    const handleCreateCampaign = async (data, userId) => {
        setAPIloading(true)
        try {
            const res = await axios.post(`/api/createCampaign?userId=${userId}`, data);
            handleGetAllCampaigns(userId, setAPIloading);
            toast.success(res.data.message, { ...toastConfig, toastId: "createCampaignSuccess" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "createCampaignFailure" });
        } finally {
            setAPIloading(false)
        }
    }

    // Updating Campaign API
    const handleUpdateCampaign = async (data, id) => {
        setAPIloading(true)
        try {
            const res = await axios.put(`/api/updateCampaign?id=${id}`, data);
            handleGetAllCampaigns(cookieUser.id, setAPIloading);
            toast.info(res.data.message, { ...toastConfig, toastId: "updateCampaignSuccess" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "updateCampaignFailure" });
        } finally {
            setAPIloading(false);
        }
    }

    // Deleting Campaign API
    const handleDeleteCampaign = async (id) => {
        setAPIloading(true)
        try {
            const res = await axios.delete(`/api/deleteCampaign?id=${id}`);
            handleGetAllCampaigns(cookieUser.id, setAPIloading);
            toast.error(res.data.message, { ...toastConfig, toastId: "deleteCampaignSuccess" });
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "deleteCampaignFailure" });
        } finally {
            setAPIloading(false)
        }
    }


    // user subscription check
    const [subStatus, setSubStatus] = useState(false);
    const [restrictedEvent, setRestrictedEvent] = useState("");
    const handleSubscriptionVerify = async (preventLoop) => {
        setAPIloading(true);
        try {
            const res = await axios.post("/api/userSubscriptionVerification", { id: cookieUser.id });
            setSubStatus(res.data.message);
            if (res.data.updatedUser) {
                preventLoop(true);
                setCookieUser(res.data.message);
            }
        } catch (err) {
            toast.error(err.response.data.message, { ...toastConfig, toastId: "userSusbscriptionVerifyFail" });
        } finally {
            setAPIloading(false);
        }

    }


    return (
        <StateContext.Provider
            value={{

                landing_page_form, handle_landing_page_form,

                handleSidebar, openSidebar, switchSidebarTabs, sidebarTabs,

                setSignupUser, signupUser, handleSignupAPI, sendVerifyCodeToMail, verificationCode, setVerificationCode,
                handleLoginAPI, handleUpdateUserAPI,

                handleSubscriptionVerify, subStatus, setSubStatus, restrictedEvent, setRestrictedEvent,

                APIloading, setAPIloading, setCookieUser, cookieUser,

                handleSendingMail,

                modals, openModal, closeModal,

                handleCreateCampaign, handleUpdateCampaign, handleDeleteCampaign, handleGetAllCampaigns, campaigns,
                targetEditContact, setTargetEditContact, campaignsEmails,



            }}
        >
            {children}
        </StateContext.Provider >
    )
}

const useStateContext = () => useContext(StateContext);
export default useStateContext;