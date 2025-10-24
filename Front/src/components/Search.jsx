import { useState } from "react";
import { SearchOutlined, DownloadOutlined, PlayCircleOutlined } from "@ant-design/icons";
import { Input, Button, Card, Space } from "antd";

const { Search } = Input;

export default function VideoSearch({ format, quality, setProgress }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const BACKEND_URL = "https://quantum-tools.onrender.com";

  // 🔎 поиск видео через API FastAPI
  const searchVideos = async (value) => {
    setQuery(value);
    const res = await fetch(
      `${BACKEND_URL}/search/?search_query=${encodeURIComponent(value)}`
    );
    const data = await res.json();
    setResults(data.results || []);
  };

  // 📥 скачивание видео
  const download = (videoUrl) => {
    const link = `${BACKEND_URL}/downloads?url=${encodeURIComponent(
      videoUrl
    )}&format=${format}&video_quality=${quality}`;
    window.open(link, "_blank");
  };

  return (
    <div className="font-bold" style={{ maxWidth: 600, margin: "0 auto" }}>
      {/* Поле поиска с иконкой */}
      <Search
        placeholder="Введите название видео..."
        allowClear
        enterButton={<SearchOutlined />}
        size="large"
        prefix={<SearchOutlined style={{ color: "#ffffff" }} />}
        onSearch={searchVideos}
        className="custom-search"
      />

      {/* Результаты поиска */}
      <div className="results">
        <Space direction="vertical" style={{ width: "100%"}}>
          {results.map((video, idx) => (
            <Card
              key={idx}
              title={video.title}
              extra={
                <Button
                  type="primary"
                  icon={<DownloadOutlined />}
                  onClick={() => download(video.video_url)}
                >
                  Скачать
                </Button>
              }
            >
              <a
                href={video.video_url}
                target="_blank"
                rel="noreferrer"
                style={{  fontSize: "16px" }}
              >
                <PlayCircleOutlined /> Смотреть на YouTube
              </a>
            </Card>
          ))}
        </Space>
      </div>
    </div>
  );
}
