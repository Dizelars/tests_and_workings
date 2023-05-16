// Первая реализация

let element = document.querySelectorAll("на_что_будем_кликать");
element.forEach(item => {
    item.addEventListener('click', () => {
        const Video_arr = [
            'наш адрес до картинки №1',
            'наш адрес до картинки №2',
            'наш адрес до картинки №3',
            'наш адрес до картинки №4',
            'наш адрес до картинки №5',
            'наш адрес до картинки №6',
            'наш адрес до картинки №7',
            'наш адрес до картинки №8',
            'наш адрес до картинки №9'
        ];
        setTimeout(() => {
            let videoElem = document.querySelector("берем_весь_тег_video");
            switch (videoElem.getAttribute('id')) {
                case 'id тега video':
                    videoElem.setAttribute('poster', Video_arr[0]);
                    break;
                case 'id тега video':
                    videoElem.setAttribute('poster', Video_arr[1]);
                    break;
                case 'id тега video':
                    videoElem.setAttribute('poster', Video_arr[2]);
                    break;
                case 'id тега video':
                    videoElem.setAttribute('poster', Video_arr[3]);
                    break;
                case 'id тега video':
                    videoElem.setAttribute('poster', Video_arr[4]);
                    break;
                case 'id тега video':
                    videoElem.setAttribute('poster', Video_arr[5]);
                    break;
                case 'id тега video':
                    videoElem.setAttribute('poster', Video_arr[6]);
                    break;
                case 'id тега video':
                    videoElem.setAttribute('poster', Video_arr[7]);
                    break;
                case 'id тега video':
                    videoElem.setAttribute('poster', Video_arr[8]);
                    break;
            }
        }, 0);
    });
});


// Вторая реализация

const videoMap = {
    'id тега video': 'наш адрес до картинки №1',
    'id тега video': 'наш адрес до картинки №2',
    'id тега video': 'наш адрес до картинки №3',
    'id тега video': 'наш адрес до картинки №4',
    'id тега video': 'наш адрес до картинки №5',
    'id тега video': 'наш адрес до картинки №6',
    'id тега video': 'наш адрес до картинки №7',
    'id тега video': 'наш адрес до картинки №8',
    'id тега video': 'наш адрес до картинки №9'
};
document.querySelectorAll("на_что_будем_кликать").forEach(item => {
    item.addEventListener('click', () => {
        setTimeout(() => {
            const videoElem = document.querySelector("берем_весь_тег_video");
            if (videoElem) {
                const id = videoElem.getAttribute('id');
                if (id in videoMap) {
                    videoElem.setAttribute('poster', videoMap[id]);
                }
            }
        }, 0);
    });
});