// import { url } from "inspector";
const url = window.location.href;
    const params = new URLSearchParams(url.split("?")[1]);
    const id = params.get('id');
    console.log(id);
    

document.addEventListener("DOMContentLoaded", async function () {


    if (!id) {
        alert("No book ID provided");
        return;
    }

    try {
        const res = await fetch(`http://localhost:3004/api/user/${id}`);
        const data = await res.json();
        document.getElementById('book').value = data.book;
        document.getElementById('aut').value = data.author;
        document.getElementById('prc').value = data.price;
        document.getElementById('ctgry').value = data.catogery;
    } catch (err) {
        console.error("Error fetching book for edit:", err);
        alert("Failed to load book details");
    }
});
async function handleEdit(id) { 
  document.getElementById(`book-${id}`).disabled=false;
  document.getElementById(`aut-${id}`).disabled=false;
  document.getElementById(`prc-${id}`).disabled=false;
  document.getElementById(`ctgry-${id}`).disabled=false;
  }

// async function handleSave(id) {
//   let book=document.getElementById(`book-${id}`).value;
//   let author=document.getElementById(`aut-${id}`).value;
//   let price=document.getElementById(`prc-${id}`).value;
//   let catogery=document.getElementById(`ctgry-${id}`).value;
//   let data={id,book,author,price,catogery};
//   const jsonData=JSON.stringify(data);
//   const res=await fetch(`http://localhost:3004/api/updateone/${id}`,{
//     "method":"PUT",
//     "content-type":"text/json",
//     "body":jsonData
//   });
//   const result=await res.text();
//   if (result=="success") {
//     alert("updated successfully !!");
//     getDonor();
//   }else{
//     alert("updation failed")
//   }
// }

document.getElementById('editForm').addEventListener('submit',async function (e) {
  e.preventDefault()

  const book = document.getElementById('book').value
  const author = document.getElementById('aut').value
  const price = document.getElementById('prc').value
  const category = document.getElementById('ctgry').value

  const res = await fetch(`http://localhost:3004/api/updateone/${id}`,{
    method: "PUT",
    headers: {
      "Content-Type":"application/json"
    },
    body:JSON.stringify({book,author,price,category})
  })

  const data = await res.json()
  console.log("dataaaaaa",data);
  if(res.status ==201 ){
    alert(data.msg)
    window.location.href = './index.html'
  }
  else{
    alert(data.error)
  }
  
  
})
