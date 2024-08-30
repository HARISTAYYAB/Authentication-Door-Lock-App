import AsyncStorage from "@react-native-async-storage/async-storage";
import React,{createContext, useState,useEffect} from "react";



//context
export const Authcontext=createContext()
export const Provider=({childern})=>{
    return(
        <Authcontext.Provider value={"text"} >
            {childern}
        </Authcontext.Provider>
    )
}

//provider
// const Authprovider=({childern})=>{
//     const [state,setstate]=useState({
//         user:null,
//         token:''
//     })
//     useEffect(() => {
//         const getlocastoragedta=async()=>{
//             let data=await AsyncStorage.getItem('@auth')
//             let loginData=JSON.parse(data)
//             setstate({...state,user:data?.user,token:data?.token})
          
//           } 
      

//           getlocastoragedta()  
//     }, [])
    
//     return(
//         <Authcontext.Provider value={[state,setstate]} >
//             {childern}

//         </Authcontext.Provider>   )

// }
// export{Authcontext,Authprovider}