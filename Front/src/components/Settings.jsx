import { useState } from "react";

export default function Settings({ format, quality, setFormat, setQuality }) {
  const qualities = [
    { value: "2160", label: "4K" },
    { value: "1080", label: "1080p" },
    { value: "720", label: "720p" },
    { value: "480", label: "480p" },
    { value: "360", label: "360p" },
    { value: "240", label: "240p" },
    { value: "144", label: "144p" },
  ];

  const bitrates = [
    { value: "320", label: "320 кб/с" },
    { value: "256", label: "256 кб/с" },
    { value: "128", label: "128 кб/с" },
    { value: "96", label: "96 кб/с" },
    { value: "64", label: "64 кб/с" },
    { value: "8", label: "8 кб/с" },
  ];

  const [bitrate, setBitrate] = useState("320");

  return (
    <div className="settings">
      {/* --- Формат --- */}
      <div className="setting-group">
        <label className="label">Формат:</label>
        <div className="quality-options">
          <button
            className={`quality-button ${format === "mp4" ? "active" : ""}`}
            onClick={() => setFormat("mp4")}
          >
            MP4 (видео)
          </button>
          <button
            className={`quality-button ${format === "mp3" ? "active" : ""}`}
            onClick={() => setFormat("mp3")}
          >
            MP3 (аудио)
          </button>
        </div>
      </div>

      {/* --- Качество --- */}
      <div className="setting-group">
        <label className="label">Качество видео:</label>
        <div className="quality-options">
          {qualities.map((q) => (
            <button
              key={q.value}
              className={`quality-button ${quality === q.value ? "active" : ""}`}
              onClick={() => setQuality(q.value)}
            >
              {q.label}
            </button>
          ))}
        </div>
      </div>

      {/* --- Битрейт аудио (только для MP3) --- */}
      <div className="setting-group">
          <label className="label">Битрейт аудио:</label>
          <div className="quality-options">
            {bitrates.map((b) => (
              <button
                key={b.value}
                className={`quality-button ${bitrate === b.value ? "active" : ""}`}
                onClick={() => setBitrate(b.value)}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>
    </div>
  );
}
