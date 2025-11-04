#!/bin/bash
set -e

echo "=== Installing Node.js 20.x ==="

# Download Node.js 20.11.0 binary
cd /tmp
if [ ! -f node20.tar.xz ]; then
    echo "Downloading Node.js 20.11.0..."
    wget -q https://nodejs.org/dist/v20.11.0/node-v20.11.0-linux-x64.tar.xz -O node20.tar.xz
    echo "Downloaded"
fi

# Extract
echo "Extracting..."
tar -xJf node20.tar.xz

# Move to home directory
echo "Installing to ~/.local/node20..."
rm -rf ~/.local/node20
mkdir -p ~/.local
mv node-v20.11.0-linux-x64 ~/.local/node20

# Update PATH in bashrc
echo "Updating PATH..."
if ! grep -q ".local/node20/bin" ~/.bashrc; then
    echo 'export PATH="$HOME/.local/node20/bin:$PATH"' >> ~/.bashrc
fi

# Verify
echo "Verifying installation..."
~/.local/node20/bin/node --version
~/.local/node20/bin/npm --version

echo "=== Node.js 20.x installed successfully ==="
echo "Please run: source ~/.bashrc"
echo "Or use directly: ~/.local/node20/bin/node"
