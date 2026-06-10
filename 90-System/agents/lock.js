/**
 * Lock management for concurrent agent safety.
 * Prevents the same agent run from being executed twice.
 * Different agent runs use different lock files — concurrent runs are fine.
 */

const fs = require('fs');
const path = require('path');

const VAULT_ROOT = path.resolve(__dirname, '..', '..');
const LOCK_DIR = path.join(VAULT_ROOT, '.locks');

/**
 * Generate a lock file name from a run log path.
 * Each run log gets its own lock — different runs don't conflict.
 */
function lockName(runLogPath) {
  const base = path.basename(runLogPath, '.md');
  return `agent-${base}.lock`;
}

/**
 * Acquire a lock for an agent run.
 * Returns { success: true } or throws if lock exists.
 */
function acquireLock(runLogPath) {
  if (!fs.existsSync(LOCK_DIR)) {
    fs.mkdirSync(LOCK_DIR, { recursive: true });
  }

  const lockFile = path.join(LOCK_DIR, lockName(runLogPath));

  if (fs.existsSync(lockFile)) {
    // Check if the lock is stale (older than 24 hours)
    const stat = fs.statSync(lockFile);
    const ageHours = (Date.now() - stat.mtimeMs) / (1000 * 60 * 60);

    if (ageHours > 24) {
      // Stale lock — clean it up and proceed
      fs.unlinkSync(lockFile);
      console.log(`Cleaned up stale lock: ${lockFile} (${ageHours.toFixed(1)} hours old)`);
    } else {
      throw new Error(
        `Lock exists for this agent run: ${lockFile}\n` +
        `Lock age: ${ageHours.toFixed(1)} hours.\n` +
        `If this is stale, remove it manually: rm "${lockFile}"`
      );
    }
  }

  fs.writeFileSync(lockFile, JSON.stringify({
    runLogPath,
    pid: process.pid,
    startedAt: new Date().toISOString()
  }), 'utf-8');

  return { success: true, lockFile };
}

/**
 * Release a lock for an agent run.
 */
function releaseLock(runLogPath) {
  const lockFile = path.join(LOCK_DIR, lockName(runLogPath));
  if (fs.existsSync(lockFile)) {
    fs.unlinkSync(lockFile);
    return { success: true };
  }
  return { success: false, message: 'No lock file found' };
}

/**
 * Check if a lock exists without acquiring it.
 */
function isLocked(runLogPath) {
  const lockFile = path.join(LOCK_DIR, lockName(runLogPath));
  if (!fs.existsSync(lockFile)) return false;

  // Check staleness
  const stat = fs.statSync(lockFile);
  const ageHours = (Date.now() - stat.mtimeMs) / (1000 * 60 * 60);
  if (ageHours > 24) return false; // stale

  return true;
}

/**
 * Clean up all stale locks (older than 24 hours).
 */
function cleanStaleLocks() {
  if (!fs.existsSync(LOCK_DIR)) return { cleaned: 0 };

  let cleaned = 0;
  for (const file of fs.readdirSync(LOCK_DIR)) {
    if (!file.endsWith('.lock')) continue;
    const fullPath = path.join(LOCK_DIR, file);
    const stat = fs.statSync(fullPath);
    const ageHours = (Date.now() - stat.mtimeMs) / (1000 * 60 * 60);
    if (ageHours > 24) {
      fs.unlinkSync(fullPath);
      cleaned++;
    }
  }
  return { cleaned };
}

module.exports = { acquireLock, releaseLock, isLocked, cleanStaleLocks };
