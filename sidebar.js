(()=> {
  const sidebar = document.createElement("aside");


  sidebar.innerHTML = `
    <label><a href="/index.html"><button><i class="xi-home"></i></button></a></label>
    <label><a href="/mypage/index.html"><button><i class="xi-profile"></i></button></a></label>
    <label><a href="/post/create.html"><button><i class="xi-plus"></i></button></a></label>
    <label><a href="/auth/login.html"><button id="loginBtn"><i class="xi-lock-o"></i></button></a></label>
    <label><a><button id="logoutBtn"><i class="xi-unlock-o"></i></button></a></label>
  `
  document.getElementById("content").append(sidebar);
  console.log(document.getElementById("logoutBtn"));

})();

// 현재페이지가 로컬인지 아닌지 확인 여부
// window.location.hostname: 현재 문서의 도메인=호스트이름("www.example.com")
function isLocalhost() {
  return ["localhost", "127.0.0.1"].includes(location.hostname);
}

// 현재페이지가 true 즉 로컬환경이면 8080으로 
// 아니면 https//도메인으로
function apiUrl() {
  return `${isLocalhost() ? "http" : "https"}://${
    isLocalhost() ? `${location.hostname}:8080` : location.hostname
  }`;
}