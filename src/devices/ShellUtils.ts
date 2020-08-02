import { spawn, SpawnOptionsWithoutStdio } from 'child_process'
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
