/**
 *  判断对象是否为空
 * @param：data[object] 数据
 **/
export const isEmptyObject = (data) => JSON.stringify(data) === '{}';

/**
 *  判断传入参数的类型，以字符串的形式返回
 *  @param：数据
 **/
export const dataType = (obj) => {
  if (obj === null) return 'Null';
  if (obj === undefined) return 'Undefined';
  return Object.prototype.toString.call(obj).slice(8, -1);
};

/**
 * 处理对象参数值，排除对象参数值为”“、null、undefined，并返回一个新对象
 * @param：data[object] 数据
 * @param：isDeep[boolean] 是否深度删除(如果不开启深度清除，则多层对象则返回空对象，反之key值则被删除)
 **/
export const dealObjectEmptyValue = (data, isDeep = true) => {
  const param = {};
  if (data === null || data === undefined || data === '') return param;
  for (const key in data) {
    if (dataType(data[key]) === 'Object') {
      const _value = dealObjectEmptyValue(data[key], isDeep);
      if ((!isDeep) || isDeep && !isEmptyObject(_value)) {
        param[key] = _value;
      }
    } else if (data[key] !== null && data[key] !== undefined && data[key] !== '') {
      param[key] = data[key];
    }
  }
  return param;
};
