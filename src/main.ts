import {getInput, setFailed} from '@actions/core'
import {Octokit} from 'octokit'
import {context} from '@actions/github'

type PackageType =
  | 'npm'
  | 'maven'
  | 'rubygems'
  | 'docker'
  | 'nuget'
  | 'container'

async function run(): Promise<void> {
  try {
    const token: string = getInput('token')
    const octokit = new Octokit({
      auth: token
    })

    const org: string = getInput('owner')
      ? getInput('owner')
      : context.repo.owner
    const packageName: string = getInput('package-name')
    const packageType: PackageType = [
      'npm',
      'maven',
      'rubygems',
      'docker',
      'nuget',
      'container'
    ].includes(getInput('package-type'))
      ? (getInput('package-type') as PackageType)
      : 'npm'

    await octokit.request(
      'DELETE /orgs/{org}/packages/{package_type}/{package_name}',
      {
        org,
        package_name: packageName,
        package_type: packageType
      }
    )
  } catch (error) {
    if (error instanceof Error) setFailed(error.message)
  }
}

run()
