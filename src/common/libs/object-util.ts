export class ObjectUtil {
  //
  parseJsonFields = (object: any) => {
    let result = {},
      k = '',
      v: any;
    for (const [key, value] of Object.entries(object)) {
      if (key.indexOf('Json') > -1 && value && typeof value === 'string') {
        v = JSON.parse(value);
      } else {
        v = value;
      }

      k = key;
      result = { ...result, [k]: v };
    }
    return result;
  };
}
