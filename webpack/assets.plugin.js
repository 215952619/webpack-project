class FileListPlugin {
  static defaultOptions = {
    outputFile: 'assets.md',
  }

  constructor(options = {}) {
    this.options = { ...FileListPlugin.defaultOptions, ...options }
  }

  apply(compiler) {
    const pluginName = FileListPlugin.name
    const {
      webpack: {
        Compilation,
        sources: { RawSource },
      },
    } = compiler
    // const { Compilation } = webpack;
    // const { RawSource } = webpack.sources;

    compiler.hooks.thisCompilation.tap(pluginName, compilation => {
      compilation.hooks.processAssets.tap(
        {
          name: pluginName,
          stage: Compilation.PROCESS_ASSETS_STAGE_SUMMARIZE,
        },
        assets => {
          const content =
            '# In this build:\n\r' +
            Object.keys(assets)
              .map(name => `- ${name}`)
              .join('\n')

          compilation.emitAsset(this.options.outputFile, new RawSource(content))

          console.log('--------------' + pluginName + '--------------')
          console.log(content)
          console.log('--------------' + pluginName + ' end' + '--------------')
        }
      )
    })
  }
}

module.exports = {
  FileListPlugin,
}
