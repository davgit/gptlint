# GPTLint

> A fundamentally new approach to code health and stability. Use LLMs to enforce best practices across your codebase that are impossible to capture with traditional static analysis tools like `eslint`.

## Features

- rules are specified in markdown ([example](./guidelines/prefer-array-at-negative-indexing.md))
- easy to add custom, project-specific rules ([example](./fixtures/guidelines/ts-example-0.md))
- cli and config formats are ~~copied from~~ inspired by `eslint`
- content-based caching
- outputs LLM stats per run (cost, tokens, etc)
- community-driven rules
- every rule is fully configurable, both at the project level (`gptlint.config.js`) and at the rule definition level (markdown)
  - don't agree with a rule? simply disable it in your config like you would with `eslint` or copy the rule's markdown into your project and change it to suit your project's needs
  - want to enforce a new best practice in your project? add a new markdown file for the rule, describe the rule's intent in natural language, add a few correct/incorrect examples, and you're good to go
  - all custom rules live in your repo as simple markdown files, they're understandable by non-devs, and they can be improved over time via standard git workflows
  - this is the way 💯
- built-in rules come with evals so you can be sure they work correctly at scale
  - (you can think of evals as regression test suites for possibly non-deterministic functions like the LLMs that power GPTLint)
  - this allows us to track the accuracy of GPTLint over time and improve the rules whenever we find false-positives / false-negatives
- ~~supports any programming language~~ (ts, py, C++, java, etc)
  - the MVP is focused on JS / TS only for now (python support coming soon)
- supports any natural language (english, chinese, spanish, etc)
- ~~supports multiple LLM providers~~ (openai, anthropic, [openrouter](https://openrouter.ai/))
  - the MVP is focused on OpenAI only for now (openai-compatible LLM provider support coming soon)
- ~~supports local LLMs~~ (via [ollama](https://github.com/ollama/ollama))
  - the MVP is focused on OpenAI only for now (local LLM support coming soon)
- designed to be used in addition to existing static analysis tools like `eslint`, `pylint`, `ruff`, etc
- no complicated github integration, bots, or CI actions – just call the `gptlint` CLI the same way you would call a tool like `eslint`

## Caveats

- this tool passes an LLM portions of your code and the rule definitions alongside few-shot examples, so depending on the LLM's settings and the quality of your rules, it's possible for the tool to produce **false positives** (errors which shouldn't have been reported) and **false negatives** (real errors that the tool missed)
  - **all built-in rules are extensively tested** with eval sets to ensure that the tool is as accurate as possible out-of-the-box
  - keep in mind that even expert human developers are very unlikely to reach perfect accuracy when reviewing large codebases (we all miss things, get tired, get distracted, etc), **so the goal of this project is not to achieve 100% accuracy, but rather to surpass human expert-level accuracy at a fraction of the cost and speed**
- **LLM costs can add up quickly**
  - for a codebase with `N` files and `M` rules, each run of this tool makes `NxM` LLM calls (except for any cached calls when files and rules haven't changed between runs)
  - depending on the LLM you're using and the size of your codebase `N`, this can quickly get expensive
  - for instance, using `gpt-3.5-turbo` running `gptlint` on this repo with caching disabled (`N=22` files, `M=8` rules) takes ~70s and costs ~$0.31 cents USD
  - for instance, using `gpt-4-turbo-preview` running `gptlint` on this repo with caching disabled (`N=22` files, `M=8` rules) takes ~64s and costs ~$2.38 USD
  - NOTE: this variable cost goes away when using a local LLM, where you're instead paying directly for GPU compute instead of paying per token

## How it works

TODO

## CLI

```bash
Usage:
  gptlint [flags...] [file/dir/glob ...]

Flags:
      --cache-dir <string>             Customize the path to the cache directory (default:
                                       "node_modules/.cache/eslint-plus-plus")
  -c, --config <string>                Path to a configuration file
  -d, --debug                          Enables debug logging
      --debug-config                   When enabled, logs the resolved config and parsed rules and then exits
  -D, --debug-model                    Enables verbose LLM logging
  -S, --debug-stats                    Enables logging of cumulative LLM stats at the end, including total tokens and cost
  -e, --early-exit                     Exits after finding the first error
  -g, --guidelines <string>            Glob pattern to guideline markdown files containing rule definitions (default:
                                       ["guidelines.md"])
  -h, --help                           Show help
      --ignore-file <string>           Path to file containing ignore patterns (default: ".eslint-plus-plus-ignore")
      --ignore-pattern <string>        Pattern of files to ignore
      --model <string>                 Which LLM to use for assessing rule conformance (default: "gpt-4-turbo-preview")
      --temperature <number>           LLM temperature parameter
  -C, --no-cache                       Disables caching
      --no-ignore                      Disables the use of ignore files and patterns
      --no-inline-config               Disables the use of inline rule config inside of source files
  -r, --rule <string>                  Glob pattern of rule definition markdown files.
```

## TODO

- rule file format
  - support both positive and negative examples in the same code block
  - add support to guidelines.md for organizing rules by h1 sections
    - alternatively, just use directories and rule.md file format
  - `prefer-page-queries.md` code examples give extra context outside of the code blocks
  - add support for including links to one or more URLs as resources explaining the rule in more depth
- config
  - use eslint, ruff, and conformance as inspiration
  - llm api base url
- linter engine
  - **evals**
  - cross-file linting; v0 is strictly local to individual files
  - add support for optionally applying automatic fixes to linter errors
  - add support for only linting changed git deltas
  - add support for different languages
  - add support for different LLM providers
    - test anthropic claude
    - test ollama w/ mistral, llama, etc
    - move from function calling to structured output for increased compat
  - add support for `fixable`
  - add support for [openai seed](https://platform.openai.com/docs/api-reference/chat/create#chat-create-seed) and `system_fingerprint` to help make the system more deterministic
  - handle context overflow properly depending on selected model
- update project name in multiple places once we decide on a name
- rules
  - add a rule which captures naming w/ types and consistency
  - if you refer to something as numIterations in one place, refer to it consistently
- try claude w/ structured output and nudging it with prefilled / prefix output JSON
- cli
  - improve progress bar; possibly switch to [cli-progress](https://github.com/npkgz/cli-progress)
- publish to NPM

## License

MIT © [Travis Fischer](https://transitivebullsh.it)
