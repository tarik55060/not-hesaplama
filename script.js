function showSection(id) {
  const sections = document.querySelectorAll('.tab-content');
  sections.forEach(sec => sec.classList.remove('active'));
  document.getElementById(id).classList.add('active');
}

window.onload = () => {
  showSection('donem1');
};

function calculate(donemId, komiteSayisi) {
  let toplam = 0;
  for (let i = 1; i <= komiteSayisi; i++) {
    const val = parseFloat(document.getElementById(`${donemId}k${i}`).value);
    if (isNaN(val) || val < 0 || val > 100) {
      alert(`Lütfen ${donemId} komite ${i} notunu 0-100 arasında girin.`);
      return;
    }
    toplam += val;
  }
  const ortalama = toplam / komiteSayisi;
  const yuvarlanmisOrtalama = Math.round(ortalama);

  const finalNotu = parseFloat(document.getElementById(`${donemId}final`).value);
  if (isNaN(finalNotu) || finalNotu < 0 || finalNotu > 100) {
    alert(`Lütfen ${donemId} final notunu 0-100 arasında girin.`);
    return;
  }

  const basariNotu = yuvarlanmisOrtalama * 0.6 + finalNotu * 0.4;
  const gecmeDurumu = basariNotu >= 59.5 ? 'GEÇTİNİZ!' : 'KALDINIZ!';

  const sonuc = `
    Komite Ortalaması (Yuvarlanmış): <b>${yuvarlanmisOrtalama}</b><br>
    Dönem Sonu Başarı Notu: <b>${basariNotu.toFixed(1)}</b><br>
    <span style="color:${basariNotu >= 59.5 ? 'green' : 'red'}; font-weight:bold;">${gecmeDurumu}</span>
  `;

  document.getElementById(`${donemId}result`).innerHTML = sonuc;
}
