let xhr = new XMLHttpRequest();

// Установка обработчика событий загрузки данных
xhr.onload = function() {
    if (xhr.status === 200) {
        let parser = new DOMParser();
        // Разбор XML данных
        let xmlDoc = parser.parseFromString(xhr.responseText, "application/xml");
        const newsFeedContainer = document.getElementById("newsFeed");

        // Получаем список всех элементов новостей в XML
        let newsItems = Array.from(xmlDoc.getElementsByTagName("item"));

        // Функция для создания HTML-кода элемента новости
        function createNewsCardHTML(newsItem) {
            // Получение заголовка новости, даты и url-картинки из XML
            const title = newsItem.getElementsByTagName("title")[0].textContent;
            const date = newsItem.getElementsByTagName("pubDate")[0].textContent;
            const imageUrl = newsItem.getElementsByTagName("enclosure")[0].getAttribute("url");

            const limitedTitle = getLimitedWords(title, 13);
            // Преобразование текстового значения в объект даты JavaScript
            const pubDate = new Date(date);
            const formattedDate = formatDate(pubDate);

            // Создаем HTML-код для элемента новости
            return `
                <div class="news__card">
                  <div class="news__card-img">
                    <img src="${imageUrl}" alt="${limitedTitle}">
                  </div>
                  <div class="news__card-descr">
                    <h2 class="news__card-title">${limitedTitle}</h2>
                    <span class="news__card-date">${formattedDate}</span>
                  </div>
                </div>
              `;
        }

        // Сортируем элементы новостей по убыванию даты
        newsItems.sort((a, b) => {
            const dateA = new Date(a.getElementsByTagName("pubDate")[0].textContent);
            const dateB = new Date(b.getElementsByTagName("pubDate")[0].textContent);
            return dateB - dateA;
        });

        // Отображение первых 6 элементов новостей
        let startIndex = 0;
        let endIndex = Math.min(startIndex + 6, newsItems.length);

        for (let i = startIndex; i < endIndex; i++) {
            const newsItem = newsItems[i];
            const newsCardHTML = createNewsCardHTML(newsItem);
            newsFeedContainer.insertAdjacentHTML("beforeend", newsCardHTML);
        }

        // Обработчик события для кнопки "Больше новостей"
        const moreButton = document.querySelector(".news__card-more");
        moreButton.addEventListener("click", function() {
            // Проверяем, остались ли еще элементы новостей для загрузки
            if (endIndex < newsItems.length) {
                // Увеличиваем startIndex и endIndex
                startIndex = endIndex;
                endIndex = Math.min(startIndex + 6, newsItems.length);

                // Загружаем следующие элементы новостей
                for (let i = startIndex; i < endIndex; i++) {
                    const newsItem = newsItems[i];
                    const newsCardHTML = createNewsCardHTML(newsItem);
                    newsFeedContainer.insertAdjacentHTML("beforeend", newsCardHTML);
                }
            } else {
                // Все элементы новостей уже загружены
                moreButton.style.display = "none";
            }
        });

// Функция для получения определенного количества слов
        function getLimitedWords(text, limit) {
            // Разделяем текст на слова
            const words = text.split(" ");

            // Выбираем определенное количество слов
            const limitedWords = words.slice(0, limit);

            // Возвращаем выбранные слова как строку
            return limitedWords.join(" ");
        }

// Функция для форматирования даты в виде "день.месяц.год"
        function formatDate(date_new_format) {
            const day = date_new_format.getDate();
            const month = date_new_format.getMonth() + 1;
            const year = date_new_format.getFullYear();

            // Добавляем ведущий ноль для однозначных дней и месяцев
            const formattedDay = day < 10 ? `0${day}` : day;
            const formattedMonth = month < 10 ? `0${month}` : month;

            // Возвращаем дату в требуемом формате
            return `${formattedDay}.${formattedMonth}.${year}`;
        }
    } else {
        console.log("Запрос не прошел. Статус: " + xhr.status);
    }
};

let newsApiUrl = "https://ictransport.ru/rss-feed-682234369181.xml";

// Отправляем GET-запрос для получения данных новостей
xhr.open("GET", newsApiUrl, true);
xhr.send();