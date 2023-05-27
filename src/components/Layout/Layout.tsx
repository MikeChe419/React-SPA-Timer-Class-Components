import React from "react"
import styles from './layout.module.css'

interface IlayoutProps {
    children?: React.ReactNode
}

const Layout = ({children}: IlayoutProps) => {
    return (
        <>
            {children}
        </>
    )
}

export default Layout
