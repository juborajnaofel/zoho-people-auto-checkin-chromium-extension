chrome.storage.onChanged.addListener((changes, areaName) => {
  // console.log('Changes in storage area:', areaName);
  // for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
  //   console.log(`Key: ${key}, Old Value:`, oldValue, ', New Value:', newValue);
  // }
  chrome.storage.local.get({ timer: null }, function (result) {
    if(result.timer){
      document.getElementById('info').innerText = `Timer: ${result.timer.hours}:${result.timer.minutes}:${result.timer.seconds}`;
    }
  });  
});
