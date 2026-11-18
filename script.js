
/* DATA PRODUK */
const produk = [
    { id: 0, nama: "Pink Blossom", harga: 85000 },
    { id: 1, nama: "Sweet Roses", harga: 100000 },
    { id: 2, nama: "Lovely Tulips", harga: 120000 },
    { id: 3, nama: "Dreamy Bouquet", harga: 150000 }
];

let keranjang = [];
let slideAktif = 0;

const slides = document.querySelectorAll(".slide");
const tombolNav = document.querySelectorAll(".nav-btn");
const dots = document.getElementById("dots");

/* BUAT TITIK SLIDE */
slides.forEach((slide, index) => {
    const dot = document.createElement("button");
    dot.className = "dot";
    dot.setAttribute("aria-label", "Buka slide " + (index + 1));
    dot.onclick = () => pindahSlide(index);
    dots.appendChild(dot);
});

/* PINDAH SLIDE */
function pindahSlide(index) {
    if (index < 0 || index >= slides.length) return;

    slideAktif = index;

    slides.forEach((slide, i) => {
        slide.classList.toggle("active", i === index);
    });

    tombolNav.forEach((tombol, i) => {
        tombol.classList.toggle("active", i === index);
    });

    document.querySelectorAll(".dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
    });
}

function slideBerikutnya() {
    pindahSlide((slideAktif + 1) % slides.length);
}

function slideSebelumnya() {
    pindahSlide((slideAktif - 1 + slides.length) % slides.length);
}

pindahSlide(0);

/* TOMBOL PANAH KEYBOARD */
document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowRight") slideBerikutnya();
    if (event.key === "ArrowLeft") slideSebelumnya();
});

/* FORMAT RUPIAH */
function rupiah(angka) {
    return "Rp" + angka.toLocaleString("id-ID");
}

/* TAMBAH KERANJANG */
function tambahKeranjang(id) {
    const item = produk.find(p => p.id === id);
    const sudahAda = keranjang.find(p => p.id === id);

    if (sudahAda) {
        sudahAda.jumlah++;
    } else {
        keranjang.push({
            ...item,
            jumlah: 1
        });
    }

    perbaruiKeranjang();
    tampilToast(item.nama + " masuk keranjang 💗");
}

/* UPDATE KERANJANG */
function perbaruiKeranjang() {
    const jumlah = keranjang.reduce(
        (total, item) => total + item.jumlah, 0
    );

    document.getElementById("jumlah-keranjang").textContent = jumlah;

    const tempat = document.getElementById("isi-keranjang");

    if (keranjang.length === 0) {
        tempat.innerHTML = "<p>Keranjang masih kosong 🌸</p>";
    } else {
        tempat.innerHTML = keranjang.map(item => `
            <div class="item-cart">
                <div>
                    <strong>${item.nama}</strong>
                    <p>${rupiah(item.harga)} x ${item.jumlah}</p>
                </div>
                <div>
                    <button onclick="ubahJumlah(${item.id}, -1)">−</button>
                    <button onclick="ubahJumlah(${item.id}, 1)">+</button>
                    <button onclick="hapusProduk(${item.id})">×</button>
                </div>
            </div>
        `).join("");
    }

    const total = keranjang.reduce(
        (sum, item) => sum + item.harga * item.jumlah, 0
    );

    document.getElementById("total-harga").textContent =
        "Total: " + rupiah(total);
}

/* UBAH JUMLAH */
function ubahJumlah(id, perubahan) {
    const item = keranjang.find(p => p.id === id);
    if (!item) return;

    item.jumlah += perubahan;

    if (item.jumlah <= 0) {
        hapusProduk(id);
    } else {
        perbaruiKeranjang();
    }
}

/* HAPUS PRODUK */
function hapusProduk(id) {
    keranjang = keranjang.filter(item => item.id !== id);
    perbaruiKeranjang();
}

/* BUKA KERANJANG */
function bukaKeranjang() {
    perbaruiKeranjang();
    document.getElementById("modal-keranjang").classList.add("show");
}

/* TUTUP KERANJANG */
function tutupKeranjang() {
    document.getElementById("modal-keranjang").classList.remove("show");
}

/* CHECKOUT SIMULASI */
function checkout() {
    if (keranjang.length === 0) {
        tampilToast("Keranjang masih kosong 🌷");
        return;
    }

    const total = keranjang.reduce(
        (sum, item) => sum + item.harga * item.jumlah, 0
    );

    const daftar = keranjang.map(item =>
        item.nama + " x " + item.jumlah
    ).join("\n");

    alert(
        "TERIMA KASIH SUDAH MEMESAN DI CERIBLOSSOM 🌸\n\n" +
        daftar +
        "\n\nTotal: " + rupiah(total) +
        "\n\nIni adalah simulasi pemesanan."
    );

    keranjang = [];
    perbaruiKeranjang();
    tutupKeranjang();
}

/* NOTIFIKASI */
let timerToast;

function tampilToast(pesan) {
    const toast = document.getElementById("toast");

    toast.textContent = pesan;
    toast.classList.add("show");

    clearTimeout(timerToast);

    timerToast = setTimeout(() => {
        toast.classList.remove("show");
    }, 2300);
}

/* TUTUP KERANJANG KLIK LUAR */
document.getElementById("modal-keranjang")
    .addEventListener("click", function(event) {
        if (event.target === this) {
            tutupKeranjang();
        }
    });

/* ANIMASI INTRO */
window.addEventListener("load", function() {
    setTimeout(() => {
        document.getElementById("intro").classList.add("hide");
    }, 2200);
});
