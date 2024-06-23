export const PAGINATOR_ELIPSIS = -1;

export function numbers(min: number, max: number): number[] {
  const numbers = [];
  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }
  return numbers;
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export function nextIn(currentValue: any, allValues: any[]) {
  const indexOf = allValues.indexOf(currentValue);
  console.log({ currentValue, indexOf, allValues });
  if (indexOf === -1 || indexOf < allValues.length - 1) {
    return allValues[indexOf + 1];
  }
  return allValues[0];
}

export function valuesExcept(enums: any, valuesToExclude: string[]) {
  return Object.values(enums).filter((value) => !valuesToExclude.includes(value as string));
}

export function getPaginatorMiddleButtons(selectedPage: number, maxPages: number, threshold = 11): number[] {
  if (maxPages < threshold) {
    return numbers(1, maxPages);
  } else {
    threshold = clamp(5, threshold, maxPages);
    let min = Math.floor(selectedPage - (threshold - 1) / 2);
    let max = Math.ceil(selectedPage + (threshold - 1) / 2);
    if (min < 1) {
      const diff = 1 - min;
      min += diff;
      max += diff;
    } else if (max > maxPages) {
      const diff = max - maxPages;
      min -= diff;
      max -= diff;
    }
    const buttons = numbers(min, max);
    if (buttons[0] !== 1) {
      buttons[0] = 1;
      buttons[1] = PAGINATOR_ELIPSIS;
    } 
    if (buttons[buttons.length - 1] !== maxPages) {
      buttons[buttons.length - 1] = maxPages;
      buttons[buttons.length - 2] = PAGINATOR_ELIPSIS;
    }
    return buttons;
  }
}