This is the Ezra code base, there are two parts:

* Chrome Extension
* Web Widget

| Folder    | Content                         |
| --------- | ------------------------------- |
| chromeExt | Chrome Extension specific code  |
| docs      | GitHub Pages files              |
| src       | Ezra core code base             |

### Deploying/Testing Chrome Extension

* run `./build.sh` to create Chrome Extension
* load `dist/unpacked` for testing
* upload `dist/ext.zip` for release

### Deploying Web Widget

1. make sure ezra.js and ezra.sc.js are updated by gulp
2. `git tag -a <tag_name>` and `git push origin <tag_name>`
3. update release page by `docs/index.md` if necessary
4. update Ezra version and integrity by `update_config.sh`
5. publish on Github