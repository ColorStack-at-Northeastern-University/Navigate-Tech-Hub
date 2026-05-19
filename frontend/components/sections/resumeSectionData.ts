import { SITE_ASSETS } from '@/lib/siteAssets';



const { samples } = SITE_ASSETS.resume;



export const SAMPLE_RESUMES = [
    {
        id: 1,
        label: 'Resume 1',
        highlights: '0 internships · 2 hackathons · 2 club experiences',
        downloadUrl: samples.resume1.href,
        downloadFileName: samples.resume1.downloadName,
        downloadAvailable: true,
    },
    {
        id: 2,
        label: 'Resume 2',
        highlights: '0 internships · 2 fellowships · 1 project · 2 club experiences',
        downloadUrl: samples.resume2.href,
        downloadFileName: samples.resume2.downloadName,
        downloadAvailable: true,
    },
    {
        id: 3,
        label: 'Resume 3',
        highlights: '0 Internships · 1 hackathon win · 2 personal projects · 1 fellowship',
        downloadUrl: samples.resume3.href,
        downloadFileName: samples.resume3.downloadName,
        downloadAvailable: true,
    },
    {
        id: 4,
        label: 'Resume 4',
        highlights: '1 internship · 2 projects · multiple fellowships',
        downloadUrl: samples.resume4.href,
        downloadFileName: samples.resume4.downloadName,
        downloadAvailable: true,
    },
];



export const RESUME_TEMPLATES = [

    {

        id: 1,

        name: 'Navigate Template',

        note: 'Word doc. Download, then File → Save a copy and fill it in.',

        url: SITE_ASSETS.resume.navigateTemplate.href,

        downloadFileName: SITE_ASSETS.resume.navigateTemplate.downloadName,

        badge: 'Recommended',

    },

    {

        id: 2,

        name: "Jake's Resume",

        note: 'The gold standard in CS. Open in Overleaf (free LaTeX editor).',

        url: 'https://www.overleaf.com/latex/templates/jakes-resume/syzfjbzwjncs',

        badge: 'Popular in CS',

    },

];



export const RESUME_PATH = [

    {

        step: 1,

        action: 'Participate in 1–2 hackathons',

        note: 'DevNEU, HackBeanpot: beginner-friendly and local',

    },

    {

        step: 2,

        action: 'Apply to underclassmen fellowships',

        note: 'Jane Street FOCUS, CodePath, Code2040',

    },

    {

        step: 3,

        action: 'Reach out to professor for research or startups for experience',

        note: 'Cold email works. Send out 20+ emails and get replies in 1–2 weeks',

    },

    {

        step: 4,

        action: 'Build a project with real users',

        note: 'Even 10 users counts as a production project on your resume',

    },

];


