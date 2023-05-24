function countOccurrences(str, letter) {
    const occurrences = str.split("").filter((char) => char === letter);
    return occurrences.length;
}

export default function allowAddLetter(currentWord, letter, addedWord) {
    const countInCurrentWord = countOccurrences(currentWord, letter);
    const countInAddedWord = countOccurrences(addedWord.join(""), letter);

    return countInCurrentWord > countInAddedWord;
}
