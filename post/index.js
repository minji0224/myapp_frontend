let currentPage = 0;
let isLastPage = false;
const PAGE_SIZE = 8;
let currentQuery = "";


// 카드템플릿 매개변수 수정하고 밑에도 수정해야함

function cardTemplate(i) { /*html*/

 const time = new Date(i.createdTime);
 const formattedTime = `${time.getFullYear()}년
 ${(time.getMonth() + 1).toString()}월
 ${time.getDate().toString()}일
 ${time.getHours().toString()}시
 ${time.getMinutes().toString()}분
 ${time.getSeconds().toString()}초`;


  const template = `<div class= "template" data-no="${i.no}">
  <button name="btn-remove"></button>
  <span>${i.no} ${i.creatorName}</span>
  <p>${i.link}</p>
  <h3>${i.restaurantName}</h3>
  <p>${i.content}</p>
  <span>${formattedTime}</span>
  </div>`;

  return template;
}

async function getPagedList(page, query) {
  let url = "";
  if(query) {
    url = `http://localhost:8080/contacts/paging/search?page=${page}&size=${PAGE_SIZE}&query=${query}`;
  } else {
    url = `http://localhost:8080/contacts/paging?page=${page}&size=${PAGE_SIZE}`;
  }

  const response = await fetch(url, {
    method: "POST"
  });

  const result = await response.json();
  document.querySelectorAll("form")[0].insertAdjacentHTML = "";
  for(let item of result.content){
    document.querySelectorAll("form")[0].insertAdjacentHTML("afterbegin", template());
  }
  currentPage = result.number;
  isLastPage = result.last; 

  setBtnActive();
  
}