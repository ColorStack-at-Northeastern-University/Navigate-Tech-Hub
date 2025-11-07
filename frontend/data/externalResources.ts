/**
 * External Resources Data
 * Links to external platforms, tools, and resources for CS students
 *
 * All resources link to real external sites and open in new tabs
 */

import { ExternalResource } from '@/lib/types';

export const externalResources: ExternalResource[] = [
    // INTERVIEW PREP RESOURCES
    {
        title: 'Codewars',
        description: 'The true beginner coding practice site to go when even two-sum makes you feel dumb',
        url: 'https://codewars.com',
        category: 'interview-prep'
    },
    {
        title: 'NeetCode 150',
        description: 'Curated list of 150 LeetCode questions with video explanations. Organized by pattern for efficient learning.',
        url: 'https://neetcode.io/practice',
        category: 'interview-prep',
    },
    {
        title: 'LeetCode Top Interview 150',
        description: 'Most commonly asked interview questions across top tech companies. Essential practice for technical interviews.',
        url: 'https://leetcode.com/studyplan/top-interview-150/',
        category: 'interview-prep',
    },
    {
        title: 'AlgoExpert',
        description: '160+ coding interview questions with video explanations, time/space complexity analysis, and optimal solutions.',
        url: 'https://www.algoexpert.io',
        category: 'interview-prep',
        badge: 'Paid',
    },
    {
        title: 'Cracking the Coding Interview',
        description: 'The gold standard book for technical interview prep. 189 programming questions with detailed solutions.',
        url: 'https://www.amazon.com/Cracking-Coding-Interview-Programming-Questions/dp/0984782850',
        category: 'interview-prep',
    },
    {
        title: 'Brilliant Black Minds Mock Interviews',
        description: 'Free mock technical and behavioral interviews led by Black engineers from top tech companies.',
        url: 'https://www.brilliantblackminds.com',
        category: 'interview-prep',
    },
    {
        title: 'Pramp',
        description: 'Practice live coding interviews with peers. Free, anonymous, and great for building interview confidence.',
        url: 'https://www.pramp.com',
        category: 'interview-prep',
    },
    {
        title: 'interviewing.io',
        description: 'Anonymous technical interviews with engineers from top companies. Get real interview practice and feedback.',
        url: 'https://interviewing.io',
        category: 'interview-prep',
    },

    // PROJECTS & PORTFOLIO RESOURCES
    {
        title: 'Framer',
        description: 'No-code portfolio builder with stunning templates. Create beautiful, responsive portfolio websites in minutes.',
        url: 'https://www.framer.com',
        category: 'projects',
    },
    {
        title: 'GitProfile Template',
        description: 'Open-source portfolio template that auto-syncs with your GitHub projects. Deploy with Vercel in minutes.',
        url: 'https://github.com/arifszn/gitprofile',
        category: 'projects',
    },
    {
        title: 'Frontend Mentor',
        description: 'Real-world frontend challenges to build your portfolio. Improve your skills with design files and community feedback.',
        url: 'https://www.frontendmentor.io',
        category: 'projects',
    },
    {
        title: 'Vercel',
        description: 'Deploy your projects instantly with automatic HTTPS and global CDN. Perfect for Next.js and React apps.',
        url: 'https://vercel.com',
        category: 'projects',
    },
    {
        title: 'Netlify',
        description: 'Deploy web projects with continuous deployment from Git. Free tier includes custom domains and SSL.',
        url: 'https://www.netlify.com',
        category: 'projects',
    },
    {
        title: 'Railway',
        description: 'Deploy full-stack applications with databases. Simple interface for backend projects and APIs.',
        url: 'https://railway.app',
        category: 'projects',
    },

    // COMMUNITY & NETWORKING RESOURCES
    {
        title: 'ColorStack',
        description: 'The largest community of Black and Latinx computer science students. Access events, mentorship, and opportunities.',
        url: 'https://www.colorstack.org',
        category: 'community',
    },
    {
        title: 'NSBE (National Society of Black Engineers)',
        description: 'Premier organization for Black engineers. Attend conferences, network with professionals, and find scholarships.',
        url: 'https://www.nsbe.org',
        category: 'community',
    },
    {
        title: 'AfroTech Conference',
        description: 'The largest Black tech conference in the world. Network with recruiters, attend workshops, and explore career opportunities.',
        url: 'https://afrotech.com',
        category: 'community',
    },
    {
        title: 'LinkedIn',
        description: 'Essential professional networking platform. Connect with recruiters, showcase your experience, and find opportunities.',
        url: 'https://www.linkedin.com',
        category: 'community',
    },
    {
        title: 'Rewriting the Code',
        description: 'Community for women and non-binary students in tech. Access to mentorship, internships, and career development.',
        url: 'https://rewritingthecode.org',
        category: 'community',
    },
    {
        title: 'Out in Tech',
        description: 'Global community for LGBTQ+ people in tech. Professional development, mentorship, and networking events.',
        url: 'https://outintech.com',
        category: 'community',
    },

    // HACKATHON RESOURCES
    {
        title: 'Major League Hacking (MLH)',
        description: 'Discover upcoming hackathons, find teammates, and access resources. The official student hackathon league.',
        url: 'https://mlh.io',
        category: 'hackathons',
    },
    {
        title: 'Devpost',
        description: 'Browse hackathons, submit projects, and showcase your work. Discover inspiration from past winning projects.',
        url: 'https://devpost.com',
        category: 'hackathons',
    },
    {
        title: 'HackerEarth Challenges',
        description: 'Participate in coding challenges and hackathons hosted by top companies. Win prizes and get noticed by recruiters.',
        url: 'https://www.hackerearth.com/challenges/',
        category: 'hackathons',
    },
    {
        title: 'Hackathons.io',
        description: 'Comprehensive calendar of hackathons worldwide. Filter by location, date, and prize pool.',
        url: 'https://hackathons.io',
        category: 'hackathons',
    },

    // LEARNING PLATFORM RESOURCES
    {
        title: 'freeCodeCamp',
        description: 'Learn web development, data science, and more through interactive courses. Completely free with certifications.',
        url: 'https://www.freecodecamp.org',
        category: 'classes',
    },
    {
        title: 'Harvard CS50',
        description: "Harvard's introduction to computer science. Free, world-class education covering algorithms, data structures, and more.",
        url: 'https://cs50.harvard.edu/x/',
        category: 'classes',
    },
    {
        title: 'The Odin Project',
        description: 'Free full-stack web development curriculum. Learn by building real projects from scratch.',
        url: 'https://www.theodinproject.com',
        category: 'classes',
    },
    {
        title: 'Coursera',
        description: 'Online courses from top universities. Many courses are free to audit, with certificates available for a fee.',
        url: 'https://www.coursera.org',
        category: 'classes',
    },
    {
        title: 'MIT OpenCourseWare',
        description: "Free access to MIT's course materials. Video lectures, assignments, and exams from actual MIT classes.",
        url: 'https://ocw.mit.edu',
        category: 'classes',
    },
    {
        title: 'Codecademy',
        description: 'Interactive coding lessons in popular programming languages. Free tier covers basics, Pro for advanced content.',
        url: 'https://www.codecademy.com',
        category: 'classes',
    },
    {
        title: 'Khan Academy Computer Science',
        description: 'Free interactive lessons on computer programming, algorithms, and cryptography. Great for beginners.',
        url: 'https://www.khanacademy.org/computing/computer-science',
        category: 'classes',
    },
];