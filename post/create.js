(() => {
  const token = getCookie("token");
  console.log(token);
  if (!token) {
    window.location.href = "/auth/login.html";
  } 
  hiddenLogoutBtn();
  logout();
})();



const form = document.querySelector("form");
const inputs = form.querySelectorAll("input");
const buttons = form.querySelectorAll("button");
const restaurantName = inputs[0];
const link = inputs[1];
const photo = inputs[2];
const content = form.querySelector("textarea");
const preview = document.getElementById("preview");
console.log(buttons);
console.log(buttons[0]);

// 사진 미리보기
(()=> {
  photo.addEventListener("change", function() {
    const image = photo.files[0];
    if(image) {
      const reader = new FileReader();
      
      reader.addEventListener("load", function() {
        const img = document.createElement("img");
        img.src = reader.result;
        preview.innerHTML = "";
        preview.appendChild(img);
      });
      reader.readAsDataURL(image);
    } else {
      preview.innerHTML="";
    }
  })
})();


buttons[0].addEventListener("click", (e)=> {
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
    const ask = confirm("게시물을 등록하시겠습니까?");

    if(ask) {
        const response = await fetch(`${apiUrl()}/api/posts`,
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
      if(response.ok) {
        window.location.replace("/index.html");
      } else {
        console.log("게시물 등록 에러");
      }
    }     
  }


  if(photo.files[0]){
    const reader = new FileReader();
    reader.addEventListener("load", async(e) => {
      console.log(e);
      const image = e.target.result;
      await createPost(image);
    });
    reader.readAsDataURL(photo.files[0]);
  } else {
      createPost();
  }
  
});


// buttons[0].addEventListener("click", (e)=> {
//   e.preventDefault();

//   if(restaurantName.value === "") {
//     alert("상호명을 입력해주세요.");
//     return;
//   }

//   if(link.value === "") {
//     alert("가게의 주소를 입력해주세요.");
//     return;
//   }

//   // if(photo.value === "") {
//   //   alert("음식사진을 올려주세요.");
//   //   return;
//   // }

//   if(content.value === "") {
//     alert("간단한 후기를 작성해주세요.")
//     return;
//   }

//   // 게시물 생성 함수
//   async function createPost(image) {
//     const ask = confirm("게시물을 등록하시겠습니까?");

//     if(ask) {
//         const response = await fetch(`${apiUrl()}/api/posts`,
//         {
//           method: "POST",
//           headers: {
//             "content-type": "application/json",
//             "Authorization": `Bearer ${getCookie("token")}`,
//           },
//           body: JSON.stringify({
//             restaurantName: restaurantName.value,
//             link: link.value,
//             image: image ? image : null,
//             content: content.value,
//           }),        
//         }    
//       );
//       console.log(response);  
//     } 
//     console.log(`${apiUrl()}/api/posts`);
     
//   }


//   if(photo.files[0]){
//     const reader = new FileReader();
//     reader.addEventListener("load", async(e) => {
//       console.log(e);
//       const image = e.target.result;
//       createPost(image);
//     });
//     reader.readAsDataURL(photo.files[0]);
//   } else {
//     createPost();
//   }



//     // const reader = new FileReader();
//     // reader.addEventListener("load", async(e) => {
//     //   console.log(e);
//     //   const image = e.target.result;
//     //   createPost(image);
//     // });
//     // reader.readAsDataURL(photo.files[0]);


//   // window.location.replace("/index.html");

   
// });