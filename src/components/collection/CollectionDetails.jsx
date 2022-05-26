import cn from 'classnames'
import React from 'react'
import { getAccountStats, getWhiteList } from '../../api/fetch'

const CollectionDetails = (props) => {
    const collection = props.collection

    const { name, collection_name, data, market_fee } = collection

    const { url, description, volume, listings, sales } = data

    return (
        <div className={cn('lg:px-10', 'text-base text-neutral')}>
            <div className="text-5xl mb-8 w-full">{name}</div>
            <div className="text-lg font-normal leading-relaxed">{description}</div>
            <table className="mt-8 w-full font-normal">
                <tbody>
                <tr>
                <td className="text-neutral text-left">Collection Name: {getAccountStats}</td>
                 <td className="text-neutral text-right">{collection_name}</td>
                    </tr>
                    <tr>
                        <td className="text-neutral text-left">Market Fee:</td>
                        <td className="text-neutral text-right">{market_fee * 100}%</td>
                    </tr>
                    <tr>
                        <td className="text-neutral text-left">Volume:</td>
                        <td className="text-neutral text-right">{volume}</td>
                    </tr>
                    <tr>
                        <td className="text-neutral text-left">Listings:</td>
                        <td className="text-neutral text-right">{listings}</td>
                    </tr>
                    <tr>
                        <td className="text-neutral text-left">Sales:</td>
                        <td className="text-neutral text-right">{sales}</td>
                    </tr>
                    <tr>
                        <td className="text-neutral text-left">Website:</td>
                        <td className="text-neutral text-right"> <a href="https://remixworlds.com" target="_blank">remixworlds.com</a></td>
                    </tr>
                    <tr>
                        <td className="text-neutral text-left">Multigaming Platform:</td>
                        <td className="text-neutral text-right"> <a href="https://play.remixworlds.com" target="_blank">play.remixworlds.com</a></td>
                    </tr>
                    <tr>
                        <td className="text-neutral text-left">Official Telegram:</td>
                        <td className="text-neutral text-right"> <a href="https://t.me/remixworlds" target="_blank">remixworlds</a></td>
                    </tr>
                    <tr>
                        <td className="text-neutral text-left">Atomichub Collection:</td>
                        <td className="text-neutral text-right"> <a href="https://wax.atomichub.io/explorer/collection/freecitygame" target="_blank">freecitygame</a></td>
                    </tr>
                    <tr>
                        <td className="text-neutral text-left">Atomichub Marketplace:</td>
                        <td className="text-neutral text-right"> <a href="https://wax.atomichub.io/market?collection_name=freecitygame" target="_blank">freecitygame</a></td>
                    </tr>
                    <tr>
                        <td className="text-neutral text-left">Bloks Collection:</td>
                        <td className="text-neutral text-right"> <a href="https://wax.bloks.io/account/freecitygame" target="_blank">freecitygame</a></td>
                    </tr>
                    <tr>
                        <td className="text-neutral text-left">Gaming Smart Contract:</td>
                        <td className="text-neutral text-right"> <a href="https://wax.bloks.io/account/freecitygamx" target="_blank">freecitygamx</a></td>
                    </tr>
                    <tr>
                        <td className="text-neutral text-left">RMX Token Smart Contract:</td>
                        <td className="text-neutral text-right"> <a href="https://wax.bloks.io/account/remixgamingx" target="_blank">remixgamingx</a></td>
                    </tr>
                    <tr>
                        <td className="text-neutral text-left">Alcor Token Listing:</td>
                        <td className="text-neutral text-right"> <a href="https://wax.alcor.exchange/trade/rmx-remixgamingx_wax-eosio.token" target="_blank">RMX</a></td>
                    </tr>
                    {url ? (
                        <tr>
                            <td className="text-neutral text-left"></td>
                            <td className="text-neutral text-right">
                                <div className="CollectionURL">
                                
                                </div>
                            </td>
                        </tr>
                    ) : null}
                </tbody>
            </table>
        </div>
        
    )
}

export default CollectionDetails
