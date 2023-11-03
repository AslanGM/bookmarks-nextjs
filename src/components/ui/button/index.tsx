import { Icon } from '@components'
import classNames from 'classnames'
import { FC, ReactNode } from 'react'
import styles from './button.module.scss'

type ButtonProps = {
    children: ReactNode
    onClick?: () => void
    icon?: string
    className?: string
    color?: 'brown' | 'blue' | 'red' | 'green' | 'purple' | 'beige' | 'yellow'
    type?: 'button' | 'submit' | 'reset'
}

const Button: FC<ButtonProps> = ({ children, onClick, icon, className, color, type }) => {
    const buttonClassNames = classNames(
        styles.button,
        className,
        color && `${styles['button--' + color]}`
    )

    return (
        <button
            className={buttonClassNames}
            onClick={onClick}
            type={type}
        >
            {icon && <Icon name={icon} />}
            {children}
        </button>
    )
}

export default Button
