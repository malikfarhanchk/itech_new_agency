# iTech Digital Agency - GitHub & Vercel Deployment Guide

## Complete Step-by-Step Instructions

### Part 1: Creating GitHub Repository

#### Option 1: Using GitHub CLI (Recommended)
1. **Install GitHub CLI** (if not already installed):
   ```bash
   # On Ubuntu/Debian
   curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
   echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
   sudo apt update
   sudo apt install gh
   
   # On macOS
   brew install gh
   
   # On Windows
   winget install --id GitHub.cli
   ```

2. **Authenticate with GitHub**:
   ```bash
   gh auth login
   ```
   - Choose "GitHub.com"
   - Choose "Login with a web browser" (easier)
   - Complete the OAuth flow

3. **Create repository from command line**:
   ```bash
   cd /workspace/itech-agency
   gh repo create itech_new_agency --public --source=. --remote=origin --push
   ```

#### Option 2: Manual GitHub Web Interface
1. **Go to GitHub.com and login**
2. **Click the "+" icon in the top right corner**
3. **Select "New repository"**
4. **Fill in the repository details**:
   - Repository name: `itech_new_agency`
   - Description: `iTech Digital Agency - Complete Digital Agency Management Platform`
   - Set to Public
   - **IMPORTANT**: Do NOT initialize with README, .gitignore, or license (we have existing code)
5. **Click "Create repository"**
6. **Copy the repository URL** (you'll need it for pushing code)

#### Option 3: Manual Git Commands (Fallback)
If CLI and web interface have issues, you can do everything manually:

1. **Create repository on GitHub.com manually** (follow Option 2 steps 1-6)
2. **Configure git and push**:
   ```bash
   cd /workspace/itech-agency
   
   # Set your GitHub username and email
   git config user.name "your-github-username"
   git config user.email "your-email@example.com"
   
   # Add the GitHub repository as remote
   git remote add origin https://github.com/your-username/itech_new_agency.git
   
   # Push your code
   git branch -M main
   git push -u origin main
   ```

### Part 2: Preparing Code for GitHub

Before pushing, let's ensure your repository is clean and ready:

1. **Clean up any temporary files**:
   ```bash
   cd /workspace/itech-agency
   
   # Remove sensitive files that shouldn't be in git
   rm -f .env.local
   
   # Check what's in .gitignore
   cat .gitignore
   
   # Add .env.local to .gitignore if not already there
   echo ".env.local" >> .gitignore
   ```

2. **Prepare environment file**:
   ```bash
   # Copy example env file for reference
   cp .env.example .env.example.github
   
   # Update .env.example with placeholder values if needed
   # Remove any sensitive data
   ```

3. **Commit and push your code**:
   ```bash
   # Check git status
   git status
   
   # Add all files
   git add .
   
   # Commit with descriptive message
   git commit -m "Initial commit: iTech Digital Agency - Complete Next.js Platform
   
   Features:
   - Modern Next.js 16 app with TypeScript
   - Complete UI component library
   - Supabase integration ready
   - Responsive design with Tailwind CSS
   - Authentication system
   - Dashboard and analytics
   - Professional digital agency template"
   
   # Push to GitHub
   git push -u origin main
   ```

### Part 3: Deploying to Vercel

#### Method 1: Vercel CLI (Recommended)
1. **Install Vercel CLI**:
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**:
   ```bash
   vercel login
   ```

3. **Deploy from GitHub repository**:
   ```bash
   cd /workspace/itech-agency
   
   # Link to GitHub repo
   vercel link
   
   # Select your GitHub repository when prompted
   # Choose your team/organization
   # Set project name as 'itech-new-agency'
   
   # Deploy
   vercel --prod
   ```

#### Method 2: Vercel Web Dashboard
1. **Go to vercel.com and sign up/login**
2. **Click "New Project"**
3. **Import from GitHub**:
   - Select your `itech_new_agency` repository
   - Click "Import"
4. **Configure project settings**:
   - Framework Preset: `Next.js`
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`
5. **Environment Variables**:
   - Add your Supabase credentials:
     ```
     NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
     ```
6. **Click "Deploy"**

#### Method 3: Direct GitHub Connection
1. **In Vercel dashboard, click "New Project"**
2. **Click "Import Git Repository"**
3. **Choose "GitHub"**
4. **Authorize Vercel to access your GitHub**
5. **Select your `itech_new_agency` repository**
6. **Follow the same configuration steps as Method 2**

### Part 4: Post-Deployment Steps

1. **Update Environment Variables in Vercel**:
   - Go to your Vercel project dashboard
   - Navigate to Settings > Environment Variables
   - Add your production Supabase credentials
   - Redeploy if necessary

2. **Update GitHub README**:
   ```markdown
   # iTech Digital Agency
   
   A complete digital agency management platform built with Next.js 16 and Supabase.
   
   ## Features
   - Modern UI with Next.js 16 and TypeScript
   - Supabase backend integration
   - Authentication system
   - Dashboard and analytics
   - Responsive design
   - Professional digital agency template
   
   ## Live Demo
   [Your Vercel URL will appear here after deployment]
   
   ## Local Development
   \`\`\`bash
   npm install
   npm run dev
   \`\`\`
   
   ## Tech Stack
   - Next.js 16
   - TypeScript
   - Tailwind CSS
   - Supabase
   - React 18
   ```

3. **Test your deployment**:
   - Visit your Vercel URL
   - Test all features
   - Check mobile responsiveness

### Part 5: Troubleshooting Common Issues

1. **Build Failures**:
   - Check that all dependencies are in package.json
   - Verify Node.js version compatibility (Vercel uses Node 18+)
   - Check build logs in Vercel dashboard

2. **Environment Variables**:
   - Ensure all required env vars are set in Vercel
   - Use `NEXT_PUBLIC_` prefix for client-side variables
   - Remember to redeploy after adding env vars

3. **GitHub Issues**:
   - If push fails, check your token permissions
   - Ensure your token has repo scope
   - Try cloning fresh and pushing again

### Expected Timeline
- GitHub repository creation: 2-5 minutes
- Code push: 1-3 minutes
- Vercel deployment: 3-7 minutes
- Total: 10-15 minutes

### URLs After Completion
- GitHub repository: `https://github.com/your-username/itech_new_agency`
- Vercel deployment: `https://itech-new-agency.vercel.app` (or similar)

---

## Quick Command Summary

```bash
# 1. Create GitHub repo
gh repo create itech_new_agency --public --source=. --remote=origin --push

# 2. Or manually push
git remote add origin https://github.com/your-username/itech_new_agency.git
git push -u origin main

# 3. Deploy to Vercel
vercel --prod

# Your app will be live at the provided Vercel URL!
```