export type GameLevelType = {
  title: string;
  menuTitle: string;
  level: string;
  answer: string;
  code: CodeFragment[];
};

export type CodeFragment = {
  startTag: string;
  endTag: string;
  children?: CodeFragment[];
};

export const GAME_LEVELS: GameLevelType[] = [
  {
    title: 'Select the circles',
    menuTitle: 'A',
    answer: 'circle',
    level: '1',
    code: [
      {
        startTag: '<div class="container">',
        endTag: '</div>',
        children: [
          { startTag: '<circle />', endTag: '' },
          { startTag: '<circle />', endTag: '' },
        ],
      },
    ],
  },
  {
    title: 'Select the fancy circle',
    menuTitle: '#ID',
    answer: '#fancy',
    level: '2',
    code: [
      {
        startTag: '<div class="container">',
        endTag: '</div>',
        children: [
          { startTag: '<circle />', endTag: '' },
          { startTag: '<circle id="fancy" />', endTag: '' },
          { startTag: '<square />', endTag: '' },
        ],
      },
    ],
  },
  {
    title: 'Select the small bungs',
    menuTitle: '.classname',
    answer: '.small',
    level: '3',
    code: [
      {
        startTag: '<div class="container">',
        endTag: '</div>',
        children: [
          { startTag: '<bung />', endTag: '' },
          { startTag: '<bung class="small" />', endTag: '' },
          {
            startTag: '<circle>',
            endTag: '</circle>',
            children: [{ startTag: '<bung class="small" />', endTag: '' }],
          },
          { startTag: '<circle />', endTag: '' },
        ],
      },
    ],
  },
  {
    title: 'Select the small rectangles',
    menuTitle: 'A.className',
    answer: 'rectangle.small',
    level: '4',
    code: [
      {
        startTag: '<div class="container">',
        endTag: '</div>',
        children: [
          { startTag: '<bung />', endTag: '' },
          { startTag: '<bung class="small" />', endTag: '' },
          {
            startTag: '<square>',
            endTag: '</square>',
            children: [{ startTag: '<rectangle class="small" />', endTag: '' }],
          },
          { startTag: '<circle>', endTag: '</circle>', children: [{ startTag: '<rectangle />', endTag: '' }] },
          {
            startTag: '<circle>',
            endTag: '</circle>',
            children: [{ startTag: '<rectangle class="small" />', endTag: '' }],
          },
        ],
      },
    ],
  },
  {
    title: 'Select all the things!',
    menuTitle: '*',
    answer: '*',
    level: '5',
    code: [
      {
        startTag: '<div class="container">',
        endTag: '</div>',
        children: [
          { startTag: '<bung />', endTag: '' },
          {
            startTag: '<circle>',
            endTag: '</circle>',
            children: [{ startTag: '<rectangle class="small" />', endTag: '' }],
          },
          { startTag: '<square />', endTag: '' },
          {
            startTag: '<square>',
            endTag: '</square>',
            children: [{ startTag: '<rectangle class="small" />', endTag: '' }],
          },
        ],
      },
    ],
  },
  {
    title: "Select every bung that's next to a circle",
    menuTitle: 'A + B',
    answer: 'circle + .small, circle + bung',
    level: '6',
    code: [
      {
        startTag: '<div class="container">',
        endTag: '</div>',
        children: [
          {
            startTag: '<circle>',
            endTag: '</circle>',
            children: [{ startTag: '<rectangle class="small" />', endTag: '' }],
          },
          { startTag: '<circle />', endTag: '' },
          { startTag: '<bung class="small" />', endTag: '' },
          { startTag: '<circle />', endTag: '' },
          { startTag: '<bung />', endTag: '' },
          { startTag: '<bung class="small" />', endTag: '' },
          { startTag: '<bung class="small" />', endTag: '' },
        ],
      },
    ],
  },
  {
    title: 'Select the 3rd circle',
    menuTitle: ':nth-child(A)',
    answer: 'circle:nth-child(3)',
    level: '7',
    code: [
      {
        startTag: '<div class="container">',
        endTag: '</div>',
        children: [
          { startTag: '<circle />', endTag: '' },
          { startTag: '<circle />', endTag: '' },
          { startTag: '<circle />', endTag: '' },
          { startTag: '<circle class="small" />', endTag: '' },
        ],
      },
    ],
  },
  {
    title: 'Select all even squares',
    menuTitle: ':nth-of-type(A)',
    answer: 'square:nth-of-type(even)',
    level: '8',
    code: [
      {
        startTag: '<div class="container">',
        endTag: '</div>',
        children: [
          { startTag: '<square />', endTag: '' },
          { startTag: '<square />', endTag: '' },
          { startTag: '<square />', endTag: '' },
          { startTag: '<square />', endTag: '' },
          { startTag: '<square class="small" />', endTag: '' },
          { startTag: '<square />', endTag: '' },
        ],
      },
    ],
  },
  {
    title: 'Select the empty squares',
    menuTitle: ':empty',
    answer: 'square:empty',
    level: '9',
    code: [
      {
        startTag: '<div class="container">',
        endTag: '</div>',
        children: [
          { startTag: '<square />', endTag: '' },
          {
            startTag: '<square>',
            endTag: '</square>',
            children: [{ startTag: '<rectangle class="small" />', endTag: '' }],
          },
          { startTag: '<circle />', endTag: '' },
          { startTag: '<square />', endTag: '' },
        ],
      },
    ],
  },
  {
    title: 'Select the big bungs',
    menuTitle: ':not(X)',
    answer: 'bung:not(.small)',
    level: '10',
    code: [
      {
        startTag: '<div class="container">',
        endTag: '</div>',
        children: [
          {
            startTag: '<circle>',
            endTag: '</circle>',
            children: [{ startTag: '<bung class="small" />', endTag: '' }],
          },
          { startTag: '<circle>', endTag: '</circle>', children: [{ startTag: '<bung />', endTag: '' }] },
          { startTag: '<bung />', endTag: '' },
          {
            startTag: '<circle>',
            endTag: '</circle>',
            children: [{ startTag: '<rectangle class="small" />', endTag: '' }],
          },
          { startTag: '<square />', endTag: '' },
        ],
      },
    ],
  },
];
