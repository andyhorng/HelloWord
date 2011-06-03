/*
 * return 單字的原型
 */
function morphy(word) {
  /* 檢查是否在特殊字清單內 */
  var morphyed = null;
  if( (morphyed=localStorage.getItem("_" + word + "_")) != null )
    return morphyed;
  /* 作刪除字尾的動作 (根據 wordnet 的文件所提供的作法) */
  var table = {
    "s"    : ""   , "ses"  : "s"  , "xes" : "x"   , "zes" : "z" , 
    "ches" : "ch" , "shes" : "sh" , "men" : "man" , "ies" : "y" , 
    "s"    : ""   , "ies"  : "y"  , "es"  : "e"   , "es"  : ""  , 
    "ed"   : "e"  , "ed"   : ""   , "ing" : "e"   , "ing" : ""  , 
    "er"   : ""   , "est"  : ""   , "er"  : "e"   , "est" : "e"
  };

  for (suffix in table) {
    var re = new RegExp(suffix + "$");
    if(word.match(re)) {
      morphyed = word.replace(re, table[suffix]);
      break;
    }
  }

  return morphyed?morphyed:word;
}


/*
 * 載入特殊字的清單
 * 放入 localStorage 裡面然後前後加上 _ 當 key, value 就是其原型單字
 */
function loadExceptList() {
  /* 檢查是否載入過了 */
  if( window.localStorage.getItem("_varExcList_") == null ) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', chrome.extension.getURL('/data/exc.list'), false);
    xhr.send(null);
    var excList = JSON.parse(xhr.responseText);
    window.localStorage.setItem("__varExcList", true);
    for (key in excList) 
      window.localStorage.setItem("_" + key + "_", excList[key]);
    console.log("loaded!!");
  }
}
