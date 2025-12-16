import { GithubOutlined } from "@ant-design/icons";


export default function Info() {
  return (
    <div className="p-6 bg-gray-1 text-white rounded-xl shadow-lg space-y-6" style={{ maxWidth: 600, margin: "0 auto" }}>
      {/* Раздел: Информация */}
      <section>
        <h2 className="text-xl font-bold mb-2 font-bold">Что такое Quantum Tools</h2>
        <p className="text-base leading-relaxed font-bold">
          <strong>Quantum Tools</strong> — это приложение, позволяющее скачивать видео и аудио файлы без рекламы. 
          В разделе <strong>Настройки (Settings)</strong> вы можете изменить формат (MP3 или MP4) и качество видео.  
          В разделе <strong>Поиск на YouTube (Youtube Search)</strong> можно ввести название видео и сразу скачать его в любом формате.  
          Также в разделе <strong>Ссылка (Link)</strong> можно вставить ссылку на видео или аудио с поддерживаемых сервисов:  
          YouTube, VK, VK Video, Twitch, TikTok, Rutube, Facebook.
        </p>
      </section>

      {/* Раздел: Конфиденциальность */}
      <section>
        <h2 className="text-xl font-bold mb-2 font-bold">Конфиденциальность</h2>
        <p className="text-base leading-relaxed font-bold">
          <strong>Quantum Tools</strong> не сохраняет ваши персональные и поисковые данные — 
          это исключительно ваше дело. Все запросы к бэкенду отправляются анонимно!
        </p>
      </section>
      <section>
        <p className="font-bold">
            Спасибо вам за использование Quantum Tools!
        </p>
      </section>
      {/* Карточки */}
      <div className="flex flex-wrap gap-4">
        {/* GitHub */}
        <a
          href="https://github.com/Qu5antum/quantum-tools"
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col justify-center rounded-2xl bg-gradient-to-r from-purple-700 to-purple-500 p-5 w-64 shadow-lg hover:scale-105 transition"
        >
          <div className="flex items-center gap-2">
            <GithubOutlined style={{ fontSize: "22px" }} />
            <span className="font-bold text-lg">github ↗</span>
          </div>
          <p className="text-sm opacity-80 mt-2">
            смотри исходный код Quantum Tools, вноси свой вклад или сообщай о проблемах
          </p>
        </a>
        {/* Текст ниже */}
      <p className="max-w-xl text-sm text-center opacity-80">
        если ты хочешь сообщить о баге или какой-то другой повторяющейся проблеме,
        то делай это на <span className="font-bold">github</span>. вся поддержка осуществляется по мере возможности и не гарантируется, а ответ может занять какое-то время.
      </p>
        </div>
    </div>
  );
}
