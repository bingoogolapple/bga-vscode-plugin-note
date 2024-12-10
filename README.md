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

  - [登录或注册账号](https://login.live.com)
  - [创建阻止](https://aka.ms/SignupAzureDevOps)
  - [获取 Token](https://dev.azure.com) 右上角 User settings -> Personal access tokens
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

## 作者联系方式

| 个人主页 | 邮箱 |
| ------------- | ------------ |
| <a  href="https://www.bingoogolapple.cn" target="_blank">bingoogolapple.cn</a>  | <a href="mailto:bingoogolapple@gmail.com" target="_blank">bingoogolapple@gmail.com</a> |

| 个人微信号 | 微信群 | 公众号 |
| ------------ | ------------ | ------------ |
| <img width="180" alt="个人微信号" src="https://github.com/bingoogolapple/bga-god-assistant-config/raw/main/images/BGAQrCode.png"> | <img width="180" alt="微信群" src="https://github.com/bingoogolapple/bga-god-assistant-config/raw/main/images/WeChatGroup1QrCode.jpg"> | <img width="180" alt="公众号" src="https://github.com/bingoogolapple/bga-god-assistant-config/raw/main/images/GongZhongHao.png"> |

| 个人 QQ 号 | QQ 群 |
| ------------ | ------------ |
| <img width="180" alt="个人 QQ 号" src="https://github.com/bingoogolapple/bga-god-assistant-config/raw/main/images/BGAQQQrCode.jpg"> | <img width="180" alt="QQ 群" src="https://github.com/bingoogolapple/bga-god-assistant-config/raw/main/images/QQGroup1QrCode.jpg"> |

## 打赏支持作者

如果您觉得 BGA 系列开源库或工具软件帮您节省了大量的开发时间，可以扫描下方的二维码打赏支持。您的支持将鼓励我继续创作，打赏后还可以加我微信免费开通一年 [上帝小助手浏览器扩展/插件开发平台](https://github.com/bingoogolapple/bga-god-assistant-config) 的会员服务

| 微信 | QQ | 支付宝 |
| ------------- | ------------- | ------------- |
| <img width="180" alt="微信" src="https://github.com/bingoogolapple/bga-god-assistant-config/raw/main/images/donate-wechat.jpg"> | <img width="180" alt="QQ" src="https://github.com/bingoogolapple/bga-god-assistant-config/raw/main/images/donate-qq.jpg"> | <img width="180" alt="支付宝" src="https://github.com/bingoogolapple/bga-god-assistant-config/raw/main/images/donate-alipay.jpg"> |

## 作者项目推荐

* 欢迎您使用我开发的第一个独立开发软件产品 [上帝小助手浏览器扩展/插件开发平台](https://github.com/bingoogolapple/bga-god-assistant-config)
