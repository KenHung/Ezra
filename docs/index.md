---
layout: index
---

### 簡介

Ezra 能把聖經依據轉換成超連結，當鼠標在上時浮現經文，如：約 3:16；弗 2:1-3,5。

* 同時標示網頁上的中、英文聖經依據
* 可在Chrome上安裝
* 設有網頁部件(Web Widget)，可自定義顏色/風格(需更改CSS)
* 簡潔風格、無廣告/水印、獨立開發
* [開放源代碼(GPLv3授權)](https://github.com/KenHung/Ezra)

### 主要支援格式

<table class="unchanged rich-diff-level-one">
	<thead>
		<tr>
			<th></th>
			<th>[書卷][章]:[節]</th>
			<th>[書卷][中文章][節]</th>
			<th>[英文書卷][章]:[節]</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>單節</td>
			<td>約 3:16</td>
			<td>約三16</td>
			<td>John 3:16</td>
		</tr>
		<tr>
			<td>多節</td>
			<td>弗 2:1-3,5</td>
			<td>弗二1-3,5</td>
			<td>Eph. 2:1-3,5</td>
		</tr>
		<tr>
			<td>不同標點</td>
			<td>弗 2：1–3，5</td>
			<td>弗二1～3、5</td>
			<td>Eph. 2:1~3,5</td>
		</tr>
		<tr>
			<td>全寫</td>
			<td>以弗所書 2:1-3,5</td>
			<td>以弗所書二章1至3及5節</td>
			<td>Ephesians 2:1-3,5</td>
		</tr>
		<tr>
			<td>简体</td>
      <td>以弗所书 2:1-3,5</td>
			<td>以弗所书二章1至3及5节</td>
			<td></td>
		</tr>
		<tr>
			<td>多章</td>
			<td>約 1:29;3:16</td>
			<td>約一29；三16</td>
			<td>John 1:29;3:16</td>
		</tr>
	</tbody>
</table>

### Chrome擴充功能

* 安裝在Chrome上，即可自動標示所有基督教網頁/部落格(blog)的經文依據
* 可以在[Chrome Web Store下載安裝](https://chrome.google.com/webstore/detail/ezra-%E5%8D%B3%E6%99%82%E8%81%96%E7%B6%93%E6%9F%A5%E8%A8%BD/malpgijpleaapnkjihoacpbkkodkmjgg?hl=zh-TW&gl=HK)

### 網頁部件(Web Widget)

Ezra設有網頁部件，可供基督教網頁/部落格(blog)使用。這樣，網站的所有經文依據就會被標示，像本網頁一樣。

* 支援繁體中文和簡體中文和合本
* 支援一般網頁瀏覧器
* 網頁部件不會收集資料，所以沒有用戶統計
* **安裝方法**：把以下代碼加入到網頁HTML的底部，```</body>```之前

繁體中文和合本：

    <script src="https://cdn.jsdelivr.net/gh/KenHung/Ezra@{{ site.ezra.version }}/dist/ezra.js" 
            integrity="sha384-{{ site.ezra.integrity }}" 
            crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/gh/KenHung/Ezra@{{ site.ezra.version }}/dist/ezra-style.css" rel="stylesheet" type="text/css" />
    <script>
      ezraLinkifier.linkify(document.body);
    </script>

簡体中文和合本：

    <script src="https://cdn.jsdelivr.net/gh/KenHung/Ezra@{{ site.ezra.version }}/dist/ezra.js" 
            integrity="sha384-{{ site.ezra.integrity }}" 
            crossorigin="anonymous"></script>
    <link href="https://cdn.jsdelivr.net/gh/KenHung/Ezra@{{ site.ezra.version }}/dist/ezra-style.css" rel="stylesheet" type="text/css" />
    <script>
      ezraLinkifier.setLang('zh-Hans');
      ezraLinkifier.linkify(document.body);
    </script>

另有[詳細安裝說明](https://github.com/KenHung/Ezra/wiki/%E8%A9%B3%E7%B4%B0%E5%AE%89%E8%A3%9D%E8%AA%AA%E6%98%8E)，您也可以[自訂版本](https://github.com/KenHung/Ezra/releases)。

### 發表意見/問題

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