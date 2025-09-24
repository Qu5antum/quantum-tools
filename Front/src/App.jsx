import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Search from "./components/Search";
import LinkTab from "./components/Link";
import Settings from "./components/Settings";
import DownloadStatus from "./components/LoadingStatus";
import Info from "./components/Info"
import { YoutubeOutlined, LinkOutlined, SettingOutlined, CloudDownloadOutlined, InfoCircleOutlined } from '@ant-design/icons';

export default function App() {
  const [tab, setTab] = useState("search");
  const [format, setFormat] = useState("mp4");
  const [quality, setQuality] = useState("720");
  const [progress, setProgress] = useState(null);

  return (
    <div className="app-container">
      {/* Sidebar */} 
      <div className="sidebar">
        <div><img src="/images/v.jpg" alt="logo" style={{ width: "40px", height: "auto" }}  /></div>
        <button onClick={() => setTab("search")}><YoutubeOutlined /><div className="label">Youtube Search</div></button>
        <button onClick={() => setTab("link")}><LinkOutlined /><div className="label">Link</div></button>
        <button onClick={() => setTab("settings")}><SettingOutlined /><div className="label">Settings</div></button>
        <button onClick={() => setTab("info")}><InfoCircleOutlined /><div className="label">info</div></button>
      </div>

      {/* Main */}
      <div className="main-content">
        <h1 className="title font-bold"><img src="/images/v.jpg" alt="Logo" style={{ width: "30px", height: "auto" }}/>Quantum Tools</h1>

        <AnimatePresence mode="wait">
          {tab === "search" && (
            <motion.div
              key="search"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <Search format={format} quality={quality} />
            </motion.div>
          )}

          {tab === "link" && (
            <motion.div
              key="link"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <LinkTab format={format} quality={quality} />
            </motion.div>
          )}

          {tab === "settings" && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
            >
              <Settings
                format={format}
                quality={quality}
                setFormat={setFormat}
                setQuality={setQuality}
              />
            </motion.div>
          )}

          {tab === "info" && (
            <motion.div
              key="info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }} 
            >
              <Info/>

            </motion.div>
          )}
        </AnimatePresence>

        {progress !== null && <DownloadStatus progress={progress} />}
      </div>
    </div>
  );
}
