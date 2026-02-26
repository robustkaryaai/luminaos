'use client'

import React, { useState, useEffect, useRef } from 'react';
import { FaCloud, FaCloudSun, FaCloudShowersHeavy } from 'react-icons/fa';
import styles from "../styles/Homepage.module.css";
import { AiOutlineDownload, AiFillTwitterCircle, AiFillHome } from 'react-icons/ai'
import { BsFillLightningChargeFill, BsFillClockFill, BsWifiOff, BsWifi, BsWifi1, BsSearch, BsListTask } from 'react-icons/bs';
import { BiVolumeMute, BiVolumeFull, BiVolumeLow, BiLogOut } from 'react-icons/bi';
import { MdWidgets } from "react-icons/md";
import { VscFilePdf } from 'react-icons/vsc';
import { TbMessageChatbot } from 'react-icons/tb'
import { SiTorbrowser, SiFiles } from "react-icons/si";
import { TiWeatherCloudy } from 'react-icons/ti';
import { IoIosKeypad, IoMdAppstore, IoMdChatbubbles } from 'react-icons/io';
import { IoCalculator, IoSettingsSharp, IoCopy } from 'react-icons/io5';
import { FaPowerOff } from "react-icons/fa";
import { MdBattery20, MdBattery30, MdBattery50, MdBattery60, MdBattery80, MdBattery90, MdBatteryAlert, MdBatteryCharging20, MdBatteryCharging30, MdBatteryCharging50, MdBatteryCharging60, MdBatteryCharging80, MdBatteryCharging90, MdBatteryChargingFull, MdBatteryFull, MdOutlineOpenInNew } from 'react-icons/md';
import dynamic from 'next/dynamic';
import CustomCursor from './CustomCursor';
import Draggable from 'react-draggable';
import { Client, Storage } from 'appwrite';
import { BsFacebook } from 'react-icons/bs';
import { AiFillInstagram } from 'react-icons/ai';
import { FaXTwitter } from 'react-icons/fa';
import { BsWhatsapp } from 'react-icons/bs';
import { BsSpotify } from 'react-icons/bs';
import { FaTiktok } from 'react-icons/fa';
import { FaSnapchatGhost } from 'react-icons/fa';
import { AiFillLinkedin } from 'react-icons/ai';
import { BsPinterest } from 'react-icons/bs';
import { BsSkype } from 'react-icons/bs';
import { BiLogoZoom } from 'react-icons/bi';
import { TbBrandOffice } from 'react-icons/tb';
import { FaGoogleDrive } from 'react-icons/fa';
import { BiLogoGmail } from 'react-icons/bi';
import { AiFillYoutube } from 'react-icons/ai';
import { RiNetflixFill } from 'react-icons/ri';
import { SiAmazonprime } from 'react-icons/si';
import { BiLogoAirbnb } from 'react-icons/bi';
import { SiUber } from 'react-icons/si';
import { FaLyft } from 'react-icons/fa';
import { FaEvernote } from 'react-icons/fa';
import { BsTrello } from 'react-icons/bs';
import { ImDropbox } from 'react-icons/im';
import { BsSlack } from 'react-icons/bs';
import { SiAsana } from 'react-icons/si';
import { SiAdobephotoshop } from 'react-icons/si';
import { SiGooglephotos } from 'react-icons/si';
import { SiGoogledocs } from 'react-icons/si';
import { SiGooglesheets } from 'react-icons/si';
import { SiGoogleslides } from 'react-icons/si';
import { TbBrandOnedrive } from 'react-icons/tb';
import { FiGithub } from 'react-icons/fi';
import { PiNotionLogoBold } from 'react-icons/pi';
import { SiCanva } from 'react-icons/si';
import { BsVimeo } from 'react-icons/bs';
import { SiHulu } from 'react-icons/si';
import { PiTidalLogoBold } from 'react-icons/pi';
import { BiLogoAudible } from 'react-icons/bi';
import { SiZomato, SiSwiggy } from 'react-icons/si';
import { SiMicrosoftword, SiMicrosoftexcel, SiMicrosoftpowerpoint } from 'react-icons/si';

// Import PdfViewer dynamically to prevent SSR issues
const PdfViewer = dynamic(() => import('./PdfViewer'), {
    ssr: false,
    loading: () => <div>Loading PDF viewer...</div>
});

const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

const client = new Client();
const storage = new Storage(client);

client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_URL)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

const Home = ({ onTextBoxHover, onTextBoxLeave }) => {
    const [activeApp, setActiveApp] = useState(null);
    const [name, setName] = useState('Sparkus');
    const [batteryLevel, setBatteryLevel] = useState(null);
    const [wifiStrength, setWifiStrength] = useState(0);
    const [isOnline, setIsOnline] = useState(true);
    const [isCharging, setIsCharging] = useState(false);
    const [batterySupported, setBatterySupported] = useState(true);
    const [url, setUrl] = useState("https://en.wikipedia.org");
    const [num, setNum] = useState(8);
    const iframeRef = useRef(null);
    const resultRef = useRef(null);
    const lumiNexRef = useRef(null);
    const clockRef = useRef(null);
    const browserRef = useRef(null);
    const whatsappRef = useRef(null);
    const calcRef = useRef(null);
    const storeRef = useRef(null);
    const settingsRef = useRef(null);
    const chatRef = useRef(null);
    const weatherRef = useRef(null);
    const [outputText, setOutputText] = useState('');
    const [selectedSection, setSelectedSection] = useState('Home');
    const [selectedFileURL, setSelectedFileURL] = useState("");
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [dropdown, setDropdown] = useState(false);
    const [selectedClockWindow, setSelectedClockWindow] = useState("Clock");
    const [stopClock, setStopClock] = useState("00:00:00");
    const [isStopClockRunning, setIsStopClockRunning] = useState(false);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [remainingTime, setRemainingTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const [cloudPct, setCloudPct] = useState(0);
    const [volume, setVolume] = useState(0);
    const [isMuted, setIsMuted] = useState(false);
    const [appInstalled, setAppInstalled] = useState([]);
    const [showStartMenu, setShowStartMenu] = useState(false);
    const [showSearchMenu, setShowSearchMenu] = useState(false);
    const [selectedSettingsSection, setSelectedSettingsSection] = useState("General");
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [AIValue, setAIValue] = useState(false)
    const [showTaskView, setShowTaskView] = useState(false);
    const [aiEnabled, setAiEnabled] = useState(true);
    const [userInstalledApps, setUserInstalledApps] = useState([]);
    const [installingApps, setInstallingApps] = useState([]);
    const [desktops, setDesktops] = useState([{ id: 1, name: "Desktop 1" }]);
    const [currentDesktop, setCurrentDesktop] = useState(1);
    const [appToDesktopMap, setAppToDesktopMap] = useState({});
    const [searchPlaceholder, setSearchPlaceholder] = useState("Type here to search...");
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [year, month] = [selectedDate.getFullYear(), selectedDate.getMonth()];
    const [weatherData, setWeatherData] = useState();
    const [city, setCity] = useState();
    const [clipboardHistory, setClipboardHistory] = useState([]);
    const [showWidget, setShowWidget] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [appName, setAppName] = useState("");
    const [appDesc, setAppDesc] = useState("");
    const [fileList, setFileList] = useState([]);
    const [storedFileIds, setStoredFileIds] = useState("");
    const [sparkDriveDropdown, setSparkDriveDropdown] = useState(false);
    const [quickDropdown, setQuickDropdown] = useState(false);
    const [luminaApps, setLuminaApps] = useState([
        { name: "Facebook", icon: <BsFacebook className={styles.AppIcon} /> },
        { name: "Instagram", icon: <AiFillInstagram className={styles.AppIcon} /> },
        // { name: "Twitter (X)", icon: <FaXTwitter className={styles.AppIcon} /> },
        { name: "WhatsApp", icon: <BsWhatsapp className={styles.AppIcon} /> },
        { name: "Spotify", icon: <BsSpotify className={styles.AppIcon} /> },
        { name: "TikTok", icon: <FaTiktok className={styles.AppIcon} /> },
        { name: "Snapchat", icon: <FaSnapchatGhost className={styles.AppIcon} /> },
        { name: "LinkedIn", icon: <AiFillLinkedin className={styles.AppIcon} /> },
        { name: "Pinterest", icon: <BsPinterest className={styles.AppIcon} /> },
        { name: "Skype", icon: <BsSkype className={styles.AppIcon} /> },
        // { name: "Zoom", icon: <BiLogoZoom className={styles.AppIcon} /> },
        { name: "Microsoft Office Suite (Word, Excel, PowerPoint)", icon: <TbBrandOffice className={styles.AppIcon} /> },
        { name: "Google Drive", icon: <FaGoogleDrive className={styles.AppIcon} /> },
        // { name: "Gmail", icon: <BiLogoGmail className={styles.AppIcon} /> },
        // { name: "YouTube", icon: <AiFillYoutube className={styles.AppIcon} /> },
        { name: "Netflix", icon: <RiNetflixFill className={styles.AppIcon} /> },
        { name: "Amazon Prime Video", icon: <SiAmazonprime className={styles.AppIcon} /> },
        // { name: "Airbnb", icon: <BiLogoAirbnb className={styles.AppIcon} /> },
        { name: "Uber", icon: <SiUber className={styles.AppIcon} /> },
        { name: "Lyft", icon: <FaLyft className={styles.AppIcon} /> },
        { name: "Evernote", icon: <FaEvernote className={styles.AppIcon} /> },
        { name: "Trello", icon: <BsTrello className={styles.AppIcon} /> },
        { name: "Dropbox", icon: <ImDropbox className={styles.AppIcon} /> },
        { name: "Slack", icon: <BsSlack className={styles.AppIcon} /> },
        { name: "Asana", icon: <SiAsana className={styles.AppIcon} /> },
        // { name: "Microsoft Word Online", icon: <PiMicrosoftWordLogoFill className={styles.AppIcon} /> },
        // { name: "Microsoft Excel Online", icon: <PiMicrosoftExcelLogoFill className={styles.AppIcon} /> },
        // { name: "Microsoft PowerPoint Online", icon: <PiMicrosoftPowerpointLogoFill className={styles.AppIcon} /> },
        { name: "Adobe Photoshop Express", icon: <SiAdobephotoshop className={styles.AppIcon} /> },
        // { name: "Google Photos", icon: <SiGooglephotos className={styles.AppIcon} /> },
        // { name: "Google Docs", icon: <SiGoogledocs className={styles.AppIcon} /> },
        // { name: "Google Sheets", icon: <SiGooglesheets className={styles.AppIcon} /> },
        // { name: "Google Slides", icon: <SiGoogleslides className={styles.AppIcon} /> },
        { name: "OneDrive", icon: <TbBrandOnedrive className={styles.AppIcon} /> },
        { name: "GitHub", icon: <FiGithub className={styles.AppIcon} /> },
        // { name: "Notion", icon: <PiNotionLogoBold className={styles.AppIcon} /> },
        { name: "Canva", icon: <SiCanva className={styles.AppIcon} /> },
        { name: "Vimeo", icon: <BsVimeo className={styles.AppIcon} /> },
        { name: "Hulu", icon: <SiHulu className={styles.AppIcon} /> },
        // { name: "Tidal", icon: <PiTidalLogoBold className={styles.AppIcon} /> },
        // { name: "Audible", icon: <BiLogoAudible className={styles.AppIcon} /> },
        { name: "Zomato", icon: <SiZomato className={styles.AppIcon} /> },
        { name: "Swiggy", icon: <SiSwiggy className={styles.AppIcon} /> },
    ]);
    const [storeDragging, setStoreDragging] = useState(false);
    const [storePosition, setStorePosition] = useState({ x: 0, y: 0 });
    const [notificationDropdown, setNotificationDropdown] = useState(false);
    const [notificationHistory, setNotificationHistory] = useState([]);
    const [selectedWeatherView, setSelectedWeatherView] = useState("Current");
    const [weatherSearchQuery, setWeatherSearchQuery] = useState("");
    const [osVersion, setOsVersion] = useState('1.3');
    const [latestVersion, setLatestVersion] = useState(null);
    const [updateChecking, setUpdateChecking] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const [updateProgress, setUpdateProgress] = useState(0);
    const [updateStatus, setUpdateStatus] = useState('');
    const [offlineBundle, setOfflineBundle] = useState(null);
    const [zTop, setZTop] = useState(100);
    const setThemeVars = (vars, name) => {
        Object.entries(vars).forEach(([k, v]) => {
            document.documentElement.style.setProperty(k, v);
        });
        document.body.style.background = vars['--bg-color'];
        document.body.style.color = vars['--text-color'];
        localStorage.setItem('Theme', name);
    };
    const compareVersion = (a, b) => {
        const pa = String(a).split('.').map(n => parseInt(n || '0', 10));
        const pb = String(b).split('.').map(n => parseInt(n || '0', 10));
        const len = Math.max(pa.length, pb.length);
        for (let i = 0; i < len; i++) {
            const da = pa[i] || 0;
            const db = pb[i] || 0;
            if (da > db) return 1;
            if (da < db) return -1;
        }
        return 0;
    };
    const FEATURES = {
        missionControlDelete: '1.3',
        clickToFront: '1.3',
    };
    const enabled = (key) => compareVersion(osVersion, FEATURES[key] || '0.0.0') >= 0;
    const bringToFront = (id) => {
        try {
            const el = document.getElementById(id);
            if (el) {
                setZTop(prev => {
                    const next = prev + 1;
                    el.style.zIndex = String(next);
                    return next;
                });
            }
            setActiveApp(id);
        } catch {}
    };
    const getThemeVarsByName = (name) => {
        if (name === 'Light') {
            return {
                '--bg-color': '#f1f5f9',
                '--text-color': '#1e293b',
                '--accent-color': '#4f46e5',
                '--panel-bg': '#ffffff',
                '--border-color': 'rgba(0,0,0,0.12)'
            };
        }
        if (name === 'OLED') {
            return {
                '--bg-color': '#000000',
                '--text-color': '#ffffff',
                '--accent-color': '#10b981',
                '--panel-bg': '#111111',
                '--border-color': 'rgba(255,255,255,0.25)'
            };
        }
        if (name === 'Midnight') {
            return {
                '--bg-color': '#0b0b17',
                '--text-color': '#e9d5ff',
                '--accent-color': '#9b59f5',
                '--panel-bg': '#1a1030',
                '--border-color': 'rgba(155,89,245,0.3)'
            };
        }
        if (name === 'Ocean') {
            return {
                '--bg-color': '#071924',
                '--text-color': '#d1f4ff',
                '--accent-color': '#22d3ee',
                '--panel-bg': '#0b2433',
                '--border-color': 'rgba(34,211,238,0.3)'
            };
        }
        if (name === 'Solarized') {
            return {
                '--bg-color': '#002b36',
                '--text-color': '#93a1a1',
                '--accent-color': '#b58900',
                '--panel-bg': '#073642',
                '--border-color': 'rgba(147,161,161,0.25)'
            };
        }
        if (name === 'HighContrast') {
            return {
                '--bg-color': '#000000',
                '--text-color': '#ffffff',
                '--accent-color': '#ffcc00',
                '--panel-bg': '#111111',
                '--border-color': 'rgba(255,255,255,0.45)'
            };
        }
        return {
            '--bg-color': '#06091a',
            '--text-color': '#f8fafc',
            '--accent-color': '#9b59f5',
            '--panel-bg': '#0a0e20',
            '--border-color': 'rgba(255,255,255,0.12)'
        };
    };
    const checkForUpdates = async () => {
        try {
            setUpdateChecking(true);
            setUpdateStatus('Checking for updates...');
            await new Promise(res => setTimeout(res, 1500));
            const simulatedLatest = '1.4';
            setLatestVersion(simulatedLatest);
            setUpdateStatus(`Latest version ${simulatedLatest} found`);
        } finally {
            setUpdateChecking(false);
        }
    };
    const startUpdateDownload = async () => {
        if (!latestVersion) {
            setUpdateStatus('No update available. Please check for updates first.');
            return;
        }
        setIsUpdating(true);
        setUpdateProgress(0);
        setUpdateStatus('Downloading update...');
        const start = Date.now();
        const durationMs = 2 * 60 * 1000;
        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            const pct = Math.min(100, Math.round((elapsed / durationMs) * 100));
            setUpdateProgress(pct);
            if (pct >= 100) {
                clearInterval(interval);
                localStorage.setItem('OSVersion', latestVersion);
                setOsVersion(latestVersion);
                setUpdateStatus('Update downloaded. Restarting OS...');
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
                setIsUpdating(false);
            }
        }, 500);
    };
    useEffect(() => {
        const saved = localStorage.getItem('Theme');
        const vars = getThemeVarsByName(saved || 'Dark');
        setThemeVars(vars, saved || 'Dark');
    }, []);
    useEffect(() => {
        const savedVersion = localStorage.getItem('OSVersion');
        if (savedVersion) setOsVersion(savedVersion);
    }, []);

    useEffect(() => {
        // Multi-Desktop window visibility manager
        const allAppIds = ["LumiNexplorer", "Clock", "Calculator", "Browser", "Store", "Weather", "Chat", "Chat1", "WhatsApp", "Settings", "PDFViewer"];
        allAppIds.forEach(id => {
            const el = document.getElementById(id);
            if (el) {
                // If it has a desktop assigned, and it's not the current one, hide it.
                if (appToDesktopMap[id] && appToDesktopMap[id] !== currentDesktop) {
                    el.style.display = "none";
                } else if (el.style.display === "none" && appToDesktopMap[id] === currentDesktop) {
                    // Restore it if it was open
                    if (activeApp === id || (el.style.height && el.style.height !== "0vh")) {
                        el.style.display = "flex";
                    }
                }
            }
        });
    }, [currentDesktop, appToDesktopMap, activeApp]);

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (storeDragging) {
                setStorePosition({ x: e.clientX, y: e.clientY });
            }
        };

        const handleMouseUp = () => {
            setStoreDragging(false);
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [storeDragging]);


    // function isTotalSizeValid(files, maxSizeInMB) {
    //     const maxSizeInBytes = maxSizeInMB * 1024 * 1024; // Convert MB to bytes
    //     let totalSize = 0;

    //     for (const file of files) {
    //         totalSize += file.size;
    //     }

    //     return totalSize <= maxSizeInBytes;
    // }

    // // Example usage:
    // const maxSize = 200; // Maximum size in megabytes
    // const files = 2;

    // if (isTotalSizeValid(files, maxSize)) {
    //     console.log('Total file size is within the allowed limit.');
    // } else {
    //     console.log('Total file size exceeds the allowed limit.');
    // }
    const storeFileId = (fileId) => {
        const storedFileIds = localStorage.getItem('fileIds');
        const fileIds = storedFileIds ? JSON.parse(storedFileIds) : [];
        fileIds.push({ fileId });
        localStorage.setItem('fileIds', JSON.stringify(fileIds));
    };

    useEffect(() => {
        const getthestoredFileIds = localStorage.getItem('fileIds');
        setStoredFileIds(JSON.parse(getthestoredFileIds));
        console.log(storedFileIds);
        if (storedFileIds) {
            async function fetchFiles() {
                const files = await Promise.all(
                    storedFileIds.map(async (fileId) => {
                        try {
                            const file = await storage.getFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, fileId);
                            console.log("Files retrieved!");
                            return file;
                        } catch (error) {
                            console.error(`Error fetching file ${fileId}:`, error);
                            return null;
                        }
                    })
                );

                setFileList(files.filter((file) => file !== null));
                console.log(fileList);
            }
            fetchFiles();
        }
    }, []);

    const handleDelete = async (fileId) => {
        try {
            await storage.deleteFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, fileId);
            const updatedFileList = fileList.filter((file) => file.$id !== fileId);
            setFileList(updatedFileList);
        } catch (error) {
            console.error(`Error deleting file ${fileId}:`, error);
        }
    };

    const handleUpload = async (event) => {
        event.preventDefault();

        const fileInput = document.getElementById('uploader');
        if (!fileInput.files[0]) {
            alert('No file selected.');
            return;
        }

        const file = fileInput.files[0];
        const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        // Generate a unique ID
        const randomLetters = Array.from({ length: 3 }, () => letters[Math.floor(Math.random() * letters.length)]);
        const uniqueId = `${Date.now()}${Math.random().toString(36).substr(2, 9)}${randomLetters.join('')}`;
        console.log(file)
        console.log(randomLetters)
        console.log(uniqueId)
        try {
            const response = await storage.createFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, uniqueId, file);
            console.log(response); // Success
            storeFileId(uniqueId); // Store the file ID in localStorage
            const getthestoredFileIds = localStorage.getItem('fileIds');
            setStoredFileIds(JSON.parse(getthestoredFileIds));
            if (storedFileIds) {
                async function fetchFiles() {
                    const files = await Promise.all(
                        storedFileIds.map(async (fileId) => {
                            try {
                                const file = await storage.getFile(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, fileId);
                                console.log("Files retrieved!");
                                return file;
                            } catch (error) {
                                console.error(`Error fetching file ${fileId}:`, error);
                                return null;
                            }
                        })
                    );

                    setFileList(files.filter((file) => file !== null));
                    console.log(fileList);
                }
                fetchFiles();
            }
        } catch (error) {
            console.error(error); // Failure
        }
    };

    useEffect(() => {
        try {
            // Load notification history from local storage on component mount
            const storedNotifications = JSON.parse(localStorage.getItem('Notifications')) || [];
            setNotificationHistory(storedNotifications);
        } catch (error) {
            console.error('Error parsing JSON:', error);
            // Handle the error as needed, e.g., set a default value for notificationHistory
            setNotificationHistory([]);
        }
    }, []);

    const showNotificationFunction = (AppName, AppDesc) => {
        setShowNotification(true);
        setAppName(AppName);
        setAppDesc(AppDesc);
        const newNotification = [AppName, AppDesc];

        // Update notification history in state
        setNotificationHistory((prevHistory) => [...prevHistory, newNotification]);

        // Update notification history in local storage
        localStorage.setItem('Notifications', JSON.stringify([...notificationHistory, newNotification]));

        // Note: The console.log below won't display the updated state immediately
        // due to the asynchronous nature of setState.
        console.log(localStorage.getItem('Notifications'));

        setTimeout(() => {
            setShowNotification(false);
        }, 5000);
    };

    const removeNotification = (index) => {
        // Create a copy of the current notificationHistory
        const updatedHistory = [...notificationHistory];

        // Remove the notification at the specified index
        updatedHistory.splice(index, 1);

        // Update the state with the modified notificationHistory
        setNotificationHistory(updatedHistory);

        // Update local storage
        localStorage.setItem('Notifications', JSON.stringify(updatedHistory));
    };

    const closeNotification = () => {
        setShowNotification(false);
    };

    const handleCopy = async () => {
        try {
            const text = await navigator.clipboard.readText();
            if (text) {
                const newHistoryItem = {
                    text: text,
                    timestamp: new Date().toISOString(),
                };
                const newHistory = [...clipboardHistory, newHistoryItem];
                setClipboardHistory(newHistory);
                localStorage.setItem('clipboardHistory', JSON.stringify(newHistory));
            }
        } catch (error) {
            console.log('Error reading clipboard:', error);
        }
    };

    const appData = [
        { name: "Vertice", icon: "Vertice" },
        { name: "LumiNexplorer", icon: "LumiNexplorer" },
        { name: "Clock", icon: "Clock" },
        { name: "Store", icon: "Store" },
        { name: "Weather", icon: "Weather" },
        { name: "ChatExp...", icon: "Chat" },
        { name: "Settings", icon: "Settings" },
    ];

    useEffect(() => {
        const storedHistory = JSON.parse(localStorage.getItem('clipboardHistory'));
        if (storedHistory) {
            setClipboardHistory(storedHistory);
        }

        // Start checking the clipboard every second
        const interval = setInterval(handleCopy, 1000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    const isCurrentDate = (date) =>
        date.toDateString() === selectedDate.toDateString();

    const handlePrevMonth = () => {
        setSelectedDate(new Date(year, month - 1));
    };

    const handleNextMonth = () => {
        setSelectedDate(new Date(year, month + 1));
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    const renderCalendarDays = () => {
        const days = [];
        for (let day = 1; day <= daysInMonth; day++) {
            const currentDate = new Date(year, month, day);
            days.push(
                <div
                    className={`${styles.calendarDate} ${isCurrentDate(currentDate) ? styles.currentDateGlow : ''
                        }`}
                    key={currentDate.toDateString()}
                    onClick={() => handleDateClick(currentDate)}
                >
                    {day}
                </div>
            );
        }
        return days;
    };

    const handleAIClick = () => {
        if (AIValue == false) {
            setSearchPlaceholder("Type here to ask RK AI...");
            setAIValue(true);
        } else {
            setSearchPlaceholder("Type here to search...");
            setAIValue(false);
            setOutputText("")
        }
    };

    const handleChange = (e) => {
        setSearchQuery(e.target.value);
    }

    const handleSearch = async (e) => {
        const query = document.getElementById("SearchBar").value;
        if (AIValue == false) {
            if (query.length > 0) {
                setSearchQuery(query);

                const filteredApps = appInstalled.filter(app =>
                    app.Name.toLowerCase().includes(query.toLowerCase())
                );

                setSearchResults(filteredApps);
            } else {
                setSearchQuery('');
                setSearchResults([]);
            }
        } else {
            e.preventDefault();
            try {
                setOutputText("Generating results for you...");
                console.log('Sending request to Gemini API...');

                const response = await fetch('/api/GetAIResults', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message: query })
                });

                console.log('Response status:', response.status);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(`API Error: ${errorData.error || response.statusText}`);
                }

                const data = await response.text();
                console.log('Received response:', data.substring(0, 100) + '...');

                // Display with typewriter animation
                const completeResponse = data.trim();
                setOutputText('');

                let currentIndex = 0;
                const typeWriter = () => {
                    if (currentIndex < completeResponse.length) {
                        const currentText = completeResponse.slice(0, currentIndex + 1);
                        setOutputText(currentText);
                        currentIndex++;
                        setTimeout(typeWriter, 30);
                    }
                };

                typeWriter();
            } catch (error) {
                console.error('Gemini API error:', error);
                setOutputText(`Error: ${error.message}. Please check your API key and try again.`);
            }
        }
    };

    useEffect(() => {
        if (!localStorage.getItem("AppInstalled")) {
            const defaultApps = [
                { Name: "LumiNexplorer", Icon: "LumiNexplorer" },
                { Name: "Calculator", Icon: "LumiNexplorer" },
                { Name: "Clock", Icon: "Clock" },
                { Name: "Weather", Icon: "Weather" },
                { Name: "ChatExpress", Icon: "Chat" },
                { Name: "Store", Icon: "Store" },
                { Name: "PDFViewer", Icon: "PDFViewer" },
                { Name: "Vertice", Icon: "Vertice" },
                { Name: "Settings", Icon: "Settings" },
            ];
            localStorage.setItem("AppInstalled", JSON.stringify(defaultApps));
            setAppInstalled(defaultApps);
        } else {
            const storedApps = localStorage.getItem("AppInstalled");
            if (storedApps) {
                setAppInstalled(JSON.parse(storedApps));
            }
        }
    }, []);

    useEffect(() => {
        let interval;
        if (isRunning) {
            interval = setInterval(() => {
                setRemainingTime((prevTime) => {
                    if (prevTime <= 0) {
                        setIsRunning(false);
                        showNotificationFunction("Timer", "Time's up.")
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isRunning]);

    const handleStart = () => {
        const totalTimeInSeconds = hours * 3600 + minutes * 60 + seconds;
        setRemainingTime(totalTimeInSeconds);
        setIsRunning(true);
    };

    const handleStop = () => {
        setIsRunning(false);
    };

    const handleReset = () => {
        setRemainingTime(0);
        setHours(0);
        setMinutes(0);
        setSeconds(0);
        setIsRunning(false);
    };

    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;
        return `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const startTimer = () => {
        setIsStopClockRunning(true);
    };

    const resetTimer = () => {
        setIsStopClockRunning(false);
        setStopClock("00:00:00")
    }

    useEffect(() => {
        let interval;
        if (isStopClockRunning) {
            interval = setInterval(() => {
                // Split the timer into hours, minutes, and seconds
                const [hourStr, minuteStr, secondStr] = stopClock.split(':');
                let hour = parseInt(hourStr, 10);
                let minute = parseInt(minuteStr, 10);
                let second = parseInt(secondStr, 10);

                // Increment the second
                second++;
                if (second >= 60) {
                    second = 0;
                    minute++;
                    if (minute >= 60) {
                        minute = 0;
                        hour++;
                    }
                }

                // Convert the values to strings with leading zeros if necessary
                const hourStrNew = hour < 10 ? `0${hour}` : `${hour}`;
                const minuteStrNew = minute < 10 ? `0${minute}` : `${minute}`;
                const secondStrNew = second < 10 ? `0${second}` : `${second}`;

                setStopClock(`${hourStrNew}:${minuteStrNew}:${secondStrNew}`);
            }, 1000);
        }

        // Clean up the interval on unmount or when the timer stops
        return () => clearInterval(interval);
    }, [stopClock, isStopClockRunning]);

    const stopTimer = () => {
        setIsStopClockRunning(false);
    };

    useEffect(() => {
        try {
            const storedFiles = localStorage.getItem('uploadedFiles');
            if (storedFiles) {
                const parsedFiles = JSON.parse(storedFiles);
                setUploadedFiles(parsedFiles);
            }
        } catch (error) {
            console.error(error);
            localStorage.removeItem('uploadedFiles');
        }
    }, []);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = () => {
            const fileDataUrl = reader.result;
            const newFile = {
                name: file.name,
                type: file.type,
                dataUrl: fileDataUrl,
            };
            const allFiles = [...uploadedFiles, newFile]
            setUploadedFiles(allFiles)
            localStorage.setItem("uploadedFiles", JSON.stringify(allFiles))
        };

        reader.readAsDataURL(file);
    };

    const handleDownload = (file) => {
        const reader = new FileReader();
        reader.onload = () => {
            const downloadLink = document.createElement('a');
            downloadLink.href = reader.result;
            downloadLink.download = file.name;
            downloadLink.click();
        };
        reader.readAsDataURL(file);
    };

    const handleSectionClick = (section) => {
        setSelectedSection(section);
    };

    useEffect(() => {
        if (localStorage.getItem("WallpaperNumber")) {
            setNum(localStorage.getItem("WallpaperNumber"));
        }
        let me = localStorage.getItem("first");
        if (!me) {
            const output = document.getElementById("output");
            const data = "Welcome to LuminaOS Web Version (preview)! Let's have a dive in the preview with the power of Lumina :)"
            document.getElementById("result").style.width = "74vh";
            document.getElementById("result").style.padding = "1vh 2vh";
            output.innerHTML = "";
            var index = 0;
            function showLetter() {
                if (index < data.length) {
                    // Use slice to get the exact text up to current position
                    output.textContent = data.slice(0, index + 1);
                    index++;
                    setTimeout(showLetter, 50);
                }
            }
            showLetter();
            localStorage.setItem("first", "true")
        }
    }, [])

    const changeUrl = (targetedUrl) => {
        if (iframeRef.current) {
            iframeRef.current.src = targetedUrl;
        }
    };

    const handleIframeLoad = () => {
        if (iframeRef.current) {
            const currentUrl = iframeRef.current.src;
            changeUrl(currentUrl);
            setUrl(currentUrl)
                (url)
                (iframeRef.current.src)
        }
    };

    useEffect(() => {
        setInterval(() => {
            const handleConnectionChange = () => {
                setWifiStrength(navigator.connection.rssi);
                setIsOnline(navigator.onLine);
            };
            window.addEventListener('online', handleConnectionChange);
            window.addEventListener('offline', handleConnectionChange);
            navigator.connection.addEventListener('change', handleConnectionChange);

            return () => {
                window.removeEventListener('online', handleConnectionChange);
                window.removeEventListener('offline', handleConnectionChange);
                navigator.connection.removeEventListener('change', handleConnectionChange);
            };
        }, 1000);
    }, []);

    useEffect(() => {
        let interval;
        let batteryRef;
        const update = () => {
            if (!batteryRef) return;
            const lvl = batteryRef.level != null ? Math.round(batteryRef.level * 100) : null;
            setBatteryLevel(lvl);
            setIsCharging(!!batteryRef.charging);
        };
        const init = async () => {
            try {
                if (typeof navigator !== 'undefined' && typeof navigator.getBattery === 'function') {
                    batteryRef = await navigator.getBattery();
                    update();
                    batteryRef.addEventListener?.('levelchange', update);
                    batteryRef.addEventListener?.('chargingchange', update);
                } else if (navigator && (navigator.battery || navigator.webkitBattery || navigator.mozBattery)) {
                    batteryRef = navigator.battery || navigator.webkitBattery || navigator.mozBattery;
                    update();
                    if ('onlevelchange' in batteryRef) batteryRef.onlevelchange = update;
                    if ('onchargingchange' in batteryRef) batteryRef.onchargingchange = update;
                } else {
                    setBatterySupported(false);
                    return;
                }
                if (!batteryRef.addEventListener && !('onlevelchange' in batteryRef)) {
                    interval = setInterval(update, 30000);
                }
            } catch (e) {
                setBatterySupported(false);
            }
        };
        init();
        return () => {
            try {
                batteryRef?.removeEventListener?.('levelchange', update);
                batteryRef?.removeEventListener?.('chargingchange', update);
            } catch {}
            if (interval) clearInterval(interval);
        };
    }, []);

    useEffect(() => {
        setName(localStorage.getItem("Name") || "Sparkus");
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const query = document.getElementById("input").value;

            if (document.getElementById("result").innerHTML === "") {
                document.getElementById("result").innerHTML = `
                    <div onClick={closeResults} id="closeResult" className={styles.closeResult}></div>
                    <h1>RK AI:</h1>
                    <br />
                    <p id="output">${outputText}</p>
                `;
            }

            document.getElementById("result").style.width = "74vh";
            document.getElementById("result").style.padding = "1vh 2vh";
            setOutputText("Generating results for you...");

            const response = await fetch('/api/GetAIResults', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: query })
            });

            const data = await response.text();
            setOutputText('');

            // Display with typewriter animation
            const completeResponse = data.trim();

            let currentIndex = 0;
            const typeWriter = () => {
                if (currentIndex < completeResponse.length) {
                    const currentText = completeResponse.slice(0, currentIndex + 1);
                    setOutputText(currentText);
                    currentIndex++;
                    setTimeout(typeWriter, 30);
                }
            };

            typeWriter();
        } catch (error) {
            alert("Sorry! Some error occurred!");
            console.error(error);
            setOutputText(error.toString());
        }
    };

    useEffect(() => {
        if (selectedClockWindow == "Clock") {

            setInterval(() => {
                let a = new Date();
                let hh = a.getHours();
                let mm = a.getMinutes();
                let ss = a.getSeconds();
                let d = a.getDate();
                let m = a.getMonth();
                let y = a.getFullYear();
                m++;
                let ampm = 'AM';
                if (hh >= 12) {
                    ampm = 'PM';
                }
                if (hh < 10) {
                    hh = "0" + hh;
                }
                if (mm < 10) {
                    mm = "0" + mm;
                }
                if (ss < 10) {
                    ss = "0" + ss;
                }
                let time = `${hh}:${mm} ${ampm}`;
                let date = `${d}-${m}-${y}`;
                let elTime = document.getElementById("time");
                if (elTime) elTime.innerHTML = time;
                let elDate = document.getElementById("date");
                if (elDate) elDate.innerHTML = date;
                if (document.getElementById("time1")) {
                    let elTimes = document.getElementById("times");
                    if (elTimes) elTimes.innerHTML = `${hh}:${mm}:${ss} ${ampm}`;
                    let elTime1 = document.getElementById("time1");
                    if (elTime1) elTime1.innerHTML = time;
                    let elDate1 = document.getElementById("date1");
                    if (elDate1) elDate1.innerHTML = date;
                }
            }, 1000);
        }
    }, []);

    const maximize = (id1, id2, id3, id4, id5) => {
        let windows = document.getElementById(id1);
        let top = document.getElementById(id2);
        let bottom = document.getElementById(id3);
        let sidebar = document.getElementById(id4);
        let MainWindow = document.getElementById(id5);
        if (windows.style.width == "116vh") {
            windows.style.top = "4.1vh";
            windows.style.left = "0";
            windows.style.width = "100vw";
            windows.style.height = "87vh";
            top.style.width = "100vw";
            top.style.borderTopLeftRadius = "1.2vh";
            top.style.borderTopRightRadius = "1.2vh";
            bottom.style.width = "100vw";
            bottom.style.height = "100vh";
            sidebar.style.width = "15.6%";
            sidebar.style.height = "83vh";
            MainWindow.style.height = "84vh";
            MainWindow.style.width = "84.4%";
        } else {
            windows.style.position = "absolute";
            windows.style.top = "14vh";
            windows.style.left = "60vh";
            windows.style.width = "116vh";
            windows.style.height = "67vh";
            top.style.width = "116vh";
            top.style.borderTopLeftRadius = "1.2vh";
            top.style.borderTopRightRadius = "1.2vh";
            bottom.style.width = "116vh";
            bottom.style.height = "63vh";
            sidebar.style.width = "25.6%";
            sidebar.style.height = "63vh";
            MainWindow.style.width = "74.4%";
            MainWindow.style.height = "63vh";
        }
    };

    const ChatMaximize = (id1, id2, id3, id4, id5) => {
        let windows = document.getElementById(id1);
        let top = document.getElementById(id2);
        let bottom = document.getElementById(id3);
        let MainWindow = document.getElementById(id4);
        let iFrameWindow = document.getElementById(id5);
        if (windows.style.width == "116vh") {
            windows.style.top = "4.1vh";
            windows.style.left = "0";
            windows.style.width = "100vw";
            windows.style.height = "87vh";
            top.style.width = "100vw";
            top.style.borderTopLeftRadius = "1.2vh";
            top.style.borderTopRightRadius = "1.2vh";
            bottom.style.width = "100vw";
            bottom.style.height = "100vh";
            MainWindow.style.width = "100%";
            MainWindow.style.height = "84vh";
            if (iFrameWindow) {
                iFrameWindow.style.height = "100%";
            }
        } else {
            windows.style.position = "absolute";
            windows.style.top = "14vh";
            windows.style.left = "60vh";
            windows.style.width = "116vh";
            windows.style.height = "67vh";
            top.style.width = "116vh";
            top.style.borderTopLeftRadius = "1.2vh";
            top.style.borderTopRightRadius = "1.2vh";
            bottom.style.width = "116vh";
            bottom.style.height = "63vh";
            MainWindow.style.width = "100%";
            MainWindow.style.height = "63vh";
            if (iFrameWindow) {
                iFrameWindow.style.height = "100%";
            }
        }
    };

    const createFile = (error) => {
        try {
            let a = new Date();
            let hh = a.getHours();
            let mm = a.getMinutes();
            let ss = a.getSeconds();
            let d = a.getDate();
            let m = a.getMonth();
            let y = a.getFullYear();
            m++;
            let ampm = 'AM';
            if (hh >= 12) {
                ampm = 'PM';
            }
            if (hh < 10) {
                hh = "0" + hh;
            }
            if (mm < 10) {
                mm = "0" + mm;
            }
            if (ss < 10) {
                ss = "0" + ss;
            }
            let time = `${hh}:${mm} ${ampm}`;
            let date = `${d}-${m}-${y}`;
            fetch('/api/report', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ error: error, time: time, date: date, name: name })
            });
            alert("Sorry, some error occured! We have reported the error and fix it on time...")
        } catch (e) {
            alert('Restart your LuminaOS!');
        }
    };

    const showApp = (id) => {
        setAppToDesktopMap(prev => ({ ...prev, [id]: prev[id] || currentDesktop }));
        try {
            let app = document.getElementById(id);
            if (app.style.height == "0vh") {
                app.style.height = "67vh";
                setActiveApp(id);
            } else if (app.style.width == "100vw") {
                app.style.width = "0vh";
                setActiveApp(null);
            } else if (app.style.width == "116vh") {
                app.style.width = "0vw";
                setActiveApp(null);
            } else {
                if (app.style.height == "87vh") {
                    app.style.width = "100vw";
                    setActiveApp(id);
                } else {
                    app.style.width = "116vh";
                    setActiveApp(id);
                }
            }
        } catch (e) {
            showNotificationFunction("LumiNexplorer", "App not responding...Try restarting app.")
            createFile(e);
        }
    };

    const closeResults = () => {
        let app = document.getElementById("result");
        app.style.width = "0vh";
        app.style.padding = "0";
        setOutputText('');
    };

    const closeAddFileWindow = () => {
        let app = document.getElementById("AddFilesWindow");
        app.style.width = "0vh";
        app.style.height = "0vh";
    };

    const showAddFileWindow = () => {
        let app = document.getElementById("AddFilesWindow");
        app.style.width = "60vh";
        app.style.height = "26vh";
    };

    const minimizeApp = (id) => {
        let app = document.getElementById(id);
        if (app.style.height == "67vh") {
            app.style.height = "0vh";
        } else {
            app.style.height = "67vh";
        };
    };

    useEffect(() => {
        const savedCity = localStorage.getItem("city") || "Delhi";
        setCity(savedCity);

        const fetchWeatherData = async () => {
            try {
                const response = await fetch(`/api/weather?city=${savedCity}`);
                const data = await response.json();

                if (data.error) {
                    console.error('Weather data not available:', data.error);
                } else {
                    setWeatherData(data);
                    setCloudPct(data.cloud_pct);


                }
            } catch (err) {
                console.error('Weather fetch error:', err);
            }
        };

        // Fetch weather data immediately
        fetchWeatherData();

        // Set up interval for periodic updates
        const interval = setInterval(fetchWeatherData, 60000);

        // Cleanup interval on unmount
        return () => clearInterval(interval);
    }, []);

    const calc = (number) => {
        let output = document.getElementById("CalcOutput");
        if (number === '=') {
            try {
                const result = eval(output.innerHTML);
                output.innerHTML = result;
            } catch (e) {
                output.innerHTML = 'Error';
            }
        } else if (number === 'C') {
            output.innerHTML = ""
        } else {
            output.innerHTML += number;
        }
    };

    const removeFiles = () => {
        localStorage.removeItem("uploadedFiles");
        setUploadedFiles([])
        localStorage.setItem("uploadedFiles", uploadedFiles);
    }

    const checkDisabled = () => {
        if (stopClock == "00:00:00" || isStopClockRunning == true) {
            return true
        }
    }

    const checkTimerDisabled = () => {
        if (isRunning == true) {
            return true;
        } else if (remainingTime == 0 && hours == 0 && minutes == 0 && seconds == 0) {
            return true;
        }
    }

    useEffect(() => {
        const audioContext = new (window.AudioContext)();
        const gainNode = audioContext.createGain();
        gainNode.connect(audioContext.destination);
        const currentVolume = gainNode.gain.value;
        setVolume(Math.round(currentVolume * 100));
        const muted = currentVolume === 0;
        setIsMuted(muted);
        console.log(isMuted)
    }, []);

    const getAppIcon = (iconName) => {
        switch (iconName) {
            case "Calculator":
                return <IoCalculator className={styles.startBtn} />;
            case "LumiNexplorer":
                return <SiFiles className={styles.startBtn} />;
            case "Clock":
                return <BsFillClockFill className={styles.startBtn} />;
            case "Browser":
                return <SiTorbrowser className={styles.startBtn} />;
            case "Weather":
                return <TiWeatherCloudy className={styles.startBtn} />;
            case "Chat":
                return <IoMdChatbubbles className={styles.startBtn} />;
            case "Store":
                return <IoMdAppstore className={styles.startBtn} />;
            case "PDFViewer":
                return <VscFilePdf className={styles.startBtn} />;
            case "Settings":
                return <IoSettingsSharp className={styles.startBtn} />;
            case "Vertice":
                return <SiTorbrowser className={styles.startBtn} />;
            default:
                return <BsFillLightningChargeFill className={styles.startBtn} />;
        }
    };

    const copyText = (textToCopy) => {

        // Create a temporary textarea element
        const textarea = document.createElement("textarea");

        // Set the value of the textarea to the text to copy
        textarea.value = textToCopy;

        // Add the textarea to the document
        document.body.appendChild(textarea);

        // Select the text in the textarea
        textarea.select();

        // Copy the selected text
        document.execCommand("copy");

        // Remove the textarea from the document
        document.body.removeChild(textarea);

        // Notify the user that the text has been copied
        alert("Text copied to clipboard!");
    }

    const handleSparkDownload = (fileId) => {
        const url = storage.getFileDownload(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, fileId);
        window.open(url, '_blank');
    };

    const handleView = (fileId) => {
        const url = storage.getFilePreview(process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID, fileId);
        console.log(url.href)
    };

    const handleWeatherSearch = (e) => {
        e.preventDefault();
        if (weatherSearchQuery.trim()) {
            const newCity = weatherSearchQuery.trim();
            setCity(newCity);
            localStorage.setItem("city", newCity);
            setWeatherSearchQuery("");

            // Fetch weather data for the new city
            const fetchWeatherForCity = async () => {
                try {
                    const response = await fetch(`/api/weather?city=${newCity}`);
                    const data = await response.json();

                    if (data.error) {
                        console.error('Weather data not available:', data.error);
                    } else {
                        setWeatherData(data);
                        setCloudPct(data.cloud_pct);

                        // Update DOM elements for the taskbar weather widget
                        const temp = document.getElementById("temp");
                        const feels = document.getElementById("feels");

                    }
                } catch (err) {
                    console.error('Weather fetch error:', err);
                }
            };

            fetchWeatherForCity();
        }
    };

    return (
        <div id="mainDiv" className={styles.div}>
            <main className={styles.main}>
                <img src={`Wallpapers/${num}.png`} draggable="false" onError={(e) => { e.target.onerror = null; e.target.src = `Wallpapers/${num}.jpg`; }} className={styles.img} />
                <div className={styles.menubar}>
                    {activeApp != null ? (
                        activeApp == "Calculator" ? (
                            <IoCalculator className={styles.startBtn} />
                        ) : activeApp == "LumiNexplorer" ? (
                            <SiFiles className={styles.startBtn} />
                        ) : activeApp == "Clock" ? (
                            <BsFillClockFill className={styles.startBtn} />
                        ) : activeApp == "Browser" ? (
                            <SiTorbrowser className={styles.startBtn} />
                        ) : activeApp == "Weather" ? (
                            <TiWeatherCloudy className={styles.startBtn} />
                        ) : activeApp == "Chat" ? (
                            <IoMdChatbubbles className={styles.startBtn} />
                        ) : activeApp == "Store" ? (
                            <IoMdAppstore className={styles.startBtn} />
                        ) : activeApp == "Settings" ? (
                            <IoSettingsSharp className={styles.startBtn} />
                        ) : null
                    ) : (
                        <BsFillLightningChargeFill onClick={() => { if (quickDropdown) { setQuickDropdown(false) } else { setQuickDropdown(true) } }} className={styles.startBtn} />
                    )}
                    <div className={styles.search} id="ai">
                        <form onSubmit={handleSubmit}>
                            <input onMouseEnter={onTextBoxHover} onMouseLeave={onTextBoxLeave} type="text" placeholder="Ask RK AI..." className={styles.input} id="input" name="input" />
                        </form>
                    </div>
                    <div id="time" className={styles.time}></div>
                    <div id="date" className={styles.date}></div>
                </div>
                {showNotification && <div className={styles.Notifications}>
                    <div className={styles.NotificationsClose} onClick={closeNotification}>
                        X
                    </div>
                    <h1>{appName}</h1>
                    <p>{appDesc}</p>
                </div>}
                {quickDropdown && <div className={styles.QuickDropDown}>
                    <button onClick={() => { showApp("LumiNexplorer") }}>LumiNexplorer</button>
                    <button>Notifications</button>
                    <button onClick={() => { setSelectedSettingsSection("Profile"); showApp("Settings"); }}>My Profile</button>
                    <button>Help & Support</button>
                    <button onClick={() => { showApp("Settings") }}>Settings</button>
                    <button>Feedback</button>
                </div>}
                {notificationDropdown && <div className={styles.AllNotifications}>
                    <h1>Notifications: </h1>
                    {notificationHistory.length === 0 ? (
                        <p>No notifications to display.</p>
                    ) : (
                        notificationHistory.map((notification, index) => (
                            <div key={index} className={styles.notificationBox}>
                                <button
                                    onClick={() => removeNotification(index)}
                                    className={styles.notificationClose}
                                ></button>
                                <span className={styles.Title}>{notification[0]}</span>
                                <span className={styles.Desc}>{notification[1]}</span>
                            </div>
                        ))
                    )}
                </div>}
                {showWidget && <div className={styles.Widget1}>
                    <div className={styles.calendarHeader}>
                        <button onClick={handlePrevMonth} className={styles.calendarNavBtn}>
                            &lt;
                        </button>
                        <h2 className={styles.calendarMonth}>
                            {new Date(year, month).toLocaleString('en-US', {
                                month: 'long',
                                year: 'numeric',
                            })}
                        </h2>
                        <button onClick={handleNextMonth} className={styles.calendarNavBtn}>
                            &gt;
                        </button>
                    </div>
                    <div className={styles.calendarDays}>
                        <div className={styles.calendarDay}>Sun</div>
                        <div className={styles.calendarDay}>Mon</div>
                        <div className={styles.calendarDay}>Tue</div>
                        <div className={styles.calendarDay}>Wed</div>
                        <div className={styles.calendarDay}>Thu</div>
                        <div className={styles.calendarDay}>Fri</div>
                        <div className={styles.calendarDay}>Sat</div>
                    </div>
                    <div className={styles.calendarDates}>
                        {Array.from({ length: firstDay }, (_, index) => (
                            <div className={styles.calendarEmptyDay} key={index}></div>
                        ))}
                        {renderCalendarDays()}
                    </div>
                </div>}
                {showWidget && <div className={styles.Widget2}>
                    <h2 className={styles.weatherTitle}>Weather of {city}</h2>
                    {weatherData ? (
                        <div className={styles.weatherDataCSS}>
                            <p>Temperature: {weatherData.temp}°C</p>
                            <p>Feels Like: {weatherData.feels_like}°C</p>
                            <p>Humidity: {weatherData.humidity}%</p>
                            <p>Max Temperature: {weatherData.max_temp}°C</p>
                            <p>Min Temperature: {weatherData.min_temp}°C</p>
                            <p>Cloud Coverage: {weatherData.cloud_pct}%</p>
                            <p>Wind Speed: {weatherData.wind_speed}m/s</p>
                            <p>Wind Degrees: {weatherData.wind_degrees}°</p>
                        </div>
                    ) : (
                        <p>No weather data available.</p>
                    )}
                </div>}
                {showWidget && <div className={styles.Widget3}>
                    <h2 className={styles.weatherTitle}>Recommended Apps</h2>
                    <div className={styles.recommendedApps}>
                        <div className={styles.appList}>
                            {appData.map((app) => (
                                <div onClick={() => { showApp(app.icon) }} key={app.name} className={styles.appItem}>
                                    {getAppIcon(app.icon)}
                                    <p>{app.name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>}
                {showWidget && <div className={styles.Widget4}>
                    <h2 className={styles.weatherTitle}>Clipboard</h2>
                    {clipboardHistory.length === 0 ? (
                        <p>No copy text history</p>
                    ) : (
                        clipboardHistory.map((item, index) => (
                            <div key={index} className={styles.copyHistory}>
                                <p>{item.text}</p>
                                <IoCopy onClick={() => { copyText(item.text) }} />
                            </div>
                        ))
                    )}
                </div>}
                <Draggable nodeRef={resultRef} handle=".result-header">
                    <div id="result" ref={resultRef} className={styles.result}>
                        <div onClick={closeResults} id="closeResult" className={styles.closeResult}></div>
                        <h1>RK AI:</h1>
                        <br />
                        <p id="output">{outputText}</p>
                    </div>
                </Draggable>
                <div className={styles.Apps} id="AllApps">
                    <Draggable nodeRef={lumiNexRef} handle={`.${styles.top}`}>
                        <div id="LumiNexplorer" ref={lumiNexRef} className={styles.App} onMouseDown={enabled('clickToFront') ? () => bringToFront("LumiNexplorer") : undefined}>
                            <div id="top" className={styles.top}>
                                <div id="title" className={styles.title}>LumiNexplorer</div>
                                <div onClick={() => { showApp("LumiNexplorer") }} id="close" className={styles.close}></div>
                                <div onClick={() => { minimizeApp("LumiNexplorer") }} id="minimize" className={styles.minimize}></div>
                                <div id="maximize" onClick={() => { maximize("LumiNexplorer", "top", "LumiNexplorerApp", "sidebar", "MainWindow") }} className={styles.maximize}></div>
                            </div>
                            <div id="LumiNexplorerApp" className={styles.Files}>
                                <div id="sidebar" className={styles.sidebar}>
                                    <div className={styles.text} onClick={() => handleSectionClick('Home')}>Home</div>
                                    <div className={styles.text} onClick={() => handleSectionClick('Spark Drive')}>Spark Drive</div>
                                </div>
                                <div id="MainWindow" className={styles.MainWindow}>
                                    {selectedSection === 'Home' && <div className={styles.AddFilesWindow} id="AddFilesWindow">
                                        <div id="close" onClick={closeAddFileWindow} className={styles.AddFileWindowClose}></div>
                                        <label className={styles.fileInput}>
                                            <span>Choose File</span>
                                            <input onMouseEnter={onTextBoxHover} onMouseLeave={onTextBoxLeave} type="file" onChange={handleFileUpload} />
                                        </label>
                                    </div>}
                                    {selectedSection === 'Spark Drive' && (
                                        <div className={styles.AddFilesWindow} id="AddFilesWindow">
                                            <div id="close" onClick={closeAddFileWindow} className={styles.AddFileWindowClose}></div>
                                            <label className={styles.fileInput}>
                                                <span>Choose File. Max file size: 5mb</span>
                                                <input onMouseEnter={onTextBoxHover} onMouseLeave={onTextBoxLeave} type="file" id="uploader" />
                                                <button className={styles.UploadBtn} onClick={handleUpload}>Upload File</button>
                                            </label>
                                        </div>
                                    )}
                                    {selectedSection === 'Home' && (
                                        <div className={styles.Home}>
                                            <div>Home</div>
                                            {uploadedFiles && <div className={styles.AllHomeFiles}>
                                                <ul className={styles.ul}>
                                                    {uploadedFiles.map((file, index) => (
                                                        <li className={styles.file} key={index}>
                                                            <img src="/file.png" />
                                                            <span>{file.name.slice(0, 15)}...</span>
                                                            <button className={styles.download} onClick={() => handleDownload(file)}><AiOutlineDownload /></button>
                                                            <button className={styles.openIn} onClick={() => { setSelectedFileURL(file.dataUrl); showApp("LumiNexplorer"); showApp("PDFViewer"); console.log(file); console.log(file.dataUrl) }}><MdOutlineOpenInNew /></button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>}
                                        </div>
                                    )}
                                    {selectedSection === 'Spark Drive' && (
                                        <div className={styles.Home}>
                                            <div>SparkDrive (200mb)</div>
                                            <div className={styles.AllHomeFiles}>
                                                <ul>
                                                    {fileList.map((file) => (
                                                        <li onAuxClick={() => { if (sparkDriveDropdown == false) { setSparkDriveDropdown(true) } else { setSparkDriveDropdown(false) } }} className={styles.file} key={file.$id}>
                                                            <img src="/file.png" />
                                                            <span>{file.name.slice(0, 15)}...</span>
                                                            {sparkDriveDropdown && <div className={styles.rightOptions}>
                                                                <button onClick={() => handleView(file.$id)}>View</button>
                                                                <button onClick={() => handleSparkDownload(file.$id)}>Download</button>
                                                                <button onClick={() => handleDelete(file.$id)}>Delete</button>
                                                            </div>}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <button onClick={removeFiles} className={styles.deleteFiles}>Delete all files</button>
                                            <button onClick={showAddFileWindow} className={styles.addFiles}>Add files</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </Draggable>
                </div>
                <Draggable nodeRef={clockRef} handle={`.${styles.top}`}>
                    <div id="Clock" ref={clockRef} className={styles.App} onMouseDown={enabled('clickToFront') ? () => bringToFront("Clock") : undefined}>
                        <div id="top" className={styles.top}>
                            <div id="title" className={styles.title}>Clock</div>
                            <div onClick={() => { showApp("Clock") }} id="close" className={styles.close}></div>
                            <div onClick={() => { minimizeApp("Clock") }} id="minimize" className={styles.minimize}></div>
                            <div id="maximize" onClick={() => { maximize("Clock", "top", "ClockApp", "sidebar", "MainWindow") }} className={styles.maximize}></div>
                        </div>
                        <div id="ClockApp" className={styles.Files}>
                            <div id="sidebar" className={styles.sidebar}>
                                <div onClick={() => { setSelectedClockWindow("Clock") }} className={styles.text}>Time</div>
                                <div onClick={() => { setSelectedClockWindow("Timer") }} className={styles.text}>Timer</div>
                                <div onClick={() => { setSelectedClockWindow("StopClock") }} className={styles.text}>StopClock</div>
                            </div>
                            <div id="MainWindow" className={styles.MainWindow}>
                                {selectedClockWindow == "Clock" && <div id="Window1">
                                    <div id="time1" className={styles.windowtime}></div>
                                    <div id="date1" className={styles.windowdate}></div>
                                    <div id="times" className={styles.windowtimes}></div>
                                </div>}
                                {selectedClockWindow == "StopClock" && <div id="Window1">
                                    <div className={styles.windowtime}>StopClock</div>
                                    <div className={styles.windowdate}>{stopClock}</div>
                                    <div className={styles.windowtimes}>
                                        <button disabled={isStopClockRunning} className={styles.StartStopClock} onClick={startTimer}>Start</button>
                                        <button disabled={!isStopClockRunning} className={styles.StopStopClock} onClick={stopTimer}>Stop</button>
                                        <button disabled={checkDisabled()} className={styles.ResetStopClock} onClick={resetTimer}>Reset StopClock</button>
                                    </div>
                                </div>}
                                {selectedClockWindow == "Timer" && <div id="Window1">
                                    <div className={styles.windowtime}>Timer</div>
                                    <div className={styles.windowdate}>
                                        {!isRunning && <div className={styles.timerDiv}>
                                            <label>
                                                <input onMouseEnter={onTextBoxHover} onMouseLeave={onTextBoxLeave} className={styles.timerInput} type="number" placeholder='Enter hours.' value={hours} onChange={(e) => setHours(parseInt(e.target.value, 10))} />
                                            </label>
                                            <label>
                                                <input onMouseEnter={onTextBoxHover} onMouseLeave={onTextBoxLeave} className={styles.timerInput} type="number" placeholder='Enter minutes.' value={minutes} onChange={(e) => setMinutes(parseInt(e.target.value, 10))} />
                                            </label>
                                            <label>
                                                <input onMouseEnter={onTextBoxHover} onMouseLeave={onTextBoxLeave} className={styles.timerInput} type="number" placeholder='Enter seconds.' value={seconds} onChange={(e) => setSeconds(parseInt(e.target.value, 10))} />
                                            </label>
                                        </div>}
                                        {isRunning && formatTime(remainingTime)}</div>
                                    <div className={styles.windowtimes}>
                                        <button disabled={isRunning} className={styles.StartStopClock} onClick={handleStart}>Start</button>
                                        <button disabled={!isRunning} className={styles.StopStopClock} onClick={handleStop}>Stop</button>
                                        <button disabled={checkTimerDisabled()} className={styles.ResetStopClock} onClick={handleReset}>Reset Timer</button>
                                    </div>
                                </div>}
                            </div>
                        </div>
                    </div>
                </Draggable>
                <Draggable nodeRef={browserRef} handle={`.${styles.BroTop}`}>
                    <div id="Browser" ref={browserRef} className={styles.App} onMouseDown={enabled('clickToFront') ? () => bringToFront("Browser") : undefined}>
                        <div id="Browsertop" className={styles.BroTop}>
                            <div id="title" className={styles.title}>Vertice</div>
                            <div onClick={() => { showApp("Browser") }} id="close" className={styles.close}></div>
                            <div onClick={() => { minimizeApp("Browser") }} id="minimize" className={styles.minimize}></div>
                            <div id="maximize" onClick={() => { ChatMaximize("Browser", "Browsertop", "BrowserApp", "BrowserMainWindow", "BrowserIFrame") }} className={styles.maximize}></div>
                            <input onMouseEnter={onTextBoxHover} onMouseLeave={onTextBoxLeave} value={url} onChange={(e) => { setUrl(e.target.value) }} type='url' className={styles.SearchBar} />
                        </div>
                        <div id="BrowserApp" className={styles.BrowserFiles}>
                            <div id="BrowserMainWindow" className={styles.BroMainWindow}>
                                <iframe
                                    ref={iframeRef}
                                    onChange={() => handleIframeLoad()}
                                    id="BrowserIFrame"
                                    className={styles.iFrame}
                                    src={url}
                                />
                            </div>
                        </div>
                    </div>
                </Draggable>
                <Draggable nodeRef={whatsappRef} handle={`.${styles.BroTop}`}>
                    <div id="WhatsApp" ref={whatsappRef} className={styles.App} onMouseDown={enabled('clickToFront') ? () => bringToFront("WhatsApp") : undefined}>
                        <div id="WhatsApptop" className={styles.BroTop}>
                            <div id="title" className={styles.title}>Vertice</div>
                            <div onClick={() => { showApp("WhatsApp") }} id="close" className={styles.close}></div>
                            <div onClick={() => { minimizeApp("WhatsApp") }} id="minimize" className={styles.minimize}></div>
                            <div id="maximize" onClick={() => { ChatMaximize("WhatsApp", "WhatsApptop", "WhatsAppApp", "WhatsAppMainWindow", "WhatsAppIFrame") }} className={styles.maximize}></div>
                            <input onMouseEnter={onTextBoxHover} onMouseLeave={onTextBoxLeave} value={url} onChange={(e) => { setUrl(e.target.value) }} type='url' className={styles.SearchBar} />
                        </div>
                        <div id="WhatsAppApp" className={styles.BrowserFiles}>
                            <div id="WhatsAppMainWindow" className={styles.BroMainWindow}>
                                <iframe
                                    id="WhatsAppIFrame"
                                    className={styles.iFrame}
                                    src="https://web.whatsapp.com/"
                                    sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                />
                            </div>
                        </div>
                    </div>
                </Draggable>
                <Draggable nodeRef={calcRef} handle={`.${styles.top}`}>
                    <div id="Calculator" ref={calcRef} className={styles.App} onMouseDown={enabled('clickToFront') ? () => bringToFront("Calculator") : undefined}>
                        <div id="Calctop" className={styles.top}>
                            <div id="title" className={styles.title}>Calculator</div>
                            <div onClick={() => { showApp("Calculator"); calc('C') }} id="close" className={styles.close}></div>
                            <div onClick={() => { minimizeApp("Calculator") }} id="minimize" className={styles.minimize}></div>
                        </div>
                        <div id="CalculatorApp" className={styles.Files}>
                            <div id="CalcSidebar" className={styles.sidebar}>
                                <div className={styles.text}>Simple Calculator</div>
                            </div>
                            <div id="CalcMainWindow" className={styles.MainWindow}>
                                <div id="CalcOutput" className={styles.CalcOutput}></div>
                                <div className={styles.btns}>
                                    <button onClick={() => { calc("9") }} className={styles.btn}>9</button>
                                    <button onClick={() => { calc("8") }} className={styles.btn}>8</button>
                                    <button onClick={() => { calc("7") }} className={styles.btn}>7</button>
                                    <button onClick={() => { calc("+") }} className={styles.btn}>+</button>
                                    <button onClick={() => { calc("6") }} className={styles.btn}>6</button>
                                    <button onClick={() => { calc("5") }} className={styles.btn}>5</button>
                                    <button onClick={() => { calc("4") }} className={styles.btn}>4</button>
                                    <button onClick={() => { calc("-") }} className={styles.btn}>-</button>
                                    <button onClick={() => { calc("3") }} className={styles.btn}>3</button>
                                    <button onClick={() => { calc("2") }} className={styles.btn}>2</button>
                                    <button onClick={() => { calc("1") }} className={styles.btn}>1</button>
                                    <button onClick={() => { calc("*") }} className={styles.btn}>*</button>
                                    <button onClick={() => { calc("0") }} className={styles.btn}>0</button>
                                    <button onClick={() => { calc("C") }} className={styles.btn}>C</button>
                                    <button onClick={() => { calc("=") }} className={styles.btn}>=</button>
                                    <button onClick={() => { calc("/") }} className={styles.btn}>/</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </Draggable>
                <Draggable nodeRef={storeRef} handle={`.${styles.top}`}>
                    <div id="Store" ref={storeRef} className={styles.App} onMouseDown={enabled('clickToFront') ? () => bringToFront("Store") : undefined}>
                        <div id="Storetop" className={styles.top}>
                            <div id="title" className={styles.title}>Sparking Store</div>
                            <div onClick={() => { showApp("Store"); }} id="close" className={styles.close}></div>
                            <div onClick={() => { minimizeApp("Store") }} id="minimize" className={styles.minimize}></div>
                            <div id="maximize" onClick={() => { maximize("Store", "Storetop", "StoreApp", "StoreSidebar", "StoreMainWindow") }} className={styles.maximize}></div>
                        </div>
                        <div id="StoreApp" className={styles.Files}>
                            <div id="StoreSidebar" className={styles.sidebar}>
                                <div className={styles.text}>All Apps</div>
                            </div>
                            <div id="StoreMainWindow" className={styles.StoreMainWindow}>
                                {luminaApps.map((app, index) => (
                                    <div key={index} className={styles.application}>
                                        {app.icon}
                                        <span>{app.name}</span>
                                        <button onClick={() => {
                                            if (!userInstalledApps.find(a => a.name === app.name) && !installingApps.includes(app.name)) {
                                                setInstallingApps(prev => [...prev, app.name]);
                                                setTimeout(() => {
                                                    setInstallingApps(prev => prev.filter(n => n !== app.name));
                                                    setUserInstalledApps(prev => [...prev, app]);
                                                    alert(`${app.name} installed! You can launch it from your Desktop Dock.`);
                                                }, 3000);
                                            } else if (userInstalledApps.find(a => a.name === app.name)) {
                                                alert(`${app.name} is already installed.`);
                                            }
                                        }} className={styles.appDownload}>
                                            {installingApps.includes(app.name) ? <span style={{ fontSize: "1.2vh" }}>Wait...</span> : (userInstalledApps.find(a => a.name === app.name) ? <span style={{ fontSize: "1.2vh" }}>Done</span> : <AiOutlineDownload />)}
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </Draggable>
                <Draggable nodeRef={settingsRef} handle={`.${styles.top}`}>
                    <div id="Settings" ref={settingsRef} className={styles.App} onMouseDown={enabled('clickToFront') ? () => bringToFront("Settings") : undefined}>
                        <div id="Settingstop" className={styles.top}>
                            <div id="title" className={styles.title}>Settings</div>
                            <div onClick={() => { showApp("Settings"); }} id="close" className={styles.close}></div>
                            <div onClick={() => { minimizeApp("Settings") }} id="minimize" className={styles.minimize}></div>
                            <div id="maximize" onClick={() => { maximize("Settings", "Settingstop", "SettingsApp", "SettingsSidebar", "SettingsMainWindow") }} className={styles.maximize}></div>
                        </div>
                        <div id="SettingsApp" className={styles.Files}>
                            <div id="SettingsSidebar" className={styles.sidebar}>
                                <div className={styles.text} onClick={() => setSelectedSettingsSection('Profile')}>Profile</div>
                                <div className={styles.text} onClick={() => setSelectedSettingsSection('General')}>General</div>
                                <div className={styles.text} onClick={() => setSelectedSettingsSection('Appearance')}>Themes</div>
                                <div className={styles.text} onClick={() => setSelectedSettingsSection('Security')}>Security</div>
                                <div className={styles.text} onClick={() => setSelectedSettingsSection('Updates')}>Updates</div>
                                <div className={styles.text} onClick={() => setSelectedSettingsSection('HelpSupport')}>Help & Support</div>
                            </div>
                            <div id="SettingsMainWindow" className={styles.StoreMainWindow}>
                                {selectedSettingsSection === 'General' && (
                                    <div className={styles.SettingHome}>
                                        <h3>General Settings</h3>
                                        <div className={styles.Options}>
                                            <div className={styles.settingOption}>
                                                <label>Language:</label>
                                                <select className={styles.select}>
                                                    <option className={styles.option}>English</option>
                                                    <option className={styles.option}>More option coming soon...</option>
                                                </select>
                                            </div>
                                            <div className={styles.settingOption}>
                                                <label>Time Zone:</label>
                                                <select className={styles.select}>
                                                    <option className={styles.option}>GMT</option>
                                                    <option className={styles.option}>More option coming soon...</option>
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSettingsSection === 'Updates' && (
                                    <div className={styles.SettingHomeProfile}>
                                        <h3>System Updates</h3>
                                        <div className={styles.Profile} style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
                                            <div className={styles.settingOption} style={{ background: 'var(--panel-bg)', border: '1px solid var(--border-color)', padding: '2vh', borderRadius: '1vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <label style={{ color: 'white' }}>Current Version:</label>
                                                <span style={{ color: '#93c5fd', fontWeight: 'bold' }}>v{osVersion}</span>
                                            </div>
                                            <div className={styles.settingOption} style={{ background: 'var(--panel-bg)', border: '1px solid var(--border-color)', padding: '2vh', borderRadius: '1vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <label style={{ color: 'white' }}>Latest Version:</label>
                                                <span style={{ color: latestVersion ? '#34d399' : '#fbbf24', fontWeight: 'bold' }}>{latestVersion ? `v${latestVersion}` : 'Unknown'}</span>
                                            </div>
                                            {latestVersion && (
                                                <div className={styles.settingOption} style={{ background: 'var(--panel-bg)', border: '1px solid var(--border-color)', padding: '2vh', borderRadius: '1vh' }}>
                                                    <label style={{ color: 'white', fontWeight: 'bold' }}>Release Notes for v{latestVersion}</label>
                                                    <ul style={{ marginTop: '1vh', color: '#cbd5e1' }}>
                                                        <li>Multi-theme support with persistence</li>
                                                        <li>Updates section with timed install flow</li>
                                                        <li>Mission Control animations and delete desktop</li>
                                                        <li>Weather data fallback without API key</li>
                                                        <li>Battery detection fallback on mobile</li>
                                                        <li>Enhanced custom cursor for text selection</li>
                                                    </ul>
                                                </div>
                                            )}
                                            <div className={styles.settingOption} style={{ background: 'var(--panel-bg)', border: '1px solid var(--border-color)', padding: '2vh', borderRadius: '1vh', display: 'flex', gap: '1vh', alignItems: 'center' }}>
                                                {(() => {
                                                    const hasUpdate = latestVersion && compareVersion(latestVersion, osVersion) > 0;
                                                    return (
                                                        <>
                                                            <button
                                                                onClick={hasUpdate ? startUpdateDownload : checkForUpdates}
                                                                disabled={updateChecking || isUpdating}
                                                                className={styles.btn}
                                                                style={{ padding: '0.4vh 1vh', height: '3.6vh', fontSize: '1.5vh', borderRadius: '0.6vh' }}
                                                            >
                                                                {hasUpdate ? (isUpdating ? 'Downloading…' : 'Update Now') : (updateChecking ? 'Checking…' : 'Check for Updates')}
                                                            </button>
                                                            {hasUpdate && (
                                                                <span style={{ color: '#9ca3af', fontSize: '1.6vh' }}>Latest: v{latestVersion}</span>
                                                            )}
                                                        </>
                                                    );
                                                })()}
                                            </div>
                                            {isUpdating && (
                                                <div className={styles.settingOption} style={{ background: 'var(--panel-bg)', border: '1px solid var(--border-color)', padding: '2vh', borderRadius: '1vh', width: '80%', transition: 'all 0.3s ease' }}>
                                                    <label style={{ color: 'white' }}>Progress</label>
                                                    <div style={{ width: '100%', height: '2.5vh', background: 'rgba(255,255,255,0.08)', borderRadius: '1vh', overflow: 'hidden' }}>
                                                        <div style={{ width: `${updateProgress}%`, height: '100%', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }} />
                                                    </div>
                                                    <span style={{ color: '#94a3b8' }}>{updateProgress}%</span>
                                                </div>
                                            )}
                                            <div style={{ color: '#94a3b8' }}>{updateStatus}</div>
                                        </div>
                                    </div>
                                )}
                                {selectedSettingsSection === 'Profile' && (
                                    <div className={styles.SettingHomeProfile}>
                                        <h3>Rexycore User Profile</h3>
                                        <div className={styles.Profile} style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
                                            <div className={styles.settingOption} style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '2vh', borderRadius: '1vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <label style={{ color: 'white' }}>Display Name:</label>
                                                <input value={name} onChange={(e) => setName(e.target.value)} className={styles.input} type="text" style={{ padding: '1vh', borderRadius: '0.5vh', border: '1px solid rgba(255, 255, 255, 0.2)', background: 'rgba(0,0,0,0.5)', color: 'white', width: '50%' }} />
                                            </div>
                                            <div className={styles.settingOption} style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '2vh', borderRadius: '1vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <label style={{ color: 'white' }}>Email Address:</label>
                                                <input defaultValue="user@rexycore.ai" disabled className={styles.input} type="email" style={{ padding: '1vh', borderRadius: '0.5vh', border: '1px solid rgba(255, 255, 255, 0.1)', background: 'rgba(0,0,0,0.2)', color: 'rgba(255,255,255,0.5)', width: '50%' }} />
                                            </div>
                                            <div className={styles.settingOption} style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '2vh', borderRadius: '1vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <label style={{ color: 'white' }}>Subscription Plan:</label>
                                                <button style={{ padding: '1vh 2vh', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', color: 'white', border: 'none', borderRadius: '0.5vh', fontWeight: 'bold' }}>RK AI Pro Tier</button>
                                            </div>
                                            <div className={styles.settingOption} style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '2vh', borderRadius: '1vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <label style={{ color: 'white' }}>Device Privilege:</label>
                                                <span style={{ color: '#10b981', fontWeight: 'bold' }}>Root / Admin</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSettingsSection === 'Appearance' && (
                                    <div className={styles.SettingHomeProfile}>
                                        <h3>Themes & Personalization</h3>
                                        <div className={styles.Profile} style={{ display: 'flex', flexDirection: 'column', gap: '2vh', marginBottom: '4vh' }}>
                                            <label style={{ color: 'white', fontSize: '2vh', fontWeight: 'bold' }}>System Theme</label>
                                            <div style={{ display: 'flex', gap: '2vh', flexWrap: 'wrap' }}>
                                                <div onClick={() => {
                                                    setThemeVars({
                                                        '--bg-color': '#06091a',
                                                        '--text-color': '#f8fafc',
                                                        '--accent-color': '#9b59f5',
                                                        '--panel-bg': 'rgba(255,255,255,0.03)',
                                                        '--border-color': 'rgba(255,255,255,0.08)'
                                                    }, 'Dark');
                                                }} style={{ flex: '1 1 160px', padding: '3vh', background: '#06091a', border: '2px solid rgba(255,255,255,0.2)', borderRadius: '1vh', cursor: 'pointer', textAlign: 'center', color: '#f8fafc' }}>
                                                    <h4>Dark Mode</h4>
                                                </div>
                                                <div onClick={() => {
                                                    setThemeVars({
                                                        '--bg-color': '#f1f5f9',
                                                        '--text-color': '#1e293b',
                                                        '--accent-color': '#4f46e5',
                                                        '--panel-bg': 'rgba(0,0,0,0.03)',
                                                        '--border-color': 'rgba(0,0,0,0.12)'
                                                    }, 'Light');
                                                }} style={{ flex: '1 1 160px', padding: '3vh', background: '#f1f5f9', border: '2px solid rgba(0,0,0,0.2)', borderRadius: '1vh', cursor: 'pointer', textAlign: 'center', color: '#1e293b' }}>
                                                    <h4>Light Mode</h4>
                                                </div>
                                                <div onClick={() => {
                                                    setThemeVars({
                                                        '--bg-color': '#000000',
                                                        '--text-color': '#ffffff',
                                                        '--accent-color': '#10b981',
                                                        '--panel-bg': 'rgba(255,255,255,0.06)',
                                                        '--border-color': 'rgba(255,255,255,0.25)'
                                                    }, 'OLED');
                                                }} style={{ flex: '1 1 160px', padding: '3vh', background: '#000000', border: '2px solid rgba(255,255,255,0.4)', borderRadius: '1vh', cursor: 'pointer', textAlign: 'center', color: '#ffffff' }}>
                                                    <h4>OLED Pitch Black</h4>
                                                </div>
                                                <div onClick={() => {
                                                    setThemeVars({
                                                        '--bg-color': '#0b0b17',
                                                        '--text-color': '#e9d5ff',
                                                        '--accent-color': '#9b59f5',
                                                        '--panel-bg': 'rgba(155,89,245,0.08)',
                                                        '--border-color': 'rgba(155,89,245,0.3)'
                                                    }, 'Midnight');
                                                }} style={{ flex: '1 1 160px', padding: '3vh', background: '#0b0b17', border: '2px solid rgba(155,89,245,0.35)', borderRadius: '1vh', cursor: 'pointer', textAlign: 'center', color: '#e9d5ff' }}>
                                                    <h4>Midnight Purple</h4>
                                                </div>
                                                <div onClick={() => {
                                                    setThemeVars({
                                                        '--bg-color': '#071924',
                                                        '--text-color': '#d1f4ff',
                                                        '--accent-color': '#22d3ee',
                                                        '--panel-bg': 'rgba(34,211,238,0.08)',
                                                        '--border-color': 'rgba(34,211,238,0.3)'
                                                    }, 'Ocean');
                                                }} style={{ flex: '1 1 160px', padding: '3vh', background: '#071924', border: '2px solid rgba(34,211,238,0.35)', borderRadius: '1vh', cursor: 'pointer', textAlign: 'center', color: '#d1f4ff' }}>
                                                    <h4>Ocean Blue</h4>
                                                </div>
                                                <div onClick={() => {
                                                    setThemeVars({
                                                        '--bg-color': '#002b36',
                                                        '--text-color': '#93a1a1',
                                                        '--accent-color': '#b58900',
                                                        '--panel-bg': 'rgba(147,161,161,0.08)',
                                                        '--border-color': 'rgba(147,161,161,0.25)'
                                                    }, 'Solarized');
                                                }} style={{ flex: '1 1 160px', padding: '3vh', background: '#002b36', border: '2px solid rgba(147,161,161,0.35)', borderRadius: '1vh', cursor: 'pointer', textAlign: 'center', color: '#93a1a1' }}>
                                                    <h4>Solarized Dark</h4>
                                                </div>
                                                <div onClick={() => {
                                                    setThemeVars({
                                                        '--bg-color': '#000000',
                                                        '--text-color': '#ffffff',
                                                        '--accent-color': '#ffcc00',
                                                        '--panel-bg': 'rgba(255,255,255,0.12)',
                                                        '--border-color': 'rgba(255,255,255,0.45)'
                                                    }, 'HighContrast');
                                                }} style={{ flex: '1 1 160px', padding: '3vh', background: '#000000', border: '2px solid rgba(255,255,255,0.6)', borderRadius: '1vh', cursor: 'pointer', textAlign: 'center', color: '#ffffff' }}>
                                                    <h4>High Contrast</h4>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.settingOption} style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                            <label style={{ color: 'white', fontSize: '2vh', fontWeight: 'bold', marginBottom: '2vh' }}>Desktop Wallpapers</label>
                                            <div className={styles.allWallpaper}>
                                                <img onClick={() => { setNum(8); localStorage.setItem("WallpaperNumber", 8) }} className={styles.settingWallpaper} src={`Wallpapers/8.png`} onError={(e) => { e.target.onerror = null; e.target.src = `Wallpapers/8.jpg`; }} alt={"selected wallpaper"} />
                                                <img onClick={() => { setNum(1); localStorage.setItem("WallpaperNumber", 1) }} className={styles.settingWallpaper} src={`Wallpapers/1.png`} onError={(e) => { e.target.onerror = null; e.target.src = `Wallpapers/1.jpg`; }} alt={"selected wallpaper"} />
                                                <img onClick={() => { setNum(2); localStorage.setItem("WallpaperNumber", 2) }} className={styles.settingWallpaper} src={`Wallpapers/2.png`} onError={(e) => { e.target.onerror = null; e.target.src = `Wallpapers/2.jpg`; }} alt={"selected wallpaper"} />
                                                <img onClick={() => { setNum(3); localStorage.setItem("WallpaperNumber", 3) }} className={styles.settingWallpaper} src={`Wallpapers/3.png`} onError={(e) => { e.target.onerror = null; e.target.src = `Wallpapers/3.jpg`; }} alt={"selected wallpaper"} />
                                                <img onClick={() => { setNum(4); localStorage.setItem("WallpaperNumber", 4) }} className={styles.settingWallpaper} src={`Wallpapers/4.png`} onError={(e) => { e.target.onerror = null; e.target.src = `Wallpapers/4.jpg`; }} alt={"selected wallpaper"} />
                                                <img onClick={() => { setNum(5); localStorage.setItem("WallpaperNumber", 5) }} className={styles.settingWallpaper} src={`Wallpapers/5.png`} onError={(e) => { e.target.onerror = null; e.target.src = `Wallpapers/5.jpg`; }} alt={"selected wallpaper"} />
                                                <img onClick={() => { setNum(6); localStorage.setItem("WallpaperNumber", 6) }} className={styles.settingWallpaper} src={`Wallpapers/6.png`} onError={(e) => { e.target.onerror = null; e.target.src = `Wallpapers/6.jpg`; }} alt={"selected wallpaper"} />
                                                <img onClick={() => { setNum(7); localStorage.setItem("WallpaperNumber", 7) }} className={styles.settingWallpaper} src={`Wallpapers/7.png`} onError={(e) => { e.target.onerror = null; e.target.src = `Wallpapers/7.jpg`; }} alt={"selected wallpaper"} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSettingsSection === 'Security' && (
                                    <div className={styles.SettingHomeProfile}>
                                        <h3>Security Settings</h3>
                                        <div className={styles.Profile} style={{ display: 'flex', flexDirection: 'column', gap: '2vh' }}>
                                            <div className={styles.settingOption} style={{ background: 'var(--panel-bg)', border: '1px solid var(--border-color)', padding: '2vh', borderRadius: '1vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <label style={{ color: 'white' }}>Change PIN Code:</label>
                                                <input onMouseEnter={onTextBoxHover} onMouseLeave={onTextBoxLeave} placeholder="••••" className={styles.input} type="password" style={{ padding: '1vh', borderRadius: '0.5vh', border: '1px solid var(--border-color)', background: 'var(--panel-bg)', color: 'var(--text-color)', width: '30%' }} />
                                            </div>
                                            <div className={styles.settingOption} style={{ background: 'var(--panel-bg)', border: '1px solid var(--border-color)', padding: '2vh', borderRadius: '1vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <label style={{ color: 'white' }}>Two-Factor Authentication:</label>
                                                <input onMouseEnter={onTextBoxHover} onMouseLeave={onTextBoxLeave} className={styles.input} type="checkbox" style={{ transform: 'scale(1.5)', cursor: 'pointer' }} />
                                            </div>
                                            <div className={styles.settingOption} style={{ background: 'var(--panel-bg)', border: '1px solid var(--border-color)', padding: '2vh', borderRadius: '1vh', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <label style={{ color: 'white' }}>Device Encryption:</label>
                                                <button style={{ padding: '1vh 2vh', background: '#10b981', color: 'white', border: 'none', borderRadius: '0.5vh', fontWeight: 'bold' }}>Enabled</button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedSettingsSection === 'HelpSupport' && (
                                    <div className={styles.Home}>
                                        <h3>Help & Support</h3>
                                        <div className={styles.settingOption}>
                                            <p>For immediate assistance with LuminaOS, contact the Rexycore Team.</p>
                                        </div>
                                        <div className={styles.settingOption} style={{ marginTop: '2vh' }}>
                                            <button onClick={() => window.open('/contact', '_blank')} className={styles.btn} style={{ width: 'auto', padding: '0 2vh' }}>Contact Rexycore Support</button>
                                        </div>
                                    </div>
                                )}
                                {/* Add more sections and options as needed */}
                            </div>
                        </div>
                    </div>
                </Draggable>
                <Draggable nodeRef={chatRef} handle={`.${styles.top}`}>
                    <div id="Chat" ref={chatRef} className={styles.App} onMouseDown={enabled('clickToFront') ? () => bringToFront("Chat") : undefined}>
                        <div id="Chattop" className={styles.top}>
                            <div id="title" className={styles.title}>ChatExpress</div>
                            <div onClick={() => { showApp("Chat") }} id="close" className={styles.close}></div>
                            <div onClick={() => { minimizeApp("Chat") }} id="minimize" className={styles.minimize}></div>
                            <div id="maximize" onClick={() => { ChatMaximize("Chat", "Chattop", "ChatApp", "ChatMainWindow", "ChatIFrame") }} className={styles.maximize}></div>
                        </div>
                        <div id="ChatApp" className={styles.Files}>
                            <div id="ChatMainWindow" className={styles.ChatMainWindow}>
                                <iframe id="ChatIFrame" className={styles.iFrame} src="https://chatexpress-chat-quickly.techabhigyan.repl.co/" />
                            </div>
                        </div>
                    </div>
                </Draggable>
                <Draggable nodeRef={weatherRef} handle={`.${styles.top}`}>
                    <div id="Weather" ref={weatherRef} className={styles.App} onMouseDown={enabled('clickToFront') ? () => bringToFront("Weather") : undefined}>
                        <div id="WeatherTop" className={styles.top}>
                            <div id="title" className={styles.title}>Weather</div>
                            <div onClick={() => { showApp("Weather") }} id="close" className={styles.close}></div>
                            <div onClick={() => { minimizeApp("Weather") }} id="minimize" className={styles.minimize}></div>
                            <div id="maximize" onClick={() => { maximize("Weather", "WeatherTop", "WeatherApp", "WeatherSidebar", "WeatherMainWindow") }} className={styles.maximize}></div>
                        </div>
                        <div id="WeatherApp" className={styles.Files}>
                            <div id="WeatherSidebar" className={styles.sidebar}>
                                <div onClick={() => { setSelectedWeatherView("Current") }} className={styles.text}>Current</div>
                                <div onClick={() => { setSelectedWeatherView("Details") }} className={styles.text}>Details</div>
                                <div onClick={() => { setSelectedWeatherView("Search") }} className={styles.text}>Search</div>
                            </div>
                            <div id="WeatherMainWindow" className={styles.MainWindow}>
                                {selectedWeatherView === "Current" && (
                                    <div className={styles.weatherCurrentView}>
                                        <div className={styles.weatherHeader}>
                                            <h2 className={styles.weatherCity}>{city || "Loading..."}</h2>
                                            <div className={styles.weatherIcon}>
                                                {cloudPct <= 30 ? (
                                                    <FaCloudSun className={styles.weatherIconLarge} />
                                                ) : cloudPct <= 95 ? (
                                                    <FaCloud className={styles.weatherIconLarge} />
                                                ) : (
                                                    <FaCloudShowersHeavy className={styles.weatherIconLarge} />
                                                )}
                                            </div>
                                        </div>
                                        <div className={styles.weatherMainCard}>
                                            <div className={styles.weatherTemp}>
                                                <span id="temp" className={styles.tempLarge}>--</span>°C
                                            </div>
                                            <div className={styles.weatherFeels}>
                                                Feels like <span id="feels" className={styles.feelsTemp}>--</span>°C
                                            </div>
                                        </div>
                                        <div className={styles.weatherQuickInfo}>
                                            <div className={styles.weatherInfoCard}>
                                                <div className={styles.infoIcon}>💧</div>
                                                <div className={styles.infoText}>
                                                    <div className={styles.infoLabel}>Humidity</div>
                                                    <div className={styles.infoValue}>{weatherData?.humidity || '--'}%</div>
                                                </div>
                                            </div>
                                            <div className={styles.weatherInfoCard}>
                                                <div className={styles.infoIcon}>🌬️</div>
                                                <div className={styles.infoText}>
                                                    <div className={styles.infoLabel}>Wind</div>
                                                    <div className={styles.infoValue}>{weatherData?.wind_speed || '--'} m/s</div>
                                                </div>
                                            </div>
                                            <div className={styles.weatherInfoCard}>
                                                <div className={styles.infoIcon}>☁️</div>
                                                <div className={styles.infoText}>
                                                    <div className={styles.infoLabel}>Clouds</div>
                                                    <div className={styles.infoValue}>{weatherData?.cloud_pct || '--'}%</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {selectedWeatherView === "Details" && (
                                    <div className={styles.weatherDetailsView}>
                                        <h3 className={styles.weatherDetailsTitle}>Weather Details</h3>
                                        {weatherData ? (
                                            <div className={styles.weatherDetailsGrid}>
                                                <div className={styles.detailCard}>
                                                    <h4>Temperature</h4>
                                                    <p>{weatherData.temp}°C</p>
                                                </div>
                                                <div className={styles.detailCard}>
                                                    <h4>Feels Like</h4>
                                                    <p>{weatherData.feels_like}°C</p>
                                                </div>
                                                <div className={styles.detailCard}>
                                                    <h4>Humidity</h4>
                                                    <p>{weatherData.humidity}%</p>
                                                </div>
                                                <div className={styles.detailCard}>
                                                    <h4>Max Temperature</h4>
                                                    <p>{weatherData.max_temp}°C</p>
                                                </div>
                                                <div className={styles.detailCard}>
                                                    <h4>Min Temperature</h4>
                                                    <p>{weatherData.min_temp}°C</p>
                                                </div>
                                                <div className={styles.detailCard}>
                                                    <h4>Cloud Coverage</h4>
                                                    <p>{weatherData.cloud_pct}%</p>
                                                </div>
                                                <div className={styles.detailCard}>
                                                    <h4>Wind Speed</h4>
                                                    <p>{weatherData.wind_speed} m/s</p>
                                                </div>
                                                <div className={styles.detailCard}>
                                                    <h4>Wind Direction</h4>
                                                    <p>{weatherData.wind_degrees}°</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <p className={styles.noData}>No weather data available.</p>
                                        )}
                                    </div>
                                )}
                                {selectedWeatherView === "Search" && (
                                    <div className={styles.weatherSearchView}>
                                        <h3 className={styles.weatherSearchTitle}>Search City</h3>
                                        <form onSubmit={handleWeatherSearch} className={styles.weatherSearchForm}>
                                            <input
                                                type="text"
                                                value={weatherSearchQuery}
                                                onChange={(e) => setWeatherSearchQuery(e.target.value)}
                                                placeholder="Enter city name..."
                                                className={styles.weatherSearchInput}
                                                onMouseEnter={onTextBoxHover}
                                                onMouseLeave={onTextBoxLeave}
                                            />
                                            <button type="submit" className={styles.weatherSearchButton}>
                                                Search
                                            </button>
                                        </form>
                                        <div className={styles.currentLocation}>
                                            <p>Current location: <strong>{city || "Not set"}</strong></p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </Draggable>
                {dropdown && (
                    <div className={styles.Dropdown} style={{ position: 'absolute', bottom: '11vh', right: '3vh', background: 'rgba(0,0,0,0.85)', padding: '1vh', borderRadius: '1vh', border: '1px solid rgba(255,255,255,0.1)' }}>
                        <div onClick={() => {
                            let a = confirm("This will erase all your Data! Are you sure to do this?")
                            if (a == true) {
                                localStorage.clear();
                                window.location.replace("/");
                            }
                        }} className={styles.DropdownOption} style={{ padding: '1vh 2vh', cursor: 'pointer', borderRadius: '0.5vh', transition: 'background 0.2s' }}>
                            Reset
                        </div>
                        <div className={styles.DropdownOption} style={{ padding: '1vh 2vh', cursor: 'pointer', borderRadius: '0.5vh', transition: 'background 0.2s', marginTop: '0.5vh' }} onClick={() => window.location.replace("/")}>
                            Shutdown
                        </div>
                        <div onClick={() => {
                            window.location.reload();
                        }} className={styles.DropdownOption} style={{ padding: '1vh 2vh', cursor: 'pointer', borderRadius: '0.5vh', transition: 'background 0.2s', marginTop: '0.5vh' }}>
                            Restart
                        </div>
                    </div>
                )}
                {showStartMenu == true && <div id="StartMenu" className={styles.StartMenu}>
                    <div className={styles.Top}>
                        <p>All Apps:</p>
                        <div className={styles.AllDesktopApps}>
                            {appInstalled.map(item => (
                                <div onClick={() => { showApp(item.Icon) }} className={styles.StartApp} key={item.Name}>
                                    {item.Name != null ? (
                                        item.Name == "Calculator" ? (
                                            <IoCalculator className={styles.startBtn} />
                                        ) : item.Name == "LumiNexplorer" ? (
                                            <SiFiles className={styles.startBtn} />
                                        ) : item.Name == "Clock" ? (
                                            <BsFillClockFill className={styles.startBtn} />
                                        ) : item.Name == "Browser" ? (
                                            <SiTorbrowser className={styles.startBtn} />
                                        ) : item.Name == "Weather" ? (
                                            <TiWeatherCloudy className={styles.startBtn} />
                                        ) : item.Name == "ChatExpress" ? (
                                            <IoMdChatbubbles className={styles.startBtn} />
                                        ) : item.Name == "Store" ? (
                                            <IoMdAppstore className={styles.startBtn} />
                                        ) : item.Name == "PDFViewer" ? (
                                            <VscFilePdf className={styles.startBtn} />
                                        ) : item.Name == "Vertice" ? (
                                            <SiTorbrowser className={styles.startBtn} />
                                        ) : item.Name == "Settings" ? (
                                            <IoSettingsSharp className={styles.startBtn} />
                                        ) : <BsFillLightningChargeFill className={styles.startBtn} />
                                    ) : (
                                        <BsFillLightningChargeFill className={styles.startBtn} />
                                    )}
                                    <p>{item.Name}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className={styles.Bottom}>
                        <div className={styles.Toggles}>
                            <div><AiFillHome onClick={() => { window.location.replace("/") }} /></div>
                            <div><IoIosKeypad /></div>
                            <div><IoSettingsSharp onClick={() => { showApp("Settings") }} /></div>
                        </div>
                        <div className={styles.User}>
                            <p>{name}</p>
                            <div className={styles.Badge2}>Pro</div>
                        </div>
                    </div>
                </div>}
                {showSearchMenu && (
                    <div id="StartMenu" className={styles.StartMenu}>
                        <div className={styles.SearchBarCSS}>
                            <form onSubmit={handleSearch}>
                                <BsSearch className={styles.SearchIcon} />
                                <input onMouseEnter={onTextBoxHover} onMouseLeave={onTextBoxLeave} value={searchQuery} onChange={AIValue === false ? handleSearch : handleChange} type="search" id="SearchBar" onSubmit={handleSearch} className={styles.SearchBarInputCSS} placeholder={searchPlaceholder} />
                            </form>
                        </div>
                        {(searchResults.length <= 0 && (
                            <div className={styles.Top}>
                                <p>Recommended Apps:</p>
                                <div className={styles.AllDesktopApps}>
                                    <div className={styles.StartApp}>
                                        <SiTorbrowser className={styles.startBtn} />
                                        <p>Vertice</p>
                                    </div>
                                    <div className={styles.StartApp}>
                                        <IoMdAppstore className={styles.startBtn} />
                                        <p>Sparking Store</p>
                                    </div>
                                    <div className={styles.StartApp}>
                                        <IoMdChatbubbles className={styles.startBtn} />
                                        <p>ChatExpress</p>
                                    </div>
                                </div>
                            </div>
                        )) || (
                                <div className={styles.Top}>
                                    <p>Apps:</p>
                                    <div className={styles.AllDesktopApps}>
                                        {searchResults.map((result) => (
                                            <div onClick={() => { showApp(result.Icon) }} key={result.Name} className={styles.StartApp}>
                                                {getAppIcon(result.Icon)}
                                                <p>{result.Name}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        <div className={styles.Middle}>
                            <p>Ask RK AI:-</p>
                            {!AIValue && <p>Hey there, click bottom left button to start a chat with me...</p>}
                            {AIValue && <span>RK AI: {outputText || "Output will come here..."}</span>}
                        </div>
                        <div className={styles.Bottom}>
                            <div className={styles.User}>
                                {!AIValue && <button className={styles.button} onClick={handleAIClick}>Click here to start chat with RK AI...</button>}
                                {AIValue && <button className={styles.button} onClick={handleAIClick}>Click here to search apps and more...</button>}
                            </div>
                        </div>
                    </div>
                )}
                {showTaskView && (
                    <div className={styles.TaskViewOverlay}>
                        <h1 style={{ color: 'white', fontWeight: 'bold', fontSize: '4vh', marginBottom: '5vh' }}>Mission Control</h1>
                        <div className={styles.DesktopGrid}>
                            {desktops.map(desk => (
                                <div key={desk.id} onClick={() => { setCurrentDesktop(desk.id); setShowTaskView(false); }} className={`${styles.DesktopCard} ${currentDesktop === desk.id ? styles.DesktopCardActive : ''}`} style={{ position: 'relative' }}>
                                    <h2 style={{ color: 'white' }}>{desk.name}</h2>
                                    <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1.5vh' }}>{Object.keys(appToDesktopMap).filter(app => appToDesktopMap[app] === desk.id && document.getElementById(app) && document.getElementById(app).style.height !== "0vh").length} Apps Open</span>
                                    {enabled('missionControlDelete') && <button className={styles.DeleteDesktopBtn} onClick={(e) => {
                                        e.stopPropagation();
                                        const remaining = desktops.filter(d => d.id !== desk.id);
                                        if (remaining.length === 0) return;
                                        setDesktops(remaining);
                                        if (currentDesktop === desk.id) {
                                            setCurrentDesktop(remaining[0].id);
                                        }
                                    }}>×</button>}
                                </div>
                            ))}
                            <div onClick={() => setDesktops([...desktops, { id: desktops.length + 1, name: `Desktop ${desktops.length + 1}` }])} className={styles.AddDesktopCard}>
                                <h1 style={{ color: 'white', fontSize: '6vh' }}>+</h1>
                            </div>
                        </div>
                        <button onClick={() => setShowTaskView(false)} style={{ marginTop: 'auto', marginBottom: '10vh', padding: '2vh 4vh', background: '#e11d48', color: 'white', border: 'none', borderRadius: '1vh', fontSize: '2vh', cursor: 'pointer' }}>Close Task View</button>
                    </div>
                )}
                <div className={styles.TaskDock}>
                    <BsFillLightningChargeFill onClick={() => { if (showStartMenu == false) { setShowStartMenu(true) } else { setShowStartMenu(false) } }} className={styles.TaskList} />
                    <BsSearch onClick={() => { if (showSearchMenu == false) { setShowSearchMenu(true) } else { setShowSearchMenu(false) } }} className={styles.TaskList} />
                    <BsListTask onClick={() => { setShowTaskView(!showTaskView) }} className={styles.TaskList} title="Task View" />
                    <MdWidgets onClick={() => { if (showWidget == false) { setShowWidget(true) } else { setShowWidget(false) } }} className={styles.TaskList} />
                    <div className={styles.Line}></div>
                    <SiFiles onClick={() => { showApp("LumiNexplorer") }} className={styles.TaskList} />
                    <BsFillClockFill onClick={() => { showApp("Clock") }} className={styles.TaskList} />
                    <IoCalculator onClick={() => { showApp("Calculator") }} className={styles.TaskList} />
                    <SiTorbrowser onClick={() => { showApp("Browser") }} className={styles.TaskList} />
                    <IoMdAppstore onClick={() => { showApp("Store") }} className={styles.TaskList} />
                    <TiWeatherCloudy onClick={() => { showApp("Weather") }} className={styles.TaskList} />
                    <IoMdChatbubbles onClick={() => { showApp("Chat") }} className={styles.TaskList} />
                    <BsWhatsapp onClick={() => { showApp("WhatsApp") }} className={styles.TaskList} />
                    <div className={styles.Line}></div>
                    <div onClick={() => { if (notificationDropdown) { setNotificationDropdown(false) } else { setNotificationDropdown(true) } }} className={styles.WeatherDiv}>
                        {cloudPct <= 30 ? (
                            <FaCloudSun className={styles.WeatherType} />
                        ) : cloudPct <= 95 ? (
                            <FaCloud className={styles.WeatherType} />
                        ) : (
                            <FaCloudShowersHeavy className={styles.WeatherType} />
                        )}
                        <p><span>{weatherData ? weatherData.temp : '--'}</span>°C</p>
                        <p>Feels: <span>{weatherData ? weatherData.feels_like : '--'}</span>°C</p>
                    </div>
                    <div className={styles.Line}></div>
                    {isOnline ? (
                        wifiStrength <= -60 ? (
                            <BsWifi1 className={styles.TaskList} />
                        ) : (
                            <BsWifi className={styles.TaskList} />
                        )
                    ) : (
                        <BsWifiOff className={styles.TaskList} />
                    )}
                    {batterySupported ? (
                        isCharging ? (
                            batteryLevel > 90 ? (
                                <MdBatteryChargingFull className={styles.TaskList} />
                            ) : batteryLevel > 80 ? (
                                <MdBatteryCharging90 className={styles.TaskList} />
                            ) : batteryLevel > 60 ? (
                                <MdBatteryCharging80 className={styles.TaskList} />
                            ) : batteryLevel > 50 ? (
                                <MdBatteryCharging60 className={styles.TaskList} />
                            ) : batteryLevel > 30 ? (
                                <MdBatteryCharging50 className={styles.TaskList} />
                            ) : batteryLevel > 20 ? (
                                <MdBatteryCharging30 className={styles.TaskList} />
                            ) : (
                                <MdBatteryAlert className={styles.TaskList} />
                            )
                        ) : (
                            batteryLevel > 90 ? (
                                <MdBatteryFull className={styles.TaskList} />
                            ) : batteryLevel > 80 ? (
                                <MdBattery90 className={styles.TaskList} />
                            ) : batteryLevel > 60 ? (
                                <MdBattery80 className={styles.TaskList} />
                            ) : batteryLevel > 50 ? (
                                <MdBattery60 className={styles.TaskList} />
                            ) : batteryLevel > 30 ? (
                                <MdBattery50 className={styles.TaskList} />
                            ) : batteryLevel > 20 ? (
                                <MdBattery30 className={styles.TaskList} />
                            ) : (
                                <MdBattery20 className={styles.TaskList} />
                            )
                        )
                    ) : (
                        <MdBatteryAlert className={styles.TaskList} />
                    )}
                    {isMuted ? (
                        <BiVolumeMute className={styles.TaskList} />
                    ) : (
                        volume > 70 ? (
                            <BiVolumeFull className={styles.TaskList} />
                        ) : volume > 30 ? (
                            <BiVolumeLow className={styles.TaskList} />
                        ) : (
                            <BiVolumeMute className={styles.TaskList} />
                        )
                    )}
                    <FaPowerOff onClick={() => { if (dropdown == true) { setDropdown(false) } else { setDropdown(true) } }} className={styles.TaskList} />
                    <div className={styles.Badge2}>Pro</div>
                </div>
            </main>
        </div>
    );
};

export default Home;
