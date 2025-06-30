async function getData() {
    const token = localStorage.getItem('token')

    if (token) {
        try {
            const res = await fetch('http://localhost:3004/api/getdata', {
                headers: { "authorization": `Bearer ${token}` }


            })

            if (res.status == 401) {
                alert("session expired please login again")
                window.location.href = "./login.html"
                return
            }
            const dt = await res.json();
            // console.log(dt);

            document.getElementById('bt1').style.display = 'none'
            document.getElementById('bt2').style.display = 'block'


        } catch (error) {
            console.log("error fetching data", error);

        }
    } else {
        alert("you are not logged in")
    }
}
getData();
function logIn() {
    window.location.href = "./login.html"
}
function logOut() {
    localStorage.removeItem('token');
    window.location.reload();
}

async function getBook() {
    const res = await fetch("http://localhost:3004/api/getbook")
    console.log(res);

    const data = await res.json();
    console.log(data);

    str = ``;
    data.map((dt) => {
        str += `

         <form action="#" method="getbook">
                <label for="Book"><strong>Book  :</strong> ${dt.book}</label>
                 
                <label for="Author"><strong>Author  :</strong>${dt.author}</label>
               
                <label for="Price"><strong>Price  :</strong>${dt.price}</label>
                 
                <label for="catogery"><strong>Category  :</strong> ${dt.catogery}</label>
              
              <button type="button" class="card-botton" onclick="handleDelte('${dt._id}')">Delete</button>
<button type="button" class="card-botton2" onclick="edit('${dt._id}')">Edit</button>

            </form> 
          

        `
    })
    document.getElementById('add').innerHTML = str;


}
getBook();

async function handleDelte(id) {
    const res = await fetch(`http://localhost:3004/api/deleteone/${id}`, {
        method: "DELETE"
        // headers:{"content-type":"text/plain"},
        // "body":id

    })
    const data = await res.json();
    console.log(data);

    if (data.msg === "deleted") {
        alert("deleted succesfully !!!")
        getBook()
    }
    else {
        alert("delete failed")
    }
}

function edit(id) {
    window.location.href = `./edit.html?id=${id}`;
}
