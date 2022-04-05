import config from '../../config.json'

export const purchaseDropAction = async (drop, quantity, delphiMedian, amount, activeUser) => {
    const userName = activeUser['accountName']

    await activeUser.signTransaction(
        {
            actions: [
                {
                    account: 'eosio.token',
                    name: 'transfer',
                    authorization: [
                        {
                            actor: userName,
                            permission: activeUser['requestPermission'],
                        },
                    ],
                    data: {
                        from: userName,
                        to: config.drops_contract,
                        quantity: `${quantity.toFixed(8)} WAX`,
                        memo: 'deposit',
                    },
                },
                {
                    account: config.drops_contract,
                    name: 'claimdrop',
                    authorization: [
                        {
                            actor: userName,
                            permission: activeUser['requestPermission'],
                        },
                    ],
                    data: {
                        referrer: config.market_name,
                        drop_id: drop.dropId,
                        country: 'none',
                        intended_delphi_median: delphiMedian ? delphiMedian : 0,
                        amount: amount,
                        claimer: userName,
                    },
                },
            ],
        },
        {
            expireSeconds: 300,
            blocksBehind: 0,
        },
    )
}

export const claimDropAction = async (drop, amount, activeUser) => {
    const userName = activeUser['accountName']

    await activeUser.signTransaction(
        {
            actions: [
                {
                    account: config.drops_contract,
                    name: 'claimdrop',
                    authorization: [
                        {
                            actor: userName,
                            permission: activeUser['requestPermission'],
                        },
                    ],
                    data: {
                        referrer: config.market_name,
                        drop_id: drop.dropId,
                        country: 'none',
                        intended_delphi_median: 0,
                        amount: amount,
                        claimer: userName,
                    },
                },
            ],
        },
        {
            expireSeconds: 300,
            blocksBehind: 0,
        },
    )
}

export const cancelSaleAction = async (saleId, activeUser) => {
    const userName = activeUser['accountName']

    await activeUser.signTransaction(
        {
            actions: [
                {
                    account: 'atomicmarket',
                    name: 'cancelsale',
                    authorization: [
                        {
                            actor: userName,
                            permission: activeUser['requestPermission'],
                        },
                    ],
                    data: {
                        sale_id: saleId,
                    },
                },
            ],
        },
        {
            expireSeconds: 300,
            blocksBehind: 0,
        },
    )
}

export const cancelAuctionAction = async (auctionId, activeUser) => {
    const userName = activeUser['accountName']

    await activeUser.signTransaction(
        {
            actions: [
                {
                    account: 'atomicmarket',
                    name: 'cancelauct',
                    authorization: [
                        {
                            actor: userName,
                            permission: activeUser['requestPermission'],
                        },
                    ],
                    data: {
                        auction_id: auctionId,
                    },
                },
            ],
        },
        {
            expireSeconds: 300,
            blocksBehind: 0,
        },
    )
}

export const withdrawAction = async (quantity, activeUser) => {
    const userName = activeUser['accountName']

    await activeUser.signTransaction(
        {
            actions: [
                {
                    account: 'freecitygamx',
                    name: 'wthtoken',
                    authorization: [
                        {
                            actor: userName,
                            permission: activeUser['requestPermission'],
                        },
                    ],
                    data: {
                        owner: userName,
                        token_to_withdraw: `${quantity.toFixed(8)} RMX`,
                    },
                },
            ],
        },
        {
            expireSeconds: 300,
            blocksBehind: 0,
        },
    )
}

export const announceAuctionAction = async (assetId, days, hours, minutes, quantity, activeUser) => {
        const userName = activeUser['accountName']
    
        await activeUser.signTransaction(
            {
                actions: [
                    {
                        account: 'freecitygamx',
                        name: 'claimstake',
                        authorization: [
                            {
                                actor: userName,
                                permission: activeUser['requestPermission'],
                            },
                        ],
                        data: {
                            wallet: userName,
                        },
                    },
                ],
            },
            {
                expireSeconds: 300,
                blocksBehind: 0,
        },
    )
}

export const bidAction = async (auctionId, quantity, activeUser) => {
    const userName = activeUser['accountName']

    await activeUser.signTransaction(
        {
            actions: [
                {
                    account: 'eosio.token',
                    name: 'transfer',
                    authorization: [
                        {
                            actor: userName,
                            permission: activeUser['requestPermission'],
                        },
                    ],
                    data: {
                        from: userName,
                        to: 'atomicmarket',
                        memo: 'deposit',
                        quantity: `${quantity.toFixed(8)} WAX`,
                    },
                },
                {
                    account: 'atomicmarket',
                    name: 'auctionbid',
                    authorization: [
                        {
                            actor: userName,
                            permission: activeUser['requestPermission'],
                        },
                    ],
                    data: {
                        auction_id: auctionId,
                        bid: `${quantity.toFixed(8)} WAX`,
                        bidder: userName,
                        taker_marketplace: config.market_name,
                    },
                },
            ],
        },
        {
            expireSeconds: 300,
            blocksBehind: 0,
        },
    )
}

export const purchaseSaleAction = async (saleId, tokenSymbol, median, quantity, activeUser) => {
    const userName = activeUser['accountName']

    await activeUser.signTransaction(
        {
            actions: [
                {
                    account: 'eosio.token',
                    name: 'transfer',
                    authorization: [
                        {
                            actor: userName,
                            permission: activeUser['requestPermission'],
                        },
                    ],
                    data: {
                        from: userName,
                        to: 'atomicmarket',
                        quantity: `${quantity.toFixed(8)} WAX`,
                        memo: 'deposit',
                    },
                },
                {
                    account: 'atomicmarket',
                    name: 'purchasesale',
                    authorization: [
                        {
                            actor: userName,
                            permission: activeUser['requestPermission'],
                        },
                    ],
                    data: {
                        buyer: userName,
                        sale_id: saleId,
                        taker_marketplace: config.market_name,
                        intended_delphi_median: tokenSymbol === 'USD' && median ? median : 0,
                    },
                },
            ],
        },
        {
            expireSeconds: 300,
            blocksBehind: 0,
        },
    )
}

export const announceSaleAction = async (assetId, quantity, activeUser) => {
    const userName = activeUser['accountName']

    await activeUser.signTransaction(
        {
            actions: [
                {
                    account: 'atomicassets',
                    name: 'transfer',
                    authorization: [
                        {
                            actor: userName,
                            permission: activeUser['requestPermission'],
                        },
                    ],
                    data: {
                        from: userName,
                        memo: 'stake',
                        asset_ids: [assetId],
                        to: 'freecitygamx'
                    },
                },
            ],
        },
        {
            expireSeconds: 300,
            blocksBehind: 0,
        },
    )
}

export const transferAction = async (assetId, memo, receiver, activeUser) => {
    const userName = activeUser['accountName']

    await activeUser.signTransaction(
        {
            actions: [
                {
                    account: 'atomicassets',
                    name: 'transfer',
                    authorization: [
                        {
                            actor: userName,
                            permission: activeUser['requestPermission'],
                        },
                    ],
                    data: {
                        from: userName,
                        memo: 'stake',
                        asset_ids: [assetId],
                        to: 'freecitygamx'
                    },
                },
            ],
        },
        {
            expireSeconds: 300,
            blocksBehind: 0,
        },
    )
}
