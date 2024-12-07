# Where Is The Stadium

**Where Is The Stadium**; stadyum isimlerini, görsellerini ve harita üzerinde doğru lokasyonu bulmayı amaçlayan eğlenceli bir coğrafi oyundur. Oyuncular, iki farklı modda oynayabilir:

- **Turkish Super League Mode**: Türkiye Süper Ligi'ndeki stadyumlar için oynanır.
- **Champions League Mode**: Şampiyonlar Ligi'nde kullanılan stadyumları kapsar.

## Özellikler

- **Başlangıç Ekranı**: Oyuncular, başlangıç ekranında oyun modlarından birini seçer.
- **Modlar**:
  - Turkish Super League Mode: Türkiye'deki stadyumlar.
  - Champions League Mode: Avrupa'nın ünlü stadyumları.
- **Dinamik Harita Etkileşimi**: Oyuncular, stadyumun ismine göre doğru lokasyonu işaretlemeye çalışır.
- **Puanlama Sistemi**: Lokasyonun doğru işaretlenme yakınlığına göre:
  - 0-50 km arası: 3 puan
  - 51-100 km arası: 2 puan
  - 101-200 km arası: 1 puan
  - Daha uzak: 0 puan
- **Responsive Tasarım**: Her cihaz için uygun görüntüleme.

## Kullanılan Teknolojiler

- **HTML**: Oyun sayfalarının yapısını oluşturur.
- **CSS**: Görsel düzenlemeler ve stil için.
- **JavaScript**: Dinamik etkileşim ve oyun mantığını sağlar.

## Gereksinimler

- Modern bir tarayıcı (Google Chrome, Firefox, Edge gibi).
- Oyunun dosyalarını yerel bir sunucuda barındırmak için bir tarayıcı veya dosya gezgini yeterlidir.

## Dosya Yapısı

- **index.html**: Başlangıç ekranı.
- **domestic.html**: Turkish Super League Mode ekranı.
- **foreign.html**: Champions League Mode ekranı.
- **domestic.js**: Turkish Super League Mode ile ilgili JavaScript fonksiyonları.
- **foreign.js**: Champions League Mode ile ilgili JavaScript fonksiyonları.
- **style.css**: Tüm oyun sayfaları için stil dosyası.

## Kurulum

1. Projeyi bir klasöre indirin.
2. Bir tarayıcıda **index.html** dosyasını açarak oyunu başlatın.

## Nasıl Oynanır?

1. **Başlangıç ekranında** bir oyun modu seçin (Turkish Super League veya Champions League).
2. Mod ekranında, rastgele bir stadyum ismi ve görseli görünür.
3. Harita üzerinde stadyumun lokasyonunu işaretleyin.
4. Doğru lokasyona yakınlığınıza göre puan kazanın (3, 2, 1 veya 0 puan).
5. Yeni stadyumlar için ilerleyin ve puanınızı artırmaya çalışın.

**Başlangıç Ekranı Akışı:**
- **index.html**, oyuncunun Turkish Super League Mode veya Champions League Mode arasında seçim yapmasını sağlar.
- Seçim yapıldığında, `onclick` eventiyle `domestic.html` veya `foreign.html` sayfasına yönlendirilir.

## Teknik Ayrıntılar

### 3 Event Handlers

1. **Mod Seçimi** (index.html):
```javascript
// Başlangıç ekranında, mod seçim butonuna tıklanıldığında tetiklenir.
const selectMode = document.getElementById('modeButton');
selectMode.addEventListener('click', () => {
  window.location.href = 'domestic.html'; // veya 'foreign.html'
});
```

2. **Harita Tıklama** (domestic.js):
```javascript
// Oyuncunun harita üzerindeki bir noktayı tıklamasıyla tetiklenir.
map.on('click', (event) => {
  const clickedCoords = event.latlng;
  checkDistance(clickedCoords, targetCoords); // Mesafeyi kontrol et ve puanı hesapla
});
```

3. **Sonuç Gösterimi** (foreign.js):
```javascript
// Sonuçları gösteren bir butona basıldığında tetiklenir.
document.getElementById('showResults').addEventListener('click', () => {
  displayResults(); // Puanı ve doğru lokasyonu gösterir
});
```

### Closures Kullanımı
Projede closures, aşağıdaki şekilde fayda sağladı:

1. **Puan Takibi:**
```javascript
function createScoreTracker() {
  let score = 0;
  return {
    addPoints: (points) => { score += points; },
    getScore: () => score
  };
}

const scoreTracker = createScoreTracker();
scoreTracker.addPoints(3);
console.log(scoreTracker.getScore()); // 3
```

2. **Harita Tıklama Yönetimi:**
```javascript
function createClickHandler(targetCoords) {
  return function(clickedCoords) {
    const distance = calculateDistance(clickedCoords, targetCoords);
    console.log(`Distance: ${distance} km`);
  };
}

const handleClick = createClickHandler([40.748817, -73.985428]); // Örnek koordinat
handleClick([40.73061, -73.935242]);
```

### DOM ile Etkileşim

- **Element Güncelleme**: Mod seçim ekranında, seçilen modun adını ve görselini DOM üzerinden dinamik olarak güncelledik.
```javascript
document.getElementById('gameTitle').innerText = 'Turkish Super League Mode';
```

- **Sonuç Gösterimi**: Oyun sonunda, DOM manipülasyonu ile sonuç bilgileri (puan, doğru lokasyon) görselleştirildi.
```javascript
document.getElementById('scoreDisplay').innerText = `Your Score: ${score}`;
```

- **Harita Üzerindeki İşaretleyiciler**: Harita üzerinde tıklanan noktaları göstermek için DOM üzerinden SVG elementleri eklendi ve güncellendi.
```javascript
const marker = L.marker([lat, lng]).addTo(map);
```
