document.getElementById('download-images')?.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab?.id !== undefined && tab.url?.startsWith('http')) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: downloadImages
        });
      } else {
        alert('This extension does not support the current page.');
      }
    });
  });
  
  document.getElementById('download-tables')?.addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (tab?.id !== undefined && tab.url?.startsWith('http')) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: downloadTables
        });
      } else {
        alert('This extension does not support the current page.');
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
      const tableData: string[] = [];
      const rows = table.querySelectorAll('tr');
      rows.forEach(row => {
        const cells = row.querySelectorAll('td, th');
        const rowData: string[] = [];
        cells.forEach(cell => {
          // Type cast the cell to HTMLTableCellElement to access innerText
          const tableCell = cell as HTMLTableCellElement;
          rowData.push(tableCell.innerText);
        });
        tableData.push(rowData.join(','));
      });
      const csvContent = tableData.join('\n');
      const filename = `table_${index + 1}.csv`;
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      chrome.runtime.sendMessage({ action: 'download', url, filename });
    });
  }
  