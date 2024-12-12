# Focus Dimmer Chrome Extension

Focus Dimmer is a Chrome extension that helps you concentrate on reading by highlighting the sentence you're currently looking at while dimming the rest of the text on the page. It's perfect for readers who want to maintain focus and reduce distractions while reading online content.

## Features

- Dims all text except the sentence you're hovering over
- Simple one-click toggle via extension icon
- Works on any webpage
- Smooth transitions between focused sentences
- Visual feedback through icon state (blue when active, gray when inactive)
- Per-tab activation state

## Installation

1. Clone this repository or download the source code
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked"
5. Select the folder containing the extension files

## Usage

1. Click the Focus Dimmer icon in your Chrome toolbar to enable/disable the feature
2. When enabled, hover over text to highlight the current sentence while dimming others
3. Click the icon again to disable the effect

## Files

- `manifest.json`: Extension configuration
- `background.js`: Handles extension state and icon updates
- `content.js`: Main functionality for text processing and highlighting
- `styles.css`: Styling for the dimming effect
- `icons/`: Directory containing extension icons

## Credits

This extension was built with the assistance of Anthropic's Claude AI assistant. The project combines modern web technologies with accessibility features to create a better reading experience.

## License

[MIT License](LICENSE)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## Brief Description for GitHub

A Chrome extension that enhances focus while reading by highlighting the current sentence and dimming surrounding text. Perfect for readers who want to maintain concentration and reduce distractions on text-heavy websites.