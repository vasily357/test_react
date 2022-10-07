import React, { InputHTMLAttributes } from 'react'
import classNames from 'classnames'

import styles from './Input.scss'

export const Input: React.FC<InputHTMLAttributes<HTMLElement>> = ({
    className,
    ...restProps
}) => {
    return (
        <input
            className={classNames(styles.baseInput, className)}
            {...restProps}
        />
    )
}
