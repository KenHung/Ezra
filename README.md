# Ezra 自動聖經標示

Ezra 是一個聖經網頁小工具，可以把聖經依據轉換成超連結，並浮現聖經經文。
它可以安裝在網頁中，也提供 Chrome 擴充功能版本。

Ezra is a simple Bible web tool, which can convert Bible references into links with hover-preview. 
It can be embedded into a website, Chrome Extension is also available.

![Demo](demo.gif)

請到 [Ezra 主頁](https://kenhung.github.io/Ezra/)看詳細介紹。

Please visit [Ezra main page](https://kenhung.github.io/Ezra/) for details.

## Development

This is the Ezra code base, there are two parts:

* Chrome Extension
* Web Widget

| Folder    | Content                         |
| --------- | ------------------------------- |
| chromeExt | Chrome Extension specific code  |
| docs      | GitHub Pages files              |
| src       | Ezra core code base             |
| test      | Unit and integration tests      |

The code is organized in CommonJS modules, and browserify is used to bundle the files.
The source files are written in ES5 except tests and chrome extension related code.

### Setup

This project needs `npm` which comes with Node.js. 
Although this project is purely frontend code and Node.js is not required in runtime, 
`npm` is needed to install dependencies and bundler to create final output.

Once `npm` is installed, run `npm install` to install dependencies, 
some `npm` commands are available:
* `npm run watch` - create development version with sourcemap which can be used in debugging
* `npm run build` - build web widget
* `npm run build-chrome-ext` - build Chrome Extension
* `npm test` - run unit tests

### Deploying/Testing Chrome Extension

* run `npm run build-chrome-ext` to create Chrome Extension
* load `chromeExt/dist/unpacked` for testing
* upload `chromeExt/dist/ext.zip` for release

### Deploying Web Widget

1. make sure ezra.js are updated by browserify
2. `git tag -a <tag_name>` and `git push origin <tag_name>`
3. update release page by `docs/index.md` if necessary
4. update Ezra version and integrity by `update_config.sh`
5. publish on Github