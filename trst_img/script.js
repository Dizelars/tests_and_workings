// function is_cached(src) {
//     let image = new Image();
//     image.src = src;
//     return image.complete;
// }

// let imgUrl = document.querySelectorAll('.t-slds__bgimg');
// let reg = /"(.*?)"/g;
// let heroArray = [];
//
// imgUrl.forEach((item, i) => {
//     let UrlStrText = item.style.backgroundImage;
//     let UrlAddress = UrlStrText.match(reg).map(elem => elem.replace(/"/g, ''))[0];
//     heroArray.push(UrlAddress);
// });
//
// function preCacheHeros(){
//     heroArray.forEach(() => {
//         let img = new Image();
//         img.src = this;
//     });
// }
//
// window.onload = () => {
//     preCacheHeros();
// };
// console.log(heroArray);


const cloneContainerElements = document.querySelectorAll(".clone-container-1");
const originalBlockElement = document.querySelector("#rec592292250");

cloneContainerElements.forEach((e,i) => {
    const clonedBlock = originalBlockElement.cloneNode(true);
    const idNum = 100000000+i;
    const newBlockId = "rec" + idNum;
    clonedBlock.setAttribute("id", newBlockId);
    cloneContainerElements[i].appendChild(clonedBlock);
    let idCarousel = cloneContainerElements[i].querySelectorAll('#carousel_592292250');
});