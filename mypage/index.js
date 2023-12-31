(() => {
  const token = getCookie("token");
  console.log(token);
  if (!token) {
    window.location.href = "/auth/login.html";
  } 
  hiddenLogoutBtn();
  logout();
})();


// 프로필 생성 함수
function profileCard(username, email, nickname) {
 
  const card = /*html*/
  `
  <div class = "profileCard">
  <div><i class="xi-user-o"></i></div>
  <div>${username}</div>
  <div>${email}</div>
  <div>${nickname}</div>  
  </div>
  `;

  return card;
}

// 내가 쓴 글 생성 함수
function createRow(no, restaurantName, creatorName, createdTime) {
  const tr = document.createElement("tr");
  tr.dataset.no = no;
  tr.innerHTML = 
      `
    <td><input type="checkbox" value="${no}"/></td>
    <td>${no}</td>
    <td>${restaurantName}</td>
    <td>${creatorName}</td>
    <td>${new Date(createdTime).toLocaleString()}</td>
    <td><button class="modifyBtn" value="${no}">수정</button></td>
    `
  return tr;
}

// 프로필 정보 불러오기
(async()=> {
  const response = await fetch (`${apiUrl()}/api/profile`, {
  headers: {
    Authorization: `Bearer ${getCookie("token")}`,
  },
});

const result = await response.json();
const {data} = result;
console.log(data);

const myProfile = document.querySelector("#myProfile");
myProfile.insertAdjacentHTML("beforeend",profileCard(data.username, data.user.email, data.nickname));
})();


// 내가 쓴 글 불러오기
(async ()=> {

    const response = await fetch (`${apiUrl()}/api/posts`, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });

  const result = await response.json();
  const {data} = result;

  const myPost = document.querySelector("#myPost");
  const tbody = myPost.querySelector("tbody");


  for(let i of data){ 
    tbody.append(createRow(i.no, i.restaurantName, i.creatorName, i.createdTime));
  }
})();


// 삭제하기
document.getElementById("removeBtn").addEventListener("click", async (e) => {
  e.preventDefault();

  const table = document.querySelector("table");
  const checkboxs = table.querySelectorAll("input");
  const nos = [];
  console.log(checkboxs);

  checkboxs.forEach(check => {
    if(check.checked) {
      console.log(check.checked);
      nos.push(check.value);
      console.log(nos);
      console.log(nos.join(','));
    } 
  });

  if(nos.length === 0){
    return alert("삭제할 게시물을 선택해주세요.");
  }

  const ask = confirm("해당 게시물을 정말 삭제하시겠습니까?");

  if(ask) {
    const response = await fetch(`${apiUrl()}/api/posts?nos=${nos.join(',')}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getCookie("token")}` },
    });
    console.log(response);
  
    for(let no of nos) {
      const tr = document.querySelector(`tr[data-no="${no}"]`);
      console.log(no);
      tr.remove();
    };
  }
})

// 수정페이지로 이동
document.getElementById("myPost").addEventListener("click", (e)=> {
  // e.preventDefault();
  if(e.target.classList.contains("modifyBtn")) {
    
    const postNo = e.target.parentElement.parentElement.dataset.no;
    // 버튼에 value값을 넣어서 value값으로 찾아와도 됨  e.target.value;   
    console.log(postNo);
    window.location.href = `/post/create.html?postNo=${postNo}`;
  }
})

// 수정하기
// document.getElementById("myPost").addEventListener("click",(e) => {
//   if(e.target.classList.contains("modifyBtn")) {
//     e.preventDefault();
//      /** @type {HTMLButtonElement} */
//     const button = e.target;
//     const postNo = button.value;
//     console.log(postNo);

//     let createHtml = window.open("/post/create.html");

//     createHtml.addEventListener("load", async(e) => {

//       const response = await fetch(`http://localhost:8080/posts/${postNo}`,{
//           headers: {"Authorization": `Bearer ${getCookie("token")}`,},
//         });

//         const result = await response.json();


//         const restaurantName = createHtml.document.querySelectorAll("input")[0];
//         const link = createHtml.document.querySelectorAll("input")[1];
//         const photo = createHtml.document.querySelectorAll("input")[2];
//         const content = createHtml.document.querySelector("textarea");

//         console.log(restaurantName);

//         restaurantName.value = result.restaurantName;
//         link.value = result.link;
//         // photo.value = result.value;
//         content.value = result.content;

//         createHtml.document.querySelectorAll("button")[1].style.display= "block";
//         createHtml.document.querySelectorAll("button")[0].style.display= "none";

//         createHtml.document.querySelectorAll("button")[1].addEventListener("click", async (e) => {
//           e.preventDefault();

//           const no = postNo;

//           const restaurantName = createHtml.document.querySelectorAll("input")[0].value;
//           const link = createHtml.document.querySelectorAll("input")[1].value;
//           // const photo = createHtml.document.querySelectorAll("input")[2].value;
//           const content = createHtml.document.querySelector("textarea").value;

//           await fetch(`http://localhost:8080/posts/${no}`, {
//             method: "PUT",
//             headers: { "content-type": "application/json" },
//             body: JSON.stringify({ restaurantName, link, content }),
//           }); 
//         })
//     })
//   } 
// })
