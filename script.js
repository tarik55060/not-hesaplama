function showSection(donem) {
  for (let i = 1; i <= 3; i++) {
    const sec = document.getElementById(`donem${i}`);
    const btn = document.getElementById(`btn${i}`);
    if (i === donem) {
      sec.classList.add("active");
      btn.classList.add("active");
    } else {
      sec.classList.remove("active");
      btn.classList.remove("active");
    }
  }
}

function yuvarlaNot(not) {
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

  const finalInput = document.getElementById(`d${donem}finalNot`);
  const finalNot = parseFloat(finalInput.value);

  if (isNaN(finalNot) || finalNot < 0 || finalNot > 100) {
    alert(`Lütfen Dönem ${donem} final notu için 0-100 arasında geçerli bir not giriniz.`);
    return;
  }

  const ortalamaKomiteNotu = toplamKomiteNotu / komiteSayisi;
  const ortalamaYuvarla = yuvarlaNot(ortalamaKomiteNotu);

  const basariNotuHesap = ortalamaYuvarla * 0.6 + finalNot * 0.4;
  const basariNotu = basariNotuHesap % 1 >= 0.5 ? Math.ceil(basariNotuHesap) : Math.floor(basariNotuHesap);

  const sonucEl = document.getElementById(`d${donem}sonuc`);
  sonucEl.innerHTML = `
    Ortalama Komite Notu (Yuvarlanmış): <strong>${ortalamaYuvarla}</strong><br/>
    Dönem Sonu Başarı Notu: <strong>${basariNotu}</strong><br/>
    ${basariNotu >= 60 ? "<span style='color:green'>Tebrikler, geçtiniz!</span>" : "<span style='color:red'>Maalesef, kaldınız.</span>"}
  `;
}
