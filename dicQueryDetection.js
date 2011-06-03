/* 偵測是否有查詢字典 */
function save(event) {
  var inserted = event.target;
  var selected = document.getSelection().toString().trim();
  /* google bubble 判斷 */
  if( inserted.innerHTML && inserted.innerHTML.match("gdx-bubble-query") ) {
    if( inserted.textContent.match(selected.toLowerCase()) != null ) {
      /* grab the sentence with the selected word */
      var regexp = /[^.!?\s][^.!?]*(?:[.!?](?!['"]?\s|$)[^.!?]*)*[.!?]?['"]?(?=\s|$)/mg;
      var selection = document.getSelection();
      var text = selection.anchorNode.parentNode.textContent;
      var sentence = regexp.exec(text)[0];
      while( !sentence.match(selected) ) 
        sentence = regexp.exec(text)[0];

      console.log(sentence);

      /* 傳回單字解釋跟例句 */
      var description = document.getElementById("gdx-bubble-meaning").textContent;
      /* 處理一下只留下解釋 */
      description = description.trim();

      console.log("description: " + description);
      var saveRequest = { 
        word: selected.toLowerCase(),
        example: sentence,
        description : description
      };

      chrome.extension.sendRequest(saveRequest, function(response) {
        });
    }
  }
}

document.addEventListener("DOMNodeInserted", save);
