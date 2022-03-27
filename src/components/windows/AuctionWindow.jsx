import cn from 'classnames'
import React, { useState } from 'react'
import config from '../../config.json'
import { useUAL } from '../../hooks/ual'
import ErrorMessage from '../common/util/ErrorMessage'
import Input from '../common/util/input/Input'
import { formatNumber } from '../helpers/Helpers'
import LoadingIndicator from '../loadingindicator/LoadingIndicator'
import { announceAuctionAction } from '../wax/Wax'
import WindowButton from './WindowButton'
import WindowContent from './WindowContent'

function AuctionWindow(props) {
    const asset = props['asset']

    const { collection, schema, name, data, asset_id } = asset

    const image = data['img'] ? (data['img'].includes('http') ? data['img'] : config.ipfs + data['img']) : ''

    const video = data['video'] ? (data['video'].includes('http') ? data['video'] : config.ipfs + data['video']) : ''

    const ual = useUAL()

    const activeUser = ual['activeUser']

    const callBack = props['callBack']

    const userName = activeUser ? activeUser['accountName'] : null
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState()
    const closeCallBack = props['closeCallBack']
    const [sellPrice, setSellPrice] = useState(0)
    const [days, setDays] = useState(1)
    const [hours, setHours] = useState(0)
    const [minutes, setMinutes] = useState(0)

    let cut = sellPrice - 0.04 * sellPrice
    if (collection['market_fee']) cut = cut - collection['market_fee'] * sellPrice

    const auction = async () => {
        if (!sellPrice) return
        const quantity = parseFloat(sellPrice)
        closeCallBack()
        setIsLoading(true)
        try {
            await announceAuctionAction(asset_id, days, hours, minutes, quantity, activeUser)
            callBack({ auctioned: true })
        } catch (e) {
            console.error(e)
            callBack({ auctioned: false, error: e.message })
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }

    const cancel = () => {
        callBack({ auctioned: false })
        closeCallBack()
    }

    const changePrice = (e) => {
        const val = e.target.value
        if (/^\d*\.?\d*$/.test(val)) setSellPrice(val)
    }

    const changeHours = (e) => {
        const val = e.target.value
        if (/^\d*$/.test(val)) setHours(val)
    }

    const changeMinutes = (e) => {
        const val = e.target.value
        if (/^\d*$/.test(val)) setMinutes(val)
    }

    const changeDays = (e) => {
        const val = e.target.value
        if (/^\d*$/.test(val)) setDays(val)
    }

    return (
        <div
            className={cn(
                'fixed top-1/2 transform -translate-y-1/2',
                'left-1/2 transform -translate-x-1/2',
                'w-11/12 max-w-popup lg:max-w-popup-lg h-auto',
                'max-h-popup md:max-h-popup-lg',
                'p-3 lg:p-8 m-0 overflow-y-auto',
                'text-sm text-neutral font-light opacity-100',
                'bg-paper rounded-xl shadow-lg z-40',
                'backdrop-filter backdrop-blur-lg',
            )}
        >
            <img
                className="absolute z-50 cursor-pointer top-4 right-4 w-4 h-4 "
                onClick={cancel}
                src="/close_btn.svg"
                alt="X"
            />
            <div className="text-xl sm:text-2xl md:text-3xl mt-4 lg:mt-0 text-center">CLAIM YOUR RMX TOKEN</div>
            <div className="text-base sm:text-lg text-center my-0 md:my-4">
                {`You can claim only 1 time every 24 hours.`}
            </div>
            <div className="text-base sm:text-lg text-center my-0 md:my-4">
                {`(Write "101" in the field to accept)`}
            </div>
            {error ? <ErrorMessage error={error} /> : ''}

            
            <div className="relative">

                
            <div className={cn('relative m-auto lg:mb-10 py-0', 'flex flex-row items-center justify-evenly')}>
                    
                        <div className="flex items-center">100 + 1 =</div>
                        <div className={cn('flex flex-row', 'items-center')}>
                            <Input
                                type="text"
                                className="w-full bg-gray-700"
                                placeholder="101"
                                onChange={changePrice}
                                value={sellPrice ? sellPrice : ''}
                            />
                        </div>
                   
                    
                </div>


                
                {collection['market_fee'] || collection['market_fee'] === 0 ? (
                    <div>
                        
                    </div>
                ) : (
                    <LoadingIndicator />
                )}
                <div className={cn('relative m-auto mt-5 lg:mt-8 h-20 lg:h-8', 'flex justify-evenly lg:justify-end')}>
                    <WindowButton text="Cancel" onClick={cancel} className="text-neutral bg-paper border-neutral" />
                    <WindowButton
                        text="Claim"
                        onClick={auction}
                        disabled={
                            !sellPrice ||
                            ((!days || days === '0') && (!hours || hours === '0') && (!minutes || minutes === '0'))
                                ? 'disabled'
                                : ''
                        }
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="absolute t-0 w-full h-full backdrop-filter backdrop-blur-md">
                    <LoadingIndicator text="Loading Transaction" />
                </div>
            ) : (
                ''
            )}
        </div>
    )
}

export default AuctionWindow
