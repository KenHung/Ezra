---
layout: index
---

    重要公告：Ezra Web Widget 1.9或以前的使用的CDN RawGit將會停止服務，為免Ezra效果受影響，請盡快更新。
    Chrome擴充功能不受影響。

### 簡介

Ezra能標示網頁上的聖經依據，如：約 3:16；弗 2:1-2,5。試試把鼠標移到經文依據，你就會看到經文。

* 標示網頁上的聖經依據
* 可在Chrome上安裝
* 設有網頁部件(Web Widget)，可自定義顏色/風格(需更改CSS)
* 簡潔風格、無廣告/水印、獨立開發
* [開放源代碼(GPLv3授權)](https://github.com/KenHung/Ezra)

### 支援格式

<table class="unchanged rich-diff-level-one">
  <thead>
    <tr>
      <th></th>
      <th>[書卷][章]:[節]</th>
      <th>[書卷][中文章][節]</th>
      <th>[書卷][中文章]:[節]</th>
      <th>全寫書卷章節</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>單節</td>
      <td>約1:1</td>
      <td>約一1</td>
      <td>約一:1</td>
      <td>約翰福音一章1節</td>
    </tr>
    <tr>
      <td>連續多節</td>
      <td>約1:1-5</td>
      <td>約一1-5</td>
      <td>約一:1-5</td>
      <td>約翰福音一章1至5節</td>
    </tr>
    <tr>
      <td>間斷多節</td>
      <td>約1:1,6</td>
      <td>約一1,6</td>
      <td>約一:1,6</td>
      <td>約翰福音一章1及6節</td>
    </tr>
    <tr>
      <td>連續＋間斷節</td>
      <td>約1:1-5,7</td>
      <td>約一1-5,7</td>
      <td>約一:1-5,7</td>
      <td>約翰福音一章1至5及7節</td>
    </tr>
    <tr>
      <td>不同標點</td>
      <td>約1：1–5，7</td>
      <td>約一1～5、7</td>
      <td>約一︰1－5、7</td>
      <td>詩篇1篇1至2及4節</td>
    </tr>
    <tr>
      <td>多章</td>
      <td>約1:1;2:1</td>
      <td>約一1；二1</td>
      <td>約一:1；二:1</td>
      <td></td>
    </tr>
  </tbody>
</table>

### Chrome擴充功能

* 安裝在Chrome上，即可自動標示所有基督教網頁/部落格(blog)的經文依據
* 可以在[Chrome Web Store下載安裝](https://chrome.google.com/webstore/detail/ezra-%E5%8D%B3%E6%99%82%E8%81%96%E7%B6%93%E6%9F%A5%E8%A8%BD/malpgijpleaapnkjihoacpbkkodkmjgg?hl=zh-TW&gl=HK)

### 網頁部件(Web Widget)

Ezra設有網頁部件，可供基督教網頁/部落格(blog)使用。這樣，網站的所有經文依據就會被標示，像本網頁一樣。

* 支援繁體中文和簡體中文和合本
* 支援一般網頁瀏覧器，最低支援IE9
* 網頁部件不會收集資料，所以沒有用戶統計
* **安裝方法**：把以下代碼加入到網頁HTML的底部，```</body>```之前

繁體中文和合本：

    <script src="https://cdn.jsdelivr.net/gh/KenHung/Ezra@{{ site.ezra.version }}/ezra.js" 
            integrity="sha384-{{ site.ezra.integrity }}" 
            crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/gh/KenHung/Ezra@{{ site.ezra.version }}/ezra-style.css" rel="stylesheet" type="text/css" />
    <script>
      ezraLinkifier.linkify(document.body);
    </script>

簡体中文和合本：

    <script src="https://cdn.jsdelivr.net/gh/KenHung/Ezra@{{ site.ezra.version }}/ezra.sc.js" 
            integrity="sha384-{{ site.ezra.integrity_sc }}" 
            crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/gh/KenHung/Ezra@{{ site.ezra.version }}/ezra-style.css" rel="stylesheet" type="text/css" />
    <script>
      ezraLinkifier.linkify(document.body);
    </script>

另有[詳細安裝說明](https://github.com/KenHung/Ezra/wiki/%E8%A9%B3%E7%B4%B0%E5%AE%89%E8%A3%9D%E8%AA%AA%E6%98%8E)，您也可以[自訂版本](https://github.com/KenHung/Ezra/releases)。

### 發表意見/問題

* [GitHub留言](https://github.com/KenHung/Ezra/issues/new)
* 電郵：<eiekenhung@gmail.com>

### 為什麼叫Ezra？

文士是抄寫聖經的人，很熟悉聖經，所以我特地用文士以斯拉(Ezra)來命名這個經文查詢小工具。而且這個名字簡短，優美，不易和常用字混淆。

### 致謝

Ezra能夠運作，要感謝下列開源項目/免費軟件的幫助：

* 「[信望愛信仰與聖經資源中心](https://bible.fhl.net/)」提供了[聖經JSON API](https://bible.fhl.net/json/)作經文查詢。
* HubSpot提供了[Drop](http://github.hubspot.com/drop/docs/welcome/)。
* [GitHub](https://github.com/)提供了代碼和Ezra主網寄存。
* [jsDelivr](https://www.jsdelivr.com/)讓我可以直接發佈GitHub上的Ezra代碼。
* [Reftagger](https://reftagger.com/)為本項目提供了靈感。

*Soli Deo gloria* - 唯獨榮耀上帝