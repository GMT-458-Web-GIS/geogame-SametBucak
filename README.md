[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/ATV5e7Id)
# Interactive Geography Map Quiz

This is an interactive geography quiz game where players click on countries based on the questions. The game checks if the user clicks near the correct country on a map and provides feedback.

## Project Overview
- **Technologies Used**: HTML, CSS, JavaScript, and Leaflet.js (JavaScript library for interactive maps).
- **Objective**: Test geographic knowledge by asking players to locate countries on the map.

## Requirements

1. **Frontend Requirements**:
    - Display an interactive map that covers the entire screen.
    - Show a question prompt for the player to locate specific countries.
    - Provide feedback on whether the chosen location is correct or incorrect.
    - Show the correct location briefly if the answer is wrong.
    - Include a "Next Question" button to load the next country in the quiz.
  
2. **Functional Requirements**:
    - **Question Handling**: The game iterates through a set of predefined country locations.
    - **Click Detection**: The map registers clicks, calculates distance from the target, and checks accuracy.
    - **Feedback**: Alerts the player if they were correct or incorrect.
    - **Map Library**: Uses Leaflet.js to render and manage the interactive map.
    - **Panning and Zooming**: The map is set to display the whole world by default with a zoom level that allows easy country selection.
  
## Planned Features
- **Scoring System**: Introduce a scoring system to reward correct answers and track performance.
- **Expanded Country Pool**: Add more countries to the quiz for a richer experience.
- **SVG Support**: Incorporate SVGs for country boundaries or custom markers if possible, allowing for enhanced visual clarity.

## Frontend Layout

The frontend layout is simple and focused on usability:

- **Map Area**: The map occupies the majority of the screen to facilitate easy selection.
- **Question Section**: Positioned below the map, displaying the current country to locate.
- **Next Button**: Located below the question, allowing users to move to the next question at their own pace.

### Layout Diagram:
Below is a rough layout for the interface:
![image](https://github.com/user-attachments/assets/052cd8ae-75c9-4fc3-9e28-48e7a4cd0ea6)


## JavaScript Library
This project uses **Leaflet.js** for map rendering and interactive functionality.

## Setup and Usage
1. Clone this repository.
2. Open `index.html` in your browser to start the game.
3. Follow the prompts to select the correct locations on the map.

## Future Plans
- Add a scoring system to reward correct answers and track player progress.
- Expand the question pool with additional countries.
- Explore the integration of SVG support for more detailed map interactions.








