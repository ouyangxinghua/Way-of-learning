const Template = require("webpack/lib/Template");

module.exports = class XhrEvalChunkPlugin {

    apply(compiler) {
        var self = this;
        self.compiler = compiler;
        function requireEnsurePlugin (source, chunk, hash) {
            const chunkFilename = self.compilation.mainTemplate.outputOptions.chunkFilename;
            const chunkMaps = chunk.getChunkMaps();
            const chunkLoadTimeout = self.compilation.mainTemplate.outputOptions.chunkLoadTimeout || 120000;
            const chunkPath = self.compilation.mainTemplate.getAssetPath(chunkFilename, {
                hash: `" + ${self.compilation.mainTemplate.renderCurrentHashCode(hash)} + "`,
                hashWithLength: length =>
                    `" + ${self.compilation.mainTemplate.renderCurrentHashCode(hash, length)} + "`,
                chunk: {
                    id: '" + chunkId + "',
                    hash: `" + ${JSON.stringify(chunkMaps.hash)}[chunkId] + "`,
                    hashWithLength: length => {
                        const shortChunkHashMap = Object.keys(chunkMaps.hash)
                            .filter(
                                chunkId => typeof chunkMaps.hash[chunkId] === 'string',
                            )
                            .reduce(
                                (acc, chunkId) => ({
                                    ...acc,
                                    [chunkId]: chunkMaps.hash[chunkId].substr(0, length),
                                }),
                                {},
                            );
                        return `" + ${JSON.stringify(
                            shortChunkHashMap,
                        )}[chunkId] + "`;
                    },
                    name: `" + (${JSON.stringify(
                        chunkMaps.name,
                    )}[chunkId]||chunkId) + "`
                }
            });
            // added feature from webpack@5 https://github.com/webpack/webpack/pull/8462
            const chunkUrl = `(window.__webpack_public_path__ || ${self.compilation.mainTemplate.requireFn}.p) + "${chunkPath}"`;
            return Template.asString([
                'if(installedChunks[chunkId] === 0)',
                Template.indent(['return Promise.resolve();']),
                '',
                '// an Promise means "currently loading".',
                'if(installedChunks[chunkId]) {',
                Template.indent(['return installedChunks[chunkId][2];']),
                '}',
                '// start chunk loading',
                `var timeout = setTimeout(onReadyStateChange, ${chunkLoadTimeout});`,
                'function onReadyStateChange() {',
                Template.indent([
                    'if (xhr.readyState === 4 && xhr.status === 200) {',
                    Template.indent([
                        'eval(xhr.responseText);',
                        'clearTimeout(timeout);',
                        'var chunk = installedChunks[chunkId];',
                        'if(chunk !== 0) {',
                        Template.indent([
                            'if(chunk) chunk[1](new Error("Loading chunk " + chunkId + " failed."));',
                            'installedChunks[chunkId] = undefined;',
                        ]),
                        '}',
                    ]),
                    '}',
                ]),
                '}',
                'var xhr = new XMLHttpRequest();',
                `xhr.open("GET", ${chunkUrl});`,
                'xhr.onreadystatechange = onReadyStateChange;',
                'xhr.send();',
                '',
                'var promise = new Promise(function(resolve, reject) {',
                Template.indent(['installedChunks[chunkId] = [resolve, reject];']),
                '});',
                'return installedChunks[chunkId][2] = promise;',
            ]);
        }

        compiler.hooks.compilation.tap('XhrEvalChunkPlugin', function compilerPlugin(compilation) {
            self.compilation = compilation;
            compilation.mainTemplate.hooks.requireEnsure.tap('require-ensure', requireEnsurePlugin);
        });


        /*if (compiler.mainTemplate.hooks) {
            let plugin = { name: 'XhrEvalChunkPlugin' };
            compiler.mainTemplate.hooks.requireEnsure.tap(plugin, requireEnsure)
        } else {
            compiler.mainTemplate.plugin('require-ensure', requireEnsure)
        }*/
    }
};
