// 프로필 생성 함수
function profileCard(username, email, nickname) {
 
  const card = /*html*/
  `
  <div class = "profileCard">
  <div>이름: ${username}</div>
  <div>이메일: ${email}</div>
  <div>닉네임: ${nickname}</div>  
  </div>
  `;

  return card;
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
console.log(result);
const {data} = result;
console.log(data);

const myProfile = document.querySelector("#myProfile");
myProfile.insertAdjacentHTML("beforeend",profileCard(data.username, data.user.email, data.nickname));
})();


// 내가 쓴 글 불러오기
