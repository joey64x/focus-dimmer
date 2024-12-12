let focusDimmerEnabled = false;

function initializeFocusDimmer() {
  function splitIntoSentences(text) {
    const regex = /[^.!?]+[.!?]+(?:\s|$)/g;
    return text.match(regex) || [];
  }

  function wrapTextNodes(node) {
    if (node.nodeType === Node.TEXT_NODE && node.textContent.trim() !== '') {
      const sentences = splitIntoSentences(node.textContent);
      if (sentences.length > 0) {
        const span = document.createElement('span');
        sentences.forEach((sentence) => {
          const sentenceSpan = document.createElement('span');
          sentenceSpan.textContent = sentence;
          sentenceSpan.className = 'focus-dimmer-sentence';
          span.appendChild(sentenceSpan);
        });
        node.parentNode.replaceChild(span, node);
      }
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (!['SCRIPT', 'STYLE', 'NOSCRIPT', 'IFRAME'].includes(node.tagName)) {
        Array.from(node.childNodes).forEach(child => wrapTextNodes(child));
      }
    }
  }

  function handleHover(e) {
    if (!focusDimmerEnabled) return;
    
    if (e.target.classList.contains('focus-dimmer-sentence')) {
      document.querySelectorAll('.focus-dimmer-sentence').forEach(sentence => {
        sentence.classList.add('dimmed');
      });
      e.target.classList.remove('dimmed');
      e.target.classList.add('highlighted');
    }
  }

  function handleMouseOut(e) {
    if (!focusDimmerEnabled) return;
    
    if (e.target.classList.contains('focus-dimmer-sentence')) {
      document.querySelectorAll('.focus-dimmer-sentence').forEach(sentence => {
        sentence.classList.remove('dimmed', 'highlighted');
      });
    }
  }

  wrapTextNodes(document.body);

  document.body.addEventListener('mouseover', handleHover);
  document.body.addEventListener('mouseout', handleMouseOut);
}

// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  focusDimmerEnabled = request.enabled;
  if (!focusDimmerEnabled) {
    // Remove all dimming when disabled
    document.querySelectorAll('.focus-dimmer-sentence').forEach(sentence => {
      sentence.classList.remove('dimmed', 'highlighted');
    });
  }
});

// Initialize when the document is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeFocusDimmer);
} else {
  initializeFocusDimmer();
}