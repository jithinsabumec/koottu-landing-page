# Security Policy and Incident Response

## 🚨 Critical Security Incident - October 16, 2025

### Incident Summary

On October 16, 2025, it was discovered that an **OpenSSH private key** was accidentally committed to this public repository and remained accessible in the Git commit history even after deletion attempts.

### Timeline

- **Oct 14-15, 2025**: Private SSH key (`yes`) and public key (`yes.pub`) were committed to the repository
- **Oct 16, 2025 (~9:10 AM IST)**: Keys were deleted from the working directory in commits 880f35e and a44ddac
- **Oct 16, 2025 (~9:27 AM IST)**: Security incident identified and documented
- **Oct 16, 2025 (~9:27 AM IST)**: Exposed SSH key removed from GitHub account
- **Oct 16, 2025 (~9:27 AM IST)**: Security issue #1 created with full remediation steps
- **Oct 16, 2025 (~9:27 AM IST)**: This SECURITY.md file added to document the incident

### Affected Components

- **Private Key File**: `yes` (ssh-ed25519 format, encrypted)
- **Public Key File**: `yes.pub` 
- **Key Fingerprint**: SHA256:JhIDmFaschsJ7Yhmw7kZ1aAZkuYDt0AYFE5MGEqpdT4
- **Associated Email**: jithinsabu.mec@gmail.com
- **Exposed Commits**: 
  - Private key: https://github.com/jithinsabumec/koottu-landing-page/commit/880f35e2e4737880a9b0a52d69af42c50f3a27ab
  - Public key: https://github.com/jithinsabumec/koottu-landing-page/commit/a44ddac2759d3ac6c808eb2f415a9d22fc579489

### Immediate Actions Taken

✅ **COMPLETED:**
1. Created comprehensive security issue (#1) documenting the incident
2. Removed the exposed SSH key from GitHub account (https://github.com/settings/keys)
3. Created this SECURITY.md file to document the incident and remediation steps

⏳ **PENDING (Requires Command-Line Access):**
1. **Rewrite Git history** to permanently remove the keys from all commits
2. **Force push** to overwrite the public repository history
3. **Verify key removal** from any servers, CI/CD systems, or cloud services where it may have been deployed
4. **Audit access logs** for any suspicious activity using the compromised key
5. **Generate and deploy new SSH key pair**

### Required Actions for Repository Owner

The following actions MUST be completed to fully secure this repository:

#### 1. Remove Keys from Git History (CRITICAL)

Simply deleting files doesn't remove them from Git history. Use one of these methods:

**Option A: BFG Repo-Cleaner (Recommended)**
```bash
# Download BFG from: https://rtyley.github.io/bfg-repo-cleaner/

# Clone repository as mirror
git clone --mirror https://github.com/jithinsabumec/koottu-landing-page.git

# Remove the sensitive files from ALL commits
java -jar bfg.jar --delete-files yes koottu-landing-page.git
java -jar bfg.jar --delete-files yes.pub koottu-landing-page.git

# Clean up and optimize
cd koottu-landing-page.git
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push to rewrite public history
git push --force
```

**Option B: git-filter-repo**
```bash
# Install: pip install git-filter-repo

git clone https://github.com/jithinsabumec/koottu-landing-page.git
cd koottu-landing-page

# Remove files from all history
git filter-repo --path yes --invert-paths
git filter-repo --path yes.pub --invert-paths

# Force push
git push origin --force --all
```

#### 2. Verify Key Removal from Servers

Check and remove the exposed key from:
- SSH authorized_keys files on all servers: `~/.ssh/authorized_keys`
- Deployment platforms (Vercel, Netlify, AWS, etc.)
- CI/CD systems (GitHub Actions secrets, CircleCI, Travis, etc.)
- Cloud service SSH keys (DigitalOcean, AWS EC2, GCP, etc.)
- Any other services that may have used this key

#### 3. Generate New SSH Key Pair

```bash
# Generate new key with passphrase
ssh-keygen -t ed25519 -C "jithinsabu.mec@gmail.com" -f ~/.ssh/koottu_secure

# Add passphrase when prompted for additional security

# Add to ssh-agent
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/koottu_secure

# Copy public key to clipboard
cat ~/.ssh/koottu_secure.pub

# Deploy to GitHub: https://github.com/settings/keys
# Deploy to other servers as needed
```

#### 4. Audit Access Logs

Check server logs for any unauthorized access:
```bash
# Check auth logs for SSH access
sudo grep -i "Accepted publickey" /var/log/auth.log
sudo grep -i "ssh" /var/log/secure

# Check last login times
last -a

# Review recent command history for suspicious activity
history
```

### Prevention Measures Implemented

1. **Updated .gitignore**: Added SSH key patterns to prevent future accidents
2. **Secret Scanning**: GitHub Secret Scanning is enabled for this repository
3. **Security Documentation**: This SECURITY.md file provides guidance
4. **Security Issue Template**: Issue #1 serves as a template for future incidents

### .gitignore Additions

The following has been added to `.gitignore` to prevent future credential leaks:

```
# SSH Keys and Credentials
*.pem
*.key
id_rsa*
id_ed25519*
id_ecdsa*
id_dsa*
*.pub
authorized_keys
known_hosts
.ssh/

# Environment files
.env
.env.local
.env.production
.env.*.local

# API Keys and Secrets
secrets/
*.secret
*.credentials
```

### Best Practices Going Forward

1. **Never commit credentials**: Use environment variables or secret management tools
2. **Use .gitignore**: Always add sensitive file patterns before committing
3. **Enable Secret Scanning**: Keep GitHub Secret Scanning enabled
4. **Use pre-commit hooks**: Install tools like `detect-secrets` or `git-secrets`
5. **SSH Key Security**:
   - Always use passphrases on SSH keys
   - Rotate keys regularly
   - Use separate keys for different services
   - Never share private keys
6. **Review commits**: Always review `git diff` before committing
7. **Use .env files**: Store secrets in environment files (and add them to .gitignore)

### Security Contact

For security concerns or to report vulnerabilities:
- **Create an issue**: [Security Issues](https://github.com/jithinsabumec/koottu-landing-page/issues?q=label%3Asecurity)
- **Email**: jithinsabu.mec@gmail.com

### References

- [GitHub: Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [BFG Repo-Cleaner](https://rtyley.github.io/bfg-repo-cleaner/)
- [git-filter-repo](https://github.com/newren/git-filter-repo)
- [GitHub Secret Scanning](https://docs.github.com/en/code-security/secret-scanning)
- [SSH Key Best Practices](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

---

**Last Updated**: October 16, 2025

**Status**: ⚠️ INCIDENT IN PROGRESS - Git history rewrite pending
