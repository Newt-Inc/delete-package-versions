# Delete Package Versions

This action deletes versions of a package from [GitHub Packages](https://github.com/features/packages).

## Usage

```yaml
- uses: Newt-Inc/delete-package-versions@v1
  with:
  # Owner of the repo hosting the package.
  # Defaults to the owner of the repo executing the workflow.
  owner:

  # Name of the package.
  # Required
  package-name:

  # Type of the package.
  # Defaults to npm.
  package-type:

  # The token used to authenticate with GitHub Packages.
  # Required
  token:
```

## Publish to a distribution branch

Actions are run from GitHub repos so we will checkin the packed dist folder.

Then run [ncc](https://github.com/zeit/ncc) and push the results:

```bash
$ npm run package
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

Note: We recommend using the `--license` option for ncc, which will create a license file for all of the production node modules used in your project.

Your action is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)
