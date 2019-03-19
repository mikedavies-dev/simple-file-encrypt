# Simple File Encrypt
A simple tool to quickly encrypt and decrypt a file using `aes-256-ctr`. It can be useful for encrypting production config files to store in repos.

# Install
`npm install -g simple-file-encrypt`

# Set the key in the local env

```
export SIMPLEFILE_ENCRYPT_KEY=abcd
```

# Encrypt a file

```
simple-file-encrypt ./production.json
```

# Decrypt a file

```
simple-file-decrypt ./production.json
```
