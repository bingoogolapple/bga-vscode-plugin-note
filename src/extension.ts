//  vscode编辑器api入口
import * as vscode from 'vscode'
import { getConfig, listenConfig } from './TestConfig'
import { testMessage } from './TestMessage'
import { DevicesNodeProvider } from './devices/DevicesNodeProvider'
import { DeviceItem } from './devices/DeviceItem'

// 此生命周期方法在插件激活时执行
export function activate(context: vscode.ExtensionContext) {
  // console 的各种方法都是输出在调试控制台 tab 下
  console.log('bga-vscode-plugin-note 被激活')

  listenConfig()

  // 将 registerCommand 的返回值放入 subscriptions 可以自动执行内存回收逻辑
  context.subscriptions.push(
    /**
     * 1、registerCommand 用于注册命令并提供具体逻辑，命令名需要和 package.json 里写的一致
     * 2、回调函数在命令被触发时执行
     */
    vscode.commands.registerCommand('bga-vscode-plugin-note.BGA1', () => {
      console.log('BGA1 被触发', JSON.stringify(getConfig()))
    })
  )

  context.subscriptions.push(
    vscode.commands.registerCommand('bga-vscode-plugin-note.BGA2', () => {
      console.log('BGA2 被触发')
      testMessage()
    })
  )

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'bga-vscode-plugin-note.getCurrentFilePath',
      uri => {
        vscode.window.showInformationMessage(
          `当前文件(夹)路径是：${uri ? uri.path : '空'}`
        )
      }
    )
  )

  // vscode.commands.getCommands().then(allCommands => {
  //   console.log('所有命令：', allCommands)
  // })

  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand('extension.selection', function (
      textEditor: vscode.TextEditor,
      edit: vscode.TextEditorEdit
    ) {
      const text = textEditor.document.getText(textEditor.selection)
      console.log('选中的文本是:', text)
    })
  )

  // 编辑器命令
  context.subscriptions.push(
    vscode.commands.registerTextEditorCommand(
      'extension.testEditorCommand',
      (textEditor, edit) => {
        console.log('您正在执行编辑器命令！')
        console.log(textEditor, edit)
      }
    )
  )

  // vscode.commands.executeCommand('命令', 'params1', 'params2').then(result => {
  //   console.log('命令结果', result)
  // })

  context.subscriptions.push(
    vscode.commands.registerCommand('bga-vscode-plugin-note.webview', function (
      uri
    ) {
      const panel = vscode.window.createWebviewPanel(
        'testWebview', // viewType
        'WebView 演示', // 视图标题
        vscode.ViewColumn.One, // 显示在编辑器的哪个部位
        {
          enableScripts: true, // 启用JS，默认禁用
          retainContextWhenHidden: true // webview被隐藏时保持状态，避免被重置
        }
      )
      panel.webview.html = `<html><body>你好，我是 Webview</body></html>`
    })
  )

  const devicesNodeProvider = new DevicesNodeProvider(context)
  vscode.window.registerTreeDataProvider('bga-tab-device', devicesNodeProvider)

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'bga-vscode-plugin-note.showLogs',
      async (deviceItem: DeviceItem) => {
        if (deviceItem && deviceItem.deviceId) {
          const terminal = vscode.window.createTerminal()
          terminal.show()
          terminal.sendText(`adb -s ${deviceItem.deviceId} logcat`, true)
        }
      }
    )
  )
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'bga-vscode-plugin-note.refreshDevicesView',
      () => {
        devicesNodeProvider.refresh()
      }
    )
  )
}

// 当插件被释放时执行此生命周期钩子
export function deactivate() {
  console.log('bga-vscode-plugin-note 被释放')
}
