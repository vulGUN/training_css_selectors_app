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
    title: 'Select the plates',
    menuTitle: 'A',
    answer: 'plate',
    level: '1',
    code: [
      {
        startTag: '<div class="table">',
        endTag: '</div>',
        children: [
          { startTag: '<plate />', endTag: '' },
          { startTag: '<plate />', endTag: '' },
        ],
      },
    ],
  },
  {
    title: 'Select the fancy plate',
    menuTitle: '#ID',
    answer: '#fancy',
    level: '2',
    code: [
      {
        startTag: '<div class="table">',
        endTag: '</div>',
        children: [
          { startTag: '<plate />', endTag: '' },
          { startTag: '<plate id="fancy" />', endTag: '' },
          { startTag: '<bento />', endTag: '' },
        ],
      },
    ],
  },
  {
    title: 'Select the small apples',
    menuTitle: '.classname',
    answer: '.small',
    level: '3',
    code: [
      {
        startTag: '<div class="table">',
        endTag: '</div>',
        children: [
          { startTag: '<apple />', endTag: '' },
          { startTag: '<apple class="small" />', endTag: '' },
          {
            startTag: '<plate>',
            endTag: '</plate>',
            children: [{ startTag: '<apple class="small" />', endTag: '' }],
          },
          { startTag: '<plate />', endTag: '' },
        ],
      },
    ],
  },
  {
    title: 'Select the small oranges',
    menuTitle: 'A.className',
    answer: 'orange.small',
    level: '4',
    code: [
      {
        startTag: '<div class="table">',
        endTag: '</div>',
        children: [
          { startTag: '<apple />', endTag: '' },
          { startTag: '<apple class="small" />', endTag: '' },
          {
            startTag: '<bento>',
            endTag: '</bento>',
            children: [{ startTag: '<orange class="small" />', endTag: '' }],
          },
          { startTag: '<plate>', endTag: '</plate>', children: [{ startTag: '<orange />', endTag: '' }] },
          { startTag: '<plate>', endTag: '</plate>', children: [{ startTag: '<orange class="small" />', endTag: '' }] },
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
        startTag: '<div class="table">',
        endTag: '</div>',
        children: [
          { startTag: '<apple />', endTag: '' },
          { startTag: '<plate>', endTag: '</plate>', children: [{ startTag: '<orange class="small" />', endTag: '' }] },
          { startTag: '<bento />', endTag: '' },
          {
            startTag: '<bento>',
            endTag: '</bento>',
            children: [{ startTag: '<orange class="small" />', endTag: '' }],
          },
        ],
      },
    ],
  },
  {
    title: "Select every apple that's next to a plate",
    menuTitle: 'A + B',
    answer: 'plate + .small, plate + apple',
    level: '6',
    code: [
      {
        startTag: '<div class="table">',
        endTag: '</div>',
        children: [
          { startTag: '<plate>', endTag: '</plate>', children: [{ startTag: '<orange class="small" />', endTag: '' }] },
          { startTag: '<plate />', endTag: '' },
          { startTag: '<apple class="small" />', endTag: '' },
          { startTag: '<plate />', endTag: '' },
          { startTag: '<apple />', endTag: '' },
          { startTag: '<apple class="small" />', endTag: '' },
          { startTag: '<apple class="small" />', endTag: '' },
        ],
      },
    ],
  },
  {
    title: 'Select the 3rd plate',
    menuTitle: ':nth-child(A)',
    answer: 'plate:nth-child(3)',
    level: '7',
    code: [
      {
        startTag: '<div class="table">',
        endTag: '</div>',
        children: [
          { startTag: '<plate />', endTag: '' },
          { startTag: '<plate />', endTag: '' },
          { startTag: '<plate />', endTag: '' },
          { startTag: '<plate class="small" />', endTag: '' },
        ],
      },
    ],
  },
  {
    title: 'Select all even plates',
    menuTitle: ':nth-of-type(A)',
    answer: 'plate:nth-of-type(even)',
    level: '8',
    code: [
      {
        startTag: '<div class="table">',
        endTag: '</div>',
        children: [
          { startTag: '<plate />', endTag: '' },
          { startTag: '<plate />', endTag: '' },
          { startTag: '<plate />', endTag: '' },
          { startTag: '<plate />', endTag: '' },
          { startTag: '<plate class="small" />', endTag: '' },
          { startTag: '<plate />', endTag: '' },
        ],
      },
    ],
  },
  {
    title: 'Select the empty bentos',
    menuTitle: ':empty',
    answer: 'bento:empty',
    level: '9',
    code: [
      {
        startTag: '<div class="table">',
        endTag: '</div>',
        children: [
          { startTag: '<bento />', endTag: '' },
          { startTag: '<bento>', endTag: '</bento>', children: [{ startTag: '<orange class="small" />', endTag: '' }] },
          { startTag: '<plate />', endTag: '' },
          { startTag: '<bento />', endTag: '' },
        ],
      },
    ],
  },
  {
    title: 'Select the big apples',
    menuTitle: ':not(X)',
    answer: 'apple:not(.small)',
    level: '10',
    code: [
      {
        startTag: '<div class="table">',
        endTag: '</div>',
        children: [
          { startTag: '<plate>', endTag: '</plate>', children: [{ startTag: '<apple class="small" />', endTag: '' }] },
          { startTag: '<plate>', endTag: '</plate>', children: [{ startTag: '<apple />', endTag: '' }] },
          { startTag: '<apple />', endTag: '' },
          { startTag: '<plate>', endTag: '</plate>', children: [{ startTag: '<orange class="small" />', endTag: '' }] },
          { startTag: '<bento />', endTag: '' },
        ],
      },
    ],
  },
];
