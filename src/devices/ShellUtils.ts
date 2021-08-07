import * as vscode from 'vscode'
import { exec, ExecException, spawn, SpawnOptionsWithoutStdio } from 'child_process'
export function shellCommand(
  cmd: string,
  args?: ReadonlyArray<string>,
  options?: SpawnOptionsWithoutStdio
): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      const childProcess = spawn(cmd, args, options)
      let output = ''
      childProcess.stdout.on('data', (data: Uint8Array) => {
        output += data
      })
      childProcess.stderr.on('data', (err: Uint8Array) => {
        reject(err)
      })
      childProcess.on('close', (code: number) => {
        resolve(output)
      })
    } catch (error) {
      reject(error)
    }
  })
}

export function gitAdd(dirPath: string) {
  exec(`cd ${dirPath} && git add .`, err => {
    if (err) {
      console.log('command fail:', 'git add .')
    } else {
      console.log('command success:', 'git add .')
    }
  })
}

export function username(): Promise<string> {
  return new Promise<string>(resolve => {
    exec(
      'git config user.name',
      (error: ExecException | null, stdout: string, stderr: string) => {
        if (error) {
          resolve('未知用户')
        } else {
          resolve(stdout.trim())
        }
      }
    )
  })
}

export function openUrlWithOpen(url: string) {
  return new Promise<string>(resolve => {
    exec(
      `open ${url}`,
      (error: ExecException | null, stdout: string, stderr: string) => {
        if (error) {
          console.error('打开失败')
        } else {
          console.log('打开成功')
        }
      }
    )
  })
}

export function openUrlWithVSCodeOpen(url: string) {
  vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(url))
}