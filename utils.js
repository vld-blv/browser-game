export function random(num) {
    return Math.ceil(Math.random() * num);
}

export function randomMinMax(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
