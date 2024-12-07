const stadiums = [
  { name: "Santiago Bernabeu", city: "Madrid", photo: "images/santiago_bernabeu.jpg", coords: [-3.7115, 40.4531] },
  { name: "Camp Nou", city: "Barcelona", photo: "images/camp_nou.jpg", coords: [2.1382, 41.3800] },
  { name: "Parc des Princes", city: "Paris", photo: "images/psg.jpg", coords: [2.2531, 48.8414] },
  { name: "Signal Iduna Park", city: "Dortmund", photo: "images/signal_iduna_park.jpg", coords: [7.4512, 51.4934] },
  { name: "Anfield Road", city: "Liverpool", photo: "images/anfield_road.jpg", coords: [-2.9692, 53.4308] },
  { name: "Allianz Arena", city: "München", photo: "images/allianz_arena.jpg", coords: [11.6228, 48.2188] },
  { name: "Etihad", city: "Manchester", photo: "images/etihad.jpg", coords: [-2.2075, 53.4831] },
  { name: "Old Trafford", city: "Manchester", photo: "images/old_trafford.jpg", coords: [-2.295, 53.4631] },
  { name: "San Siro", city: "Milan", photo: "images/san_siro.jpg", coords: [9.0191, 45.4780] },
  { name: "Johan Cruyff Arena", city: "Amsterdam", photo: "images/johan_cruyff_arena.jpg", coords: [4.9404, 52.3002] },
  { name: "Estadio da Luz", city: "Lisbon", photo: "images/estadio_da_luz.jpg", coords: [-9.2300, 38.7367] },
  { name: "Stamford Bridge", city: "London", photo: "images/stamford_bridge.jpg", coords: [-0.1910, 51.4816] },
  { name: "Emirates", city: "London", photo: "images/emirates.jpg", coords: [-0.1080, 51.5554] },
  { name: "Olympiastadion", city: "Berlin", photo: "images/olympiastadion.jpg", coords: [13.2905, 52.5145] },
  { name: "Velodrome", city: "Marseille", photo: "images/velodrome.jpg", coords: [5.4208, 43.2565] },
  { name: "Ibrox", city: "Glasgow", photo: "images/ibrox.jpg", coords: [-4.2935, 55.8644] }
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
  startButton.style.display = 'block';  
});
