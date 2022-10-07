export const getExchangeResult = ({
    amount,
    rateFrom,
    rateTo,
}: {
    amount?: number
    rateFrom?: number
    rateTo?: number
}) => {
    if (
        amount === undefined ||
        amount < 0 ||
        rateFrom === undefined ||
        rateFrom < 0 ||
        rateTo === undefined ||
        rateTo < 0
    ) {
        return 0
    }
    return amount * (rateTo / rateFrom)
}
