const dictionary = require('./dictionary');

const numbers = {
	"2": "abc",
	"3": "def",
	"4": "ghi",
	"5": "jkl",
	"6": "mno",
	"7": "pqrs",
	"8": "tuv",
	"9": "wxyz"
}

const letterToNum = (letter) => {
	const values = Object.values(numbers)
	const keys = Object.keys(numbers)
	for(let i = 0; i < keys.length; i++) {
		if(values[i].includes(letter)) {
			return keys[i];
		}
	}
}

const numberToWords = (phoneNumber) => {
	let words = [];

	dictionary.forEach((word, commonRating) => {
		if(word.length === phoneNumber.length) {
			for(let i = 0; i < word.length; i++) {
				if(letterToNum(word[i]) !== phoneNumber[i]) {
					return;
				}
			}

			words.push({word, commonRating });
		}
	});

	return words;
}

const getAllWords = (phoneNumber) => {
	let words = [];

	(() => {
		const total = numberToWords(phoneNumber);
		if(total.length > 0) {
			words = words.concat(total);
		}
	})();

	for(let i = 1; i < phoneNumber.length; i++) {
		const left = numberToWords(phoneNumber.slice(0, i))
		const right = numberToWords(phoneNumber.slice(i, phoneNumber.length))
		if(left.length > 0 && right.length > 0) {
			left.forEach((litem) => {
				right.forEach((ritem) => {
					words.push(
						{
							word: litem.word + " " + ritem.word,
							commonRating: litem.commonRating + ritem.commonRating
						}
					);
				});
			})
		}
	}

	words.sort( (a, b) => {return a.commonRating - b.commonRating} );
	return words.map((w, i) => w.word);
}

console.log(getAllWords('675823386').join('\n'))