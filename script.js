function calculate(donemId, komiteSayisi) {
  let toplam = 0;

  const imgEl = document.getElementById(`${donemId}image`);
  imgEl.style.display = 'none';
  imgEl.src = '';

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

    // Konfeti
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 150,
        spread: 100,
        origin: { y: 0.6 }
      });
    }

    imgEl.src = 'finalsiz-gectiniz.jpg';
    imgEl.style.display = 'block';
    return;
  }

  const yuvarlanmisOrtalama = Math.round(ortalama);
  const ortalama60 = yuvarlanmisOrtalama * 0.6;

  if (finalNotStr === '') {
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

// Sekmelerin tıklanabilir olmasını sağlar
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('.tabs button').forEach(button => {
    button.addEventListener('click', function () {
      const target = this.getAttribute('data-section');
      showSection(target);
    });
  });
});

// Sekmeyi aktif hale getirir
function showSection(id) {
  document.querySelectorAll('.tab-content').forEach(div => {
    div.classList.remove('active');
  });
  document.getElementById(id).classList.add('active');
}
