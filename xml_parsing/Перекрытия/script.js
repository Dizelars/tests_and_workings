// Первый вариант

// let xhr = new XMLHttpRequest();
// xhr.onload = function() {
//   if (xhr.status === 200) {
//     let parser = new DOMParser();
//     let xmlDoc = parser.parseFromString(xhr.responseText, "application/xml");
//     const newsFeedContainer = document.getElementById("ourSwiper");

//     let slideItems = Array.from(xmlDoc.getElementsByTagName("item"));
//     let allDates = [];
//     let uniqueDates = new Set(); // Множество для хранения уникальных дат
//     let duplicateDates = new Map(); // Map для хранения повторяющихся дат

//     // Получение всех дат и подсчет повторений
//     for (let i = 0; i < slideItems.length; i++) {
//       const slideItem = slideItems[i];
//       const Period = slideItem.getElementsByTagName("description")[0].textContent;
//       const datePeriod = Period.split(",").map((dateString) => {
//         const [day, month, year] = dateString.split(".");
//         return new Date(`${year}-${month}-${day}`);
//       });

//       allDates.push(...datePeriod);

//       datePeriod.forEach((date) => {
//         const dateString = date.toISOString().slice(0, 10);
//         uniqueDates.add(dateString);

//         if (duplicateDates.has(dateString)) {
//           const imageUrl = slideItem.getElementsByTagName("enclosure")[0].getAttribute("url");
//           duplicateDates.get(dateString).add(imageUrl); // Используем Set для адресов изображений
//         } else {
//           const imageUrl = slideItem.getElementsByTagName("enclosure")[0].getAttribute("url");
//           duplicateDates.set(dateString, new Set([imageUrl])); // Используем Set для адресов изображений
//         }
//       });
//     }

//     const infoAllSliders = {};

//     allDates.forEach(date => {
//       const month = date.getMonth(); // Получение индекса месяца
//       const monthName = getMonthName(month); // Функция для получения имени месяца

//       if (!infoAllSliders.hasOwnProperty(monthName)) {
//         // Создание нового объекта информации для месяца, если еще не существует
//         infoAllSliders[monthName] = {
//           'Все даты': [],
//           'Отличающиеся даты': new Set(),
//           'Повторяющиеся даты': new Map(),
//         };
//       }

//       // Добавление даты в соответствующий месяц
//       infoAllSliders[monthName]['Все даты'].push(date.toISOString().slice(0, 10));
//       infoAllSliders[monthName]['Отличающиеся даты'].add(date.toISOString().slice(0, 10));

//       const dateString = date.toISOString().slice(0, 10);
//       if (infoAllSliders[monthName]['Повторяющиеся даты'].has(dateString)) {
//         const existingAddresses = infoAllSliders[monthName]['Повторяющиеся даты'].get(dateString);
//         const newAddresses = [...existingAddresses, ...duplicateDates.get(dateString)];
//         infoAllSliders[monthName]['Повторяющиеся даты'].set(dateString, new Set(newAddresses));
//       } else {
//         const addresses = [...duplicateDates.get(dateString)];
//         infoAllSliders[monthName]['Повторяющиеся даты'].set(dateString, new Set(addresses));
//       }
//     });

//     // Ваш остальной код для создания новостных карточек
//     for (let i = 0; i < slideItems.length; i++) {
//       const newsItem = slideItems[i];
//       const imageUrl = newsItem.getElementsByTagName("enclosure")[0].getAttribute("url");

//       const newsCardHTML = `
//         <div class="swiper-slide">
//           <div class="img-container">
//             <img src="${imageUrl}" alt="Перекрытия">
//           </div>
//         </div>
//       `;
//       // newsFeedContainer.insertAdjacentHTML("beforeend", newsCardHTML);
//     }
//     console.log(infoAllSliders);
//   } else {
//     console.log("Запрос не прошел. Статус: " + xhr.status);
//   }
// };

// let newsApiUrl = "https://i.transport.mos.ru/rss-feed-222691247001.xml";
// xhr.open("GET", newsApiUrl, true);
// xhr.send();

// // Функция для получения имени месяца по индексу
// function getMonthName(monthIndex) {
//   const monthNames = [
//     'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
//     'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
//   ];
//   return monthNames[monthIndex];
// }

// Более оптимизированный вариант

const newsApiUrl = "https://i.transport.mos.ru/rss-feed-222691247001.xml";
const newsFeedContainer = document.getElementById("ourSwiper");

// Загрузка данных из XML-файла
fetch(newsApiUrl)
    .then(response => {
        if (response.ok) {
            return response.text();
        } else {
            throw new Error(`Запрос не прошел. Статус: ${response.status}`);
        }
    })
    .then(xmlText => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        const slideItems = Array.from(xmlDoc.getElementsByTagName("item"));

        const duplicateDates = new Map(); // Map для хранения повторяющихся дат и адресов изображений

        // Получение дублирующихся дат и адресов изображений
        slideItems.forEach(slideItem => {
            const period = slideItem.getElementsByTagName("description")[0].textContent;
            const datePeriod = period.split(",").map(dateString => {
                const [day, month, year] = dateString.split(".");
                return new Date(`${year}-${month}-${day}`);
            });

            datePeriod.forEach(date => {
                const dateString = date.toISOString().slice(0, 10);

                if (duplicateDates.has(dateString)) {
                    const addresses = duplicateDates.get(dateString);
                    addresses.add(slideItem.getElementsByTagName("enclosure")[0].getAttribute("url"));
                } else {
                    const addresses = new Set([slideItem.getElementsByTagName("enclosure")[0].getAttribute("url")]);
                    duplicateDates.set(dateString, addresses);
                }
            });
        });

        const infoAllSliders = {};

        // Формирование информации о слайдерах по месяцам
        slideItems.forEach(newsItem => {
            const imageUrl = newsItem.getElementsByTagName("enclosure")[0].getAttribute("url");
            const Period = newsItem.getElementsByTagName("description")[0].textContent;
            const datePeriod = Period.split(",").map(dateString => {
                const [day, month, year] = dateString.split(".");
                return new Date(`${year}-${month}-${day}`);
            });

            datePeriod.forEach(date => {
                const month = date.getMonth(); // Получение индекса месяца
                const monthName = getMonthName(month); // Функция для получения имени месяца

                if (!infoAllSliders.hasOwnProperty(monthName)) {
                    // Создание нового объекта информации для месяца, если еще не существует
                    infoAllSliders[monthName] = {
                        'Все даты': [],
                        'Отличающиеся даты': new Set(),
                        'Повторяющиеся даты': new Map(),
                    };
                }

                // Добавление даты в соответствующий месяц
                infoAllSliders[monthName]['Все даты'].push(date.toISOString().slice(0, 10));
                infoAllSliders[monthName]['Отличающиеся даты'].add(date.toISOString().slice(0, 10));

                const dateString = date.toISOString().slice(0, 10);
                if (infoAllSliders[monthName]['Повторяющиеся даты'].has(dateString)) {
                    const existingAddresses = infoAllSliders[monthName]['Повторяющиеся даты'].get(dateString);
                    const newAddresses = [...existingAddresses, ...duplicateDates.get(dateString)];
                    infoAllSliders[monthName]['Повторяющиеся даты'].set(dateString, new Set(newAddresses));
                } else {
                    const addresses = [...duplicateDates.get(dateString)];
                    infoAllSliders[monthName]['Повторяющиеся даты'].set(dateString, new Set(addresses));
                }

                const newsCardHTML = `
          <div class="swiper-slide">
            <div class="img-container">
              <img src="${imageUrl}" alt="Перекрытия">
            </div>
          </div>
        `;
                // newsFeedContainer.insertAdjacentHTML("beforeend", newsCardHTML);
            });
        });

        console.log(infoAllSliders);
    })
    .catch(error => {
        console.error(error);
    });

// Функция для получения имени месяца по индексу
function getMonthName(monthIndex) {
    const monthNames = [
        'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
        'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
    ];
    return monthNames[monthIndex];
}

// Свайпер
// const swiper = new Swiper('.swiper', {
//   slidesPerView: 3,
//   centeredSlides: true,
//   zoom: true,

//   pagination: {
//     el: '.swiper-pagination',
//     clickable: true
//   },

//   // Navigation arrows
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
// });