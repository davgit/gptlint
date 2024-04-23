# Why?

|               | AST-based linting (`eslint`) | LLM-based linting (`gptlint`)                                                          | Human code review                  |
| ------------- | ---------------------------- | -------------------------------------------------------------------------------------- | ---------------------------------- |
| **Variance**  | deterministic                | mostly deterministic                                                                   | large variance                     |
| **Speed**     | instant                      | few minutes                                                                            | relatively very slow               |
| **Automated** | automated                    | automated                                                                              | manual                             |
| **Feedback**  | low-level                    | mid-level                                                                              | ideally high-level but often a mix |
| **Maturity**  | mature tooling & standards   | nascent                                                                                | depends on the team                |
| **Cost**      | free                         | [not free](./cost.md) but [cheap using local LLMs](./guide/llm-providers#local-models) | relatively very expensive          |
| **Impact**    | low-impact                   | high-impact                                                                            | high-impact                        |