---
permalink: /linkifier/
title: 網頁經文標示
description: >-
  把網頁上面的中、英文聖經依據轉換成超連結，當鼠標在上時浮現經文。
  設有網頁部件(Web Widget)，以及 Chrome Extension。
toc: true
toc_label: 內容
---
把網頁上面的聖經依據轉換成超連結，當鼠標在上時浮現經文，如：約 3:16；弗 2:1-3,5。
類似的工具有 [Faithlife RefTagger](https://faithlife.com/products/reftagger)
，以及 [GlobalRize BibleLink](https://www.globalrize.org/about-globalrize/what-we-do/bible-link/)，
只是它們都不支援中文，Ezra 的中文經文標示功能就嘗試填補這個需求。

## 特點

* 同時標示網頁上的中、英文聖經依據
* 設有網頁部件(Web Widget)，以及 Chrome Extension
* 簡潔風格、無廣告/水印、獨立開發
* [Open Source (GPLv3)](https://github.com/KenHung/Ezra)

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
		<tr>
			<td>跨章</td>
			<td>羅 1:31-2:2</td>
			<td>羅十一35至十二2</td>
			<td>Rom 11:35-12:2</td>
		</tr>
	</tbody>
</table>

## Chrome Extension

* 安裝在Chrome上，即可自動標示所有基督教網頁/部落格(blog)的經文依據
* 可以在[Chrome Web Store下載安裝](https://chrome.google.com/webstore/detail/ezra-%E5%8D%B3%E6%99%82%E8%81%96%E7%B6%93%E6%9F%A5%E8%A8%BD/malpgijpleaapnkjihoacpbkkodkmjgg?hl=zh-TW&gl=HK)
* 暫未支援英文

## 網頁部件(Web Widget)

可供基督教網頁/部落格(blog)使用，可自定義顏色/風格。這樣，網站的所有經文依據就會被標示，像本網頁一樣。

* 支援繁體中文和簡體中文和合本
* 支援一般網頁瀏覧器
* 網頁部件不會收集資料，所以沒有用戶統計
* **安裝方法**：把以下代碼加入到網頁HTML的底部，```</body>```之前

### 繁體中文和合本

```javascript
{% include ezra_linkifier %}
```

### 簡体中文和合本

```javascript
{% include ezra_linkifier zh=true %}
```

另有[詳細安裝說明](https://github.com/KenHung/Ezra/wiki/%E8%A9%B3%E7%B4%B0%E5%AE%89%E8%A3%9D%E8%AA%AA%E6%98%8E)，您也可以[自訂版本](https://github.com/KenHung/Ezra/releases)。

## 致謝

* Backend: [信望愛站聖經 JSON API](https://bible.fhl.net/json/)
* Frontend: [Drop](http://github.hubspot.com/drop/docs/welcome)
* CDN: [jsDelivr](https://www.jsdelivr.com/)
