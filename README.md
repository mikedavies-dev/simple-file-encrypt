# Simple File Encrypt
A simple tool to quickly encrypt and decrypt a file using `aes-256-ctr`. This can be useful for encrypting production config files to store in git.

# Install
`npm install -g simple-file-encrypt`

# Key setup (Local env)

```
export SIMPLEFILE_ENCRYPT_KEY=abcd
```

# Key setup (Config file)
```
echo 'acbd' > ~/.simple-file-encrypt-key
```

# Development setup / process
1. Add config to `.gitignore`
2. Update config
3. Encrypt config - `simple-file-encrypt production.json`
4. Add the encrypted file to git - `git add production.json.locked`

Step 3 above creates a `./production.json.locked` that can be safely added to git.

# Production setup / process
1. Pull latest changes from git
2. Decrypt config (`simple-file-decrypt production.json`).

Step 2 re-creates the original `production.json`