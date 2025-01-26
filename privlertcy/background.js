const apiKey = ""; // Replace with your OpenAI API key

// Send page content to OpenAI API and get analysis
async function analyzePrivacyPolicy(url) {
  try {
    alert("Scanning")
    const response = await fetch(url);
    const text = await response.text();

    // Query GPT to summarize the privacy policy
    const prompt = `Please analyze the following privacy policy and summarize any key privacy risks or issues that a user should be aware of.\n\n${text}`;

    const gptResponse = await fetch('https://api.openai.com/v1/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 500,
        temperature: 0.7
      })
    });

    const data = await gptResponse.json();
    return data.choices[0].text.trim();
  } catch (error) {
    console.error('Error analyzing privacy policy:', error);
  }
}

// Listen for page navigations and send alert for privacy risks
chrome.webNavigation.onCompleted.addListener(async (details) => {
  if (details.frameId === 0) { // Only check the main frame
    const url = details.url;

    // Check for privacy risks (e.g., trackers, cookies)
    // In this example, we assume a basic privacy risk analysis
    const privacyAlert = await analyzePrivacyPolicy(url);
    chrome.scripting.executeScript({
      target: {tabId: details.tabId},
      func: (privacyAlert) => {
        alert(privacyAlert); // Display the alert on the webpage
      },
      args: [privacyAlert]
    });
  }
}, {url: [{hostContains: 'http'}]});
