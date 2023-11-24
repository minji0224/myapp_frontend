const form = document.querySelector("form");
const inputs = form.querySelectorAll("input");

function isLocalhost() {
  return ["localhost", "127.0.0.1"].includes(location.hostname);
}
function apiUrl() {
  return `${isLocalhost() ? "http" : "https"}://${
    isLocalhost() ? `${location.hostname}:8080` : location.hostname
  }`;
}

// 이메일 중복확인
(()=> {
  const email = inputs[0];

  const emailBtn = form.querySelector("#doubleCheckBtn");
  emailBtn.addEventListener("click", async (e)=> {
    e.preventDefault();
    
    const emailValue = email.value;

    if(email === "") {
     alert("이메일을 입력해주세요.");
     return;   
    }

    const response = await fetch(
      `${apiUrl()}/api/auth/${emailValue}`,
      { method: "POST",
        headers: {"content-type": "application/json",},
        body: JSON.stringify({emailValue}),
      }
     );
     console.log(response);
     
     if([409].includes(response.status)) {
      alert("이미 사용중인 이메일입니다.");
      form.reset();
     } else {
      alert("사용가능한 이메일입니다.");
     }
  })
})();

// 패스워드 확인
(()=> {
  const password = inputs[1];
  const checkPass = inputs[2];
  const passBtn = form.querySelector("#passBtn");

  passBtn.addEventListener("click", (e)=> {
    e.preventDefault();

    if(password.value.toLocaleLowerCase() === checkPass.value.toLocaleLowerCase()) {
      alert("패스워드가 일치합니다.");
    } else {
      alert("패스워드가 불일치합니다.");
    }
  });
})();

// 회원가입 완료
(()=> {
  const email = inputs[0];
  const password = inputs[1];
  const username = inputs[3];
  const nickname = inputs[4];
  const signupBtn = form.querySelector("#signupBtn");

  signupBtn.addEventListener("click", async (e)=> {
    e.preventDefault();

    if(email.value === "" || password.value === "" 
    || username.value === "" || nickname.value === "") {
      alert("제대로 입력되었는지 확인하세요.")
      return;
    }

    const response = await fetch(
      `${apiUrl()}/api/auth/signup`,
      { method: "POST",
      headers: {"content-type": "application/json",},
      body: JSON.stringify({
        email: email.value,
        password: password.value,
        username: username.value,
        nickname: nickname.value,}),
      }
    );

    // if if문으로 하니깐 안돎
      if([409,400].includes(response.status)){
        alert("회원가입을 다시 진행해주세요.");
        form.reset();
      } else {
        alert("회원가입이 완료되었습니다.");
        window.location.replace("/index.html");
      }
  })
})();