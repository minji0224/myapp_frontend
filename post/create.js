const form = document.querySelector("form");
const inputs = form.querySelectorAll("input");
const button = form.querySelector("button");
const restauranName = inputs[0];
const link = inputs[1];
const photo = inputs[2];
const content = inputs[3];

button.addEventListener("click", (e)=> {
  e.preventDefault;

  if(restauranName.value === "") {
    alert("상호명을 입력해주세요.");
    return;
  }

  if(link.value === "") {
    alert("가게의 주소를 입력해주세요.");
    return;
  }

  if(photo.value === "") {
    alert("음식사진을 올려주세요.");
    return;
  }

  if(content.value === "") {
    alert("간단한 후기를 작성해주세요.")
    return;
  }

  async function createPost(image) {
    const response = await fetch("http://localhost:8080/posts", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "Authorization": `Bearer ${getCookie("token")}`,
      },
      body: JSON.stringify({
        restauranName: restauranName.value,
        link: link.value,
        image: image,
        content: content.value,
      }),
    });

    console.log(response);
  }
  const reader = new FileReader();
  reader.addEventListener("load", async(e) => {
    console.log(e);
    const image = e.target.result;
    createPost(image);
  });

  reader.readAsDataURL(file.files[0]);
  document.body.innerHTML =  `<p> 작성이 완료되었습니다. </p>`;

  
  
});