import { useState } from 'react'

 interface ErrorHook {
    showError: boolean
    errorMesg: string
    setShowErrorMesg: (msg: string) => void
   }

 const useErrorMesg = (): ErrorHook => {
    const [showError, setShowError] = useState<boolean>(false);
    const [errorMesg, setErrorMesg] = useState<string>('');

    const setShowErrorMesg = (msg: string) => {
        setShowError(true)
        setErrorMesg(msg)
        setTimeout(() => {
            setShowError(false);
        }, 5000);
    }

    return { showError, errorMesg, setShowErrorMesg }
 }

export default useErrorMesg