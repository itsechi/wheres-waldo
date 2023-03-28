import { getStorage, ref, getDownloadURL } from 'firebase/storage';

export const generateCharacters = () => {
  const storage = getStorage();
  const finalCharacters = [];

  const allCharacters = [
    'abigail',
    'alex',
    'caroline',
    'clint',
    'demetrius',
    'elliott',
    'emily',
    'george',
  ];

  function shuffleArray(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  const threeCharacters = shuffleArray(allCharacters).slice(0, 3);

  threeCharacters.forEach((char) => {
    const pathReference = ref(storage, `${char}.png`);
    getDownloadURL(pathReference).then((url) => {
      return finalCharacters.push({
        name: char,
        img: url,
        found: false,
      });
    });
  });
  return finalCharacters;
};
