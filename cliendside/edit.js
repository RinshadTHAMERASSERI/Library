// // ✨ edit.js
const params = new URLSearchParams(window.location.search);
const id     = params.get("id");

document.addEventListener("DOMContentLoaded", loadBookForEdit);
document.getElementById("editForm").addEventListener("submit", submitEdit);

async function loadBookForEdit() {
  if (!id) {
    alert("No book ID provided");
    return;
  }

  try {
    const res  = await fetch(`http://localhost:3004/api/user/${id}`);
    const data = await res.json();

    // fill inputs
    book.value   = data.book;
    aut.value    = data.author;
    prc.value    = data.price;
    ctgry.value  = data.catogery;

    // show existing image (base64 or URL)
    if (data.pic) preview.src = data.pic;
  } catch (err) {
    console.error("Error fetching book:", err);
    alert("Failed to load book details");
  }
}

async function submitEdit(e) {
  e.preventDefault();

  const body = {
    book:  book.value,
    author: aut.value,
    price: prc.value,
    category: ctgry.value
  };

  // only attach a pic if a new one is chosen
  const file = pic.files[0];
  if (file) {
    body.pic = await toBase64(file);
  }

  try {
    const res  = await fetch(`http://localhost:3004/api/updateone/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();

    if (res.status === 201) {
      alert(data.msg);
      location.href = "./index.html";
    } else {
      alert(data.error || "Update failed");
    }
  } catch (err) {
    console.error("Update error:", err);
    alert("Network / server error");
  }
}

function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload  = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
document.getElementById("cancelBtn").addEventListener("click", function () {
  window.location.href = "./index.html";
});

