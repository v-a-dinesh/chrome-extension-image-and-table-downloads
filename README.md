Image and Table Downloader Extension
A Chrome extension that allows users to easily download all images from a webpage as a ZIP file or export HTML tables as CSV files with a simple click.

Features
Download Images: Automatically fetches and downloads all images on the active webpage in a compressed ZIP file format.
Download Tables: Extracts all HTML tables on the active webpage and saves them as individual CSV files.
Getting Started
Prerequisites
Install Node.js (for building the project).
Install TypeScript globally:
bash
Copy code
npm install -g typescript
Install required packages:
bash
Copy code
npm install
Setup
Clone the repository:

bash
Copy code
git clone https://github.com/yourusername/image-table-downloader.git
Navigate to the project directory:

bash
Copy code
cd image-table-downloader
Compile TypeScript to JavaScript:

bash
Copy code
npx tsc
The compiled files will appear in the dist folder.

Installation
Open Chrome and go to chrome://extensions/.
Enable Developer Mode (toggle in the top right corner).
Click Load Unpacked and select the project directory.
The extension will now appear in your extensions list.
Usage
Navigate to a webpage with images or tables.
Click the extension icon in the browser toolbar.
In the popup:
Click Download Images to save all images as a ZIP.
Click Download Tables to save all tables as CSV files.
Project Structure
plaintext
Copy code
image-table-downloader/
│
├── src/                # Source TypeScript files
│   ├── popup.ts        # Handles button clicks and user interactions
│   ├── content.ts      # Extracts images and tables from the webpage
│   ├── background.ts   # Manages file downloads
│
├── dist/               # Compiled JavaScript files (generated after running `npx tsc`)
│
├── icons/              # Icons for the extension
│   ├── 16.png
│   ├── 48.png
│   ├── icon.png
│
├── manifest.json       # Chrome extension manifest
├── popup.html          # HTML for the popup UI
├── tsconfig.json       # TypeScript configuration
├── README.md           # Project documentation
└── package.json        # Node.js dependencies and scripts
Code Breakdown
manifest.json
Defines the extension details, permissions, and script configurations.

popup.html
Provides the user interface for the extension with buttons to trigger downloads.

popup.ts
Handles user actions.
Executes scripts on active tabs to fetch images and tables.
content.ts
Extracts data (image URLs and table content) from the webpage.
Sends the data back to the popup script.
background.ts
Listens for download requests.
Uses Chrome’s download API to save files locally.
tsconfig.json
Configures TypeScript compilation (target version, libraries, and output directory).

Dependencies
TypeScript: For type-safe JavaScript development.
JSZip: Creates ZIP files from fetched images.
FileSaver.js: Saves files locally.
XLSX: Exports table data to CSV files.
Install dependencies using:

bash
Copy code
npm install jszip file-saver xlsx
Known Issues
Large images or tables may take some time to process.
The extension does not work on Chrome Web Store or other restricted pages.
Contributing
Fork the repository.
Create a feature branch: git checkout -b feature-name.
Commit your changes: git commit -m 'Add feature'.
Push to the branch: git push origin feature-name.
Open a pull request.
