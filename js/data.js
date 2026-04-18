/* ============================================================
   DATA — All site content lives here as const arrays.
   Edit this file to update programs, steps, stats, or contacts.
   ============================================================ */

'use strict';

const PROGRAMS = [
  {
    icon:  'message-circle',
    num:   '01',
    title: 'Speaking & Conversation',
    desc:  'Build real fluency through guided conversation practice in natural, everyday contexts — no scripts, no rigid drills. Just authentic, meaningful dialogue.',
    tags:  ['Everyday Dialogue', 'Storytelling', 'Debate Practice'],
  },
  {
    icon:  'book-open',
    num:   '02',
    title: 'Grammar Mastery',
    desc:  "Master the rules that make English clear, precise, and professional — in every situation you'll ever encounter, from casual conversation to formal writing.",
    tags:  ['Tenses & Syntax', 'Sentence Structure', 'Writing Clarity'],
  },
  {
    icon:  'mic',
    num:   '03',
    title: 'Accent Reduction',
    desc:  'Sound more natural and be heard clearly in every setting — professional or casual. Focus on American phonetics, rhythm, and intonation patterns.',
    tags:  ['Phonetics', 'Rhythm & Stress', 'American Sounds'],
  },
  {
    icon:  'briefcase',
    num:   '04',
    title: 'Business English',
    desc:  'Workplace communication, emails, presentations, and negotiations — English crafted for your career and the professional image you want to project.',
    tags:  ['Emails & Reports', 'Presentations', 'Negotiations'],
  },
];

const STEPS = [
  {
    num:    '01',
    icon:   'video',
    title:  'All Online Through Google Meet',
    desc:   'All of our meetings are conducted online through Google Meet — a modern, accessible environment that allows great collaboration without having to deal with complicated setups.',
    detail: 'All it takes is a click on the link you receive after booking.',
    delay:  0,
  },
  {
    num:    '02',
    icon:   'book-open',
    title:  'Structured Material, No Extra Cost',
    desc:   'You will be given structured material at no extra cost to help with your learning. Each lesson primarily focuses on addressing your individual needs in English and how to move forwards.',
    detail: 'I always maintain the flexibility necessary for when a student has an upcoming event or situation where they will need to put their English skills to use.',
    delay:  0.2,
  },
  {
    num:    '03',
    icon:   'message-circle',
    title:  'Speak Confidently & Comfortably',
    desc:   'You will learn to speak confidently by putting your English to good use in an environment where you feel comfortable and supported.',
    detail: 'My goal is to always make sure my students have an environment in which they feel comfortable speaking English with someone who can understand and relate to their struggles — allowing for much greater improvement.',
    delay:  0.4,
  },
];

const STATS = [
  { target: 50, suffix: '+', label: 'Students Taught' },
  { target: 4,   suffix: '',  label: 'Programs' },
  { target: 3,   suffix: '',  label: 'Languages' },
  { target: 100, suffix: '%', label: 'Online' },
];

const CONTACTS = [
  {
    icon:   'phone',
    label:  'Phone / SMS',
    detail: '+1 (951) 363-3139',
    href:   'tel:+19513633139',
    isLink: true,
  },
  {
    icon:   'mail',
    label:  'Email',
    detail: 'englishwithcagatay@gmail.com',
    href:   'mailto:englishwithcagatay@gmail.com',
    isLink: true,
  },
  {
    icon:   'map-pin',
    label:  'Location',
    detail: 'Washington D.C. — Teaching globally',
    href:   null,
    isLink: false,
  },
];
