window.onload = () => {
  createInputs(1, 5);  // Dönem I: 5 komite
  createInputs(2, 6);  // Dönem II: 6 komite
  createInputs(3, 6);  // Dönem III: 6 komite
  showTab('donem1');   // Başlangıçta Dönem I gösterilsin
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

  // (5) Ders kurulları ortalama notu = tüm komite notlarının toplamı / komite sayısı
  const toplam = notlar.reduce((a, b) => a + b, 0);
  let ortalama = toplam / komiteSayisi;
  ortalama = Math.round(ortalama); // Yönetmelik: en yakın tam sayıya yuvarlanır

  const sonucDiv = document.getElementById(`sonuc${donem}`);
  const hepsi60 = notlar.every(n => n >= 60);

  // (7) Otomatik geçme durumu
  if (ortalama >= 75 && hepsi60) {
    sonucDiv.innerHTML = `✅ Ders kurulu ortalamanız: <b>${ortalama}</b><br>
      Tüm notlar 60 ve üzeri olduğu için <b>final sınavına girmeden geçtiniz.</b>`;
    return;
  }

  // (6) Final notu: Ortalamanın %60'ı + Final %40 ≥ 60
  const minFinal = ((60 - (ortalama * 0.6)) / 0.4).toFixed(2);

  if (minFinal > 100) {
    sonucDiv.innerHTML = `❌ Ders kurulu ortalamanız: <b>${ortalama}</b><br>
      Finalden <b>${minFinal}</b> almanız gerekiyor. Bu mümkün olmadığı için <b>sınıfta kalıyorsunuz.</b>`;
  } else {
    sonucDiv.innerHTML = `ℹ️ Ders kurulu ortalamanız: <b>${ortalama}</b><br>
      Finalden geçmek için minimum <b>${minFinal}</b> almanız gerekiyor.`;
  }
}
