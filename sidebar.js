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