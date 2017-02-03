---
layout: index
---

Ezra能標示網頁上的聖經依據，如：約 3:16；弗 2:1-2,5，當鼠標移到經文依據時，就會顯示經文。

#### Chrome擴充功能
如果您想在瀏覧所有基督教網站時，都有Ezra效果，請使用[Ezra Chrome擴充功能](https://chrome.google.com/webstore/detail/ezra-%E5%8D%B3%E6%99%82%E8%81%96%E7%B6%93%E6%9F%A5%E8%A8%BD/malpgijpleaapnkjihoacpbkkodkmjgg?hl=zh-TW&gl=HK)。

#### Web Widget
如果您想自己的基督教網頁自動帶有Ezra效果，請把以下代碼加入到網頁HTML的底部，```</body>```之前：([詳細安裝說明](https://github.com/KenHung/Ezra/wiki/%E8%A9%B3%E7%B4%B0%E5%AE%89%E8%A3%9D%E8%AA%AA%E6%98%8E))

    <script src="https://cdn.rawgit.com/KenHung/Ezra/[版本]/ezra.js"></script>
    <link href="https://cdn.rawgit.com/KenHung/Ezra/[版本]/ezra-style.css" rel="stylesheet" type="text/css" />
    <script>
      ezraLinkifier.linkify(document.body);
    </script>

您也可以自訂Ezra版本：[所有版本](https://github.com/KenHung/Ezra/releases)

最新版本支援一般網頁瀏覧器，最低支援IE9。

### 支援格式
|           |[書卷][章]:[節]|[書卷][中文章][節]|[書卷][中文章]:[節]|全寫書卷章節         |
|-----------|--------------|----------------|-----------------|------------------|
|單節        |約1:1         |約一1            |約一:1           |約翰福音一章1節      |
|連續多節    |約1:1-5       |約一1-5          |約一:1-5          |約翰福音一章1至5節   |
|間斷多節    |約1:1,6       |約一1,6          |約一:1,6          |約翰福音一章1及6節   |
|連續＋間斷節 |約1:1-5,7     |約一1-5,7        |約一:1-5,7       |約翰福音一章1至5及7節 |
|不同標點    |約1：1–5，7    |約一1～5、7      |約一︰1－5、7      |詩篇1篇1至2及4節     |
|多章        |約1:1;2:1    |約一1；二1        |約一:1；二:1      |                   |

### 譯本
暫時只支援繁體中文和合本。

### 意見/問題
如果有意見或者問題想要提出，歡迎到[GitHub Issues](https://github.com/KenHung/Ezra/issues/new)發表，或者電郵給我：<eiekenhung@gmail.com>。

### 為什麼叫Ezra？
文士是抄寫聖經的人，很熟悉聖經，所以我特地用文士以斯拉(Ezra)來命名這個經文查詢小工具。而且這個名字簡短，優美，不易和常用字混淆。

### 致謝
Ezra能夠運作，要感謝下列開源項目/免費軟件的幫助：

* 「[信望愛信仰與聖經資源中心](https://bible.fhl.net/)」提供了[聖經JSON API](https://bible.fhl.net/json/)作經文查詢。
* HubSpot提供了[Drop](http://github.hubspot.com/drop/docs/welcome/)。
* [GitHub](https://github.com/)提供了代碼和Ezra主網寄存。
* [RawGit](https://rawgit.com/)讓我可以直接發佈GitHub上的Ezra代碼。
* [Reftagger](https://reftagger.com/)為本項目提供了靈感。

*Soli Deo gloria* - 唯獨榮耀上帝