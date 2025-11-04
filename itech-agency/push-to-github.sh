#!/bin/bash

# iTech Digital Agency - GitHub Push Script
# This script pushes your cleaned repository to GitHub

echo "🚀 iTech Digital Agency - GitHub Push Script"
echo "============================================="

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI (gh) is not installed."
    echo "Please install it first:"
    echo "  Ubuntu/Debian: sudo apt install gh"
    echo "  macOS: brew install gh"
    echo "  Windows: winget install --id GitHub.cli"
    echo ""
    echo "Or use manual GitHub web interface method."
    exit 1
fi

# Check if user is logged in to GitHub
if ! gh auth status &> /dev/null; then
    echo "❌ Not logged in to GitHub CLI."
    echo "Please run: gh auth login"
    exit 1
fi

echo "✅ GitHub CLI is installed and you're logged in!"
echo ""

# Ask for repository name
read -p "Enter repository name (default: itech_new_agency): " REPO_NAME
REPO_NAME=${REPO_NAME:-itech_new_agency}

echo ""
echo "📝 Creating GitHub repository: $REPO_NAME"
echo "⏳ This may take a moment..."

# Create repository and push
gh repo create "$REPO_NAME" --public --source=. --remote=origin --push

if [ $? -eq 0 ]; then
    echo ""
    echo "🎉 Success! Repository created and code pushed to GitHub!"
    echo ""
    echo "📋 Next steps:"
    echo "   1. Visit: https://github.com/$(gh api user --jq .login)/$REPO_NAME"
    echo "   2. Deploy to Vercel:"
    echo "      - Go to vercel.com"
    echo "      - Click 'New Project'"
    echo "      - Import from GitHub"
    echo "      - Select: $REPO_NAME"
    echo "      - Add environment variables:"
    echo "        NEXT_PUBLIC_SUPABASE_URL=your_supabase_url"
    echo "        NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key"
    echo "   3. Click Deploy!"
    echo ""
    echo "🚀 Your app will be live at the provided Vercel URL!"
else
    echo ""
    echo "❌ Failed to create repository. Please try manual method:"
    echo ""
    echo "Manual steps:"
    echo "1. Go to https://github.com/new"
    echo "2. Repository name: $REPO_NAME"
    echo "3. Set to Public"
    echo "4. Don't initialize with README"
    echo "5. Click 'Create repository'"
    echo "6. Then run:"
    echo "   git remote add origin https://github.com/$(gh api user --jq .login)/$REPO_NAME.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
fi