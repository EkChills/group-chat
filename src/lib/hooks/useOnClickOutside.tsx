import { RefObject, useEffect } from "react";

const useOnclickOutside = (refObj:RefObject<any>, closeAction:(e:Event) => void) => {
  useEffect(() => {
   const handler = (event:Event) => {
     const el = refObj?.current
     console.log(el);
     
     if(!el || el.contains(event.target as Node) || null) {      
       return
     }
     closeAction(event)
   }

   document.addEventListener('mousedown', handler)
   document.addEventListener('touchstart', handler)

   return () => {
    document.removeEventListener('mousedown', handler)
    document.removeEventListener('touchstart', handler)
   }
  },[refObj]) 
}

export {useOnclickOutside}