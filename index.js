let currentPage = 0;
let isLastPage = false;
const PAGE_SIZE = 6;
let currentQuery = "";
let queryKey = "";

// 로그인/로그아웃
(() => {
  const token = getCookie("token");
  console.log(token);
  hiddenLogoutBtn();
  logout();
})();


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
  <span>${item.no} ${item.creatorName}</span>
  <h3>${item.restaurantName}</h3>
  <p>${item.link}</p>
  <div id= "templateImage">
  <img src="${item.image ? item.image : ""}">
  </div>
  <p>${item.content}</p>
  <span>${formattedTime}</span>
  </div>`;

  return template;
}

// 페이징 처리 함수
async function getPagedList(page, query, queryKey, firstQuery) {
  let url = "";
  // if(query) {
  //   url = `http://localhost:8080/posts/paging/searchBy${firstQuery}?page=${page}&size=${PAGE_SIZE}&${queryKey}=${query}`;
  // } else {
  //   url = `http://localhost:8080/posts/paging?page=${page}&size=${PAGE_SIZE}`;
  // }

  if(query) {
    url = `${apiUrl()}/api/posts/paging/searchBy${firstQuery}?page=${page}&size=${PAGE_SIZE}&${queryKey}=${query}`;
  } else {
    url = `${apiUrl()}/api/posts/paging?page=${page}&size=${PAGE_SIZE}`;
  }

  const response = await fetch(url);
  const result = await response.json();

  const container = document.querySelector("#container");
  const sidebar = container.querySelector("#sidebar");

  container.innerHTML = "";

  result.content.sort((a, b) => a.no - b.no);
  for(let item of result.content){
    container.insertAdjacentHTML("afterbegin",cardTemplate(item));
  }

  currentPage = result.number;
  isLastPage = result.last; 

  setBtnActive();  
}

// 페이징 버튼 활성화 여부 함수
function setBtnActive() {
  const buttons = document.querySelector("#pageBtn");
  const btnPrev = buttons[0];
  const btnNext = buttons[1];
  
  if(currentPage === 0) {
    btnPrev.disabled = true;
  } else {
    btnPrev.disabled = false;
  }

  if(isLastPage) {
    btnNext.disabled = true;
  } else {
    btnNext.disabled = false;
  }
}

// 첫화면(첫번째페이지)
(async() => {
  window.addEventListener("DOMContentLoaded", () => {
    getPagedList(0);
  });
})();

// 페이징 버튼 조작
(()=> {
  const buttons = document.querySelector("#pageBtn");
  const btnPrev = buttons[0];
  const btnNext = buttons[1];

  btnPrev.addEventListener("click", (e)=> {
    e.preventDefault();
    currentPage > 0 && getPagedList(currentPage -1, currentQuery);
  });

  btnNext.addEventListener("click", (e)=> {
    e.preventDefault();
    !isLastPage && getPagedList(currentPage +1, currentQuery);
  })
})();

// 페이지 검색
(()=> {
  const search = document.querySelector("#search");
  const txtQuery = search.querySelector("input");
  const btnSearch = search.querySelector("button");
  const options = search.querySelectorAll("option");
  
    btnSearch.addEventListener("click", (e)=> {
      e.preventDefault();

      let searchValue = search.querySelector("select").value;

      // 패치주소 첫글자 대문자로 바꿔주는 함수
      function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    
      if(searchValue === "creatorName"){
        currentQuery = txtQuery.value;
        queryKey = options[0].value;
        let firstQuery = capitalizeFirstLetter(queryKey)
        getPagedList(0, currentQuery, queryKey, firstQuery);

      } else if (searchValue === "restaurantName") {
        currentQuery = txtQuery.value;
        queryKey = options[1].value;
        let firstQuery = capitalizeFirstLetter(queryKey)
        getPagedList(0, currentQuery, queryKey, firstQuery);  

      } else if (searchValue === "link"){
        currentQuery = txtQuery.value;
        queryKey = options[2].value;
        let firstQuery = capitalizeFirstLetter(queryKey)
        getPagedList(0, currentQuery, queryKey, firstQuery);
      }
      // search.reset();  
    });  
})();





