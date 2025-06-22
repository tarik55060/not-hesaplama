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
  const resultDiv = document.getElementById(`${donemId}result`);
  const finalInput = document.getElementById(`${donemId}final`);
  const finalNotStr = finalInput.value.trim();

  if (ortalama >= 75) {
    resultDiv.textContent = `Finalsiz geçtiniz! Ortalamanız: ${ortalama.toFixed(2)}`;
    return;
  }

  // Ortalamayı en yakın tam sayıya yuvarla
  const yuvarlanmisOrtalama = Math.round(ortalama);
  const ortalama60 = yuvarlanmisOrtalama * 0.6;

  if (finalNotStr === '') {
    // Final notu girilmemişse, geçmek için gereken minimum final notunu hesapla
    const gerekenFinal = ((59.5 - ortalama60) / 0.4).toFixed(2);
    if (gerekenFinal > 100) {
      resultDiv.textContent = `Geçmek için finalden ${gerekenFinal} almanız gerekiyor. Bu mümkün değil, kaldınız.`;
    } else if (gerekenFinal <= 0) {
      resultDiv.textContent = `Final notuna gerek kalmadan geçtiniz ama ortalama 75 altı.`;
    } else {
      resultDiv.textContent = `Geçmek için finalden en az ${gerekenFinal} almanız gerekiyor.`;
    }
    return;
  }

  const finalNot = parseFloat(finalNotStr);
  if (isNaN(finalNot)) {
    alert('Lütfen geçerli bir final notu girin.');
    return;
  }

  const final40 = finalNot * 0.4;
  const toplamNot = ortalama60 + final40;

  if (toplamNot >= 59.5) {
    resultDiv.textContent = `Geçtiniz! Dönem Sonu Notunuz: ${toplamNot.toFixed(2)}`;
  } else {
    resultDiv.textContent = `Kaldınız! Dönem Sonu Notunuz: ${toplamNot.toFixed(2)}`;
  }
}
