function replaceTag() {
    let element = document.querySelectorAll("прописываем_через_запятую_элементы, _теги_которых_, нужно_заменить_на_тег_p");
    element.forEach((e) => {
        e.outerHTML
        // Создаём новый тэг.
        let newTagName = `p`;
        let newTag = document.createElement(newTagName);
        // Вставляем новый тэг перед старым.
        e.parentElement.insertBefore(newTag, e);
        // Переносим в новый тэг атрибуты старого с их значениями.
        for (let i = 0, attrs = e.attributes, count = attrs.length; i < count; ++i)
            newTag.setAttribute(attrs[i].name, attrs[i].value);
        // Переносим в новый тэг все дочерние элементы старого.
        let childNodes = e.childNodes;
        while (childNodes.length > 0)
            newTag.appendChild(childNodes[0]);
        // Удаляем старый тэг.
        e.parentElement.removeChild(e);
    });
}
replaceTag();