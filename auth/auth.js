function getCookie(name) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(
          /([\.$?*|{}\(\)\[\]\\\/\+^])/g,
          "\\$1"
        ) + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}


// (() => {
//   const token = getCookie("token");
//   console.log(token);
//   if (!token) {
//     window.location.href = "/auth/login.html";
//   } 

//   hiddenLogoutBtn();
//   logout();
// })();

function hiddenLogoutBtn() {
  const token = getCookie("token");
  const logoutBtn = document.getElementById("logoutBtn");
  const loginBtn = document.getElementById("loginBtn");
  console.log(loginBtn);
  console.log(logoutBtn);


  if(token) {
    logoutBtn.style.display = "block";
    loginBtn.style.display = "none";
  } else {
    loginBtn.style.display = "block";
    logoutBtn.style.display = "none";
  }
};

function logout() {
  const logoutBtn = document.getElementById("logoutBtn");

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    
    const ask = confirm("로그아웃 하시겠습니까?");

    if(ask) {
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";        
      window.location.replace("/index.html");
    }
  });
}
