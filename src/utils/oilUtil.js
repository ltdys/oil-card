/**
 * js使用公共方法合集
 */

 /**
  * 图片压缩（vantUI）
  */
export const compressImage = (file) => {
  if (!file) return;
  // 创建Canvas对象(画布)
  let canvas =  document.createElement('canvas')  
  // 获取对应的CanvasRenderingContext2D对象(画笔)
  let context = canvas.getContext('2d') 
  // 创建新的图片对象 
  let img = new Image()
  if(/\/(?:jpeg|png)/i.test(file.file.type) && file.file.size > 102400) {
    // 指定图片的DataURL(图片的base64编码数据)
    img.src = file.content
    // 监听浏览器加载图片完成，然后进行进行绘制
    img.onload = () => {
      // 指定canvas画布大小，该大小为最后生成图片的大小
      canvas.width = 300
      canvas.height = 300
      /* drawImage画布绘制的方法。(0,0)表示以Canvas画布左上角为起点，400，300是将图片按给定的像素进行缩小。
      如果不指定缩小的像素图片将以图片原始大小进行绘制，图片像素如果大于画布将会从左上角开始按画布大小部分绘制图片，最后的图片就是张局部图。*/ 
      context.drawImage(img, 0, 0, 300, 300)
      // 将绘制完成的图片重新转化为base64编码，file.file.type为图片类型，0.92为默认压缩质量
      let base64 = canvas.toDataURL(file.file.type, 0.92)
      // 最后将base64编码的图片保存到数组中，留待上传。
      imgChangeForm(base64)
      // return base64
    }                       
  }else{
    // 不做处理的jpg和png以及gif直接保存到数组
    let base64 = canvas.toDataURL(file.file.type, 0.92)
    imgChangeForm(base64)
    // return base64
  }
}

/**
 * 图片base64转化form表单格式
 */
export const imgChangeForm = (base64) => {
  let bytes = window.atob(base64.split(',')[1]);
  let array = [];
  for(let i = 0; i < bytes.length; i++){
    array.push(bytes.charCodeAt(i));
  }
  let blob = new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  let fd = new FormData();
  fd.append('file',blob, Date.now() + '.jpg');
  return fd
}