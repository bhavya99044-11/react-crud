export const paramValidation = (data) =>{

   if(data.get('skip') && !Number.isInteger(Number(data.get('skip')))){
        return true;
   }
   return false;
}
