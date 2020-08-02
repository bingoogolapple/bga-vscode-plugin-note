import * as vscode from 'vscode'
import { shellCommand } from './ShellUtils'
import { DeviceItem } from './DeviceItem'

export class DevicesNodeProvider
  implements vscode.TreeDataProvider<DeviceItem> {
  public readonly onDidChangeTreeData?:
    | vscode.Event<DeviceItem | null | undefined>
    | undefined

  private treeDataChangeEventEmitter: vscode.EventEmitter<
    DeviceItem | null | undefined
  >

  constructor(private context: vscode.ExtensionContext) {
    this.treeDataChangeEventEmitter = new vscode.EventEmitter<
      DeviceItem | null | undefined
    >()
    this.onDidChangeTreeData = this.treeDataChangeEventEmitter.event
  }

  public getTreeItem(
    element: DeviceItem
  ): vscode.TreeItem | Thenable<vscode.TreeItem> {
    return element
  }

  public getChildren(
    element?: DeviceItem | undefined
  ): vscode.ProviderResult<DeviceItem[]> {
    if (!element) {
      return this.getDevices()
    } else {
      return Promise.resolve([])
    }
  }

  public refresh() {
    this.treeDataChangeEventEmitter.fire(undefined)
  }

  private async getDevices(): Promise<DeviceItem[]> {
    const output: string = await shellCommand('adb', ['devices'])
    const deviceLines: string[] = output.split('\n').filter((line: string) => {
      return line.trim() && !/list of devices attached/gi.test(line)
    })
    const devices = deviceLines.map((line: string) => {
      const deviceInfo: string[] = line.split('\t')
      const deviceId = deviceInfo[0]
      const deviceStatus = deviceInfo[1]
      return new DeviceItem(
        this.context,
        deviceId,
        deviceStatus,
        deviceId,
        vscode.TreeItemCollapsibleState.None
      )
    })
    return devices
  }
}
