export const surveyQuestions = [
  {
    id: 'q1',
    text: 'Do you regret meeting me?',
    type: 'radio-with-explain',
    options: [
      'No, never',
      'Sometimes',
      'Yes',
      "I'd rather explain in my own words"
    ],
    required: true,
  },
  {
    id: 'q2',
    text: 'Are you happy without me?',
    type: 'radio-with-explain',
    options: [
      'Yes, I am',
      "It's complicated",
      'No, not really',
      "I'd rather explain in my own words"
    ],
    required: true,
  },
  {
    id: 'q3',
    text: 'Do you ever miss the person I used to be in your life?',
    type: 'radio-with-explain',
    options: [
      'Yes, more than I admit',
      'Sometimes, in quiet moments',
      "No, I've moved on",
      "I'd rather explain in my own words"
    ],
    required: true,
  },
  {
    id: 'q4',
    text: 'Do our memories still mean something to you?',
    type: 'radio-with-explain',
    options: [
      'Yes, they always will',
      'Some of them do',
      "They've started to fade",
      "I'd rather explain in my own words"
    ],
    required: true,
  },
  {
    id: 'q5',
    text: 'Was there a moment when you wished things had turned out differently?',
    type: 'radio-with-explain',
    options: [
      'Yes, more than once',
      'There was one moment',
      'No, it happened the way it was meant to',
      "I'd rather explain in my own words"
    ],
    required: true,
  },
  {
    id: 'q6',
    text: 'Do you think we met at the right time, even if we couldn\'t stay together?',
    type: 'radio-with-explain',
    options: [
      'Yes, I believe so',
      "No, I think our timing was wrong",
      "I'm still not sure",
      "I'd rather explain in my own words"
    ],
    required: true,
  },
  {
    id: 'q7',
    text: 'If you could talk to the version of me you first met, what would you tell him?',
    type: 'text',
    placeholder: 'Take your time with this one...',
    required: true,
  },
  {
    id: 'q8',
    text: "What's one thing about us that you'll never forget?",
    type: 'text',
    placeholder: 'A moment, a feeling, a small detail...',
    required: true,
  },
  {
    id: 'q9',
    text: "Did I ever make you feel loved in a way you'll remember?",
    type: 'radio-with-explain',
    options: [
      'Yes, in ways I still carry with me',
      'In some ways, yes',
      "I'm not sure anymore",
      "I'd rather explain in my own words"
    ],
    required: true,
  },
  {
    id: 'q10',
    text: 'Is there something you wanted to tell me but never got the chance to say?',
    type: 'text',
    placeholder: 'This is your chance, if you want it...',
    required: true,
  },
  {
    id: 'q11',
    text: 'If we could revisit one moment from our story, which moment would you choose?',
    type: 'text',
    placeholder: 'Describe the moment...',
    required: true,
  },
  {
    id: 'q12',
    text: 'What do you hope life brings to both of us from this point forward?',
    type: 'text',
    placeholder: 'Your hopes for the future...',
    required: true,
  },
];

export const galleryImages = [
  {
    src: '/gallery/memory1.jpg',
    caption: 'Walking beside you by the sea',
    date: 'The days we wished would never end',
  },
  {
    src: '/gallery/memory2.jpg',
    caption: 'Our quiet talks on rainy evenings',
    date: 'When the world felt just right',
  },
  {
    src: '/gallery/memory3.jpg',
    caption: 'Under the open sky, watching the lights',
    date: 'Till the stars lights up the sky again',
  },
];
