import { execSync } from "node:child_process";

function getArg(flag: string): string | undefined {
  const arg = process.argv.find((a) => a.startsWith(`--${flag}=`));
  if (arg) {
    return arg.split("=").slice(1).join("=").trim();
  }
  const idx = process.argv.indexOf(`--${flag}`);
  if (idx !== -1 && process.argv[idx + 1] && !process.argv[idx + 1].startsWith("--")) {
    return process.argv[idx + 1].trim();
  }
  return undefined;
}

function maskToken(text: string, token: string): string {
  if (!token) return text;
  return text.split(token).join("[REDACTED_TOKEN]");
}

async function main() {
  const token = getArg("token") || process.env.GITHUB_TOKEN;
  let repo = getArg("repo") || process.env.GITHUB_REPO || process.env.GITHUB_REPOSITORY;
  const branch = getArg("branch") || process.env.GITHUB_BRANCH || "main";
  const isForce = process.argv.includes("--force") || process.argv.includes("-f");
  const commitMsg = getArg("message") || getArg("m") || "Update tortilladepatatas.org";

  console.log("==================================================");
  console.log("🚀 GitHub Push Utility — tortilladepatatas.org");
  console.log("==================================================");

  if (!token || !repo) {
    console.log("\n⚠️ Missing GitHub credentials or repository target.\n");
    console.log("To push directly to GitHub, provide your Repository and Personal Access Token (PAT):");
    console.log("");
    console.log("Usage option 1 (npm script with arguments):");
    console.log("  npm run git:push -- --repo=https://github.com/YOUR_USER/YOUR_REPO --token=ghp_xxxx\n");
    console.log("Usage option 2 (environment variables):");
    console.log("  GITHUB_TOKEN=ghp_xxxx GITHUB_REPO=YOUR_USER/YOUR_REPO npm run git:push\n");
    console.log("Usage option 3 (in chat):");
    console.log("  Send your GitHub repository URL and Personal Access Token in the chat, and I will execute the push directly.\n");
    console.log("--------------------------------------------------");
    console.log("💡 How to create a GitHub Personal Access Token:");
    console.log("1. Visit https://github.com/settings/tokens (Developer Settings > Personal Access Tokens > Tokens classic)");
    console.log("2. Click 'Generate new token (classic)'");
    console.log("3. Select the 'repo' scope (full control of private repositories)");
    console.log("4. Copy the generated token starting with ghp_");
    console.log("==================================================");
    return;
  }

  // Normalize repository URL
  let cleanRepo = repo.trim();
  if (cleanRepo.startsWith("git@github.com:")) {
    cleanRepo = cleanRepo.replace("git@github.com:", "");
  }
  if (cleanRepo.startsWith("https://github.com/")) {
    cleanRepo = cleanRepo.replace("https://github.com/", "");
  }
  if (cleanRepo.endsWith(".git")) {
    cleanRepo = cleanRepo.slice(0, -4);
  }

  const authenticatedUrl = `https://${encodeURIComponent(token)}@github.com/${cleanRepo}.git`;

  try {
    // 1. Check git status
    const status = execSync("git status --porcelain", { encoding: "utf-8" }).trim();
    if (status.length > 0) {
      console.log("📦 Staging untracked/modified changes...");
      execSync("git add .", { stdio: "inherit" });
      execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`, { stdio: "inherit" });
      console.log("✅ Created commit with latest changes.");
    } else {
      console.log("ℹ️ Working directory clean; using current commit.");
    }

    // 2. Set default branch if needed
    try {
      execSync(`git branch -M ${branch}`, { stdio: "pipe" });
    } catch {
      // Ignore if branch already set
    }

    // 3. Push to GitHub
    const forceFlag = isForce ? " --force" : "";
    console.log(`📤 Pushing branch '${branch}'${isForce ? " (force)" : ""} to https://github.com/${cleanRepo}...`);
    try {
      execSync(`git push -u "${authenticatedUrl}" ${branch}${forceFlag}`, {
        stdio: "pipe",
        encoding: "utf-8",
      });
      console.log("\n🎉 SUCCESS! Repository successfully pushed to GitHub:");
      console.log(`🔗 https://github.com/${cleanRepo}`);
    } catch (pushErr: any) {
      const maskedError = maskToken(pushErr.message || String(pushErr), token);
      const maskedStderr = maskToken(pushErr.stderr || "", token);
      console.error("\n❌ Push failed:");
      console.error(maskedStderr || maskedError);
      console.log("\nTip: If the remote branch has conflicting history, you can force push with:");
      console.log(`  npm run git:push -- --repo=${cleanRepo} --token=YOUR_TOKEN --force`);
      process.exit(1);
    }
  } catch (err: any) {
    const masked = maskToken(err.message || String(err), token);
    console.error("\n❌ Execution error:", masked);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
