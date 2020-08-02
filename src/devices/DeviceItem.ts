import * as vscode from 'vscode'
export class DeviceItem extends vscode.TreeItem {
  public iconPath:
    | string
    | vscode.Uri
    | { light: string | vscode.Uri; dark: string | vscode.Uri }
    | vscode.ThemeIcon
    | undefined

  public contextValue = 'DeviceItem'
  constructor(
    private context: vscode.ExtensionContext,
    public readonly deviceId: string,
    public readonly deviceStatus: string,
    public readonly label: string,
    public readonly collapsibleState: vscode.TreeItemCollapsibleState,
    public readonly command?: vscode.Command
  ) {
    super(label, collapsibleState)
    this.iconPath = this.context.asAbsolutePath('assets/device.svg')
  }

  get tooltip(): string {
    return `${this.deviceId}[${this.deviceStatus}]`
  }
}
