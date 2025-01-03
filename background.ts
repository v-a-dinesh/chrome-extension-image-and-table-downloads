chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'download') {
      const { url, filename } = message;
      chrome.downloads.download({
        url: url,
        filename: filename,
      });
    }
  });
  