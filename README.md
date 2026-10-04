# 🎬 YouTube Content Planner - Side Hustler Edition

A comprehensive web app to help you plan, organize, and track your YouTube channel focused on tech problems women (and everyone) face.

## 🚀 Features

### 📋 **Video Ideas Manager**
- Create and organize video ideas
- Categorize by type: Stories, Problems, Solutions, Advice, Interviews, Technical, Career
- Filter and search through your ideas
- Track video status: Draft → Planned → Recording → Editing → Published
- **AI-Powered Idea Generator** - Get instant video ideas based on your category

### 📅 **Content Calendar**
- Plan upload schedule weeks in advance
- Visual calendar view with scheduled videos
- Track videos per week/month
- See upcoming uploads at a glance
- Statistics on content pipeline

### ✅ **Pre-Upload Checklists**
- Create custom checklists for each video
- Quick-start templates (Standard, Short, Story, Interview)
- Track completion progress with visual progress bar
- Never forget important steps again

### 📊 **Performance Tracking**
- Monitor channel stats: Subscribers, Views, Watch Hours
- Track individual video performance
- See views, likes, comments per video
- Growth insights and trending videos
- Export/import metrics

### ⚙️ **Settings**
- Configure channel name and goals
- Set upload schedule preferences
- Define target metrics
- Bulk export/import data (JSON)

## 🎯 Perfect For

- Women in tech sharing career experiences
- Tech creators covering daily challenges
- Tutorial creators and educators
- Anyone building a coding/tech YouTube channel
- Content creators wanting to stay organized

## 📖 Getting Started

### 1. **Open the App**
Simply open `index.html` in your web browser. No installation needed!

```bash
# Option 1: Direct file
open index.html

# Option 2: If you have Python
python -m http.server 8000
# Then visit http://localhost:8000
```

### 2. **Create Your First Video Idea**
1. Go to the **💡 Ideas** tab
2. Click **+ Add Idea**
3. Fill in title, description, and category
4. Organize by type (Story, Problem, Solution, etc.)

### 3. **Use the Idea Generator**
1. Select a category in the **Idea Generator** section
2. Click **Generate Ideas**
3. Click "Use This" to adopt an idea into your planner

### 4. **Plan Your Schedule**
1. Go to the **📅 Calendar** tab
2. Click **📅 Schedule Video**
3. Select a video idea
4. Choose upload date and time
5. See it appear on your calendar

### 5. **Create Checklists**
1. Go to the **✅ Checklist** tab
2. Choose a template or create custom
3. Check off items as you complete them
4. Track progress with the visual bar

### 6. **Track Performance**
1. Go to the **📊 Tracking** tab
2. Update channel stats (subs, views, watch hours)
3. Add per-video metrics after publishing
4. Monitor growth trends

## 💡 Video Ideas for Your Niche

### Story/Experience (8-12 min)
- "Why I Almost Quit Tech | My Story"
- "The Day I Realized I Was Being Paid Less"
- "How I Overcame Imposter Syndrome"
- "Breaking Into Tech: The Real Truth"

### Daily Problems (5-8 min)
- "Why Women Leave Tech (5 Real Reasons)"
- "The Imposter Syndrome Nobody Talks About"
- "Salary Gaps in Tech: The Real Numbers"
- "Burnout: My Breaking Point"

### Solutions/Tips (3-5 min)
- "5 Ways to Handle Imposter Syndrome"
- "How to Negotiate Your Tech Salary"
- "Building Confidence: Quick Wins"
- "Time Management Hacks for Developers"

### Career Advice (6-10 min)
- "Advice I'd Give My Younger Self"
- "Finding Your First Tech Job"
- "Career Paths Beyond Coding"
- "Mentorship: Find It or Become It"

## 📊 Sample Upload Schedule

**Recommended for growth:**
- **Monday:** Deep dive story (8-12 min)
- **Wednesday:** Quick tip/nutshell (3-5 min)  
- **Friday:** Advice/solution (6-8 min)

This gives consistent content while avoiding viewer fatigue.

## 🎬 Pre-Upload Checklist Template

```
Script written
Audio recorded (clear, no background noise)
Edited (cuts, pacing, transitions)
Color graded/visuals polished
Sound mixed (audio levels balanced)
Thumbnail created (bright, clickable)
Title optimized (includes keywords)
Description written (links, timestamps, call-to-action)
Tags added (relevant keywords)
Scheduled (or ready to publish)
```

## 📈 Metrics to Track

**Channel Metrics:**
- Total Subscribers (Goal: 1,000 to monetize)
- Total Views
- Watch Hours (Goal: 4,000 to monetize)
- Average View Duration (% of video watched)

**Per-Video Metrics:**
- Views
- Likes
- Comments
- Watch Hours
- Click-Through Rate

## 💾 Data Storage

All your data is stored **locally in your browser** using localStorage. 

**To backup:**
1. Go to **⚙️ Settings**
2. Click **📥 Export Data (JSON)**
3. Save the file somewhere safe

**To restore:**
1. Go to **⚙️ Settings**
2. Click **📤 Import Data**
3. Select your backup JSON file

## 🎨 Customization

The app comes with default categories and templates. Feel free to modify:

**In app.js**, update the `generators` object to add your own video ideas:

```javascript
const generators = {
    story: [
        "Your custom story idea",
        "Another great idea"
    ],
    // Add more...
};
```

## 🚀 Tips for Success

1. **Upload Consistently** - Set a schedule and stick to it (3x per week recommended)
2. **Track Metrics** - Know what works, double down on top videos
3. **Engage** - Reply to comments, build community
4. **Optimize Titles** - Include keywords people search for
5. **Thumbnails Matter** - Invest time in eye-catching thumbnails
6. **Plan Ahead** - Create checklists for batch filming/editing

## 🤝 Monetization Reminder

YouTube Partner Program Requirements:
- ✅ 1,000 subscribers
- ✅ 4,000 watch hours (last 12 months)
- ✅ Follow community guidelines
- ✅ Reside in country where Partner Program is available

You can track progress toward these goals in the Tracking tab!

## 📝 Notes

- **Privacy**: All data stays on your computer (localStorage)
- **No Backend**: No server, no accounts needed
- **Offline**: Works completely offline
- **Mobile Friendly**: Responsive design works on phones/tablets

## 🎯 Next Steps

1. Start creating video ideas
2. Use the idea generator for inspiration
3. Plan out 4 weeks of content
4. Create checklists for efficiency
5. Schedule your uploads
6. Publish consistently and track metrics

## 💪 You've Got This!

Remember: Most successful YouTube channels take 6-12 months to reach monetization. Consistency and authenticity are key. Share your real stories, help others, and the audience will come.

Good luck on your YouTube journey! 🚀

---

**Need ideas?** The idea generator is your best friend. Use it when you're stuck!

**Questions?** Check your browser's console for any errors, or review the video ideas list for inspiration.

**Ready to grow?** Start uploading consistently, engage with your community, and watch your channel grow! 🎬
