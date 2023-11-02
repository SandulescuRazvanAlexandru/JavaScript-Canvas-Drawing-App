# JavaScript-Canvas-Drawing-App

# Simple JavaScript Drawing App

A basic drawing application built with HTML5 Canvas and JavaScript, allowing users to draw shapes like rectangles, ellipses, and lines onto a canvas. It features the ability to choose shapes, set line width, and select colors.

## Features

- Draw various shapes: rectangles, ellipses, and lines.
- Select line width for drawing.
- Pick a color for shapes and background.
- List of shapes drawn with options to delete them.
- Save the drawing as a raster image (JPEG).

## Setup

To get started with this application:

1. Clone this repository to your local machine or download the files.
2. Open the `.html` file in a modern web browser.

## Usage

Upon loading the application in a browser, you'll see a canvas where you can start drawing. Below are the available tools and how to use them:

### Drawing Tools

- **Select Shape**: Click on the respective buttons (`Rectangle`, `Ellipse`, `Line`) to select the shape you want to draw.
- **Drawing on Canvas**: Click and drag on the canvas to draw the selected shape.
- **Line Width**: Click on the line width selector bar to set the width of your shape's outline.
- **Color Picker**: Select the color from the color picker for the shapes.
- **Background Color**: Select the background color from the color picker for the canvas.

### Saving and Deleting

- **Save Drawing**: Click the `Save` button to save your drawing as a JPEG file.
- **Delete Shape**: Double-click a shape in the list to delete it from the canvas and the shapes list.

## Development

The main JavaScript file contains all the logic for the drawing operations:

- `JS_File.js`: Contains all event handlers, drawing functions, and utility functions for the application.

### HTML Structure

- The `canvas` element is where the shapes are drawn.
- A `div` with the id `toolsPaint` contains buttons to choose the drawing tool.
- A list displays all drawn shapes, which can be double-clicked to delete.

### CSS Styling

- Add your own `CSS_File.css` file to style the application.

## Contributing

Contributions to improve the application are welcome. To contribute:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make changes or add new features.
4. Commit your changes (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature-name`).
6. Create a new Pull Request.

## License

This project is open-sourced under the MIT License. See the LICENSE file for details.

## Contact

If you have any questions or feedback, please reach out to the repository owner.

---

Happy drawing!
