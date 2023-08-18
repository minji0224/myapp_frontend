// 이렇게 만드니깐 로그인 누르면 서버에서 설정한 리다이렉트가 안됨
// 글서 우선 그냥 html에다가 만듦

// 패스워드 인풋창 별표로 가리기


const inputs = document.querySelectorAll("input");
const email = inputs[0];
const password = inputs[1];
const button = document.querySelector("button");
 
button.addEventListener("click", async (e)=> {
  e.preventDefault();

  const formData = new URLSearchParams();
  formData.append('email', email.value);
  formData.append('password', password.value);

  const response = await fetch(
    "http://localhost:8080/auth/signin",
    {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(), // URL인코딩된 폼데이터 문자열을 사용
    }
  );
  console.log(response);

  if([401].includes(response.status)) {
    alert("해당 사용자가 존재하지 않습니다.");
    document.querySelector("form").reset();
  }

  if([409].includes(response.status)) {
    alert("인증처리가 되지 않았습니다.");
    document.querySelector("form").reset();
  }
});

