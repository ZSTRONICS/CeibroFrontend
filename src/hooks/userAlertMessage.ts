/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'

 interface ErrorHook {
    showAlert: boolean
    alertMessage: string
    setAlertMessage: (msg: string) => void
   }

 const userAlertMessage = (): ErrorHook => {
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const [alertMessage, setAlertMsg] = useState<string>('');

    const setAlertMessage = (msg: string) => {
        setShowAlert(true)
        setAlertMsg(msg)
        setTimeout(() => {
            setShowAlert(false);
        }, 5000);
    }

    return { showAlert, alertMessage, setAlertMessage }
 }

export default userAlertMessage