// 驼峰转换下划线
export const humpToLine = (name: string) =>
  name.replace(/([A-Z])/g, '_$1').toLowerCase();
