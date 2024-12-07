const stadiums = [
  { name: "Ali Sami Yen", city: "İstanbul", photo: "images/rams_park.jpg", coords: [28.9446, 41.0408] },
  { name: "Şükrü Saraçoğlu Stadyumu", city: "İstanbul", photo: "images/ulker.jpg", coords: [29.0470, 41.0250] },
  { name: "Beşiktaş Park", city: "İstanbul", photo: "images/tupras_stadyumu.jpg", coords: [29.0194, 41.0438] },
  { name: "Şenol Güneş Spor Kompleksi", city: "Trabzon", photo: "images/senol_gunes.jpg", coords: [39.7205, 41.0011] },
  { name: "Yüzüncü Yıl Atatürk Stadyumu", city: "Bursa", photo: "images/timsah.jpg", coords: [29.0610, 40.2220] },
  { name: "Atatürk Olimpiyat Stadyumu", city: "İstanbul", photo: "images/ataturk_olimpiyat.jpg", coords: [28.8470, 41.2355] },
  { name: "Kadir Has Stadyumu", city: "Kayseri", photo: "images/kadir_has.jpg", coords: [35.4842, 38.7339] },
  { name: "Eryaman Stadyumu", city: "Ankara", photo: "images/eryaman_stadyumu.jpg", coords: [32.964, 39.913] },
  { name: "Kalyon Stadyumu", city: "Gaziantep", photo: "images/kalyon.jpg", coords: [37.0722, 37.3775] },
  { name: "Çaykur Didi Stadyumu", city: "Rize", photo: "images/caykur_didi.jpg", coords: [40.5344, 41.0263] },
  { name: "Samsun 19 Mayıs Stadyumu", city: "Samsun", photo: "images/19_mayis.jpg", coords: [36.3530, 41.2916] },
  { name: "Başakşehir Fatih Terim Stadyumu", city: "İstanbul", photo: "images/fatih_terim.jpg", coords: [28.8667, 41.0450] }
];

let currentStadiumIndex = 0;
let score = 0;
let timer = 480;
let interval;
let pointerLayer = null;

const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: 'https://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
      })
    }),
    new ol.layer.Vector({
      source: new ol.source.Vector(),
      style: new ol.style.Style({
        image: new ol.style.Circle({
          radius: 10,
          fill: new ol.style.Fill({
            color: 'rgba(0, 0, 255, 0.2)',
          }),
          stroke: new ol.style.Stroke({
            color: 'rgba(0, 0, 255, 0.8)',
            width: 2,
          }),
        }),
      }),
    }),
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([35, 39]),
    zoom: 6,
  }),
});

const stadiumPhoto = document.getElementById("stadium-photo");
const stadiumName = document.getElementById("stadium-name");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start-button");
const hintButton = document.getElementById("hint-button");
const modal = document.getElementById("score-modal");
const finalScoreElement = document.getElementById("final-score");
const closeModalButton = document.getElementById("close-modal");

startButton.addEventListener("click", startGame);
hintButton.addEventListener("click", showHint);

map.on("click", function (evt) {
  const coords = ol.proj.toLonLat(evt.coordinate);
  checkAnswer(coords);
});

map.on('pointermove', function (evt) {
  if (pointerLayer) {
    map.removeLayer(pointerLayer);
  }

  const coordinates = evt.coordinate;
  const pointerFeature = new ol.Feature(new ol.geom.Point(coordinates));
  pointerLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
      features: [pointerFeature],
    }),
    style: new ol.style.Style({
      image: new ol.style.Circle({
        radius: 10,
        fill: new ol.style.Fill({
          color: 'rgba(0, 0, 255, 0.2)',
        }),
        stroke: new ol.style.Stroke({
          color: 'rgba(0, 0, 255, 0.8)',
          width: 2,
        }),
      }),
    }),
  });

  map.addLayer(pointerLayer);
});

map.on('pointerout', function () {
  if (pointerLayer) {
    map.removeLayer(pointerLayer);
    pointerLayer = null;
  }
});

function startGame() {
  currentStadiumIndex = 0;
  score = 0;
  timer = 200;
  scoreElement.textContent = score;
  timerElement.textContent = timer;

  startButton.style.display = 'none';

  document.getElementById("stadium-photo").style.display = "block";
  showStadium();

  hintButton.style.display = 'block';

  interval = setInterval(() => {
    timer--;
    timerElement.textContent = timer;
    if (timer === 0) {
      endGame();
    }
  }, 1000);
}

function showStadium() {
  if (currentStadiumIndex < stadiums.length) {
    const stadium = stadiums[currentStadiumIndex];
    stadiumPhoto.src = stadium.photo;
    stadiumName.textContent = stadium.name;
  } else {
    endGame();
  }
}

function showHint() {
  const stadium = stadiums[currentStadiumIndex];
  alert(`Hint: This stadium is in ${stadium.city}`);
}

function checkAnswer(coords) {
  const stadium = stadiums[currentStadiumIndex];
  const distance = Math.sqrt(
    Math.pow(coords[0] - stadium.coords[0], 2) +
    Math.pow(coords[1] - stadium.coords[1], 2)
  );

  let points = 0;

  if (distance < 0.1) {
    points = 3;  
  } else if (distance < 0.3) {
    points = 2;  
  } else if (distance < 0.5) {
    points = 1; 
  } else {
    points = 0; 
  }

  score += points; 
  scoreElement.textContent = score;

  currentStadiumIndex++;  
  showStadium(); 
}

function endGame() {
  clearInterval(interval);
  finalScoreElement.textContent = score;
  modal.style.display = "flex";

  startButton.style.display = 'block';
  hintButton.style.display = 'none';
}

closeModalButton.addEventListener("click", () => {
  modal.style.display = "none";
  startButton.style.display = 'block';  // Butonu tekrar görünür yap
});
