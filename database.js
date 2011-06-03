// using indexedDB

var helloword = {};
helloword.indexedDB = {};

helloword.indexedDB.onfailure = function(e) {
  console.log("Error: " + e);
}

helloword.indexedDB.db = null;

/*
 * open
 */
helloword.indexedDB.open = function() {
  $.indexeddb("helloword").objectStore("words", {keyPath: "word"}).then(function(e) {
      console.log("words is created.");
    },
    helloword.indexedDB.onfailure
  );
};

/*
 * word insertion
 */
helloword.indexedDB.saveWord = function(word) {
  $.indexeddb("helloword").objectStore("words").get(word["word"]).then(function(e) {
      if(e) {
        helloword.indexeddb.updateWord(word['word'], word);
      } else {
        $.indexeddb("helloword").objectStore("words").add(word).then(function(e) {}, 
          helloword.indexedDB.onfailure);
      }
    });
};

/*
 * word query
 * using callback (callback(word))
 */
helloword.indexedDB.getWord = function(key, callback) {
  $.indexeddb("helloword").objectStore("words").get(key).then(callback, 
    helloword.indexedDB.onfailure);
};

/*
 * word updation
 */
helloword.indexedDB.updateWord = function(key, newWord) {
  $.indexeddb("helloword").objectStore("words").get(key).then(function(word) {
      var examples = word["examples"];
      for(props in newWord) word[props] = newWord[props];

      if(newWord["example"]) 
        word["examples"] = examples.concat(newWord["example"]);

      $.indexeddb("helloword").objectStore("words").update(word).then(function(e) {
          console.log( e + " updated!");
        },
        helloword.indexedDB.onfailure);
    }, 
    helloword.indexedDB.onfailure);
};
