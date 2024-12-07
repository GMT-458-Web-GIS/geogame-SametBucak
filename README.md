# Where Is The Stadium ?

**Where Is The Stadium ?** is a fun geographic game that aims to find stadium names, visuals and the correct location on the map. Players can play in two different modes:

- **Turkish Super League Mode**: Played for stadiums in the Turkish Super League.

- **Champions League Mode**: Includes stadiums used in the Champions League.

- ![image](https://github.com/user-attachments/assets/f3798c0f-cc5e-464a-83a1-4beb7f3026fb)

- **You can play the game from this link. Enjoy it!:**https://gmt-458-web-gis.github.io/geogame-SametBucak/

## Features

- **Start Screen**: Players choose one of the game modes on the start screen.
- **Modes**:
- Turkish Super League Mode: Stadiums in Turkey.

- ![image](https://github.com/user-attachments/assets/469a1b69-988f-408c-a6fd-7b587460d9ae)


- Champions League Mode: Famous stadiums in Europe.


- ![image](https://github.com/user-attachments/assets/68157830-7a60-49d7-8b15-f85b3b382405)



- **Dynamic Map Interaction**: Players try to mark the correct location according to the stadium name.
- **Scoring System**: According to the proximity of the location to be marked correctly:

- Between 0-50 km: 3 points
- Between 51-100 km: 2 points
- Between 101-200 km: 1 point
- Farther: 0 points
- **Responsive Design**: Suitable display for every device.

## Technologies Used

- **HTML**: Creates the structure of the game pages.
- **CSS**: For visual arrangements and style.
- **JavaScript**: Provides dynamic interaction and game logic.

## Requirements

- A modern browser (such as Google Chrome, Firefox, Edge).
- A browser or file explorer is sufficient to host the game files on a local server.

## File Structure

- **index.html**: Start screen.
- **domestic.html**: Turkish Super League Mode screen.
- **foreign.html**: Champions League Mode screen.
- **domestic.js**: JavaScript functions related to Turkish Super League Mode.

- **foreign.js**: JavaScript functions related to Champions League Mode.

- **style.css**: Style file for all game pages.

## Installation

1. Download the project to a folder.

2. Start the game by opening the **index.html** file in a browser.

## How to Play?

1. On the **Start screen**, select a game mode (Turkish Super League or Champions League).

2. On the mode screen, a random stadium name and image appear.
3. Mark the location of the stadium on the map.
4. Earn points according to your proximity to the correct location (3, 2, 1 or 0 points).
5. Progress to new stadiums and try to increase your score.

**Start Screen Flow:**
- **index.html** allows the player to choose between Turkish Super League Mode or Champions League Mode.
- When the selection is made, it is redirected to `domestic.html` or `foreign.html` page with `onclick` event.

## Technical Details

### 3 Event Handlers

1. **Mode Selection** (index.html):
```javascript
// Triggered when the mode selection button is clicked on the start screen.
const selectMode = document.getElementById('modeButton');
selectMode.addEventListener('click', () => {
window.location.href = 'domestic.html'; // or 'foreign.html'
});
```

2. **Map Click** (domestic.js):
```javascript
// Triggered when the player clicks a point on the map.
map.on('click', (event) => {
const clickedCoords = event.latlng;
checkDistance(clickedCoords, targetCoords); // Check the distance and calculate the score
});
```

3. **Result Display** (foreign.js):
```javascript
// Triggered when a button showing the results is pressed.
document.getElementById('showResults').addEventListener('click', () => {
displayResults(); // Shows the score and the correct location
});
```

### Using Closures
In the project, closures provided benefits as follows:

1. **Score Tracking:**
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
console.log(scoreTracker.getScore()); //3
```

2. **Map Click Management:**
```javascript
function createClickHandler(targetCoords) {
 return function(clickedCoords) {
 const distance = calculateDistance(clickedCoords, targetCoords);
 console.log(`Distance: ${distance} km`);
 };
}

const handleClick = createClickHandler([40.748817, -73.985428]); // Example coordinate
handleClick([40.73061, -73.935242]);
```

### Interaction with DOM

- **Element Update**: In the mode selection screen, we dynamically updated the name and visual of the selected mode via the DOM.
```javascript
document.getElementById('gameTitle').innerText = 'Turkish Super League Mode';
```

- **Result Display**: At the end of the game, result information (score, correct location) was visualized with DOM manipulation.
```javascript
document.getElementById('scoreDisplay').innerText = `Your Score: ${score}`;
```

- **Markers on the Map**: SVG elements were added and updated via the DOM to show the clicked points on the map.
```javascript
const marker = L.marker([lat, lng]).addTo(map);
```
