# Cinematic Random Number Generator

An ultra-premium, cinematic Random Number Generator web app inspired by PickerWheel, featuring a grand, futuristic UI with 3D spinning wheel and premium visual effects.

## Features

- **Premium UI/UX**: Full-screen layout with dark luxury theme featuring glassmorphism and neon accents
- **3D Spinning Wheel**: Depth, glow, shadows, and smooth physics-based animation
- **Dynamic Effects**: Lighting effects, reflections, and subtle particle effects on spin
- **Flexible Configuration**: Custom min, max, interval values and number exclusion
- **Two Modes**: Normal mode and elimination mode
- **History Panel**: Animated entries of previous spins
- **Sound Effects**: Toggle with premium spin audio
- **Confetti Effects**: Spark burst on result reveal
- **Responsive Design**: Works on desktop, tablet, and mobile

## Technologies Used

- HTML5
- CSS3 (with modern features like backdrop-filter, gradients, and animations)
- JavaScript (ES6+)
- Canvas API for 3D wheel rendering
- Web Audio API for sound effects
- Local Storage for history persistence

## How to Use

1. Open `index.html` in a modern web browser
2. Configure your number range using the controls:
   - Min Number: Set the minimum value
   - Max Number: Set the maximum value
   - Interval: Set the increment between numbers
   - Exclude Numbers: Enter numbers to exclude (comma separated)
3. Choose between Normal Mode or Elimination Mode
4. Toggle sound and confetti effects as desired
5. Click "SPIN WHEEL" to generate a random number
6. View results in the center display and history panel

## Modes

- **Normal Mode**: Standard random number generation
- **Elimination Mode**: Selected numbers are automatically added to the exclude list for future spins

## Customization

The application uses CSS variables for easy theme customization. You can modify colors, gradients, and effects by adjusting the variables in the `:root` section of `styles.css`.

## Responsive Design

The application is fully responsive and adapts to different screen sizes:
- Desktop: Full three-column layout
- Tablet: Two-column layout with history below the wheel
- Mobile: Single-column layout

## Browser Compatibility

The application uses modern web technologies and works best in modern browsers that support:
- CSS backdrop-filter
- CSS variables
- Canvas API
- Web Audio API
- ES6 JavaScript features

## Files

- `index.html`: Main HTML structure
- `styles.css`: Premium styling with glassmorphism and neon effects
- `script.js`: Core functionality with 3D wheel and random generation
- `README.md`: This documentation