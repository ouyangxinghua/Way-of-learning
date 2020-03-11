export default function (len = 32){
  const $chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
  const max = $chars.length;
  let str = ''
  for (i = 0; i < len; i++){
      str += $chars.charAt(Math.floor(Math.random() * max))
  }
  return str
}