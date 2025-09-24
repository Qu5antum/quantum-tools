import { useState } from "react";
import { LinkOutlined, DownloadOutlined } from "@ant-design/icons";
import { Input, Button } from "antd";

const { Search } = Input;

export default function LinkTab({ format, quality }) {
  const [url, setUrl] = useState("");

  const download = () => {
    if (!url) return;
    const link = `http://localhost:8000/downloads?url=${encodeURIComponent(
      url
    )}&format=${format}&video_quality=${quality}`;
    window.open(link, "_blank");
  };

  return (
    <div className="font-bold" style={{ maxWidth: 600, margin: "0 auto" }}>
      <Search
        placeholder="Вставь ссылку сюда"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        allowClear
        prefix={<LinkOutlined style={{ color: "#ffffff" }} />} // иконка слева
        size="large"
        className="custom-link"
      />
      <Button
        type="primary"
        icon={<DownloadOutlined />}
        size="large"
        onClick={download}
        style={{ marginTop: 16 }}
      >
        Скачать
      </Button>
    </div>
  );
}
