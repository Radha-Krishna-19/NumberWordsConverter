// Number to Words - Indian Numbering System [web:1]
function numberToWords(num) {
    const ones = ["", "One ", "Two ", "Three ", "Four ", "Five ", "Six ", "Seven ", "Eight ", "Nine ", "Ten ", "Eleven ", "Twelve ", "Thirteen ", "Fourteen ", "Fifteen ", "Sixteen ", "Seventeen ", "Eighteen ", "Nineteen "];
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    
    if ((num = num.toString()).length > 12) return "Number too large";
    
    num = ("000000000000" + num).substr(-12).match(/^(\d{2})(\d{2})(\d{3})(\d{3})(\d{2})$/);
    if (!num) return "";
    
    let str = "";
    str += num[1] != 0 ? (ones[Number(num[1])] || tens[num[1][0]] + " " + ones[num[1][1]]) + "Crore " : "";
    str += num[2] != 0 ? (ones[Number(num[2])] || tens[num[2][0]] + " " + ones[num[2][1]]) + "Lakh " : "";
    str += num[3] != 0 ? (ones[Number(num[3])] || tens[num[3][0]] + " " + ones[num[3][1]]) + "Thousand " : "";
    str += num[4] != 0 ? ones[Number(num[4])] + "Hundred " : "";
    str += num[5] != 0 ? (str != "" ? "and " : "") + (ones[Number(num[5])] || tens[num[5][0]] + " " + ones[num[5][1]]) : "";
    
    return str.trim();
}

// Words to Number - Indian Numbering System
function wordsToNumber(words) {
    const wordMap = {
        // Units
        'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5,
        'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
        'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14, 'fifteen': 15,
        'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19,
        
        // Tens
        'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50,
        'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90,
        
        // Indian scales
        'hundred': 100, 'thousand': 1000, 'lakh': 100000, 'crore': 10000000
    };
    
    words = words.toLowerCase().replace(/ and /g, ' ').replace(/\s+/g, ' ').trim();
    const wordsArray = words.split(' ');
    let total = 0, current = 0;
    
    for (let word of wordsArray) {
        if (wordMap[word] !== undefined) {
            if (wordMap[word] >= 100) {
                current *= wordMap[word];
                if (current >= 1000) total += current;
                current = 0;
            } else {
                current += wordMap[word];
            }
        }
    }
    
    total += current;
    return total.toString();
}

// Real-time event listeners
document.getElementById('numInput').addEventListener('input', function() {
    const num = this.value.replace(/\D/g, '');
    const output = document.getElementById('numOutput');
    output.textContent = num ? numberToWords(num) : '';
});

document.getElementById('wordInput').addEventListener('input', function() {
    const output = document.getElementById('wordOutput');
    output.textContent = this.value ? wordsToNumber(this.value) : '';
});

// Test examples
document.getElementById('numInput').value = '103234';
document.getElementById('wordInput').value = 'one lakh thirty thousand and thirty four';
