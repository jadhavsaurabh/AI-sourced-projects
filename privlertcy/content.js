  // Detect tracking scripts (basic example)
  function detectTrackingScripts() {
    const scripts = document.querySelectorAll('script');
    let trackers = [];
  
    scripts.forEach(script => {
      const src = script.src || '';
      if (src.includes('analytics') || src.includes('track') || src.includes('google-analytics')) {
        trackers.push(src);
      }
    });
  
    return trackers;
  }
  
// Highlight or alert for detected trackers
function alertTrackers() {
    const trackers = detectTrackingScripts();
    if (trackers.length > 0) {
        alert(`Warning: This page contains tracking scripts!\nDetected trackers: \n${trackers.join('\n')}`);
    }
}

alertTrackers()