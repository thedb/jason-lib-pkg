/**
 * 
 * @param {二进制图形数据} blob 
 */
export function blobToImg(blob) {
  return new Promise((resolve, reject) => {
    const url = window.URL.createObjectURL(blob);
    const img = document.createElement('img');
    img.src = url
    img.onload = () => {
      resolve(img);
      // window.URL.revokeObjectURL(img.src);
    }
    img.error = () => {
      reject(null);
    }
  })
}
/**
 * 
 * @param {*} canvas 
 * @param {DOMString} type 指定图片格式，默认格式为image/png
 * @param {Number} encoderOptions 值在0与1之间，当请求图片格式为image/jpeg或者image/webp时用来指定图片展示质量。
 */
export function canvasToBlob(canvas, type, encoderOptions) {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(blob)
    }, type, encoderOptions)
  })
}

/**
 * 
 * @param {Object} pointA 必须包含x,y 
 * @param {Object} pointB 必须包含x,y 
 */
export function getPointsLength(pointA, pointB) {
  return Math.sqrt(Math.pow((pointA.x - pointB.x), 2) + Math.pow((pointA.y - pointB.y), 2));
}

/**
 * 
 * @param {String} src 
 */
export async function addImg(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = () => reject(null);
  });
}

/**
 * 
 * @param {Object} img 
 * @param {Number} ratio 压缩倍率
 * @param {Number} encoderOptions 压缩精度 0~1 
 * @param {String} type  image/png, 默认格式为image/png
 */
export async function canvasCompress(img, ratio = 1, encoderOptions = 1, type = 'image/png') {
  return new Promise(async(resolve) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.naturalWidth / ratio
    canvas.height = img.naturalHeight / ratio;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    const compress = await canvasToBlob(canvas, type, encoderOptions);
    // 二进制图片;
    const compressImage = await blobToImg(compress); 
    // Image对象
    resolve(compressImage);
  })
}

/**
 * 获取url '?' 后参数
 */
export function getUrlParams() {
  const url = window.location.href;
  const params = new Object();
  if (url.indexOf('?') != -1) {
    const paramsString = url.split('?')[1];
    const paramsArr = paramsString.split('&');
    for(let i = 0; i < paramsArr.length; i ++) {
      params[paramsArr[i].split('=')[0]] = decodeURIComponent(paramsArr[i].split("=")[1]).replace(/#\/.*/, '');
    }
  }
  return params;
}