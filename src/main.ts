import * as core from '@actions/core'
import {Octokit} from 'octokit'

async function run(): Promise<void> {
  try {
    const token: string = core.getInput('token')
    const octokit = new Octokit({
      auth: token
    })

    const ORG = 'Newt-Inc'
    const PACKAGE_TYPE = 'npm'
    const packageName: string = core.getInput('package-name')

    await octokit.request(
      'DELETE /orgs/{org}/packages/{package_type}/{package_name}',
      {
        package_type: PACKAGE_TYPE,
        package_name: packageName,
        org: ORG
      }
    )
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
