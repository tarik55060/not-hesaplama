function showSection(id) {
  const sections = document.querySelectorAll('.tab-content');
  sections.forEach(sec => {
    sec.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

// Sayfa açılırken Dönem 1 sekmesini göster
window.onload = () => {
  showSection('donem1');
};

function calculate(donemId, komiteSayisi) {
  let toplam = 0;
  for (let i = 1; i <= komiteSayisi; i++) {
    const komiteNot = parseFloat(document.getElementById(`${donemId}k${i}`).value);
    if (isNaN(komiteNot) || komiteNot < 0 || komiteNot > 100) {
      alert(`Lütfen ${donemId} için tüm komite notlarını 0-100 arasında doğru giriniz.`);
      return;
    }
    toplam += komiteNot;
  }

  const ortalama = toplam / komiteSayisi;
  const yuvarlanmisOrtalama = Math.round(ortalama);

  const finalNotu = parseFloat(document.getElementById(`${donemId}final`).value);
  if (isNaN(finalNotu) || finalNotu < 0 || finalNotu > 100) {
    alert(`Lütfen ${donemId} için final notunu 0-100 arasında doğru giriniz.`);
    return;
  }

  const basariNotu = yuvarlanmisOrtalama * 0.6 + finalNotu * 0.4;
  const yuvarlanmisBasariNotu = Math.round(basariNotu * 10) / 10; // 1 ondalık hassasiyet

  const gectiMi = yuvarlanmisBasariNotu >= 59.5;

  const sonucText = `
    Komite Ortalaması (Yuvarlanmış): <b>${yuvarlanmisOrtalama}</b><br>
    Dönem Sonu Başarı Notu: <b>${yuvarlanmisBasariNotu}</b><br>
    <span style="color:${gectiMi ? 'green' : 'red'}; font-weight:bold;">
      ${gectiMi ? 'GEÇTİNİZ!' : 'KALDINIZ!'}
    </span>
  `;

  document.getElementById(`${donemId}result`).innerHTML = sonucText;
}
