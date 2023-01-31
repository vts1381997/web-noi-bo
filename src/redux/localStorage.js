export const loadState = () => {
    var store=null
    try{
        store = localStorage.getItem('reduxState');
        if(store === null){
            return undefined
        }
    }
    catch{
        return undefined
    }

    return JSON.parse(store)
   
}


export const saveState= (state) => {
    try{
        localStorage.setItem('reduxState', JSON.stringify(state))
   }
   catch{
       return undefined
   }

    
}