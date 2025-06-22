// Yuvarlama fonksiyonu: 0.5 ve üzeri yukarı, altı aşağı
function yuvarlaNot(not) {
  return Math.floor(not) + (not % 1 >= 0.5 ? 1 : 0);
}

// Dönem sonu başarı notu hesaplama fonksiyonu
// komiteNotlari dizisi ve finalNotu (float)
function hesaplaDonemBasariNotu(komiteNotlari, finalNotu) {
  const toplam = komiteNotlari.reduce((a, b) => a + b, 0);
  const ortalamaHam = toplam / komiteNotlari.length;
  const ortalama = yuvarlaNot(ortalamaHam);

  const basariHam = (ortalama * 0.6) + (finalNotu * 0.4);
  const basariNotu = yuvarlaNot(basariHam);

  return {
    ortalamaHam,
    ortalama,
    basariHam,
    basariNotu
  };
}

// Sekmeler arası geçiş fonksiyonu
function openTab(evt, tabName) {
  const tabcontent = document.getElementsByClassName("tabcontent");
  for (let i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  const tablinks = document.getElementsByClassName("tablinks");
  for (let i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Sayfa yüklendiğinde Dönem 1 sekmesi açık olsun
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector(".tablinks").click();
});

// Her dönem için hesaplama fonksiyonu
function hesaplaDonem(donem) {
  const komiteSayisi = donem === 1 ? 5 : 6;
  const komiteNotlari = [];
  for(let i=1; i<=komiteSayisi; i++) {
    const val = parseFloat(document.getElementById(`d${donem}komite${i}`).value);
    if (isNaN(val)) {
      alert("Lütfen tüm komite notlarını eksiksiz giriniz!");
      return;
    }
    komiteNotlari.push(val);
  }
  const finalNotu = parseFloat(document.getElementById(`d${donem}final`).value);
  if (isNaN(finalNotu)) {
    alert("Lütfen final notunu giriniz!");
    return;
  }

  const sonuc = hesaplaDonemBasariNotu(komiteNotlari, finalNotu);

  const sonucEl = document.getElementById(`d${donem}sonuc`);
  sonucEl.innerHTML = `
    Ham Ortalama: ${sonuc.ortalamaHam.toFixed(2)} <br/>
    Yuvarlanmış Ortalama: ${sonuc.ortalama} <br/>
    Ham Dönem Sonu Başarı Notu: ${sonuc.basariHam.toFixed(2)} <br/>
    Yuvarlanmış Dönem
