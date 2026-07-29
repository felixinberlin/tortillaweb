# Security Policy & Headers Documentation

This project implements strict HTTP Security Headers to ensure maximum protection against cross-site scripting (XSS), clickjacking, MIME-type sniffing, and unauthorized browser API access.

---

## 🛡️ Configured Security Headers

### 1. `Content-Security-Policy` (CSP)
```http
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https:;
```
- Restricts resources (scripts, styles, fonts, images) to trusted origins.
- Permits Google Fonts (`fonts.googleapis.com` & `fonts.gstatic.com`).
- Permits local assets and inline scripts required for Astro hydration.

### 2. `X-Frame-Options`
```http
X-Frame-Options: SAMEORIGIN
```
- Prevents the application from being embedded in malicious iframes on third-party sites (mitigates clickjacking).

### 3. `X-Content-Type-Options`
```http
X-Content-Type-Options: nosniff
```
- Stops browsers from trying to MIME-sniff response types, preventing execution of non-executable scripts.

### 4. `Referrer-Policy`
```http
Referrer-Policy: strict-origin-when-cross-origin
```
- Protects user privacy by sending full referrers on same-origin requests and stripping path information on cross-origin HTTPS requests.

### 5. `Permissions-Policy`
```http
Permissions-Policy: geolocation=(), microphone=(), camera=()
```
- Explicitly disables sensitive browser capabilities (geolocation, camera, microphone) across all contexts.

### 6. `Strict-Transport-Security` (HSTS)
```http
Strict-Transport-Security: max-age=31536000; includeSubDomains
```
- Enforces HTTPS connections for 1 year (31,536,000 seconds) including all subdomains.

---

## 📁 Hosting Environment Configurations

Security headers have been configured across all deployment platforms:

- **Vercel**: Configured in `vercel.json`
- **Netlify**: Configured in `netlify.toml`
- **Cloudflare Pages / Static Hosting**: Configured in `public/_headers`
- **Apache Web Server**: Configured in `public/.htaccess`

---

## 📋 Security Verification Checklist

- [x] **Vercel**: `vercel.json` deployed and verified.
- [x] **Netlify**: `netlify.toml` deployed and verified.
- [x] **Apache / Shared Hosting**: `public/.htaccess` updated with `mod_headers`.
- [x] **Cloudflare Pages**: `public/_headers` generated.
- [x] **DevTools**: No CSP violations or console warnings on load.
- [x] **Security Grade**: Target Grade A / A+ on [securityheaders.com](https://securityheaders.com).
