export const parseToNumberArray = (val?: string | number | Array<string | number | object>): number[] => {
    if (val === undefined || val === null) return [];
    let arr: (string | number)[] = [];
    if (Array.isArray(val)) {
      arr = val.map(v => {
        if (typeof v === 'object') return '';
        return String(v);
      });
    } else if (typeof val === 'object') {
      return []; 
    } else {
      arr = String(val).split(',');
    }
    return arr.map(Number).filter(n => !isNaN(n));
  };