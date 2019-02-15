const { Command, flags } = require('@oclif/command')
const chalk = require('chalk')
const proxy = require('./server')

class ProcsyCommand extends Command {
  async run () {
    const {
      flags: { target, port }
    } = this.parse(ProcsyCommand)

    proxy(target).listen(port, () => {
      this.log(`\nProxy server listeting at http://localhost:${port}`)
    })
  }
}

ProcsyCommand.description = `Proxy server
Creates a local proxy to configurable targets.`

ProcsyCommand.usage = 'procsy -t http://google.com'

ProcsyCommand.examples = `
${chalk.dim('# Simple proxying')}
$ procsy -t http://google.com

${chalk.dim('# Subdomain proxying')}
$ procsy -t api,http://my-external-api.com

${chalk.dim('# Subdomain and domain proxying')}
$ procsy -t api,http://my-external-api.com -t *,http://my-app.com
`

ProcsyCommand.flags = {
  version: flags.version({ char: 'v' }),
  help: flags.help({ char: 'h' }),

  target: flags.string({
    char: 't',
    description: 'Proxy target',
    multiple: true,
    parse: input => ['*'].concat(input.split(',')).slice(-2),
    required: true
  }),

  port: flags.string({
    char: 'p',
    env: 'PORT',
    default: '3001'
  })
}

module.exports = ProcsyCommand
