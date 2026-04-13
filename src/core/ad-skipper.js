(function() {
  'use strict';

  var isEdge = /edg/i.test(navigator.userAgent);
  var normalSpeed = 1;
  var isSkippingAd = false;
  var lastAdSignature = '';

  function parseAdTime(text) {
    if (!text) return 0;
    var parts = text.split(":");
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }
    return parseInt(text) || 0;
  }

  function saveStats(stats) {
    browser.storage.local.set({ skipix_stats: stats }).catch(function() {});
  }

  function getAdSignature(adSpan) {
    return adSpan ? adSpan.textContent.trim() : '';
  }

  function check() {
    var video = document.querySelector("video");
    if (!video) return;

    var adSpan = document.querySelector('span[class*="mmvz9h"]');
    var adTime = adSpan ? parseAdTime(adSpan.textContent) : 0;
    var adSignature = getAdSignature(adSpan);
    var hasAd = adSpan !== null && adTime > 0;

    if (hasAd) {
      var speed = isEdge ? 3 : 8;

      if (video.paused) {
        video.play();
      }

      if (adTime > 2 && !isSkippingAd) {
        browser.storage.local.get('skipix_stats').then(function(r) {
          var stats = r.skipix_stats || { adTime: 0, segments: 0 };
          var newSig = adTime + '_' + Date.now();

          if (lastAdSignature !== newSig) {
            stats.segments++;
            stats.adTime += adTime;
            lastAdSignature = newSig;
            saveStats(stats);
          }
        }).catch(function() {});

        video.muted = true;
        video.playbackRate = speed;
        isSkippingAd = true;
      }
    } else if (isSkippingAd) {
      video.muted = false;
      video.playbackRate = normalSpeed;
      isSkippingAd = false;
      lastAdSignature = '';
    }
  }

  setInterval(check, 500);
})();
