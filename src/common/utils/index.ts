export const noop = () => { };

export const identity = () => { };

export const jsonParse = <T = any>(jsonString: string): T | false => {
  if (!jsonString) {
    return false
  }
  try {
    return JSON.parse(jsonString);
  } catch (err) {
    return false;
  }
};
/**
 * 获取guid类型数据
 */
export const guid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
