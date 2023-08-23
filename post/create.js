const form = document.querySelector("form");
const inputs = form.querySelectorAll("input");
const button = form.querySelector("button");
const restaurantName = inputs[0];
const link = inputs[1];
const photo = inputs[2];
const content = form.querySelector("textarea");

button.addEventListener("click", (e)=> {
  e.preventDefault();

  if(restaurantName.value === "") {
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

  // 게시물 생성 함수
  async function createPost(image) {
    const response = await fetch("http://localhost:8080/posts",
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${getCookie("token")}`,
        },
        body: JSON.stringify({
          restaurantName: restaurantName.value,
          link: link.value,
          image: image ? image : null,
          content: content.value,
        }),
      }
    );
    console.log(response);
  }

  if(photo.files[0]){
    const reader = new FileReader();
    reader.addEventListener("load", async(e) => {
      console.log(e);
      const image = e.target.result;
      createPost(image);
    });
    reader.readAsDataURL(photo.files[0]);
  } else {
    createPost();
  }

    // const reader = new FileReader();
    // reader.addEventListener("load", async(e) => {
    //   console.log(e);
    //   const image = e.target.result;
    //   createPost(image);
    // });
    // reader.readAsDataURL(photo.files[0]);

    alert("작성이 완료되었습니다.");
    window.location.replace("http://localhost:5500/index.html");
});