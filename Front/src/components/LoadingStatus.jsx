export default function LoadingStatus({ progress }) {
  return (
    <div className="download-status">
      <h3>Загрузка...</h3>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>
      <p>{progress}%</p>
    </div>
  );
}
