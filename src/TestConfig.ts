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
