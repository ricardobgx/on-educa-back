export const randInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateDuelCode = (codeSize: number): string => {
  const characters = [
    'A',
    'B',
    'C',
    'D',
    'E',
    'F',
    'G',
    'H',
    'I',
    'J',
    'K',
    'L',
    'M',
    'N',
    'O',
    'P',
    'Q',
    'R',
    'S',
    'T',
    'U',
    'V',
    'W',
    'X',
    'Y',
    'Z',
    '0',
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
  ];
  let code = '';

  for (let i = 0; i < codeSize; i++) {
    const characterIndex = randInt(0, characters.length - 1);

    code += characters[characterIndex];
  }

  return code;
};

export const getFullDate = (date?: Date): string => {
  const now = date ? new Date(date) : new Date();

  const day = now.getUTCDate();
  const month = now.getUTCMonth() + 1;
  const year = now.getUTCFullYear();

  return `${day}/${month}/${year}`;
};
