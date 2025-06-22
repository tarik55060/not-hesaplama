window.onload = () => {
  createInputs(1, 5);
  createInputs(2, 6);
  createInputs(3, 6);
  showTab('donem1');
};

function showTab(tabId) {
  document.querySelectorAll('.tab-content').forEach(tab => {
    tab.style.display = 'none';
  });
  document.getElementById(tabId).style.display = 'block';
}

function createInputs(donem, count) {
  const container = document.getElementById(`inputs${donem}`);
  container.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = 0;
    input.max = 100;
    input.placeholder = `Komite ${i}`;
    input.id = `d${donem}_k${i}`;
    container.appendChild(input);
  }
}

function hesapla(donem, komiteSayisi) {
  let notlar = [];
  for (let i = 1; i <= komiteSayisi; i++) {
    let val = parseFloat(document.getElementById(`d${donem}_k${i}`).value);
    if (isNaN(val) || val < 0 || val > 100) {
      alert(`Komite ${i} için geçerli bir not girin (0-100 arası)`);
      return;
    }
    notlar.push(val);
  }

  let ortalama = notlar.reduce((a, b) => a + b, 0) / komiteSayisi;
  ortalama = Math.round(ortalama);
  const sonucDiv = document.getElementById(`sonuc${donem}`);

  const hepsi60 = notlar.every(n => n >= 60);
  if (hepsi60 && ortalama >= 75) {
    sonucDiv.innerHTML = `Ders kurulu ortalamanız: <b>${ortalama}</b><br>
      Tüm notlar 60 ve üzeri olduğu için final sınavına girmeden geçtiniz!`;
    return;
  }

  const minFinal = ((60 - ortalama * 0.6) / 0.4).toFixed(2);
  if (minFinal > 100) {
    sonucDiv.innerHTML = `Ders kurulu ortalamanız: <b>${ortalama}</b><br>
      Finalden <b>${minFinal}</b> almanız gerekiyor, bu mümkün olmadığı için sınıfta kalıyorsunuz.`;
  } else {
    sonucDiv.innerHTML = `Ders kurulu ortalamanız: <b>${ortalama}</b><br>
      Final sınavından geçmek için minimum <b>${minFinal}</b> almanız gerekiyor.`;
  }
}
