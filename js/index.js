const ROMAJI_INPUT = document.getElementById('romaji-input');
const HIRAGANA_INPUT = document.getElementById('hiragana-input');
const KATAKANA_INPUT = document.getElementById('katakana-input');

// Translation functionality
ROMAJI_INPUT.addEventListener('keyup', () => {
    HIRAGANA_INPUT.value = wanakana.toHiragana(ROMAJI_INPUT.value);
    KATAKANA_INPUT.value = wanakana.toKatakana(ROMAJI_INPUT.value);
});

HIRAGANA_INPUT.addEventListener('keyup', () => {
    ROMAJI_INPUT.value = wanakana.toRomaji(HIRAGANA_INPUT.value);
    KATAKANA_INPUT.value = wanakana.toKatakana(HIRAGANA_INPUT.value);
});

KATAKANA_INPUT.addEventListener('keyup', () => {
    ROMAJI_INPUT.value = wanakana.toRomaji(KATAKANA_INPUT.value);
    HIRAGANA_INPUT.value = wanakana.toHiragana(KATAKANA_INPUT.value);
});

// Copy textarea functionality
function copyRomaji() {
    navigator.clipboard.writeText(ROMAJI_INPUT.value);
}
function copyHiragana() {
    navigator.clipboard.writeText(HIRAGANA_INPUT.value);
}
function copyKatakana() {
    navigator.clipboard.writeText(KATAKANA_INPUT.value);
}

// Clear textareas functionality
function clearInputs() {
    ROMAJI_INPUT.value = ""
    HIRAGANA_INPUT.value = ""
    KATAKANA_INPUT.value = ""
}