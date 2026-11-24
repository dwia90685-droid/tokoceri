
let cart = [];

function moveSlide(direction) {
    const track = document.getElementById("flower-track");
    track.scrollBy({
        left: direction * 300,
        behavior: "smooth"
    });
}

function addCart(name, price) {
    cart.push({name, price});
    updateCart();
}

function updateCart() {
    const items = document.getElementById("cart-items");
    const total = document.getElementById("total");

    document.getElementById("cart-count").textContent = cart.length;

    if (cart.length === 0) {
        items.textContent = "Keranjang masih kosong 🌷";
    } else {
        items.innerHTML = cart.map((item, index) => `
            <div>
                ${item.name} - Rp${item.price.toLocaleString("id-ID")}
                <button onclick="removeCart(${index})">Hapus</button>
            </div>
        `).join("");
    }

    let sum = cart.reduce((total, item) => total + item.price, 0);
    total.textContent = "Rp" + sum.toLocaleString("id-ID");
}

function removeCart(index) {
    cart.splice(index, 1);
    updateCart();
}

function sendOrder(event) {
    event.preventDefault();

    const name = document.getElementById("customer").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;

    if (cart.length === 0) {
        alert("Silakan pilih bunga terlebih dahulu!");
        return;
    }

    const items = cart.map(item =>
        item.name + " - Rp" + item.price.toLocaleString("id-ID")
    ).join("\n");

    const total = cart.reduce((sum, item) => sum + item.price, 0);

    const message =
        `Halo CeriFlowers! Saya ingin memesan bunga.\n\n` +
        `Nama: ${name}\n` +
        `WhatsApp: ${phone}\n` +
        `Alamat: ${address}\n\n` +
        `Pesanan:\n${items}\n\n` +
        `Total: Rp${total.toLocaleString("id-ID")}`;

    // Ganti dengan nomor WhatsApp toko kamu
    const whatsapp = "6281234567890";

    window.open(
        "https://wa.me/" + whatsapp + "?text=" +
        encodeURIComponent(message),
        "_blank"
    );
}
