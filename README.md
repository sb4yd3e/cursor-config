# Cursor Config Generator

A web application for generating comprehensive `.cursorrules` and `DEVELOPMENT_GUIDE.md` files for your software projects. Built with Next.js 14, TypeScript, and Tailwind CSS.

## 🌟 Features

- **⚡ Quick Start Presets**: 8 pre-configured templates for popular stacks:

  - Next.js Full-Stack with PostgreSQL & Redis
  - Bun + Hono API (Lightning-fast)
  - React SPA with Vite
  - Flutter Mobile App
  - FastAPI Backend
  - Data Science Project
  - Express.js API
  - NestJS Microservices

- **Domain-Specific Templates**: Choose from multiple project types:

  - General Purpose
  - Web (Frontend, Backend, Full-Stack)
  - Mobile (iOS, Android, React Native)
  - Data Science
  - DevOps

- **Comprehensive .cursorrules Generation**:

  - Code quality standards
  - Documentation guidelines
  - Testing requirements
  - Security best practices
  - Performance optimization
  - Domain-specific rules

- **Detailed Development Guide**:

  - Project overview and setup instructions
  - Architecture documentation
  - Coding standards
  - Git workflow
  - Testing strategy
  - API documentation
  - Deployment guide
  - Troubleshooting section

- **Pre-configured .env.example**:

  - Auto-generated environment variables
  - Database configuration (host, port, name)
  - Redis configuration (optional)
  - API configuration (version, authentication)
  - Server port settings
  - Ready-to-use examples

- **Interactive UI**:
  - Real-time preview with 3 tabs
  - Easy customization
  - Copy to clipboard
  - Download individual files
  - **Download all as ZIP** (one-click)
  - Responsive design
  - Modern gradient UI

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd cursor-config
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. Run the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### 📦 Build & Deploy (Static SPA)

This application is configured as a **100% static SPA** (no SSR) and can be deployed to any static hosting:

```bash
# Build for production
npm run build

# Test locally (serves the 'out' directory)
npm start
```

**Quick Deploy to Vercel (Recommended):**

```bash
npm install -g vercel
vercel --prod
```

**Other Deployment Options:**

- ✅ **Netlify**: Drag & drop `out/` folder or Git integration
- ✅ **GitHub Pages**: Use `gh-pages -d out`
- ✅ **Cloudflare Pages**: Connect repo, build command: `npm run build`
- ✅ **Firebase Hosting**: `firebase deploy` after `firebase init`
- ✅ **Self-hosted**: Serve `out/` folder with any static web server

**📖 See [DEPLOY.md](DEPLOY.md) for detailed deployment instructions for all platforms.**

## 📖 Usage

### Quick Start with Presets (Recommended)

1. **Click "⚡ Quick Start with Presets"**
2. **Choose a preset** that matches your project type
3. **All settings auto-filled!** Just add your project name
4. **Generate Files** instantly

### Manual Configuration

1. **Fill in Project Information**:

   - Enter your project name (required)
   - Add a description
   - Optionally add repository URL

2. **Select Domain**:

   - Choose the type of project you're building
   - Different domains provide specialized rules and guidelines

3. **Configure Technology Stack**:

   - Select programming languages
   - Choose frameworks and libraries
   - Add databases
   - Select tools and infrastructure

4. **Set Team Preferences**:

   - Specify team size
   - Choose development methodology (Agile, Scrum, etc.)

5. **Configure Code Preferences**:

   - Select code style preference
   - Enable TypeScript, linter, formatter
   - Set testing requirements
   - Configure CI/CD settings

6. **Set Project Configuration** (for Web/Backend projects):

   - Configure server port
   - Set database connection details
   - Enable Redis (optional)
   - Set API version
   - Configure authentication

7. **Generate Files**:
   - Click "Generate Files" button
   - Preview generated content in the right panel (3 tabs)
   - Copy to clipboard or download individual files

### Example: Web Full-Stack Project

```markdown
Project Name: My Awesome Web App
Domain: Web Full-Stack
Languages: TypeScript, JavaScript
Frameworks: Next.js, React
Databases: PostgreSQL
Tools: Docker, GitHub Actions
Team Size: 5
Methodology: Agile
Testing: Unit Tests (80% coverage), E2E Tests
CI/CD: GitHub Actions
```

This configuration generates:

- `.cursorrules` with general and web-specific guidelines
- `DEVELOPMENT_GUIDE.md` with complete setup, architecture, testing, and deployment instructions
- `.env.example` with pre-configured database, Redis, and API settings

## 🎯 Use Cases

### For New Projects

Generate comprehensive documentation and rules from the start to ensure consistency and best practices.

### For Existing Projects

Create or update your development documentation with industry-standard practices tailored to your stack.

### For Teams

Establish team conventions and onboard new developers with clear, detailed guidelines.

### For AI-Assisted Development

Provide Cursor AI with detailed project rules to generate more accurate and context-aware code.

## 🏗️ Project Structure

```
cursor-config/
├── app/
│   ├── api/generate/       # API route for file generation
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── GeneratorForm.tsx   # Main form component
│   ├── PreviewPanel.tsx    # Preview and download panel
│   └── DomainSelector.tsx  # Domain selection UI
├── lib/
│   ├── templates/
│   │   ├── cursorrules/    # Cursor rules templates
│   │   │   ├── general.ts
│   │   │   ├── web.ts
│   │   │   ├── mobile.ts
│   │   │   ├── data-science.ts
│   │   │   └── devops.ts
│   │   └── devguide/       # Dev guide templates
│   │       ├── overview.ts
│   │       ├── setup.ts
│   │       ├── architecture.ts
│   │       ├── coding-standards.ts
│   │       ├── git-workflow.ts
│   │       ├── testing.ts
│   │       ├── deployment.ts
│   │       └── troubleshooting.ts
│   └── generators/
│       ├── cursorrules-generator.ts
│       └── devguide-generator.ts
└── types/
    └── index.ts            # TypeScript type definitions
```

## 🛠️ Technologies Used

- **Next.js 14**: React framework with App Router
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **React Hook Form**: Form management
- **Zod**: Schema validation
- **JSZip**: File compression (for future multi-file downloads)

## 📝 Generated Files

### .cursorrules

The `.cursorrules` file provides AI-assisted coding guidelines including:

- Code quality and standards
- Documentation requirements
- Error handling patterns
- Testing guidelines
- Security best practices
- Performance optimization
- Domain-specific rules

### .env.example

Auto-generated environment configuration file with:

- Application settings (port, environment)
- Database configuration (host, port, database name)
- Redis configuration (if enabled)
- API settings (base URL, version, JWT secrets)
- External API keys placeholders
- Testing configuration
- Domain-specific variables

All values are pre-configured based on your project settings!

### DEVELOPMENT_GUIDE.md

The development guide includes:

- Project overview and goals
- Setup and installation instructions
- Architecture and design patterns
- Coding standards and conventions
- Git workflow and branching strategy
- Comprehensive testing strategy
- API documentation (when applicable)
- Deployment procedures
- Troubleshooting common issues

## 🎨 Customization

### Adding New Domains

1. Create a new template in `lib/templates/cursorrules/`
2. Add the domain to the `Domain` type in `types/index.ts`
3. Update the `domainOptions` in `components/DomainSelector.tsx`
4. Update the generator logic in `lib/generators/cursorrules-generator.ts`

### Modifying Templates

Templates are TypeScript functions that accept `ProjectFormData` and return formatted strings. Modify existing templates in `lib/templates/` to customize the output.

## 🚢 Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/cursor-config)

### Deploy to Other Platforms

```bash
# Build the application
npm run build

# Start production server
npm start
```

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 💡 Tips

- Use descriptive project names for better generated content
- Select all relevant technologies for comprehensive guidelines
- Adjust test coverage requirements based on project criticality
- Enable CI/CD options for automated deployment instructions
- Review and customize generated files to match your specific needs

## 🐛 Troubleshooting

### Common Issues

**Issue: Form validation errors**

- Ensure all required fields are filled (Project Name is mandatory)
- Check that URLs are properly formatted

**Issue: Generation takes too long**

- This is normal for comprehensive projects with many features
- The app generates detailed documentation which may take a few seconds

**Issue: Preview not updating**

- Click the "Generate Files" button after making changes
- Ensure JavaScript is enabled in your browser

## 📧 Support

For issues and questions:

- Create an issue in the repository
- Contact the maintainers

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI styled with [Tailwind CSS](https://tailwindcss.com/)
- Inspired by the need for consistent, detailed project documentation

---

**Made with ❤️ for better software development practices**
