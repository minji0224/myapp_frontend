let currentPage = 0;
let isLastPage = false;
const PAGE_SIZE = 8;
let currentQuery = "";

// 게시물 생성 함수
function cardTemplate(item) { /*html*/
 const time = new Date(item.createdTime);
 const formattedTime = `${time.getFullYear()}년
  ${(time.getMonth() + 1).toString()}월
  ${time.getDate().toString()}일
  ${time.getHours().toString()}시
  ${time.getMinutes().toString()}분
  ${time.getSeconds().toString()}초`;

 const template = `<div class= "template" data-no="${item.no}">
  <button name="btn-remove">X</button>
  <span>${item.no} ${item.creatorName}</span>
  <p>${item.link}</p>
  <h3>${item.restaurantName}</h3>
  <p>${item.content}</p>
  <span>${formattedTime}</span>
  </div>`;

  return template;
}


// 페이징 처리
async function getPagedList(page, query) {
  let url = "";
  if(query) {
    url = `http://localhost:8080/posts/paging/search?page=${page}&size=${PAGE_SIZE}&query=${query}`;
  } else {
    url = `http://localhost:8080/posts/paging?page=${page}&size=${PAGE_SIZE}`;
  }

  const response = await fetch(url);
  const result = await response.json();

  const container = document.querySelector("#container");

  container.innerHTML = "";

  for(let item of result.content){
    container.insertAdjacentHTML("afterbegin",cardTemplate(item));
  }

  currentPage = result.number;
  isLastPage = result.last; 

  // setBtnActive();
  
}

// 첫화면(첫번째페이지)
(async() => {
  window.addEventListener("DOMContentLoaded", () => {
    getPagedList(0);
  });
})();

