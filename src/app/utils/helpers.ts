export const toSnakeCase = (str: string) =>
    str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);