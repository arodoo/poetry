When commit:  
Use exactly one `-m` with plain ASCII in double quotes, formatted as
`type: subject` (no scope).  
Never include any chaining, substitution, redirection, or line-break symbols
(e.g. `; | & $ < > ( ) \` LF CR \n \r backticks or any shell operator).

- Run git add and git commit as separate commands
- Check .husky\commit-msg for commit message must
