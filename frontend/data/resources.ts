/**
 * Hardcoded resource data for Navigate Tech Hub (Phase 1)
 * This will be replaced with Strapi API calls in Phase 2
 */

import { Resource } from '@/lib/types';

/**
 * All available resources in a flat array structure.
 * Resources can be filtered by category, tags, difficulty, etc.
 */
export const resources: Resource[] = [
    // Interview Prep Resources
    {
        slug: 'leetcode-patterns-guide',
        category: 'interview-prep',
        title: 'LeetCode Patterns Guide',
        description: 'Master common DSA patterns including two pointers, sliding window, dynamic programming, and graph algorithms.',
        content: `# LeetCode Patterns Guide

Mastering LeetCode isn't about memorizing hundreds of solutions. It's about recognizing **patterns**. Once you understand the underlying patterns, you can tackle similar problems with confidence, even if you've never seen them before.

## Why Patterns Matter

Technical interviews test your ability to **think algorithmically**. They do not test your ability to recall specific problems. Interviewers often tweak classic problems to see if you truly understand the pattern or if you're just regurgitating memorized solutions.

By focusing on patterns, you'll:
- Solve problems faster (pattern recognition speeds up ideation)
- Handle variations confidently (most interview problems are pattern variations)
- Communicate better (explaining your approach using pattern terminology)

## Core Patterns to Master

### 1. Two Pointers
**When to use:** Problems involving sorted arrays, palindromes, or finding pairs/triplets that meet a condition.

**How it works:** Use two pointers (left and right) that move toward each other or in the same direction, reducing time complexity from O(n²) to O(n).

**Classic problems:** Two Sum (sorted array), Container With Most Water, Remove Duplicates from Sorted Array

### 2. Sliding Window
**When to use:** Problems involving contiguous subarrays or substrings (finding max/min values, sums, or patterns).

**How it works:** Maintain a "window" that slides through the array/string, adjusting size dynamically based on conditions.

**Classic problems:** Longest Substring Without Repeating Characters, Maximum Sum Subarray of Size K, Minimum Window Substring

[Content continues...]`,
        tags: ['LeetCode', 'Interview', 'DSA'],
        difficulty: 'intermediate',
        author: 'Navigate Tech Hub Team',
        publishedDate: '2025-01-15',
        lastUpdated: '2025-01-15',
    },
    {
        slug: 'building-the-perfect-resume',
        category: 'interview-prep',
        title: 'Building the Perfect Resume',
        description: 'Learn how to craft a one-page resume that passes ATS systems and catches recruiter attention. Includes templates and examples.',
        content: `# Building the Perfect Resume

Your resume is your ticket into any opportunity. This should be the document you edit the most. Don't let any of your skills go unnoticed!

## Key Guidelines

- **1 page only**  Keep it concise
- **Reverse chronological order**  Most recent experience at the top
- **Tailor it**  For roles you're most interested in, customize to match the job description
- **Avoid paragraphs**  Use bullet points, start with action verbs
- **ATS-friendly formatting**  Many companies use Applicant Tracking Systems

[Content continues...]`,
        tags: ['Resume', 'Career', 'Interview'],
        difficulty: 'beginner',
        author: 'Code: Black Team',
        publishedDate: '2025-01-10',
    },
    {
        slug: 'behavioral-interview-prep',
        category: 'interview-prep',
        title: 'Behavioral Interview Prep',
        description: 'Use the STAR method to craft compelling stories. Learn how to answer "Tell me about yourself" and other common questions.',
        content: `# Behavioral Interview Prep

Behavioral interviews assess your soft skills, problem-solving approach, and cultural fit. Master the STAR method to tell compelling stories.

## The STAR Method

- **Situation**  Background context
- **Task**  What you were trying to achieve
- **Action**  What you did
- **Result**  What happened, what did you learn?

## Common Questions

### "Tell me about yourself"
Emphasize your "why". Why you're studying your major, why you're pursuing this role, and what drives your interest.

[Content continues...]`,
        tags: ['Interview', 'Career', 'Soft Skills'],
        difficulty: 'beginner',
        publishedDate: '2025-01-12',
    },
    {
        slug: 'technical-interview-strategies',
        category: 'interview-prep',
        title: 'Technical Interview Strategies',
        description: 'Navigate CodeSignal GCAs, HackerRank assessments, and live coding rounds. Learn the UMPIRE framework for problem-solving.',
        content: `# Technical Interview Strategies

Technical interviews can be intimidating, but with the right framework and practice, you can excel.

## The UMPIRE Framework

- **U:** Understand the question—what they're asking
- **M:** Match the question to an appropriate DSA approach
- **P:** Plan your approach
- **I:** Implement the code
- **R:** Review code for any issues (syntax, logic, formatting)
- **E:** Execute or dry-run your code

[Content continues...]`,
        tags: ['Interview', 'LeetCode', 'Technical'],
        difficulty: 'intermediate',
        publishedDate: '2025-01-08',
    },

    // Classes Resources
    {
        slug: 'course-registration-tips',
        category: 'classes',
        title: 'Course Registration Tips',
        description: 'Strategic advice for planning your CS coursework at NEU. Which classes to take when, and how to build a strong foundation.',
        content: `# Course Registration Tips

Strategic course planning can make or break your CS journey. Here's how to build a strong foundation and avoid common mistakes.

## Freshman Year Strategy

Focus on fundamentals:
- CS Fundamentals I & II
- Discrete Structures
- Data Structures and Algo
- Object-Oriented Design

## Avoiding Common Mistakes

Don't overload on theory classes in one semester. Balance your schedule with practical, project-based courses and/or electives.

[Content continues...]`,
        tags: ['Classes', 'Academic', 'Planning'],
        difficulty: 'beginner',
        publishedDate: '2024-12-20',
    },
    {
        slug: 'ai-fundamentals',
        category: 'classes',
        title: 'AI Fundamentals',
        description: 'Introduction to machine learning and neural networks. Understand the basics before diving into advanced AI coursework.',
        content: `# AI Fundamentals

Machine learning and AI are transforming tech. Here's what you need to know before taking advanced courses.

## Core Concepts

- Supervised vs Unsupervised Learning
- Neural Network Basics
- Model Training & Evaluation

[Content continues...]`,
        tags: ['AI', 'Classes', 'Machine Learning'],
        difficulty: 'intermediate',
        publishedDate: '2025-01-05',
    },

    // Projects Resources
    {
        slug: 'build-a-personal-portfolio',
        category: 'projects',
        title: 'Build a Personal Portfolio',
        description: 'Showcase your projects with a stunning portfolio website. Learn design principles and deploy with Vercel or GitHub Pages.',
        content: `# Build a Personal Portfolio

A portfolio website is one of the best ways to stand out. Showcase your projects, skills, and story in one central hub.

## Why You Need One

- Shows initiative beyond your resume
- Makes your projects more discoverable
- Gives recruiters something to remember you by

## Recommended Tools

### Framer (No Code)
- Beautiful templates
- Fast setup
- Free tier available

[Content continues...]`,
        tags: ['Projects', 'Career', 'Portfolio'],
        difficulty: 'beginner',
        publishedDate: '2025-01-03',
    },
    {
        slug: 'project-ideas-generator',
        category: 'projects',
        title: 'Project Ideas Generator',
        description: 'Address real problems people face using your technical skills. Learn how to identify impactful project opportunities.',
        content: `# Project Ideas Generator

The best personal projects address real problems that people face and create meaningful impact.

## Finding Your Project

1. Start with your interests outside CS
2. Identify a problem within that area
3. Map out a solution using your technical skills

[Content continues...]`,
        tags: ['Projects', 'Ideas'],
        difficulty: 'beginner',
        publishedDate: '2024-12-28',
    },

    // Hackathons Resources
    {
        slug: 'how-to-hackathon',
        category: 'hackathons',
        title: 'How to Hackathon',
        description: 'Your complete guide to hackathons. From team formation to pitching, learn how to maximize your 24-48 hour experience.',
        content: `# How to Hackathon

Hackathons are intense, rewarding experiences. Here's how to make the most of your 24-48 hours.

## Before the Event

- Form your team (2-5 people ideal)
- Brainstorm project ideas
- Set up your development environment

## During the Event

- Start simple, iterate later
- Focus on a working demo
- Practice your pitch

[Content continues...]`,
        tags: ['Hackathons', 'Projects', 'Team'],
        difficulty: 'beginner',
        publishedDate: '2024-12-15',
    },
    {
        slug: 'winning-hackathon-projects',
        category: 'hackathons',
        title: 'Winning Hackathon Projects',
        description: 'Study past winning projects and understand what judges look for. Innovation, execution, and presentation all matter.',
        content: `# Winning Hackathon Projects

What separates winning projects from the rest? Let's break down what judges look for.

## Key Factors

1. **Innovation**  Solve a real problem in a creative way
2. **Execution**  Build something that actually works
3. **Presentation**  Tell a compelling story

[Content continues...]`,
        tags: ['Hackathons', 'Strategy'],
        difficulty: 'intermediate',
        publishedDate: '2024-12-10',
    },

    // Community Resources
    {
        slug: 'networking-cold-emailing',
        category: 'community',
        title: 'Networking & Cold Emailing',
        description: 'Craft cold emails that get responses. Learn to network at conferences like AfroTech, NSBE, and ColorStack Summit.',
        content: `# Networking & Cold Emailing

Building a strong network is crucial for career success. Here's how to reach out effectively.

## Cold Email Template

Subject: Aspiring SWE @ [University] - Seeking Your Advice

Hi [Name],

My name is [Your Name], a [year] studying [major] at [university]. I came across your profile and was inspired by your journey to [Company].

I'd love to learn more about your path into tech. Would you be open to a quick 15-minute chat?

[Content continues...]`,
        tags: ['Networking', 'Career', 'Email'],
        difficulty: 'beginner',
        publishedDate: '2024-12-05',
    },
    {
        slug: 'conferences-career-fairs',
        category: 'community',
        title: 'Conferences & Career Fairs',
        description: 'Must-attend events for Black CS students: AfroTech, NSBE National Convention, Grace Hopper, and more.',
        content: `# Conferences & Career Fairs

Attending the right conferences can transform your career. Here are the must-attend events.

## Top Events

### AfroTech
- **When:** October 27-31, 2025
- **Where:** Houston, Texas
- **Why:** Largest Black tech conference

### NSBE National Convention
- **When:** March 18-22, 2026
- **Where:** Baltimore, Maryland
- **Why:** Premier organization for Black engineers

[Content continues...]`,
        tags: ['Networking', 'Career', 'Events'],
        difficulty: 'beginner',
        publishedDate: '2024-12-01',
    },
];