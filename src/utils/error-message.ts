import {Dispatch, SetStateAction} from "react";

export interface ErrorMessage {
    isError: boolean;
    message: string
}
export function setErrorMessage (isError:boolean,message:string,setError:Dispatch<SetStateAction<ErrorMessage>>) {
    setError(() => ({
        isError: isError,
        message: `${message}`
    }))
    if(isError) return false;
    if(!isError) return true;
}