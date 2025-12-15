// ========= Number → Words (Indian system) =========
function numberToWords(num) {
    num = num.toString().replace(/\D/g, "");
    if (!num) return "";
    if (num.length > 9) return "Number too large (max 99,99,99,999)";

    const ONES = [
        "",
        "One ",
        "Two ",
        "Three ",
        "Four ",
        "Five ",
        "Six ",
        "Seven ",
        "Eight ",
        "Nine ",
        "Ten ",
        "Eleven ",
        "Twelve ",
        "Thirteen ",
        "Fourteen ",
        "Fifteen ",
        "Sixteen ",
        "Seventeen ",
        "Eighteen ",
        "Nineteen "
    ];

    const TENS = [
        "",
        "",
        "Twenty ",
        "Thirty ",
        "Forty ",
        "Fifty ",
        "Sixty ",
        "Seventy ",
        "Eighty ",
        "Ninety "
    ];

    function twoDigitsToWords(n) {
        if (n === 0) return "";
        if (n < 20) return ONES[n];
        return TENS[Math.floor(n / 10)] + ONES[n % 10];
    }

    // CC LL TT H UU pattern (crore, lakh, thousand, hundred, last two) [web:6][web:16]
    num = ("000000000" + num).slice(-9);

    const crore = parseInt(num.slice(0, 2), 10);
    const lakh = parseInt(num.slice(2, 4), 10);
    const thousand = parseInt(num.slice(4, 6), 10);
    const hundred = parseInt(num.slice(6, 7), 10);
    const lastTwo = parseInt(num.slice(7), 10);

    let result = "";

    if (crore) result += twoDigitsToWords(crore) + "Crore ";
    if (lakh) result += twoDigitsToWords(lakh) + "Lakh ";
    if (thousand) result += twoDigitsToWords(thousand) + "Thousand ";
    if (hundred) result += ONES[hundred] + "Hundred ";
    if (lastTwo) result += (result ? "and " : "") + twoDigitsToWords(lastTwo);

    return result.trim();
}

// ========= Words → Number (Indian system) =========
function wordsToNumber(words) {
    if (!words) return "";

    const MAP = {
        zero: 0,
        one: 1,
        two: 2,
        three: 3,
        four: 4,
        five: 5,
        six: 6,
        seven: 7,
        eight: 8,
        nine: 9,
        ten: 10,
        eleven: 11,
        twelve: 12,
        thirteen: 13,
        fourteen: 14,
        fifteen: 15,
        sixteen: 16,
        seventeen: 17,
        eighteen: 18,
        nineteen: 19,
        twenty: 20,
        thirty: 30,
        forty: 40,
        fifty: 50,
        sixty: 60,
        seventy: 70,
        eighty: 80,
        ninety: 90,
        hundred: 100,
        thousand: 1000,
        lakh: 100000,
        crore: 10000000
    };

    let cleaned = words
        .toLowerCase()
        .replace(/ and /g, " ")
        .replace(/-/g, " ")
        .replace(/\s+/g, " ")
        .trim();

    if (!cleaned) return "";

    const tokens = cleaned.split(" ");
    let total = 0;
    let current = 0;

    for (const token of tokens) {
        const value = MAP[token];
        if (value === undefined) continue;

        if (value < 100) {
            current += value;
        } else if (value === 100) {
            current *= value;
        } else {
            current *= value;
            total += current;
            current = 0;
        }
    }

    total += current;
    return total.toString();
}

// ========= UI wiring =========
const numInput = document.getElementById("numInput");
const wordInput = document.getElementById("wordInput");
const numOutput = document.getElementById("numOutput");
const wordOutput = document.getElementById("wordOutput");

function setResult(element, text) {
    if (!text) {
        element.textContent = "Output will appear here…";
        element.classList.add("muted");
    } else {
        element.textContent = text;
        element.classList.remove("muted");
    }
}

// initial placeholders
setResult(numOutput, "");
setResult(wordOutput, "");

// live conversion events
numInput.addEventListener("input", () => {
    const clean = numInput.value.replace(/\D/g, "");
    numInput.value = clean;
    setResult(numOutput, clean ? numberToWords(clean) : "");
});

wordInput.addEventListener("input", () => {
    const value = wordInput.value;
    setResult(wordOutput, value ? wordsToNumber(value) : "");
});

// example defaults for teacher check
numInput.value = "103234";
setResult(numOutput, numberToWords("103234"));

wordInput.value = "one lakh thirty thousand thirty four";
setResult(wordOutput, wordsToNumber(wordInput.value));
