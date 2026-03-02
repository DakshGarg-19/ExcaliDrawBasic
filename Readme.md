# ExcaliDraw

A lightweight, browser-based drawing and diagramming application inspired by Excalidraw. Create sketches, diagrams, and quick visual notes directly in your browser with a simple and intuitive interface.

## Features

- **Drawing Tools**
  - Pen - Freehand drawing
  - Eraser - Remove elements
  - Shapes - Rectangle, Circle
  - Lines - Vertical and horizontal lines
  - Arrows - Directional indicators
  - Text - Add text annotations
  - Move - Click and drag to reposition elements

- **Editing Capabilities**
  - Undo/Redo functionality with full history tracking
  - Move elements freely on the canvas
  - Delete elements with the bucket (eraser) tool
  - Edit text elements in-place
  - Click-based element creation

- **User Experience**
  - Lightweight and fast - no heavy dependencies
  - Responsive canvas that fills the viewport
  - Visual feedback for active tools
  - Unique IDs for all elements enabling robust undo/redo

## How It Works

### Tool System

Users can select from various tools via the toolbar. The `currentTool` variable tracks which tool is active, with visual indication on the toolbar button.

### Element Creation

When an inactive tool is selected and the canvas is clicked, a new element is created at the click position. Each element is assigned a unique ID using `crypto.randomUUID()`.

Supported element types:

- **Pen/Eraser**: Simple drawable elements
- **Lines**: Vertical or horizontal structure elements
- **Shapes**: Rectangle or circle containers
- **Arrow**: Icon-based directional element
- **Text**: Editable content elements

### Movement

When the Move tool is active:

- Click and drag any element to reposition it
- The element follows your mouse cursor
- Position is calculated relative to the viewport

### Undo/Redo System

- Each created element ID is pushed to the `history` array
- Undo removes the last element and pushes it to `redoStack`
- Redo restores the most recently undone element
- Creating a new element clears the redo stack

### Deletion

The Bucket tool allows deletion of elements by clicking on them, with support for undo/redo.

## Usage

1. Open `index.html` in a web browser
2. Select a tool from the toolbar at the top
3. **To Create**: Click on the canvas to place elements
4. **To Move**: Select the Move tool, then click and drag elements
5. **To Edit**: Select the Text tool, click to add text, and type directly
6. **To Delete**: Select the Bucket tool and click elements to remove them
7. **Undo/Redo**: Click the Undo/Redo buttons or use keyboard shortcuts

### Toolbar Tools

- **Pen** - Draw freehand
- **Eraser** - Remove elements (alternative to bucket)
- **Vertical Line** - Create vertical lines
- **Horizontal Line** - Create horizontal lines
- **Rectangle** - Draw rectangles
- **Circle** - Draw circles
- **Arrow** - Add arrow indicators
- **Text** - Add text annotations
- **Bucket** - Delete elements by clicking
- **Move** - Reposition elements
- **Undo** - Undo last action
- **Redo** - Redo last undone action

## Technical Details

### Architecture

- Event-driven tool selection system
- Canvas-based element positioning using absolute positioning
- Unique UUID generation for robust element tracking
- Separate history and redo stacks for complete action recovery

### Key Implementation Details

- **Event Delegation**: Toolbar event listeners prevent bubbling to canvas
- **Active Tool Tracking**: CSS class "active" highlights the selected tool
- **Element Identification**: Data attributes store unique IDs for undo/redo
- **Drag Mechanics**: Offset calculation ensures smooth dragging from click point

### Browser Requirements

- Modern browser with `crypto.randomUUID()` support
- ES6+ JavaScript compatibility
- CSS positioning and transforms support
- FontAwesome icons for arrow display

## Files

- `index.html` - Canvas container and toolbar UI
- `script.js` - Tool management, event handling, and business logic
- `style.css` - Styling and tool appearances

## Future Enhancements

Potential improvements:

- Drawing modes (sketch vs. precise shapes)
- Color customization
- Line thickness/stroke adjustment
- Shape fill options
- Layer management
- Export to image/SVG
- Collaborative editing
- Drawing history timeline
- Keyboard shortcuts for all tools
- Mobile touch support
