export const paramValidation = (data) =>{

   if(data.get('skip') && !Number.isInteger(Number(data.get('skip')))){
    console.log('eerrro caught')
        return true;
   }
   return false;
}
