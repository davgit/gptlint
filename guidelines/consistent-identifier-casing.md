# Be consistent with identifier casing

| Key       | Value                          |
| --------- | ------------------------------ |
| Name      | `consistent-identifier-casing` |
| Level     | error                          |
| Fixable   | false                          |
| Tags      | general                        |
| Languages | javascript, typescript         |

Identifiers of the same type should try to use consistent casing.

Variable names should use camelCase.
Global const variable names should either use camelCase or CONSTANT_CASE.
Type names should use PascalCase.
Class names should use PascalCase.
Function names should use camelCase.

Third-party APIs may use inconsistent casing, which is an exception to this rule.

Keys in JSON objects, JS objects, and TypeScript objects may use inconsistent casing, so they are exceptions to this rule.

Examples of camelCase identifiers include: foo, fooBar, h1RuleNodes, cwd, apiBaseUrl, apiBaseURL, validRuleTableKeysL, and \_getKey.

Ignore identifiers which mix PascalCase with camelCase.

Ignore the casing of common acronyms like API, IP, HTTP, and LLM.

Class variables and functions may include `_` prefixes.

### Bad

```ts
// These are bad because variable identifiers should use consistent casing.
const fooBar = true
const default_timeout = 5000

// These are bad because function identifiers should use consistent casing.
function helloWorld() {}
function hello_twitter() {}
```

### Good

```ts
const fooBar = true
const defaultTimeout = 5000

function helloWorld() {}
function helloTwitter() {}
```

```ts
import foo from 'foo'

// This is fine because `foo` is a third-party API which this rule should to ignore.
foo({ camelCase: true, snake_case: true, SNAKE_CASE: true })
```