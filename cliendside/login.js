document.getElementById('frm').addEventListener('submit',async function (e) {
    e.preventDefault()

    const email= document.getElementById('Email').value;
    const pass= document.getElementById('pass').value;
console.log(email,pass);

const res = await fetch('http://localhost:3004/api/login',{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({email,pass})
})

const data = await res.json()
console.log(data);

if (res.status===200) {
    localStorage.setItem('token',data.token);
    alert("successfully login")
    window.location.href="./index.html"
}
else{
    alert(data.msg)
}

})