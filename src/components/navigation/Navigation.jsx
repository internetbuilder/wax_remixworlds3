import { Menu, Transition } from '@headlessui/react'
import cn from 'classnames'
import { useRouter } from 'next/router'
import React, { Fragment, useEffect, useMemo, useState } from 'react'
import { getRefundBalance, getWaxBalance } from '../../api/fetch'
import config from '../../config.json'
import { useUAL } from '../../hooks/ual'
import Link from '../common/util/input/Link'
import Logo from '../common/util/Logo'
import { formatNumber } from '../helpers/Helpers'
import LoadingIndicator from '../loadingindicator/LoadingIndicator'

const useClaimRefund = (userName, activeUser, setBalance, setRefundBalance) => {
    const [isLoading, setIsLoading] = useState(false)
    const claimRefund = async (quantity) => {
        try {
            setIsLoading(true)
            await activeUser.signTransaction(
                {
                    actions: [
                        {
                            account: 'freecitygamx',
                            name: 'wthtoken',
                            authorization: [
                                {
                                    actor: userName,
                                    permission: activeUser.requestPermission,
                                },
                            ],
                            data: {
                                wallet: userName,
                                quantity: `${quantity.toFixed(8)} RMX`,
                            },
                        },
                    ],
                },
                {
                    expireSeconds: 300,
                    blocksBehind: 0,
                },
            )
        } catch (e) {
            console.error(e)
        } finally {
            // this seems scetchy... should update
            setTimeout(function () {
                getWaxBalance(userName).then(setBalance)
                getRefundBalance(userName).then(setRefundBalance)
                setIsLoading(false)
            }, 2000)
        }
    }
    return { claimRefund, isLoading }
}

const Navigation = React.memo((props) => {
    const router = useRouter()

    const [balance, setBalance] = useState(0)
    const [refundBalance, setRefundBalance] = useState(0)

    const ual = useUAL()
    const activeUser = ual['activeUser']
    const userName = activeUser ? activeUser['accountName'] : null

    const { claimRefund, isLoading } = useClaimRefund(userName, activeUser, setBalance, setRefundBalance)

    const performLogin = useMemo(() => ual?.showModal, [ual.showModal])
    const performLogout = useMemo(() => ual?.logout, [ual.logout])

    useEffect(() => {
        // when there is no userName, this would ask for any users balances
        // that user might have a balance and you'll get a flash of data until it correctly
        // updates with the userName
        if (userName) {
            getWaxBalance(userName).then(setBalance)
            getRefundBalance(userName).then(setRefundBalance)
        }
    }, [userName])

    return (
        <div className="fixed w-full h-36 md:h-28 bg-page shadow-sm border-b border-paper z-30">
            <div className={cn('relative container mx-auto', 'flex flex-col md:flex-row justify-between items-center')}>
                <Logo />
                <div
                    className={cn(
                        'w-full flex-wrap md:w-auto flex flex-row justify-between gap-y-1 md:gap-x-4 items-center',
                        'uppercase font-bold text-base',
                    )}
                >
                
<Link href={'/'}>

<span className={cn(

    'pb-px md:pb-2',

    router.pathname.indexOf('/blends') > -1 ? 'border-b-4 border-primary' : '',

)}>

    PLAY

</span>

</Link>
<Link href={'/faq'}>

<span className={cn(

    'pb-px md:pb-2',

    router.pathname.indexOf('/faq') > -1 ? 'border-b-3 border-primary' : '',

)}>

    Docs

</span>

</Link>
                    {isLoading ? (
                        <LoadingIndicator />
                    ) : userName ? (
                        <div className="w-full md:w-auto flex justify-center items-center pb-4 md:pb-0">
                            <div className="text-primary">
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <Menu.Button
                                            className={cn(
                                                'flex flex-col items-center w-full px-2 py-1 text-sm font-medium text-white bg-paper rounded-md bg-opacity-20 hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
                                                'border border-primary rounded-lg',
                                                'border-opacity-0 hover:border-opacity-75',
                                            )}
                                        >
                                            <div
                                                className={cn(
                                                    'flex justify-center items-center',
                                                    'px-1 py-px text-base',
                                                )}
                                            >
                                                <p>{userName}</p>
                                                <img src="/arrow-drop-down.svg" className="w-5 h-5" alt="arrow-down" />
                                            </div>

                                            {balance !== 0 && (
                                                <div className={cn('font-light text-sm text-center')}>
                                                    {formatNumber(balance)} RMX
                                                </div>
                                            )}
                                        </Menu.Button>
                                    </div>
                                    <Transition
                                        as={Fragment}
                                        enter="transition ease-out duration-100"
                                        enterFrom="transform opacity-0 scale-95"
                                        enterTo="transform opacity-100 scale-100"
                                        leave="transition ease-in duration-75"
                                        leaveFrom="transform opacity-100 scale-100"
                                        leaveTo="transform opacity-0 scale-95"
                                    >
                                        <Menu.Items
                                            className={cn(
                                                'z-50 absolute right-0 w-36 mt-1 origin-top-right',
                                                'text-white',
                                                'bg-paper rounded-xl shadow-lg',
                                                'ring-1 ring-black ring-opacity-5 focus:outline-none',
                                            )}
                                        >
                                            <div className="py-4 text-center">
                                                <Menu.Item className={cn('mb-3')}>
                                                    <Link href={'/inventory/' + userName}>
                                                        <span
                                                            className={cn(
                                                                'pb-px',
                                                                'cursor-pointer',
                                                                'hover:text-primary transition-colors',
                                                                router.pathname.indexOf('/inventory') > -1
                                                                    ? 'border-b-2 border-primary'
                                                                    : '',
                                                            )}
                                                        >
                                                            STAKE
                                                        </span>
                                                    </Link>
                                                </Menu.Item>
                                                <Menu.Item className={cn('mb-3')}>
                                                <Link href={'/'}>
                                                            <span
                                                                className={cn(
                                                                    'pb-px',
                                                                    'cursor-pointer',
                                                                    'hover:text-primary transition-colors',
                                                                    router.pathname.indexOf('/blends') > -1
                                                                        ? 'border-b-2 border-primary'
                                                                        : '',
                                                                )}
                                                            >
                                                                BLEND & CLAIM
                                                            </span>
                                                        </Link>
                                                </Menu.Item>
                                                {config.blend_contracts.length > 0 ? (
                                                    <Menu.Item className={cn('mb-3')}>
                                                        <Link href={'/faq'}>
                                                            <span
                                                                className={cn(
                                                                    'pb-px',
                                                                    'cursor-pointer',
                                                                    'hover:text-primary transition-colors',
                                                                    router.pathname.indexOf('/') > -1
                                                                        ? 'border-b-2 border-primary'
                                                                        : '',
                                                                )}
                                                            >
                                                                DOCS
                                                            </span>
                                                        </Link>
                                                    </Menu.Item>
                                                ) : (
                                                    ''
                                                )}
                                                <Menu.Item className={cn('mt-3')}>
                                                    <div onClick={performLogout}>
                                                        <span
                                                            className={cn(
                                                                'cursor-pointer',
                                                                'hover:text-primary transition-colors',
                                                            )}
                                                        >
                                                            Logout
                                                        </span>
                                                    </div>
                                                </Menu.Item>
                                            </div>
                                        </Menu.Items>
                                    </Transition>
                                </Menu>
                                {refundBalance !== 0 && (
                                    <div className={cn('font-light text-sm text-center')}>
                                        <div
                                            className={cn('cursor-pointer')}
                                            onClick={() => claimRefund(refundBalance)}
                                        >
                                            Refund: {formatNumber(refundBalance)} RMX
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    ) : (
                        <div
                            className={cn('flex justify-center items-center', 'cursor-pointer')}
                            onClick={performLogin}
                        >
                            <div className="mr-1">
                                <img src="/person-outline.svg" className="w-5 h-5" alt="Login" title={'Login'} />
                            </div>
                            <span className={cn('hover:underline cursor-pointer')}>Login</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
})

export default Navigation
