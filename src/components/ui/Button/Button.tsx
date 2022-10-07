import classNames from 'classnames'
import React, { ButtonHTMLAttributes } from 'react'

import styles from './Button.scss'

export interface Props extends ButtonHTMLAttributes<HTMLElement> {
    color?:
        | 'green'
        | 'green-white'
        | 'white-green'
        | 'blue-white'
        | 'white-blue'
        | 'red-white'
        | 'white-red'
}

export const Button: React.FC<Props> = ({
    className,
    children,
    color = 'blue-white',
    ...restProps
}) => {
    return (
        <button
            type="button"
            className={classNames(styles.button, className, {
                [styles?.[color]]: true,
            })}
            {...restProps}
        >
            <span className={styles.buttonFont}>{children}</span>
        </button>
    )
}
