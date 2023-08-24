// 프로필 생성 함수
function profileCard(username, email, nickname) {
 
  const card = /*html*/
  `
  <div class = "profileCard">
  <h2>My Profile</h2>
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
    <td><input type="checkbox" value="${no}" /></td>
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
  const response = await fetch ("http://localhost:8080/profile", {
  headers: {
    Authorization: `Bearer ${getCookie("token")}`,
  },
});

if ([401, 403].includes(response.status)) {
  alert("로그인이 필요합니다.");
  window.location.href = "/auth/login.html";
}

const result = await response.json();
const {data} = result;

const myProfile = document.querySelector("#myProfile");
myProfile.insertAdjacentHTML("beforeend",profileCard(data.username, data.user.email, data.nickname));
})();


// 내가 쓴 글 불러오기
(async ()=> {

    const response = await fetch ("http://localhost:8080/posts", {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });

  if ([401, 403].includes(response.status)) {
    alert("로그인이 필요합니다.");
    window.location.href = "/auth/login.html";
  }

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

  checkboxs.forEach(check => {
    if(check.checked) {
      console.log(check.checked);
      nos.push(check.value);
      console.log(nos);
      console.log(nos.join(','));
    }
  });

  const response = await fetch(`http://localhost:8080/posts?nos=${nos.join(',')}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${getCookie("token")}` },
  });

  for(let no of nos) {
    const tr = document.querySelector(`tr[data-no="${no}"]`);
    console.log(no);
    tr.remove();
  };
})

// 수정하기
// document.getElementById("myPost").addEventListener("click", async (e) => {
//   if(e.target.classList.contains("modifyBtn")) {
//      /** @type {HTMLButtonElement} */
//     const button = e.target;
//     console.log(button.value);
//     console.log(e);
//   }
//   e.preventDefault();
  

// })