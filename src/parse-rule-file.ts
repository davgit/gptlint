import fs from 'node:fs/promises'
import path from 'node:path'

import { parseDocument as parseYAMLDocument } from 'yaml'

import type * as types from './types.js'
import {
  findAllBetween,
  findAllHeadingNodes,
  findAllYAMLNodes,
  parseMarkdownAST,
  parseRuleNode
} from './markdown-utils.js'
import { RuleDefinitionSchema } from './rule.js'
import { assert, omit } from './utils.js'

/**
 * Parses a rule definition markdown file and returns the result.
 */
export async function parseRuleFile({
  content,
  filePath
}: {
  content: string
  filePath: string
}): Promise<types.Rule> {
  const ast = parseMarkdownAST(content)
  const h1RuleNodes = findAllHeadingNodes(ast, { depth: 1 })

  assert(
    h1RuleNodes.length === 1,
    `Rule file must contain a single h1 header: ${filePath}`
  )

  const yamlNodes = findAllYAMLNodes(ast)
  assert(
    h1RuleNodes.length <= 1,
    `Rule must not contain more than 1 yaml frontmatter nodes: ${filePath}`
  )

  const maybePartialRule =
    yamlNodes.length === 1
      ? parseRuleFrontmatter(yamlNodes[0]?.value)
      : undefined

  const headingRuleNode = h1RuleNodes[0]!
  const bodyRuleNodes = findAllBetween(ast, headingRuleNode)

  const rule = parseRuleNode({
    headingRuleNode,
    bodyRuleNodes,
    filePath,
    partialRule: maybePartialRule
  })

  return rule
}

export async function parseRuleFilePath(
  filePath: string,
  {
    cwd = process.cwd()
  }: {
    cwd?: string
  } = {}
): Promise<types.Rule> {
  const filePathResolved = cwd ? path.resolve(cwd, filePath) : filePath
  const content = await fs.readFile(filePathResolved, { encoding: 'utf8' })

  return parseRuleFile({
    content,
    filePath
  })
}

export function parseRuleFrontmatter(
  yaml: string | undefined
): Partial<types.RuleDefinition> | undefined {
  if (!yaml) {
    return
  }

  try {
    // TODO: more friendly error messages
    // TODO: relax string[] to handle single strings
    const yamlData: Record<string, unknown> = parseYAMLDocument(yaml).toJSON()

    const parsedRule = RuleDefinitionSchema.strict().safeParse({
      name: 'temp-dummy-name',
      message: 'temp message',
      ...yamlData
    })

    if (!parsedRule.success) {
      throw new Error(
        `Rule contains invalid frontmatter metadata: ${parsedRule.error}`
      )
    }

    const rule = parsedRule.data
    return omit(rule, 'name', 'message')
  } catch (err: any) {
    throw new Error(`Error parsing rule frontmatter: ${err.message}`, {
      cause: err
    })
  }
}
