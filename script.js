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
    Yuvarlanmış Dönem Sonu Başarı Notu: <strong>${sonuc.basariNotu}</strong> <br/>
    ${sonuc.basariNotu >= 60 ? "<span style='color:green'>Tebrikler, geçtiniz!</span>" : "<span style='color:red'>Maalesef, kaldınız.</span>"}
  `;
}

// Finalden minimum not hesaplama
// Son komite notu verilmiş, diğer komiteler var, finalden minimum kaç lazım hesaplanacak
function finalMinimiHesapla(donem) {
  const komiteSayisi = donem === 1 ? 5 : 6;
  const sonKomiteIndex = komiteSayisi;
  const sonKomiteNotInput = document.getElementById(`d${donem}sonKomiteNot`);
  const sonKomiteNot = parseFloat(sonKomiteNotInput.value);

  if (isNaN(sonKomiteNot)) {
    alert("Lütfen son komiteden alınacak notu giriniz!");
    return;
  }

  // Diğer komitelerden aldığımız notlar:
  const digerKomiteNotlari = [];
  for(let i=1; i < sonKomiteIndex; i++) {
    const val = parseFloat(document.getElementById(`d${donem}komite${i}`).value);
    if (isNaN(val)) {
      alert("Lütfen son komite dışındaki diğer komite notlarını da giriniz!");
      return;
    }
    digerKomiteNotlari.push(val);
  }

  // Bu durumda dönem sonunda 60 ve üstü ile geçmek için finalden minimum kaç alınmalı hesaplanacak:
  // Ortalama komiteler: (digerKomiteler + sonKomite) / komiteSayisi
  // Dönem başarı notu: yuvarla( ortalamaKomiteler ) *0.6 + finalNotu*0.4 >= 60 (geçme notu)
  // Buradan finalNotu minimum:
  // finalNotu >= (60 - yuvarla(ortalamaKomiteler)*0.6)/0.4

  const toplamKomiteNotlari = digerKomiteNotlari.reduce((a,b) => a+b, 0) + sonKomiteNot;
  const ortalamaHam = toplamKomiteNotlari / komiteSayisi;
  const ortalamaYuvarla = yuvarlaNot(ortalamaHam);

  // finalNotu minimum eşitliği:
  let finalMin = (60 - (ortalamaYuvarla * 0.6)) / 0.4;
  if (finalMin > 100) {
    // 100'den büyükse mümkün değil
    finalMin = "> 100 (geçmek için finali tekrar düşünmelisiniz)";
  } else if (finalMin < 0) {
    // Zaten final almaya gerek yok
    finalMin = "<= 0 (final notu önemli değil, zaten geçiyorsunuz)";
  } else {
    finalMin = finalMin.toFixed(2);
  }

  const sonucEl = document.getElementById(`d${donem}finalMinSonuc`);
  sonucEl.innerHTML = `
    Ortalama (Yuvarlanmış): ${ortalamaYuvarla} <br/>
    Finalden Alınması Gereken Minimum Not: <strong>${finalMin}</strong>
  `;
}
