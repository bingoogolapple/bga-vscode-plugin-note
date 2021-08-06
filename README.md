# bga-vscode-plugin-note

VS Code 插件开发学习笔记

参考 [vscode-plugin-demo](https://github.com/sxei/vscode-plugin-demo)

## 创建项目

- [开发环境搭建](https://hellogithub2014.github.io/2019/06/09/vscode-plugin-development)

```shell
npm install -g yo generator-code vsce
```

- 脚手架创建项目

```shell
yo code
```

## [注册发布账号](http://blog.haoji.me/vscode-plugin-publish.html)

- [注册账号并获取 Token](https://code.visualstudio.com/api/working-with-extensions/publishing-extension#get-a-personal-access-token)

`Organization` 一定要选择 `All accessible organizations`，否则会出现 401

- [命令行创建 publisher](https://marketplace.visualstudio.com/manage/createpublisher)

```sh
vsce create-publisher bingoogolapple
```

- [网页上创建 publisher](https://marketplace.visualstudio.com/manage/createpublisher)

- 登录

```sh
vsce login bingoogolapple
```

- 查看本地已登录 publisher

```sh
vsce ls-publishers
```

## 打包发布

- 打包成 vsix 文件，然后就可以在 [publisher 控制台](https://marketplace.visualstudio.com/manage/publishers)上传到应用市场了，发布完后要过几分钟才能在应用市场搜索到

```sh
vsce package
```

- 也可以通过命令行直接发布，发布完后要过几分钟才能在应用市场搜索到

```sh
vsce publish
```

## 其他

- 插件安装位置为 ~/.vscode/extensions/[package.json 中的 publisher].[package.json 中的 name]-[package.json 中的 version]
