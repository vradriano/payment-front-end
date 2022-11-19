import React, { useContext, createContext, useState, ReactNode, FC } from 'react'
import Toasty from '../components/Toasty'

interface ToastyProps {
  open: boolean;
  text: string;
  severity: "success" | "info" | "error";
}

interface Props {
  toasty: ToastyProps
  setToasty: (toasty: ToastyProps) => ToastyProps;
}

interface ChildrenProviderProps {
  children: ReactNode
}

const ToastyContext = createContext({} as Props | any)


export const ToastyProvider = ({ children }: ChildrenProviderProps) => {
  const [toasty, setToasty] = useState<ToastyProps | any>({
    open: false,
    text: '',
    severity: 'info'
  })

  return (
    <ToastyContext.Provider value={{ setToasty }}>
      <Toasty 
        open={toasty.open}
        severity={toasty.severity}
        text={toasty.text}
        onClose={() => setToasty({
          ...toasty,
          open: false,
        })}
      />
      {children}
    </ToastyContext.Provider>
  )
}

const useToasty = () => useContext<Props>(ToastyContext)

export default useToasty