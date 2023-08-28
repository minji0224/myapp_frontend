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
    console.log(result);

    const restaurantName = document.querySelectorAll("input")[0];
    const link = document.querySelectorAll("input")[1];
    // const photo = document.querySelectorAll("input")[2];
    const content = document.querySelector("textarea");

    restaurantName.value = result.restaurantName;
    link.value = result.link;
    // photo.value = result.value;
    content.value = result.content;
  }
})();

document.querySelectorAll("button")[1].addEventListener("click", async(e) => {
  e.preventDefault();
  const urlParams = new URLSearchParams(window.location.search);
  const no = urlParams.get("postNo");

  const restaurantName = document.querySelectorAll("input")[0].value;
  const link = document.querySelectorAll("input")[1].value;
  // const photo = document.querySelectorAll("input")[2].value;
  const content = document.querySelector("textarea").value;
  console.log(restaurantName);
  console.log(link);
  console.log(content);

  await fetch(`http://localhost:8080/posts/${no}`, {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ restaurantName, link, content }),
  }); 
  
  






})
