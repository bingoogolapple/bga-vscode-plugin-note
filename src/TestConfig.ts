//  vscode编辑器api入口
import * as vscode from 'vscode'

export interface TestObject {
  key1: string
  key2?: boolean
  key3: string
}
export interface BGAConfig {
  testBoolean: boolean
  testNumber: number
  testNumberEnum: number
  testString: string
  testStringEnum: string
  testStringArray: string[]
  testObjectArray: TestObject[]
}

export function getConfig() {
  const config = vscode.workspace.getConfiguration()
  const bgaConfig: BGAConfig | undefined = config.get('bga-vscode-plugin-note')
  console.log('testString', bgaConfig?.testString)
  const testStringArray: string[] | undefined = config.get(
    'bga-vscode-plugin-note.testStringArray'
  )
  const testObjectArray: TestObject[] | undefined = config.get(
    'bga-vscode-plugin-note.testObjectArray'
  )

  return {
    bgaConfig: bgaConfig,
    testStringArray: testStringArray || [],
    testObjectArray: testObjectArray || []
  }
}

export function listenConfig() {
  vscode.workspace.onDidChangeConfiguration(
    (event: vscode.ConfigurationChangeEvent) => {
      // 监听所有或指定某几项
      // const configList = ['bga-vscode-plugin-note']
      const configList = [
        'bga-vscode-plugin-note.testNumber',
        'bga-vscode-plugin-note.testString'
      ]
      /**
       * 1、在用户安装了插件后，可能会修改配置，vscode 提供了 onDidChangeConfiguration 事件监听
       * 2、affectsConfiguration 判断是否变更了指定配置项
       */
      const affected = configList.some(item => event.affectsConfiguration(item))
      if (affected) {
        console.log('affected', affected)
      }
    }
  )
}

export function testModifyConfig() {
  const config = vscode.workspace.getConfiguration("fileheader")

  // const setAsGlobal = config.inspect('customMade')?.workspaceValue === undefined;

  config.update("customMade", {
    "Date": "Do not edit",
    "Author": "bingoogolapple",
    "Description": "请填写描述信息"
  }, true)

  config.update("configObj", {
    "dateFormat": "YYYY/MM/DD", // 修改日期格式
    "specialOptions": {
      "Description": "About", // 将 Description 映射为 About
      "Date": "Time" // 将 Date 映射为 Time
    },
    "atSymbol": ["", "@"], // 去除前面的 @ 符号
    "autoAdd": false // 自动添加注释（默认是开启的）
  }, true)
}
