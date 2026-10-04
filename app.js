// Content Planner App
class ContentPlanner {
    constructor() {
        this.ideas = [];
        this.schedule = [];
        this.checklists = [];
        this.metrics = {};
        this.settings = {
            channelName: 'My Channel',
            uploadSchedule: [],
            targetSubs: 1000,
            targetViews: 4000,
            targetWatchHours: 4000,
            defaultDuration: 'medium'
        };
        this.currentMonth = new Date();
        this.init();
    }

    init() {
        this.loadData();
        this.setupEventListeners();
        this.setupTabNavigation();
        this.renderAllContent();
    }

    // Data Management
    loadData() {
        const saved = localStorage.getItem('contentPlanner');
        if (saved) {
            const data = JSON.parse(saved);
            this.ideas = data.ideas || [];
            this.schedule = data.schedule || [];
            this.checklists = data.checklists || [];
            this.metrics = data.metrics || {};
            this.settings = { ...this.settings, ...data.settings };
        }
    }

    saveData() {
        const data = {
            ideas: this.ideas,
            schedule: this.schedule,
            checklists: this.checklists,
            metrics: this.metrics,
            settings: this.settings
        };
        localStorage.setItem('contentPlanner', JSON.stringify(data));
    }

    // Tab Navigation
    setupTabNavigation() {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));

                e.target.classList.add('active');
                const tabId = e.target.getAttribute('data-tab');
                document.getElementById(tabId).classList.add('active');
            });
        });
    }

    // Event Listeners
    setupEventListeners() {
        // Ideas Tab
        document.getElementById('addIdeaBtn').addEventListener('click', () => this.openIdeaForm());
        document.getElementById('generateBtn').addEventListener('click', () => this.generateIdeas());

        // Idea Form
        const ideaForm = document.getElementById('ideaForm');
        ideaForm.querySelector('.close').addEventListener('click', () => this.closeIdeaForm());
        document.getElementById('ideaFormElement').addEventListener('submit', (e) => this.addIdea(e));

        // Ideas Filter
        document.getElementById('searchIdeas').addEventListener('input', () => this.filterIdeas());
        document.getElementById('filterCategory').addEventListener('change', () => this.filterIdeas());
        document.getElementById('filterStatus').addEventListener('change', () => this.filterIdeas());

        // Calendar Tab
        document.getElementById('scheduleVideoBtn').addEventListener('click', () => this.openScheduleForm());
        const scheduleForm = document.getElementById('scheduleForm');
        scheduleForm.querySelector('.close').addEventListener('click', () => this.closeScheduleForm());
        document.getElementById('scheduleFormElement').addEventListener('submit', (e) => this.scheduleVideo(e));
        document.getElementById('prevMonth').addEventListener('click', () => this.previousMonth());
        document.getElementById('nextMonth').addEventListener('click', () => this.nextMonth());

        // Checklist Tab
        document.getElementById('newChecklistBtn').addEventListener('click', () => this.openChecklistForm());
        const checklistForm = document.getElementById('checklistForm');
        checklistForm.querySelector('.close').addEventListener('click', () => this.closeChecklistForm());
        document.getElementById('checklistFormElement').addEventListener('submit', (e) => this.createChecklist(e));

        // Checklist Templates
        document.querySelectorAll('.btn-template').forEach(btn => {
            btn.addEventListener('click', (e) => this.useTemplate(e.target.getAttribute('data-template')));
        });

        // Tracking Tab
        document.getElementById('addMetricBtn').addEventListener('click', () => this.addMetricInputs());
        document.getElementById('saveMetricBtn').addEventListener('click', () => this.saveVideoMetric());
        document.getElementById('subsInput').addEventListener('change', (e) => this.updateStat('subs', e.target.value));
        document.getElementById('viewsInput').addEventListener('change', (e) => this.updateStat('views', e.target.value));
        document.getElementById('watchHoursInput').addEventListener('change', (e) => this.updateStat('watchHours', e.target.value));
        document.getElementById('durationInput').addEventListener('change', (e) => this.updateStat('avgDuration', e.target.value));

        // Settings Tab
        document.getElementById('saveSettingsBtn').addEventListener('click', () => this.saveSettings());
        document.getElementById('exportBtn').addEventListener('click', () => this.exportData());
        document.getElementById('importBtn').addEventListener('click', () => document.getElementById('importFile').click());
        document.getElementById('importFile').addEventListener('change', (e) => this.importData(e));
        document.getElementById('clearAllBtn').addEventListener('click', () => this.clearAllData());
    }

    // IDEAS SECTION
    openIdeaForm() {
        document.getElementById('ideaForm').classList.remove('hidden');
    }

    closeIdeaForm() {
        document.getElementById('ideaForm').classList.add('hidden');
        document.getElementById('ideaFormElement').reset();
    }

    addIdea(e) {
        e.preventDefault();
        const idea = {
            id: Date.now(),
            title: document.getElementById('ideaTitle').value,
            description: document.getElementById('ideaDescription').value,
            category: document.getElementById('ideaCategory').value,
            duration: document.getElementById('ideaDuration').value,
            tags: document.getElementById('ideaTags').value.split(',').map(t => t.trim()),
            status: 'draft',
            createdAt: new Date().toISOString()
        };
        this.ideas.push(idea);
        this.saveData();
        this.closeIdeaForm();
        this.renderIdeas();
    }

    generateIdeas() {
        const category = document.getElementById('categorySelect').value;
        if (!category) return;

        const generators = {
            story: [
                "My Journey into Tech: Challenges and Victories",
                "The Day Everything Changed: A Career Pivot Story",
                "Breaking Barriers: What Nobody Tells You About Tech",
                "From Zero to First Job: The Real Story"
            ],
            problem: [
                "Why Women Leave Tech: 5 Real Problems",
                "The Imposter Syndrome Nobody Talks About",
                "Salary Gaps Explained: Why It's Still Happening",
                "Work-Life Balance: The Big Lie in Tech",
                "Burnout in Tech: My Breaking Point"
            ],
            solution: [
                "5 Ways to Deal with Imposter Syndrome",
                "How to Negotiate Your Tech Salary",
                "Building Confidence: Quick Wins",
                "Finding Your Community Online",
                "Time Management Hacks for Developers"
            ],
            advice: [
                "Advice I'd Give My Younger Self",
                "Mentorship: Find It or Become It",
                "Building Your Personal Brand",
                "Networking Without the Awkwardness",
                "Career Growth Strategies That Work"
            ],
            interview: [
                "Interview with a Female CTO",
                "Chat with an Indie Developer",
                "Behind the Scenes: A Startup Founder",
                "Working Mom in Tech: Balance or Myth?"
            ],
            technical: [
                "Python Debugging Tips Nobody Knows",
                "JavaScript Concepts You're Getting Wrong",
                "Common CSS Mistakes and Fixes",
                "Git Workflows Simplified",
                "Performance Optimization 101"
            ],
            career: [
                "Career Paths in Tech (It's Not Just Coding)",
                "Switching Careers to Tech: Is It Possible?",
                "The 5-Year Plan: Tech Edition",
                "How to Get Your First Tech Job",
                "Remote Work: Pros and Cons"
            ]
        };

        const ideas = generators[category] || [];
        const container = document.getElementById('generatedIdeas');
        container.innerHTML = '';

        ideas.forEach(idea => {
            const card = document.createElement('div');
            card.className = 'idea-card';
            card.innerHTML = `
                <p>${idea}</p>
                <button class="btn btn-sm btn-primary" style="margin-top: 10px; width: 100%;" onclick="planner.useGeneratedIdea('${idea.replace(/'/g, "\\'")}', '${category}')">Use This</button>
            `;
            container.appendChild(card);
        });
    }

    useGeneratedIdea(title, category) {
        document.getElementById('ideaTitle').value = title;
        document.getElementById('ideaCategory').value = category;
        this.openIdeaForm();
    }

    filterIdeas() {
        const search = document.getElementById('searchIdeas').value.toLowerCase();
        const category = document.getElementById('filterCategory').value;
        const status = document.getElementById('filterStatus').value;

        const filtered = this.ideas.filter(idea => {
            const matchSearch = idea.title.toLowerCase().includes(search) ||
                              idea.description.toLowerCase().includes(search);
            const matchCategory = !category || idea.category === category;
            const matchStatus = !status || idea.status === status;
            return matchSearch && matchCategory && matchStatus;
        });

        this.renderIdeasList(filtered);
    }

    renderIdeas() {
        this.renderIdeasList(this.ideas);
    }

    renderIdeasList(ideas) {
        const container = document.getElementById('ideasList');
        if (ideas.length === 0) {
            container.innerHTML = '<div class="empty-state">No ideas yet. Create one to get started! 💡</div>';
            return;
        }

        container.innerHTML = ideas.map(idea => `
            <div class="idea-item">
                <div class="idea-info">
                    <h4>${idea.title}</h4>
                    <p>${idea.description.substring(0, 100)}...</p>
                    <div class="idea-meta">
                        <span>${idea.category}</span>
                        <span>${idea.duration}</span>
                        <span class="idea-badge">${idea.status}</span>
                    </div>
                </div>
                <div class="idea-actions">
                    <button class="btn btn-secondary btn-sm" onclick="planner.updateIdeaStatus(${idea.id})">Update</button>
                    <select class="btn btn-sm" onchange="planner.setIdeaStatus(${idea.id}, this.value)">
                        <option value="">Status</option>
                        <option value="draft">Draft</option>
                        <option value="planned">Planned</option>
                        <option value="recording">Recording</option>
                        <option value="editing">Editing</option>
                        <option value="published">Published</option>
                    </select>
                    <button class="btn btn-danger btn-sm" onclick="planner.deleteIdea(${idea.id})">Delete</button>
                </div>
            </div>
        `).join('');
    }

    setIdeaStatus(id, status) {
        const idea = this.ideas.find(i => i.id === id);
        if (idea) {
            idea.status = status;
            this.saveData();
            this.renderIdeas();
        }
    }

    deleteIdea(id) {
        this.ideas = this.ideas.filter(i => i.id !== id);
        this.saveData();
        this.renderIdeas();
    }

    // CALENDAR SECTION
    openScheduleForm() {
        const select = document.getElementById('scheduleVideoId');
        select.innerHTML = '<option value="">Select a video idea...</option>';
        this.ideas.forEach(idea => {
            const option = document.createElement('option');
            option.value = idea.id;
            option.textContent = idea.title;
            select.appendChild(option);
        });
        document.getElementById('scheduleForm').classList.remove('hidden');
    }

    closeScheduleForm() {
        document.getElementById('scheduleForm').classList.add('hidden');
        document.getElementById('scheduleFormElement').reset();
    }

    scheduleVideo(e) {
        e.preventDefault();
        const ideaId = parseInt(document.getElementById('scheduleVideoId').value);
        const uploadDateTime = document.getElementById('uploadDateTime').value;

        const schedule = {
            id: Date.now(),
            ideaId: ideaId,
            uploadDate: uploadDateTime,
            scheduledAt: new Date().toISOString()
        };

        this.schedule.push(schedule);
        this.saveData();
        this.closeScheduleForm();
        this.renderCalendar();
        this.renderUpcoming();
    }

    previousMonth() {
        this.currentMonth.setMonth(this.currentMonth.getMonth() - 1);
        this.renderCalendar();
    }

    nextMonth() {
        this.currentMonth.setMonth(this.currentMonth.getMonth() + 1);
        this.renderCalendar();
    }

    renderCalendar() {
        const year = this.currentMonth.getFullYear();
        const month = this.currentMonth.getMonth();

        document.getElementById('currentMonth').textContent =
            this.currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0);
        const daysInMonth = lastDay.getDate();
        const startingDayOfWeek = firstDay.getDay();

        const grid = document.getElementById('calendarGrid');
        grid.innerHTML = '';

        // Days of week header
        ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].forEach(day => {
            const dayHeader = document.createElement('div');
            dayHeader.className = 'calendar-day-header';
            dayHeader.textContent = day;
            dayHeader.style.fontWeight = 'bold';
            dayHeader.style.textAlign = 'center';
            grid.appendChild(dayHeader);
        });

        // Empty cells for days before month starts
        for (let i = 0; i < startingDayOfWeek; i++) {
            const emptyCell = document.createElement('div');
            emptyCell.className = 'calendar-day other-month';
            grid.appendChild(emptyCell);
        }

        // Days of the month
        for (let day = 1; day <= daysInMonth; day++) {
            const dayCell = document.createElement('div');
            dayCell.className = 'calendar-day';

            const today = new Date();
            if (day === today.getDate() && month === today.getMonth() && year === today.getFullYear()) {
                dayCell.classList.add('today');
            }

            dayCell.innerHTML = `<strong>${day}</strong>`;

            // Add scheduled videos
            this.schedule.forEach(sch => {
                const schedDate = new Date(sch.uploadDate);
                if (schedDate.getDate() === day && schedDate.getMonth() === month && schedDate.getFullYear() === year) {
                    const idea = this.ideas.find(i => i.id === sch.ideaId);
                    if (idea) {
                        const event = document.createElement('div');
                        event.className = 'calendar-event';
                        event.textContent = idea.title.substring(0, 15);
                        dayCell.appendChild(event);
                    }
                }
            });

            grid.appendChild(dayCell);
        }

        this.updateCalendarStats();
    }

    renderUpcoming() {
        const upcoming = this.schedule
            .sort((a, b) => new Date(a.uploadDate) - new Date(b.uploadDate))
            .slice(0, 5);

        const container = document.getElementById('upcomingList');
        if (upcoming.length === 0) {
            container.innerHTML = '<div class="empty-state">No scheduled videos. Schedule one to get started!</div>';
            return;
        }

        container.innerHTML = upcoming.map(sch => {
            const idea = this.ideas.find(i => i.id === sch.ideaId);
            const date = new Date(sch.uploadDate);
            return `
                <div class="upcoming-item">
                    <div>
                        <h4>${idea?.title || 'Unknown'}</h4>
                        <p class="upcoming-date">${date.toLocaleDateString()} at ${date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</p>
                    </div>
                    <button class="btn btn-danger btn-sm" onclick="planner.deleteSchedule(${sch.id})">Cancel</button>
                </div>
            `;
        }).join('');
    }

    updateCalendarStats() {
        const now = new Date();
        const weekStart = new Date(now);
        weekStart.setDate(now.getDate() - now.getDay());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        const thisWeek = this.schedule.filter(s => {
            const d = new Date(s.uploadDate);
            return d >= weekStart && d <= weekEnd;
        }).length;

        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        const monthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        const thisMonth = this.schedule.filter(s => {
            const d = new Date(s.uploadDate);
            return d >= monthStart && d <= monthEnd;
        }).length;

        const upcoming = this.schedule.filter(s => new Date(s.uploadDate) > now).length;

        document.getElementById('videosThisWeek').textContent = thisWeek;
        document.getElementById('videosThisMonth').textContent = thisMonth;
        document.getElementById('upcomingCount').textContent = upcoming;
    }

    deleteSchedule(id) {
        this.schedule = this.schedule.filter(s => s.id !== id);
        this.saveData();
        this.renderCalendar();
        this.renderUpcoming();
    }

    // CHECKLIST SECTION
    openChecklistForm() {
        document.getElementById('checklistForm').classList.remove('hidden');
    }

    closeChecklistForm() {
        document.getElementById('checklistForm').classList.add('hidden');
        document.getElementById('checklistFormElement').reset();
    }

    useTemplate(template) {
        const templates = {
            standard: ['Script written', 'Audio recorded', 'Edited', 'Color graded', 'Sound mixed', 'Thumbnail created', 'Title optimized', 'Description written', 'Tags added', 'Scheduled'],
            short: ['Script (2-3 min)', 'Recorded', 'Quick edit', 'Thumbnail', 'Post'],
            story: ['Outline written', 'Personal notes', 'Recorded talking', 'B-roll gathered', 'Edited', 'Music added', 'Thumbnail', 'Posted'],
            interview: ['Guest confirmed', 'Recording setup tested', 'Recording done', 'Audio edited', 'Subtitles added', 'Thumbnail', 'Posted']
        };

        const items = templates[template] || [];
        document.getElementById('checklistItems').value = items.join('\n');
        this.openChecklistForm();
    }

    createChecklist(e) {
        e.preventDefault();
        const name = document.getElementById('checklistName').value;
        const itemsText = document.getElementById('checklistItems').value;
        const items = itemsText.split('\n').filter(i => i.trim());

        const checklist = {
            id: Date.now(),
            name: name,
            items: items.map((item, idx) => ({ id: idx, text: item, completed: false })),
            createdAt: new Date().toISOString()
        };

        this.checklists.push(checklist);
        this.saveData();
        this.closeChecklistForm();
        this.renderChecklists();
    }

    renderChecklists() {
        const container = document.getElementById('checklistsContainer');
        if (this.checklists.length === 0) {
            container.innerHTML = '<div class="empty-state">No checklists yet. Create one for your next video!</div>';
            return;
        }

        container.innerHTML = this.checklists.map(checklist => {
            const completed = checklist.items.filter(i => i.completed).length;
            const progress = Math.round((completed / checklist.items.length) * 100);

            return `
                <div class="checklist-card">
                    <h4>${checklist.name}</h4>
                    <div class="checklist-items">
                        ${checklist.items.map(item => `
                            <label class="checklist-item">
                                <input type="checkbox" ${item.completed ? 'checked' : ''} onchange="planner.toggleChecklistItem(${checklist.id}, ${item.id})">
                                <span>${item.text}</span>
                            </label>
                        `).join('')}
                    </div>
                    <div class="checklist-progress">
                        <p>Progress: ${completed}/${checklist.items.length}</p>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${progress}%"></div>
                        </div>
                    </div>
                    <button class="btn btn-danger btn-sm" style="margin-top: 10px;" onclick="planner.deleteChecklist(${checklist.id})">Delete</button>
                </div>
            `;
        }).join('');
    }

    toggleChecklistItem(checklistId, itemId) {
        const checklist = this.checklists.find(c => c.id === checklistId);
        if (checklist) {
            const item = checklist.items.find(i => i.id === itemId);
            if (item) {
                item.completed = !item.completed;
                this.saveData();
                this.renderChecklists();
            }
        }
    }

    deleteChecklist(id) {
        this.checklists = this.checklists.filter(c => c.id !== id);
        this.saveData();
        this.renderChecklists();
    }

    // TRACKING SECTION
    updateStat(key, value) {
        if (!this.metrics) this.metrics = {};
        this.metrics[key] = value;
        this.saveData();
        this.renderStats();
    }

    saveVideoMetric() {
        const videoId = document.getElementById('videoMetricSelect').value;
        const views = document.getElementById('videoViews').value;
        const likes = document.getElementById('videoLikes').value;
        const comments = document.getElementById('videoComments').value;
        const watchHours = document.getElementById('videoWatchHours').value;

        if (!videoId) return;

        if (!this.metrics[videoId]) {
            this.metrics[videoId] = [];
        }

        this.metrics[videoId].push({
            date: new Date().toISOString(),
            views: parseInt(views) || 0,
            likes: parseInt(likes) || 0,
            comments: parseInt(comments) || 0,
            watchHours: parseFloat(watchHours) || 0
        });

        this.saveData();
        this.renderPerformance();
        this.clearMetricInputs();
    }

    renderStats() {
        document.getElementById('totalSubs').textContent = this.metrics.subs || '0';
        document.getElementById('totalViews').textContent = this.metrics.views || '0';
        document.getElementById('totalWatchHours').textContent = this.metrics.watchHours || '0';
        document.getElementById('avgDuration').textContent = (this.metrics.avgDuration || '0') + '%';
    }

    renderPerformance() {
        const container = document.getElementById('performanceList');
        const select = document.getElementById('videoMetricSelect');

        select.innerHTML = '<option value="">Select a published video...</option>';
        this.ideas.filter(i => i.status === 'published').forEach(idea => {
            const option = document.createElement('option');
            option.value = idea.id;
            option.textContent = idea.title;
            select.appendChild(option);
        });

        let html = '';
        Object.entries(this.metrics).forEach(([key, value]) => {
            if (key !== 'subs' && key !== 'views' && key !== 'watchHours' && key !== 'avgDuration' && Array.isArray(value)) {
                const idea = this.ideas.find(i => i.id === parseInt(key));
                if (idea && value.length > 0) {
                    const latest = value[value.length - 1];
                    html += `
                        <div class="performance-item">
                            <h5>${idea.title}</h5>
                            <div class="performance-stats">
                                <div class="perf-stat">
                                    <div class="perf-label">Views</div>
                                    <div class="perf-value">${latest.views}</div>
                                </div>
                                <div class="perf-stat">
                                    <div class="perf-label">Likes</div>
                                    <div class="perf-value">${latest.likes}</div>
                                </div>
                                <div class="perf-stat">
                                    <div class="perf-label">Comments</div>
                                    <div class="perf-value">${latest.comments}</div>
                                </div>
                                <div class="perf-stat">
                                    <div class="perf-label">Watch Hours</div>
                                    <div class="perf-value">${latest.watchHours.toFixed(1)}</div>
                                </div>
                            </div>
                        </div>
                    `;
                }
            }
        });

        container.innerHTML = html || '<div class="empty-state">No performance data yet. Add metrics when videos go live!</div>';
    }

    clearMetricInputs() {
        document.getElementById('videoViews').value = '';
        document.getElementById('videoLikes').value = '';
        document.getElementById('videoComments').value = '';
        document.getElementById('videoWatchHours').value = '';
    }

    addMetricInputs() {
        alert('Use the metric form above to add performance data for your published videos!');
    }

    // SETTINGS SECTION
    saveSettings() {
        this.settings.channelName = document.getElementById('channelName').value;
        this.settings.defaultDuration = document.getElementById('defaultDuration').value;
        this.settings.targetSubs = parseInt(document.getElementById('targetSubs').value) || 1000;
        this.settings.targetViews = parseInt(document.getElementById('targetViews').value) || 4000;
        this.settings.targetWatchHours = parseInt(document.getElementById('targetWatchHours').value) || 4000;

        this.settings.uploadSchedule = [];
        document.querySelectorAll('.day-selector input[type="checkbox"]:checked').forEach(cb => {
            this.settings.uploadSchedule.push(cb.value);
        });

        this.saveData();
        alert('Settings saved!');
    }

    renderSettings() {
        document.getElementById('channelName').value = this.settings.channelName;
        document.getElementById('defaultDuration').value = this.settings.defaultDuration;
        document.getElementById('targetSubs').value = this.settings.targetSubs;
        document.getElementById('targetViews').value = this.settings.targetViews;
        document.getElementById('targetWatchHours').value = this.settings.targetWatchHours;

        this.settings.uploadSchedule.forEach(day => {
            document.querySelector(`.day-selector input[value="${day}"]`)?.checked = true;
        });
    }

    exportData() {
        const data = {
            ideas: this.ideas,
            schedule: this.schedule,
            checklists: this.checklists,
            metrics: this.metrics,
            settings: this.settings,
            exportedAt: new Date().toISOString()
        };

        const json = JSON.stringify(data, null, 2);
        const blob = new Blob([json], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `content-planner-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
    }

    importData(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            try {
                const data = JSON.parse(event.target.result);
                this.ideas = data.ideas || [];
                this.schedule = data.schedule || [];
                this.checklists = data.checklists || [];
                this.metrics = data.metrics || {};
                this.settings = { ...this.settings, ...data.settings };
                this.saveData();
                alert('Data imported successfully!');
                this.renderAllContent();
            } catch (err) {
                alert('Error importing file. Make sure it\'s a valid JSON file.');
            }
        };
        reader.readAsText(file);
    }

    clearAllData() {
        if (confirm('Are you sure? This will delete ALL data including ideas, schedule, and metrics. This cannot be undone!')) {
            this.ideas = [];
            this.schedule = [];
            this.checklists = [];
            this.metrics = {};
            this.saveData();
            this.renderAllContent();
            alert('All data cleared!');
        }
    }

    // Render all content
    renderAllContent() {
        this.renderIdeas();
        this.renderCalendar();
        this.renderChecklists();
        this.renderStats();
        this.renderPerformance();
        this.renderSettings();
        this.renderUpcoming();
    }
}

// Initialize the app
let planner;
document.addEventListener('DOMContentLoaded', () => {
    planner = new ContentPlanner();
});
