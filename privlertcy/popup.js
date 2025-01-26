document.getElementById('scan-btn').addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      const currentTab = tabs[0];

      chrome.scripting.executeScript({
        target: {tabId: currentTab.id},
        func: detectTrackingScripts,
      }, (results) => {
        const trackers = results[0].result;
        if (trackers.length > 0) {
          document.getElementById('alert-message').textContent = `This page contains trackers: \n${trackers.join('\n')}`;
        } else {
          document.getElementById('alert-message').textContent = "No trackers detected!";
        }
      });
    });
  });


