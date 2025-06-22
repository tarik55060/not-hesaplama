function showSection(id) {
  document.querySelectorAll('.tab-content').forEach(div => {
    div.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}

function calculate(donemId, komiteSayisi) {
  let toplam = 0;
  for (let i = 1; i <= komiteSayisi; i++) {
    const komiteInput = document.getElementById(`${donemId}k${i}`);
    if (!komiteInput) {
      alert(`Eksik input: ${donemId}k${i}`);
      return;
    }
    const val = parseFloat(komiteInput.value);
    if (isNaN(val)) {
      alert('Lütfen tüm komite notlarını doldurun.');
      return;
    }
    toplam += val;
  }

  let ortalama = toplam / komiteSayisi;
  ortalama = Math.round(ortalama);

  const ortalama60 = ortalama * 0.6;

  const finalInput = document.getElementById(`${donemId}final`);
  if (!finalInput) {
    alert('Final notu inputu bulunamadı.');
    return;
  }
  const finalNot = parseFloat(finalInput.value);
  if (isNaN(finalNot)) {
    alert('Lütfen final notunu girin.');
    return;
  }
  const final40 = finalNot * 0.4;

  const toplamNot = ortalama60 + final40;

  const resultDiv = document.getElementById(`${donemId}result`);
  if (toplamNot >= 59.5) {
    resultDiv.textContent = `Geçtiniz! Dönem Sonu Notunuz: ${toplamNot.toFixed(2)}`;
  } else {
    resultDiv.textContent = `Kaldınız! Dönem Sonu Notunuz: ${toplamNot.toFixed(2)}`;
  }
}
