import Check from "@/components/utils/Check.vue";
import X from "@/components/utils/X.vue";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { toast } from "vue-sonner";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function isJsonValid(json){
  try{ JSON.stringify(json); return true; } catch {}
}

export function showToast(type, title, description){
  toast[type](title, {
    description
  })
}

export function ISOtoReadable(ISOdate){
  console.log(ISOdate)
  const date = new Date(ISOdate)
  return `${String(date.getDate()).padStart(2,'0')}/${String(date.getMonth()+1).padStart(2,'0')}/${String(date.getFullYear()).substring(2,4)}`
}

export function prettifyNum(num){
  num = String(num)
  for(let i = num.length-3; i > 0; i-=3){
    num = num.substring(0,i) + ' ' + num.substring(i)
  }
  return num
}

export function joinArray(arr, func, join_string){
  let ret = ''
  for (let i = 0; i < arr.length; i++) {
    if (i != 0) ret += join_string
    ret += func(arr[i])
  }
  return ret
}

export function prettifyBool(bool){
  return bool ? Check : X
}