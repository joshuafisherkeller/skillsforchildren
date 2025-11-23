# Skills for Children - Editing Guide
## Quick Reference for Adding Resources, Blogs, and Making Updates

*Last Updated: November 2025*

---

## 📋 Table of Contents

1. [Before You Start](#before-you-start)
2. [Adding a New Resource](#adding-a-new-resource)
3. [Adding a New Blog Post](#adding-a-new-blog-post)
4. [Editing Existing Content](#editing-existing-content)
5. [Adding a New Pillar Section](#adding-a-new-pillar-section)
6. [Troubleshooting](#troubleshooting)
7. [Quick Reference: Prompts to Use](#quick-reference-prompts)

---

## Before You Start

### What You'll Need:
- ✅ Resource URL
- ✅ Resource title and description
- ✅ Audience type (Children, Caregivers, Professionals, Teens)
- ✅ Format (Video, PDF, Website, Interactive, etc.)
- ✅ Source organization name

### File Structure Overview:
```
/data/
├── skills-resources.json          (K-5 Professional Development - 6 pillars)
├── trauma-resources.json          (Childhood Trauma Resources - 9 pillars)
└── blog-posts.json                (Blog articles)
```

### Current Section & Pillar IDs:

**Skills for Children (appears first on site):**
- `foundational-mindset` - Foundational Mindset & Emotional Wellness
- `communication` - Communication & Collaboration
- `critical-thinking` - Critical Thinking & Problem-Solving
- `financial-literacy` - Financial Literacy & Responsible Decision-Making
- `self-regulation` - Self-Regulation & Resilience Skills
- `physical-wellness` - Physical Wellness - Foundation for Growth

**Childhood Trauma Resources (appears second on site):**
- `tfcbt-core` - TF-CBT: Core Resources & Workbooks (PILLAR #1 - TOP)
- `understanding-trauma` - Understanding Trauma (Psychoeducation)
- `self-regulation-trauma` - Self-Regulation & Co-Regulation
- `identifying-feelings` - Identifying & Expressing Feelings
- `coping-skills` - Coping Skills & Strategies
- `safety-trusted` - Safety & Trusted People
- `managing-triggers` - Managing Triggers & Trauma Reminders
- `for-caregivers` - For Caregivers
- `healing-resilience` - Healing & Resilience

---

## Adding a New Resource

### Step 1: Identify Which Section & Pillar

**Ask yourself:**
- Is this for K-5 professional development? → `skills-resources.json`
- Is this trauma-related? → `trauma-resources.json`
- Which pillar does it fit under?

### Step 2: Gather Resource Information

**Required fields:**
- Title
- URL
- Description (1-2 sentences)
- Audience (Children, Caregivers, Professionals, Teens, or combinations)
- Format (Video, PDF, Website, Interactive, Curriculum, etc.)
- Source organization

**Optional fields:**
- Video embed info (if YouTube/Vimeo)
- Duration (if video)
- Special badges/features

### Step 3: Use This Prompt Template

Copy and paste this into a new conversation with Claude:

```
I need to add a new resource to skillsforchildren.com. Please read the project files to understand the structure.

RESOURCE DETAILS:
- Section: [Skills for Children OR Childhood Trauma Resources]
- Pillar: [pillar name or ID]
- Title: [resource title]
- URL: [full URL]
- Description: [1-2 sentence description]
- Audience: [Children/Caregivers/Professionals/Teens]
- Format: [Video/PDF/Website/etc.]
- Source: [organization name]
- Special notes: [any video embeds, featured status, etc.]

Please provide the exact JSON object I should add and tell me:
1. Which file to edit (skills-resources.json or trauma-resources.json)
2. The approximate line number where I should add it
3. Any special formatting notes
```

### Step 4: Add the Resource

1. Go to GitHub repo: `https://github.com/joshuafisherkeller/skillsforchildren`
2. Navigate to `/data/` folder
3. Click on the appropriate JSON file
4. Click the pencil icon (✏️) to edit
5. Find the pillar section
6. Paste the JSON object Claude provided
7. Make sure commas are correct
8. Scroll to bottom → "Commit changes"
9. Wait 2-3 minutes → check your live site

---

## Adding a New Blog Post

### Step 1: Plan Your Blog Post

**Before asking Claude, have:**
- ✅ Blog title
- ✅ Target keywords/search terms
- ✅ Main outline or key points
- ✅ Which resources you want to link to
- ✅ Category (Trauma Support, Professional Development, etc.)

### Step 2: Use This Prompt Template

#### For Blog Outline/First Draft:

```
I want to write a new blog post for skillsforchildren.com. Please read the SEO_GEO_STRATEGY.md file for context.

BLOG DETAILS:
- Title: [your title or topic]
- Target keywords: [e.g., "grounding techniques for kids", "ADHD vs trauma"]
- Target audience: [parents, therapists, educators, etc.]
- Main goal: [rank in search, drive to specific resource, etc.]

Please create:
1. A full outline following the SEO content structure template
2. Suggested word count
3. Which site resources I should link to
4. FAQ questions to include
5. Meta description for SEO
```

#### For Adding Completed Blog to Site:

```
I've written a blog post and need to add it to skillsforchildren.com. Please read the project files.

BLOG DETAILS:
- Title: [title]
- Slug: [URL-friendly version, e.g., "what-to-say-child-triggered"]
- Date: [YYYY-MM-DD]
- Category: [Trauma Support/Professional Development/etc.]
- Excerpt: [2-3 sentence summary]
- Target keywords: [list]
- Full content: [paste your content or upload as file]

Please provide:
1. The complete JSON object for blog-posts.json
2. The line number where I should add it
3. Any SEO improvements I should make
```

### Step 3: Add to Site

Same process as adding resources, but edit `blog-posts.json`

---

## Editing Existing Content

### Updating a Resource URL or Description

**Prompt template:**

```
I need to update an existing resource on skillsforchildren.com. Please read the project files.

RESOURCE TO UPDATE:
- Current title: [exact current title]
- Section: [Skills for Children OR Childhood Trauma Resources]
- Pillar: [pillar name]

WHAT TO CHANGE:
- New URL: [if changing]
- New description: [if changing]
- New title: [if changing]
- Other changes: [any other fields]

Please tell me:
1. Which JSON file to edit
2. The approximate line number
3. Show me the exact updated JSON object
```

### Reordering Resources

**Prompt template:**

```
I want to reorder resources in a pillar on skillsforchildren.com. Please read the project files.

DETAILS:
- Section: [Skills for Children OR Childhood Trauma Resources]
- Pillar: [pillar name]
- Current order: [describe current order]
- Desired order: [describe how you want it]

Please provide instructions on how to reorder in the JSON file.
```

### Changing Site Text/Descriptions

**Prompt template:**

```
I want to update text on skillsforchildren.com. Please read the project files.

WHAT TO CHANGE:
- Location: [hero section, section intro, footer, etc.]
- Current text: [paste current text]
- New text: [paste desired text]

Please tell me where in the code this needs to be updated.
```

---

## Adding a New Pillar Section

**Prompt template:**

```
I want to add a new pillar section to skillsforchildren.com. Please read the project files.

NEW PILLAR DETAILS:
- Parent section: [Skills for Children OR Childhood Trauma Resources]
- Pillar name: [name with emoji]
- Pillar ID: [suggested ID, e.g., "new-topic"]
- Icon: [emoji]
- Description: [brief description]
- Position: [where in the order - top, bottom, after X pillar]
- Initial resources: [list 2-3 initial resources]

Please provide:
1. The JSON structure for this new pillar
2. Where to add it in the file
3. Any ID or naming conventions I should follow
```

---

## Troubleshooting

### My Changes Aren't Showing Up

**Checklist:**
1. Did you commit the changes in GitHub? (click "Commit changes")
2. Wait 2-3 minutes for GitHub Pages to rebuild
3. Hard refresh your browser (Ctrl+F5 or Cmd+Shift+R)
4. Check GitHub Actions tab to see if deployment succeeded

**Prompt to use with Claude:**

```
I committed changes to [filename] but they're not showing on the live site. 

What I changed: [describe]
When I committed: [time]
What I'm seeing: [describe current site state]

Can you help me troubleshoot?
```

### I Think I Broke Something

**Don't panic! GitHub keeps history.**

**Prompt to use with Claude:**

```
I think I broke something in [filename]. 

What I was trying to do: [describe]
What I changed: [describe or paste]
Error/Problem: [describe what's wrong]

Can you help me:
1. Identify what went wrong
2. Provide the correct version to paste back
3. Or tell me how to revert to the previous version in GitHub
```

### Syntax Error in JSON

**Common issues:**
- Missing comma between resources
- Extra comma after last resource
- Mismatched quotes or brackets

**Prompt to use with Claude:**

```
I'm getting a JSON syntax error. Please read the current state of [filename] and help me fix it.

What I was doing: [describe]
Error message (if any): [paste]

Please show me the corrected version.
```

---

## Quick Reference: Prompts

### Copy-Paste These As Needed:

**🔹 Add Simple Resource:**
```
Add this resource to skillsforchildren.com:
- Section: [Skills/Trauma]
- Pillar: [name]
- Title: [title]
- URL: [URL]
- Description: [description]
- Audience: [audience]
- Format: [format]
- Source: [source]

Give me the JSON and line number.
```

**🔹 Add Featured Resource (Your Books/Journals):**
```
Add my book as a featured resource to skillsforchildren.com:
- Section: Childhood Trauma Resources
- Pillar: TF-CBT Core Resources
- Book: [A Journey of Brave Friends OR journal name]
- Special badge: Featured/Author Resource
- Amazon affiliate link: [link]

Give me the JSON with special featured formatting.
```

**🔹 Quick Edit:**
```
Update this resource on skillsforchildren.com:
- Current title: [exact title]
- Change: [what needs to change]

Show me the updated JSON object.
```

**🔹 Blog Outline:**
```
Create a blog outline for skillsforchildren.com:
- Topic: [topic]
- Target keywords: [keywords]
- SEO strategy: [reference SEO_GEO_STRATEGY.md]

Provide full outline with sections, FAQs, and SEO metadata.
```

**🔹 Help I'm Lost:**
```
I need help with skillsforchildren.com. Please read the project files.

I'm trying to: [describe goal]
I'm stuck on: [describe problem]

Please provide step-by-step guidance.
```

---

## File Locations Reference

### In GitHub Repo:

```
skillsforchildren/
├── index.html                          # Main site structure
├── data/
│   ├── skills-resources.json          # K-5 professional development
│   ├── trauma-resources.json          # Childhood trauma + TF-CBT
│   └── blog-posts.json                # Blog articles
├── EDITING_GUIDE.md                   # This file!
├── RESOURCE_SPREADSHEET_UPDATED.md    # Resource reference
├── SEO_GEO_STRATEGY__1_.md           # SEO strategy guide
├── SKILLSFORCHILDREN_PROJECT_GUIDE.md # Technical guide
└── CNAME                              # Domain config
```

---

## Tips for Success

### ✅ DO:
- Read through this guide before starting
- Have all resource info ready before asking Claude
- Use the specific prompt templates
- Test changes on the live site after committing
- Keep the SEO_GEO_STRATEGY.md file in mind for blog posts

### ❌ DON'T:
- Edit JSON files without having a backup plan
- Forget commas between resources (most common error)
- Rush - take time to verify URLs and descriptions
- Change pillar IDs without checking with Claude first

---

## Need More Help?

**Start a new conversation with Claude and say:**

```
I need help editing skillsforchildren.com. Please read the project files including EDITING_GUIDE.md, SKILLSFORCHILDREN_PROJECT_GUIDE.md, and SEO_GEO_STRATEGY__1_.md.

My question is: [your question]
```

---

## Version History

- **v1.0** (Nov 2025) - Initial guide created after JSON migration planning

---

*Remember: Claude is here to help! When in doubt, ask with specific details and reference this guide.*
