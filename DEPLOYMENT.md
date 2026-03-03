# Deploying to Vercel (Free)

Follow these steps to publish your website for free on Vercel.

## 1. Prepare your code
Your project is already configured for Vercel. I have added a `vercel.json` file to ensure that your website's routing works correctly once deployed.

## 2. Push to GitHub
Vercel works best when connected to a GitHub repository.
1. Create a new repository on [GitHub](https://github.com/new).
2. Initialize git in your local project (if not already):
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```
3. Link to your GitHub repo and push:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

## 3. Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign up with your GitHub account.
2. Click **"Add New"** > **"Project"**.
3. Import your repository from GitHub.
4. **Environment Variables**:
   - During the import process, look for the "Environment Variables" section.
   - Add `GEMINI_API_KEY` and paste your Gemini API key.
5. Click **"Deploy"**.

## 4. Your Site is Live!
Vercel will give you a URL like `your-project-name.vercel.app`. Every time you push new code to GitHub, Vercel will automatically update your live site.

---

### Why Vercel?
- **Fast**: Uses a global CDN for quick loading.
- **Automated**: Updates automatically when you push code.
- **Free**: The "Hobby" plan is completely free for personal projects.
