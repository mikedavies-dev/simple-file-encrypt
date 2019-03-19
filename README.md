# Simple File Encrypt
A simple tool to quickly encrypt and decrypt a file using `aes-256-ctr`

# Install
`npm install -g simple-file-encrypt`

# Encrypt a file

```
simple-file-encrypt \
    --command lock \
    --key abcd-abcd-abcd-abcd \
    --original ./production.json \
    --locked ./production.locked
```

# Decrypt a file

```
simple-file-encrypt \
    --command unlock \
    --key abcd-abcd-abcd-abcd \
    --original ./production.json \
    --locked ./production.locked
```
