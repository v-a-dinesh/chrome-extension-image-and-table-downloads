// Triggered when the "Download Images" button is clicked
document.getElementById('download-images').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab?.id) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: downloadImages
            });
        }
    });
});

// Triggered when the "Download Tables" button is clicked
document.getElementById('download-tables').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (tab?.id) {
            chrome.scripting.executeScript({
                target: { tabId: tab.id },
                func: downloadTables
            });
        }
    });
});

// Function to download images
function downloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
        const imageURL = img.src;
        const filename = `image_${index + 1}.jpg`; // Change extension if necessary
        fetch(imageURL)
            .then(response => response.blob())
            .then(blob => {
                const url = URL.createObjectURL(blob);
                chrome.runtime.sendMessage({ action: 'download', url, filename });
            });
    });
}

// Function to download tables as a CSV
function downloadTables() {
    const tables = document.querySelectorAll('table');
    tables.forEach((table, index) => {
        const tableData = [];
        const rows = table.querySelectorAll('tr');
        rows.forEach(row => {
            const cells = row.querySelectorAll('td, th');
            const rowData = [];
            cells.forEach(cell => rowData.push(cell.innerText));
            tableData.push(rowData.join(','));
        });
        const csvContent = tableData.join('\n');
        const filename = `table_${index + 1}.csv`;
        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = URL.createObjectURL(blob);
        chrome.runtime.sendMessage({ action: 'download', url, filename });
    });
}
