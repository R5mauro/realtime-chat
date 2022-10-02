import React from 'react'

interface Props {
    msg: string
}

const Tooltip = ({ msg }: Props) => {
    return (
        <span>{msg}</span>
    )
}

export default Tooltip