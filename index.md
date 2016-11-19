---
layout: index
---


Ezra是中文的[Reftagger](https://reftagger.com/)。Ezra能夠找出網頁中的所有聖經依據，如：約 1:2；弗 2:1，然後顯示經文。當光標移到經文依據時，Ezra就會顯示相應的經文。適用於基督教網頁，如部落格、信仰告白或要理問答等。

### 支援格式
|           |[書卷][章]:[節]|[書卷][中文章][節]|[書卷][中文章]:[節]|
|-----------|--------------|----------------|-----------------|
|單節        |約1:1         |約一1            |約一:1           |
|連續多節    |約1:1-5       |約一1-5          |約一:1-5          |
|間斷多節    |約1:1,6       |約一1,6          |約一:1,6          |
|連續＋間斷節 |約1:1-5,7     |約一1-5,7        |約一:1-5,7       |

#### 書卷和章節間可以有空格：
* 約 1:1
* 約1: 1
* 約 1 : 1

#### 支援全寫書卷：
* 約翰福音1:1

#### 支援全型標點：
* 約一：1
* 約一：1，6
* 約一：1–5，6

#### 支援書卷省略：
* 約 1:1; 2:1; 7:31

#### 支援不同標點：
* 約 1、6
* 約 1～5，6
* 約 1：1；2：1

### 譯本
暫時只支援繁體中文和合本。

### 使用方法
Ezra剛剛起步，歡迎自由使用！如果你的網站沒有使用jQuery和jQuery UI，可以直接把以下代碼加入網頁的底部，</body>之前：

    <script src="https://code.jquery.com/jquery-1.12.4.min.js" integrity="sha256-ZosEbRLbNQzLpnKIkEdrPv7lOy9C27hHQ+Xp8a4MxAQ="
      crossorigin="anonymous"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" integrity="sha256-VazP97ZCwtekAsvgPBSUwPFKdrwD3unUfSGVYrahUqU="
      crossorigin="anonymous"></script>
    <link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css" />
    <script src="https://cdn.rawgit.com/KenHung/Ezra/0.1/ezra.js"></script>
    <link href="https://cdn.rawgit.com/KenHung/Ezra/0.1/ezra-style.css" rel="stylesheet" type="text/css" />
    <script>
      ezraLinkifier.linkify(document.body);
    </script>

### 意見/問題
如果有意見或者問題想要提出，歡迎到[GitHub Issues](https://github.com/KenHung/Ezra/issues/new)發表。

### 為什麼叫Ezra？
文士是抄寫聖經的人，很熟悉聖經，所以我特地用文士以斯拉(Ezra)來命名這個經文查詢小工具。而且這個名字簡短，優美，不易和常用字混淆。

### 致謝
Ezra能夠運作，要感謝下列開源項目/免費軟件的幫助：

* 「信望愛信仰與聖經資源中心」提供了[聖經JSON API](https://bible.fhl.net/json/)作經文查詢。
* [JQuery UI Tooltip](https://jqueryui.com/tooltip/)提供了Toolip。
* [GitHub](https://github.com/)提供了代碼和Ezra主網寄存。
* [RawGit](https://rawgit.com/)讓我可以直接發佈GitHub上的Ezra代碼。
* 我形容Ezra是中文Reftagger只是為了方便，Ezra並不是由Reftagger人員開發，不要找他們支援，我只是仿照他們製作。

*Soli Deo gloria* - 唯獨榮耀上帝
