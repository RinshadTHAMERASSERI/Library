

document.getElementById('form').addEventListener('submit',async function (e) {
    e.preventDefault()
   book=document.getElementById('book').value,
  author=document.getElementById('aut').value,
    price=document.getElementById('prc').value,
  catogery =document.getElementById('ctgry').value,
  picInput = document.getElementById('pic');
  const file =picInput.files[0];
if (!file) {
  alert("please select an image.")
  return;
}
  const pic = await convertBase64(file);



   console.log(book,author,price,catogery);
   const res =await fetch('http://localhost:3004/api/add',{
     method:"Post",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify({book,author,price,catogery,pic})
   })
  console.log(res);
  const data  = await res.json()
  
  if (res.status==201) {
    alert(data.msg)
    window.location.href='./index.html'
  }
  else{
    alert(data.msg)
  }
  
   
})
function convertBase64(file) {
  return new Promise((resolve,reject)=>{
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = ()=>resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
