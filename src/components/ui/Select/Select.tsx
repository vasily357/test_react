import React, { SelectHTMLAttributes } from 'react'
import classNames from 'classnames'

import styles from './Select.scss'

export interface SelectOption {
    value: string | number
    caption: string
}

export interface Props extends SelectHTMLAttributes<HTMLElement> {
    options: SelectOption[]
}

export const Select: React.FC<Props> = ({
    className,
    placeholder,
    options,
    ...restProps
}) => {
    return (
        <select
            className={classNames(styles.baseSelect, className)}
            {...restProps}
        >
            <option value="" disabled selected>
                {placeholder}
            </option>
            {options.map(({ caption, value }, i) => (
                <option value={value} key={i}>
                    {caption}
                </option>
            ))}
        </select>
    )
}
