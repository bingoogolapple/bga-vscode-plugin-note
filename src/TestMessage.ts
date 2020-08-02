import * as vscode from 'vscode'

export function testMessage() {
  /**
   * 1、普通弹窗右上角有个 x 按钮，对应的 selection 为 undefined
   * 2、第二个可选参数设置是否为模态弹窗，模态弹窗默认会增加一个 Cancel 按钮，对应的 selection 为 undefined
   */
  vscode.window
    .showInformationMessage(
      '我是消息内容',
      { modal: true },
      '打开配置项',
      'testInputBox',
      'testSingleQuickPick',
      'testManyQuickPick',
      'testOutputChannel',
      'showSaveDialog',
      'showOpenDialog',
      'updateStatusBar'
    )
    .then(selection => {
      if (selection === '打开配置项') {
        vscode.window.showInformationMessage('提示消息')
        vscode.window.showWarningMessage('警告消息')
        vscode.window.showErrorMessage('错误消息')
        vscode.commands.executeCommand('workbench.action.openSettings')
      } else if (selection === 'testInputBox') {
        testInputBox()
      } else if (selection === 'testSingleQuickPick') {
        testSingleQuickPick()
      } else if (selection === 'testManyQuickPick') {
        testManyQuickPick()
      } else if (selection === 'testOutputChannel') {
        testOutputChannel()
      } else if (selection === 'showSaveDialog') {
        showSaveDialog()
      } else if (selection === 'showOpenDialog') {
        showOpenDialog()
      } else if (selection === 'updateStatusBar') {
        updateStatusBar()
      }
    })
}

async function testInputBox() {
  const password: string | undefined = await vscode.window.showInputBox({
    value: '我是默认值',
    valueSelection: [1, 2],
    prompt: '我是底部提示文案',
    placeHolder: '我是占位文案',
    password: true,
    ignoreFocusOut: false,
    validateInput: (value: string) => {
      if (!value) {
        return '密码不能为空'
      } else if (value.length < 6) {
        return '密码必须大于等于6位'
      } else {
        return undefined
      }
    }
  })
  console.log('密码为', password)
}

async function testSingleQuickPick() {
  const lang: string | undefined = await vscode.window.showQuickPick(
    ['Java', 'TypeScript'],
    {
      placeHolder: '我是占位文案'
    }
  )
  console.log('编程语言为', lang)
}

async function testManyQuickPick() {
  const option: Object | undefined = await vscode.window.showQuickPick(
    [
      {
        label: 'label1',
        description: 'description1',
        detail: 'detail1',
        picked: false,
        alwaysShow: false
      },
      {
        label: 'label2',
        description: 'description2',
        detail: 'detail2',
        picked: true, // 仅多选时有效
        alwaysShow: false
      }
    ],
    {
      placeHolder: '我是占位文案',
      canPickMany: true
    }
  )
  console.log('结果为', option)
}

function testOutputChannel() {
  // 可以有多个 OutputChannel 共存，使用参数名区分
  const opc: vscode.OutputChannel = vscode.window.createOutputChannel('BGA1')
  opc.clear() // 清空
  opc.appendLine('Java') // 追加一行，会自动在末尾换行
  opc.show() // 打开控制台并切换到 OutputChannel tab
  opc.append('TypeScript') // 追加一行不换行
  opc.append('TS')

  const opc2: vscode.OutputChannel = vscode.window.createOutputChannel('BGA2')
  opc2.clear() // 清空
  opc2.appendLine('Java2') // 追加一行，会自动在末尾换行
  opc2.show() // 打开控制台并切换到 OutputChannel tab
  opc2.append('TypeScript2') // 追加一行不换行
  opc2.append('TS2')
}

async function showSaveDialog() {
  // 让用户手动选择文件的的存储路径
  const uri = await vscode.window.showSaveDialog({
    title: '我是标题',
    saveLabel: '我是自定义保存按钮',
    filters: {
      zip: ['zip'] // 文件类型过滤
    }
  })
  if (!uri) {
    return false
  }

  console.log('路径为', uri.fsPath)
}

async function showOpenDialog() {
  const uris = await vscode.window.showOpenDialog({
    title: '我是标题',
    openLabel: '我是自定义打开按钮',
    canSelectFolders: false, // 是否可以选择文件夹
    canSelectMany: false, // 是否可以选择多个文件
    filters: {
      apk: ['apk'] // 文件类型过滤
    }
  })

  if (!uris || !uris.length) {
    return
  }

  console.log('选择的文件为', uris)
}

function updateStatusBar() {
  // 3s 后消失
  vscode.window.setStatusBarMessage('BGA', 3000)

  let statusBarItem: vscode.StatusBarItem = vscode.window.createStatusBarItem(
    vscode.StatusBarAlignment.Right
  )
  statusBarItem.text = '自定义 text'
  statusBarItem.tooltip = '自定义 tooltip'
  statusBarItem.command = 'bga-vscode-plugin-note.webview'
  statusBarItem.show()
}
