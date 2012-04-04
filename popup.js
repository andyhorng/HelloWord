$(function() {
  var list = $('#list');
  $.indexeddb("helloword").objectStore("words").openCursor().each(function(word) {
    var wordDiv = $('<div></div>', { class: 'word' });
    wordDiv.css('position', 'relative');
    wordDiv.append($('<a></a>', {text: word['word'], href:'#', 
      click: function(e) {
        chrome.tabs.create({
          url: 'http://www.google.com.tw/dictionary?langpair=en|zh-TW&hl=zh-TW&aq=f&q='+
            word['word']}, 
          // on tab creating's callback
          function(tab) {
            // inject
            chrome.tabs.executeScript(tab.id, {file: 'jquery-1.6.1.min.js'}, function() {
              chrome.tabs.executeScript(tab.id, {file:'jquery.indexeddb.js'});
              chrome.tabs.executeScript(tab.id, {file: 'gdex.js'});
              chrome.tabs.insertCSS(tab.id, {file: 'gdex.css'});
            });
          });
      }
    }));
    wordDiv.append($('<div></div>', {class: 'description', text: word['description']}));
    var deleteBtn = $('<div></div>');
    deleteBtn.addClass('deleteBtn').text('X').appendTo(wordDiv);
    list.append(wordDiv);
  });
});
