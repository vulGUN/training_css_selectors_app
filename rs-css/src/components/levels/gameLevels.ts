type GameLevelType = {
  title: string;
  menuTitle: string;
  level: string;
  answer: string;
  code: CodeFargment[];
};

type CodeFargment = {
  codeText: string;
  children?: CodeFargment[];
};

export const GAME_LEVELS: GameLevelType[] = [
  {
    title: 'Select the fancy plate',
    menuTitle: '#ID',
    answer: '#fancy',
    level: '1',
    code: [
      { codeText: '<div class="table">' },
      { codeText: '<plate id="fancy" />' },
      { codeText: '<plate />' },
      { codeText: '<bento />' },
      { codeText: '</div>' },
    ],
  },
  {
    title: 'Select the small apples',
    menuTitle: '.classname',
    answer: '.small',
    level: '2',
    code: [
      { codeText: '<div class="table">' },
      { codeText: '<apple />' },
      { codeText: '<apple class="small" />' },
      { codeText: '<plate>' },
      { codeText: '<apple class="small" />' },
      { codeText: '</plate>' },
      { codeText: '<plate />' },
      { codeText: '</div>' },
    ],
  },
  {
    title: 'Select the small oranges',
    menuTitle: 'A.className',
    answer: 'orange.small',
    level: '3',
    code: [
      { codeText: '<div class="table">' },
      { codeText: '<apple />' },
      { codeText: '<apple class="small" />' },
      { codeText: '<bento>' },
      { codeText: '<orange class="small" />' },
      { codeText: '</bento>' },
      { codeText: '<plate>' },
      { codeText: '<orange />' },
      { codeText: '</plate>' },
      { codeText: '<plate>' },
      { codeText: '<orange class="small" />' },
      { codeText: '</plate> }' },
      { codeText: '</div>' },
    ],
  },
];
