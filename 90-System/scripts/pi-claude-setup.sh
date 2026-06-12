#!/bin/bash
# Raspberry Pi Claude Code setup — keeps /scout + auto-ingest alive 24/7
# Run once on a Pi (Raspberry Pi OS or Ubuntu ARM)

set -e

echo "=== Claude Code Pi Setup ==="

# 1. Install Node.js 24+ (via NodeSource)
if ! command -v node &>/dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_24.x | sudo -E bash -
    sudo apt-get install -y nodejs
fi
echo "Node: $(node --version)"

# 2. Install Claude Code CLI
if ! command -v claude &>/dev/null; then
    npm install -g @anthropic-ai/claude-code
fi
echo "Claude: $(claude --version)"

# 3. Install git if missing
sudo apt-get install -y git tmux

# 4. Clone the vault (use HTTPS if no SSH key on Pi yet)
VAULT_DIR="$HOME/my_brain-vault"
if [ ! -d "$VAULT_DIR" ]; then
    git clone git@github.com:hudlinservices/my_brain-vault.git "$VAULT_DIR"
fi

# 5. API key — you need to set this before first run
# Option A: Copy your ~/.claude.json from your main machine
#   scp ~/.claude.json pi@<ip>:~/.claude.json
#
# Option B: Set the key directly
#   export ANTHROPIC_API_KEY="sk-..."

echo ""
echo "=== Setup complete ==="
echo ""
echo "Next steps:"
echo "1. Copy your auth:  scp ~/.claude.json pi@<ip>:~/.claude.json"
echo "2. Copy SSH keys:   scp ~/.ssh/id_ed25519_github* pi@<ip>:~/.ssh/"
echo "3. SSH into Pi and start Claude:"
echo "     ssh pi@<ip>"
echo "     cd ~/my_brain-vault"
echo "     tmux new -s claude"
echo "     claude"
echo ""
echo "4. Detach tmux: Ctrl+B, then D"
echo "5. Reattach later: tmux attach -t claude"
echo ""
echo "The Pi will now process weekly scout + auto-ingest on schedule."
echo "Keep it plugged in, connected to network. Done."
