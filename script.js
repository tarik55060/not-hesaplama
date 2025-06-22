function showSection(donem) {
  for (let i = 1; i <= 3; i++) {
    const sec = document.getElementById(`donem${i}`);
    if (i === donem) {
      sec.classList.add("active");
    } else {
      sec.classList.remove("active");
    }
  }
}

function yuvarlaNot(not) {
  // 0.5 ve üzeri yukarı, altında aşağı
  return not % 1 >= 0.5 ? Math.ceil(not) : Math.floor(not);
}

function hesaplaDonem(donem) {
  const komiteSayisi = donem === 1 ? 5 : 6;
  let toplamKomiteNotu = 0;

  for (let i = 1; i <= komiteSayisi; i++) {
    const input = document.getElementById(`d${donem}komite${i}`);
    const val = parseFloat(input.value);
    if (isNaN(val) || val < 0 || val > 100) {
      alert(`Lütfen Dönem ${donem} Komite ${i} için 0-100 arasında geçerli bir not giriniz.`);
      return;
    }
    toplamKomiteNotu += val;
  }

  let finalNotInput = document.getElementById(`d${donem}finalNot`);
  const finalNot = parseFloat(finalNotInput.value);

  if (isNaN(finalNot) || finalNot < 0 || finalNot > 100) {
    alert(`Lütfen Dönem ${donem} final notu için 0-100 arasında geçerli bir not giriniz.`);
    return;
  }

  // Ortalama komite notu
  const ortalamaKomiteNotu = toplamKomiteNotu / komiteSayisi;
  const ortalamaYuvarla = yuvarlaNot(ortalamaKomiteNotu);

  // Dönem sonu başarı notu = (komite ortalama * 0.6) + (final * 0.4)
  const basariNotuHesap = ortalamaYuvarla * 0.6 + finalNot * 0.4;

  // Virgülden sonra ilk rakam 5 veya üzeri ise yukarı yuvarla
  const basariNotu = basariNotuHesap % 1 >= 0.5 ? Math.ceil(basariNotuHesap) : Math.floor(basariNotuHesap);

  const sonucEl = document.getElementById(`d${donem}sonuc`);
  sonucEl.innerHTML = `
    Ortalama Komite Notu (Yuvarlanmış): <strong>${ortalamaYuvarla}</strong><br/>
    Dönem Sonu Başarı Notu: <strong>${basariNotu}</strong><br/>
    ${basariNotu >= 60 ? "<span style='color:green'>Tebrikler, geçtiniz!</span>" : "<span style='color:red'>Maalesef, kaldınız.</span>"}
  `;
}
