const { Command, flags } = require('@oclif/command')
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

ProcsyCommand.description = 'Creates a local proxy server'

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
