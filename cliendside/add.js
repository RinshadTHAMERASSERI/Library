

document.getElementById('form').addEventListener('submit',async function (e) {
    e.preventDefault()
   book=document.getElementById('book').value,
  author=document.getElementById('aut').value,
    price=document.getElementById('prc').value,
  catogery =document.getElementById('ctgry').value,

   console.log(book,author,price,catogery);
   const res =await fetch('http://localhost:3004/api/add',{
     method:"Post",
     headers:{"Content-Type":"application/json"},
     body:JSON.stringify({book,author,price,catogery})
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

