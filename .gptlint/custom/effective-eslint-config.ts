import type { ESLint, Linter } from 'eslint'
import * as eslintLib from 'eslint'

import type { RuleDefinition } from '../../src/index.js'

export type RuleMetadata = {
  eslint?: ESLint
}

const rule: Readonly<RuleDefinition<RuleMetadata>> = {
  name: 'effective-eslint-config',
  message: 'Follow eslint best practices.',
  level: 'error',
  scope: 'file',
  resources: ['https://eslint.org'],

  init: async ({ rule, cwd }) => {
    // Types are missing `loadESLint` so this is a workaround
    // TODO: make this robust if no eslint config is found
    const DefaultESLint = await (eslintLib as any).loadESLint({ cwd })
    const eslint: ESLint = new DefaultESLint()
    rule.metadata.eslint = eslint
  },

  preProcessFile: async ({ file, rule }) => {
    if (!rule.metadata.eslint) return

    const eslintConfig: Linter.Config =
      await rule.metadata.eslint.calculateConfigForFile(file.filePath)

    // const cacheKey = createCacheKey({ rule, config, file, eslintConfig })
    // const cachedResult = await cache.get(cacheKey)
    // if (cachedResult) {
    //   return cachedResult
    // }

    // console.log(eslintConfig)
    const { rules } = eslintConfig

    if (!rules || !Object.keys(rules).length) {
      return {
        lintErrors: [
          {
            message: 'No eslint rules enabled.'
          }
        ]
      }
    }

    // const lintErrors: PartialLintError[] = []
    const enabledRules = new Set<string>()
    const disabledRules = new Set<string>()

    for (const [ruleName, ruleConfig] of Object.entries(rules)) {
      if (!ruleConfig) continue
      const ruleEntry = Array.isArray(ruleConfig) ? ruleConfig : [ruleConfig]
      if (ruleEntry[0] === 'off' || ruleEntry[0] === 0) {
        disabledRules.add(ruleName)
      } else {
        enabledRules.add(ruleName)
      }
    }
  }
}

export default rule
