const TIME_SUFFIXES = ['w', 'd', 'h', 'm', 's', 'ms'];


export function isFutureDate(date) {
  return (date -  new Date()) > 0;
}

export function formatDateDelta(delta) {
  const timePartsFormatted = [];
  const timeParts = decomposeDateDelta(delta);
  for (let i=0, part, suffix; i<timeParts.length; i++) {
    part = timeParts[i];
    suffix = TIME_SUFFIXES[i];
    if (part) {
      timePartsFormatted.push(`${part}${suffix}`);
      if (timePartsFormatted.length >= 2) {
        break;
      }
    }
  }
  return timePartsFormatted.join(', ');
}

function decomposeDateDelta(delta) {
  const timeParts = [];
  let rest = delta
  let part;
  [1000, 60, 60, 24, 7, 52].forEach(divisor => {
    [rest, part] = divMod(rest, divisor);
    timeParts.unshift(part);
  }, []);

  return timeParts;
}

function divMod(numerator, denominator) {
  const remainder = numerator % denominator;
  const integerResult = (numerator - remainder) / denominator;
  return [integerResult, remainder];
}
