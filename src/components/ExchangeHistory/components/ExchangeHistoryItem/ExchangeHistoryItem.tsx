import React, { ChangeEvent, useCallback, useState } from 'react'
import { toast } from 'react-toastify'

import styles from './ExchangeHistoryItem.scss'

import { useDispatch, useSelector } from 'hooks/redux'
import { ExchangeResultItem } from 'components/ExchangeResultItem'
import { Button } from 'components/ui/Button'
import { deleteItem } from 'store/slices/exchangeHistory'
import { Input } from 'components/ui/Input'
import { Select, SelectOption } from 'components/ui/Select'
import { CurrencyCode } from 'types/api'
import { getExchangeResult } from 'utils/getExchangeResult'
import { currencyRateSelector } from 'store/selectors/currencyRateSelector'

interface Props {
    itemKey: string
    amount: number
    from: CurrencyCode
    to: CurrencyCode
}

type NotifyOption = 'more' | 'less'

interface Notification {
    key: string
    notifyAmount: number
    notifyOption: NotifyOption
}

const notifyOptions: SelectOption[] = [
    { value: 'more', caption: 'more' },
    { value: 'less', caption: 'less' },
]

export const ExchangeHistoryItem: React.FC<Props> = ({
    itemKey,
    amount,
    from,
    to,
}) => {
    const dispatch = useDispatch()
    const [isShowNotificationForm, setIsShowNotificationForm] = useState(false)
    const [notifyOption, setNotifyOption] = useState<NotifyOption>()
    const [notifyAmount, setNotifyAmount] = useState<number>()
    const [notifications, setNotifications] = useState<Notification[]>([])

    const handleChangeNotifyAmount = (event: ChangeEvent<HTMLInputElement>) => {
        setNotifyAmount(Number(event.target.value))
    }

    const handleClickSaveNotificationButton = useCallback(() => {
        if (
            notifyOption === undefined ||
            notifyAmount === undefined ||
            notifyAmount < 0
        ) {
            return
        }
        const key = `${notifyOption}${notifyAmount}`
        setNotifications((state) => {
            if (state.find((item) => item.key === key)) {
                return state
            }
            return [
                ...state,
                {
                    key,
                    notifyAmount,
                    notifyOption,
                },
            ]
        })
        setIsShowNotificationForm(false)
    }, [notifyAmount, notifyOption])

    const handleClickDeleteNotificationButton = (key: string) => {
        setNotifications((items) => items.filter((item) => item.key !== key))
    }

    const handleSelectNotifyOption = (
        event: ChangeEvent<HTMLSelectElement>
    ) => {
        setNotifyOption(event.target.value as NotifyOption)
    }

    const rateFrom = useSelector((state) => currencyRateSelector(state, from))
    const rateTo = useSelector((state) => currencyRateSelector(state, to))
    const exchangeResult = getExchangeResult({ amount, rateFrom, rateTo })
    console.log('notifications', notifications)
    return (
        <div>
            <div className={styles.itemWrapper}>
                <ExchangeResultItem
                    amount={amount}
                    from={from}
                    to={to}
                    result={exchangeResult}
                />
                <Button
                    onClick={() => dispatch(deleteItem(itemKey))}
                    color="red-white"
                >
                    Delete
                </Button>
            </div>
            {notifications.map(({ key, notifyAmount, notifyOption }) => {
                console.log('exchangeResult', exchangeResult)
                console.log('notifyAmount', notifyAmount)
                console.log('notifyOption', notifyOption)
                if (notifyOption === 'less' && exchangeResult < notifyAmount) {
                    toast(`${amount} ${from} less than ${notifyAmount} ${to}`)
                } else if (
                    notifyOption === 'more' &&
                    exchangeResult > notifyAmount
                ) {
                    toast(`${amount} ${from} more than ${notifyAmount} ${to}`)
                }
                return (
                    <div key={key}>
                        {`${notifyOption} than ${notifyAmount}`}{' '}
                        <span
                            className={styles.deleteNotificationButton}
                            onClick={() =>
                                handleClickDeleteNotificationButton(key)
                            }
                        >
                            [x]
                        </span>
                    </div>
                )
            })}
            {!isShowNotificationForm && (
                <Button
                    onClick={() => setIsShowNotificationForm(true)}
                    color="blue-white"
                >
                    Notify
                </Button>
            )}
            {isShowNotificationForm && (
                <div className={styles.notifyForm}>
                    Notify me if the amount becomes
                    <Select
                        placeholder="less | more"
                        onChange={handleSelectNotifyOption}
                        options={notifyOptions}
                    />
                    than
                    <Input onChange={handleChangeNotifyAmount} type="number" />
                    <Button
                        onClick={() => setIsShowNotificationForm(false)}
                        className={styles.notifyFormButton}
                        color="white-blue"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleClickSaveNotificationButton}
                        className={styles.notifyFormButton}
                        color="white-green"
                    >
                        Save
                    </Button>
                </div>
            )}
        </div>
    )
}
