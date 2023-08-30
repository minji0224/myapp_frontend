// postNo로 가져온 해당 post객체 생성하기.
(async()=> {
  const urlParams = new URLSearchParams(window.location.search);
  const postNo = urlParams.get("postNo");
  
  if(postNo) {
    document.querySelectorAll("button")[1].style.display= "block";
    document.querySelectorAll("button")[0].style.display= "none";
  
    const response = await fetch(`http://localhost:8080/posts/${postNo}`,{
        headers: {"Authorization": `Bearer ${getCookie("token")}`,},
      });
  
    const result = await response.json();

    const restaurantName = document.querySelectorAll("input")[0];
    const link = document.querySelectorAll("input")[1];
    const preview = document.getElementById("preview");
    const content = document.querySelector("textarea");
    const img = document.createElement("img");

    restaurantName.value = result.restaurantName;
    link.value = result.link;
    img.src = result.image;
    preview.appendChild(img);
    content.value = result.content;
  }
})();

// 수정버튼 눌렀을 때 서버에 풋하기.
document.querySelectorAll("button")[1].addEventListener("click", (e) => {
  e.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  const postNo = urlParams.get("postNo");

  const restaurantName = document.querySelectorAll("input")[0].value;
  const link = document.querySelectorAll("input")[1].value;
  const image = document.querySelectorAll("input")[2].value;
  const content = document.querySelector("textarea").value;
  console.log(restaurantName);
  console.log(link);
  console.log(content);

  async function modifyPost(image) {
    const response = await fetch(`http://localhost:8080/posts/${postNo}`, {
      method: "PUT",
      headers: { "content-type": "application/json",
                 "Authorization": `Bearer ${getCookie("token")}`},
      body: JSON.stringify({ restaurantName, link, image: image ? image : null, content }),
    });    
    console.log(response);
  }

  if(photo.files[0]){
    const reader = new FileReader();
    reader.addEventListener("load", async(e) => {
      const image = e.target.result;
      modifyPost(image);
    });
    reader.readAsDataURL(photo.files[0]);
  } else {
    modifyPost();
  }

  alert("수정이 완료되었습니다.");
  window.location.replace("/index.html");
})
