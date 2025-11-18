# Navigate Tech Hub - Mock Features Documentation

## Overview

This document explains the mock features implemented for the demo presentation. These features showcase the platform's vision and demonstrate functionality that would require backend integration in production.

**Status:** 🚧 All mock features use simulated data  
**Last Updated:** November 18, 2025

---

## What's Mock vs. Real

### ✅ Real Features (Fully Functional)

- **Resource Library:** All internal resources and articles
- **Category Filtering:** Browse resources by category
- **Search Functionality:** Real-time search across resources
- **External Links Directory:** Curated external resources
- **Responsive Design:** Mobile-optimized layouts
- **UI/UX Enhancements:** Animations, hover states, glassmorphism

### 🔮 Mock Features (Demo Data)

All mock features are clearly labeled with **"🔮 Preview Feature"** badges.

#### 1. **ColorStack Opportunities Integration**
- **Location:** Homepage (after Hero section)
- **Data Source:** `frontend/data/mockOpportunities.ts`
- **What it shows:** Sample internship/job opportunities from ColorStack Slack
- **Production requirement:** ColorStack Slack API integration

#### 2. **Live Activity & Stats**
- **Location:** Homepage (after Featured Resources)
- **Data Source:** `frontend/data/mockActivity.ts`
- **What it shows:** Platform analytics, trending resources, recent activity
- **Production requirement:** Analytics backend, view tracking system

#### 3. **Community Contributions**
- **Location:** Homepage (after About section)
- **Data Source:** `frontend/data/mockContributions.ts`
- **What it shows:** Recent student contributions to the platform
- **Production requirement:** Contribution management system, user authentication

#### 4. **Resource Recommendations**
- **Location:** Individual article pages (bottom)
- **Logic:** `frontend/lib/recommendations.ts`
- **What it shows:** Cross-category resource suggestions
- **Production requirement:** ML recommendation engine, user behavior tracking

#### 5. **Progress Tracking**
- **Location:** Browse page (top), Article pages (buttons)
- **Storage:** Browser localStorage (`navigate-tech-hub-progress`)
- **What it shows:** User's learning progress across resources
- **Production requirement:** User accounts, backend database, sync across devices

---

## How to Update Mock Data

### ColorStack Opportunities

**File:** `frontend/data/mockOpportunities.ts`

```typescript
export const mockOpportunities: ColorStackOpportunity[] = [
  {
    id: '1',
    title: 'Software Engineering Intern - Summer 2026',
    company: 'Amazon',
    postedBy: 'John Martinez',
    postedAt: '2025-11-18T08:00:00',
    relativeTime: '2 hours ago',
    compensation: '$50/hr',
    location: 'Remote',
    deadline: 'Dec 1, 2025',
    link: 'https://amazon.jobs/en/jobs/example',
    tags: ['Internship', 'Backend', 'Cloud'],
  },
  // Add more opportunities...
];
```

**Fields:**
- `id`: Unique identifier
- `title`: Position title
- `company`: Company name
- `postedBy`: Name of person who shared it
- `postedAt`: ISO timestamp
- `relativeTime`: Human-readable time (e.g., "2 hours ago")
- `compensation`: Pay information
- `location`: Work location
- `deadline`: Application deadline
- `link`: URL to job posting
- `tags`: Array of relevant tags

### Live Activity & Stats

**File:** `frontend/data/mockActivity.ts`

```typescript
export const mockLiveStats: LiveStats = {
  viewsToday: 127,
  bookmarksThisWeek: 45,
  pendingContributions: 3,
  trending: [
    {
      title: 'LeetCode Patterns Guide',
      slug: 'leetcode-patterns-guide',
      views: 89,
      rank: 1,
    },
  ],
  recentActivity: [
    {
      resourceTitle: 'Behavioral Interview Prep',
      slug: 'behavioral-interview-prep',
      action: 'viewed',
      timeAgo: '5m ago',
    },
  ],
};
```

**Update:** Change numbers to reflect current platform state (estimated).

### Community Contributions

**File:** `frontend/data/mockContributions.ts`

```typescript
export const mockContributions: Contribution[] = [
  {
    id: '1',
    contributorName: 'Maria Chen',
    action: 'added', // 'added' | 'updated' | 'suggested'
    resourceTitle: 'Behavioral Interview Prep Guide',
    timestamp: '2025-11-16T10:30:00',
    relativeTime: '2 days ago',
    status: 'published', // 'approved' | 'pending' | 'published'
  },
];
```

**Actions:**
- `added`: New resource created
- `updated`: Existing resource improved
- `suggested`: External link recommended

**Statuses:**
- `published`: Live on platform
- `approved`: Accepted, pending publication
- `pending`: Under review

### Recommendations Engine

**File:** `frontend/lib/recommendations.ts`

The recommendation algorithm is tag-based. To improve suggestions:

1. **Ensure resources have relevant tags** (`frontend/data/resources.ts`)
2. **Algorithm weights:**
   - Internal resources: `matchingTags * 2`
   - External resources: `matchingTags * 1`
3. **Minimum match threshold:** 2 shared keywords for external resources

**Customization:**
```typescript
// In recommendations.ts
const matchCount = 0;
currentKeywords.forEach((keyword) => {
  if (keyword.length > 3 && extKeywords.includes(keyword.toLowerCase())) {
    matchCount++;
  }
});

if (matchCount > 1) { // Adjust threshold here
  // Resource recommended
}
```

---

## Production Requirements

### Backend API Endpoints Needed

#### 1. ColorStack Integration
```
GET /api/opportunities
  - Fetch opportunities from ColorStack Slack API
  - Filter by recency, relevance
  - Cache for performance
```

#### 2. Analytics System
```
POST /api/analytics/track
  - Track resource views
  - Record user actions
  
GET /api/analytics/stats
  - Return platform statistics
  - Trending resources
  - Recent activity
```

#### 3. Contributions Management
```
POST /api/contributions/submit
  - Submit new contribution
  - Upload attachments
  
GET /api/contributions/recent
  - Fetch recent contributions
  - Filter by status
  
PUT /api/contributions/:id/approve
  - Approve pending contribution
```

#### 4. User Progress Tracking
```
GET /api/users/:id/progress
  - Fetch user's progress data
  
POST /api/users/:id/progress
  - Update progress (complete, bookmark)
  
GET /api/users/:id/recommendations
  - Personalized recommendations
```

### Database Schema Needed

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  northeastern_id VARCHAR(50),
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### User Progress Table
```sql
CREATE TABLE user_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  resource_slug VARCHAR(255),
  status ENUM('completed', 'in_progress', 'bookmarked'),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, resource_slug)
);
```

#### Analytics Events Table
```sql
CREATE TABLE analytics_events (
  id UUID PRIMARY KEY,
  event_type VARCHAR(50),
  resource_slug VARCHAR(255),
  user_id UUID REFERENCES users(id),
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Contributions Table
```sql
CREATE TABLE contributions (
  id UUID PRIMARY KEY,
  contributor_id UUID REFERENCES users(id),
  type ENUM('added', 'updated', 'suggested'),
  resource_title VARCHAR(255),
  resource_data JSONB,
  status ENUM('pending', 'approved', 'published'),
  created_at TIMESTAMP DEFAULT NOW()
);
```

### External Integrations Needed

1. **ColorStack Slack API**
   - OAuth authentication
   - Read messages from #opportunities channel
   - Webhook for real-time updates

2. **Authentication Provider**
   - Northeastern SSO integration
   - OAuth 2.0 flow
   - Session management

3. **Content Management System (Future)**
   - Strapi CMS for resource management
   - Admin dashboard for approving contributions

---

## Testing Mock Features

### Browser localStorage

Progress tracking uses localStorage. To test:

1. **View current data:**
   ```javascript
   // In browser console:
   JSON.parse(localStorage.getItem('navigate-tech-hub-progress'))
   ```

2. **Reset progress:**
   ```javascript
   localStorage.removeItem('navigate-tech-hub-progress')
   ```

3. **Manually set progress:**
   ```javascript
   localStorage.setItem('navigate-tech-hub-progress', JSON.stringify({
     completedResources: ['leetcode-patterns-guide', 'resume-building-guide'],
     bookmarkedResources: ['behavioral-interview-prep'],
     lastVisited: {}
   }))
   ```

### Component Testing

All mock features are client components and can be tested independently:

```tsx
import ColorStackOpportunities from '@/components/sections/ColorStackOpportunities';

// In your test file
<ColorStackOpportunities />
```

---

## Philosophy: Integration Over Competition

### Why Mock ColorStack Integration?

Navigate Tech Hub is **not** competing with ColorStack. We're building **complementary infrastructure**.

**Our Approach:**
- Amplify ColorStack opportunities
- Drive traffic TO ColorStack Slack
- Reduce friction in discovering resources
- Centralize scattered information

**Production Integration:**
- Direct API connection to ColorStack
- "View in Slack" links for full context
- Credit original posters
- Encourage ColorStack membership

### Student Contribution Model

**Current State:** Mock data shows vision  
**Future State:**
1. Students submit contributions via form/GitHub PR
2. Review process ensures quality
3. Contributors get credited on platform
4. Open-source repository for transparency

---

## Demo Presentation Script

### Slide 1: Current Platform
"Here's Navigate Tech Hub as it works today - a curated resource library for Northeastern CS students."

### Slide 2: The Vision
"But we're thinking bigger. Let me show you what we're building..."

### Slide 3: ColorStack Integration
"Imagine getting ColorStack opportunities right here, without switching apps. We work WITH ColorStack, not against it."

### Slide 4: Community Contributions
"This platform is by students, for students. Here's what student-led contribution looks like."

### Slide 5: Progress Tracking
"Track your journey. See how far you've come. Stay motivated."

### Slide 6: Live Activity
"Feel the energy of an active community learning together."

### Slide 7: Smart Recommendations
"Discover resources you didn't know existed. Connect the dots across categories."

### Slide 8: Call to Action
"This is our vision. It's achievable. It's needed. Let's build this together."

---

## Next Steps for Production

### Phase 1: Foundation (Weeks 1-2)
- [ ] Set up backend API (Node.js/Express or Next.js API routes)
- [ ] Implement user authentication (Northeastern SSO)
- [ ] Create database schema
- [ ] Deploy to production environment

### Phase 2: Core Features (Weeks 3-4)
- [ ] User progress tracking with database
- [ ] Basic analytics system
- [ ] Contribution submission form
- [ ] Admin dashboard for reviewing contributions

### Phase 3: Integrations (Weeks 5-6)
- [ ] ColorStack Slack API integration
- [ ] Real-time opportunity feed
- [ ] Enhanced recommendation algorithm
- [ ] Email notifications for new opportunities

### Phase 4: Scale & Polish (Weeks 7-8)
- [ ] Performance optimization
- [ ] Mobile app (React Native)
- [ ] Advanced analytics dashboard
- [ ] User-requested features

---

## Contact

**Questions about mock features?**  
Email: navigatetechhub@northeastern.edu

**Want to contribute?**  
See `CONTRIBUTING.md` (coming soon)

**Technical documentation:**  
See `README.md` for development setup

---

**Remember:** These mock features are intentionally labeled as previews. Transparency builds trust. The demo shows what's possible, not what's deceptive.

🚀 Let's build this together.

