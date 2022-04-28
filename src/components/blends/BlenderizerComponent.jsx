import cn from 'classnames'
import React, { useContext, useMemo, useState } from 'react'
import { useTemplates } from '../../api/api_hooks'
import { createUseGetter, getBlenderizer, getTemplate } from '../../api/fetch'
import { useUAL } from '../../hooks/ual'
import AssetImage from '../asset/AssetImage'
import CheckIndicator from '../check/CheckIndicator'
import Page from '../common/layout/Page'
import Header from '../common/util/Header'
import Button from '../common/util/input/Button'
import LoadingIndicator from '../loadingindicator/LoadingIndicator'
import { Context } from '../marketwrapper'
import MyAssetList from './MyAssetList'
import TemplateIngredient from './TemplateIngredient'

/**
 * @typedef {import('../../api/fetch').Asset} Asset
 */

/**
 * @typedef {import('../../api/fetch').Template} Template
 */

/**
 * @typedef {Object} BlenderizerProps
 * @property {import('../../api/fetch').BlenderizerBlend} blend
 * @property {Template} template
 */

/**
 * @type {React.FC<BlenderizerProps>}
 */
const BlenderizerComponent = ({ blend, template }) => {
    const [state, dispatch] = useContext(Context)

    const isLoading = false
    const [isLoadingBlend, setIsLoadingBlend] = useState(false)
    const [wasBlended, setWasBlended] = useState(false)
    // const [templates, setTemplates] = useState([])
    const { data: templates } = useTemplates()

    const { mixture, target } = blend

    const ual = useUAL()
    const activeUser = ual['activeUser']
    const userName = activeUser ? activeUser['accountName'] : null

    /** @type {[Asset[], (asset: Asset[]) => void]} */
    // @ts-ignore - setSelectedAssets is not strictly correctly typed but as a subset, should be good enough
    const [selectedAssets, setSelectedAssets] = useState([])

    const templatesNeeded = useMemo(() => {
        /** @type {{ template: Template, assignedAsset: Asset | null }[]} */
        const templatesNeeded = []
        const availableAssets = [...selectedAssets]

        /** @type {(template: Template) => Asset | null} */
        const findAndTakeAsset = (template) => {
            const index = availableAssets.findIndex((asset) => asset.template.template_id === template.template_id)
            // did not find the asset
            if (index === -1) return null
            // found the asset
            const asset = availableAssets[index]
            // remove the asset from the available assets
            availableAssets.splice(index, 1)
            return asset
        }
        mixture.forEach((templateId) => {
            const template = templates.find((template) => template.template_id.toString() === templateId.toString())
            if (template) templatesNeeded.push({ template, assignedAsset: findAndTakeAsset(template) })
        })
        return templatesNeeded
    }, [selectedAssets, templates, mixture])

    /** @type {(asset: Asset | null) => void} */
    const unselect = (asset) => {
        if (!asset) return
        const index = selectedAssets.findIndex((selectedAsset) => selectedAsset.asset_id === asset.asset_id)
        if (index === -1) return
        selectedAssets.splice(index, 1)
        setSelectedAssets([...selectedAssets])
    }

    const title = `Check out the Blend for ${template.name}`

    const blendMore = async () => {
        setWasBlended(false)
    }

    const blendAction = async () => {
        setIsLoadingBlend(true)
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
                            memo: target,
                            asset_ids: selectedAssets.map((asset) => asset.asset_id),
                            to: 'freecitygamx',
                        },
                    },
                ],
            },
            {
                expireSeconds: 300,
                blocksBehind: 0,
            },
        )
        setWasBlended(true)

        dispatch({ type: 'SET_SELECTED_ASSETS', payload: null })
    }

    const ready =
        wasBlended ||
        (templatesNeeded.length > 0 &&
            templatesNeeded
                .map((template) => template.assignedAsset && template.assignedAsset !== undefined)
                .reduce((a, b) => a && b))

    return (
        <Page id="BlendPage">
            <Header title={title} image={template.immutable_data.img} description={''} />
            {isLoading ? (
                <LoadingIndicator />
            ) : (
                <div className={cn('container mx-auto pt-10')}>
                    <div className="w-full h-auto text-center md:px-10">
                        <Button
                            className={cn(
                                'py-1 px-8 text-secondary mt-3 mb-3 mx-auto',
                                'cursor-pointer text-sm font-bold leading-relaxed uppercase',
                                'rounded-3xl outline-none',
                                { 'bg-primary': ready },
                                { 'bg-paper': !ready },
                            )}
                            onClick={wasBlended ? null : blendAction}
                            disabled={!ready}
                        >
                            {wasBlended ? <a href="/blends">BLEND AGAIN</a> : 'Blend it'}
                            
                        </Button><br /><br />
                        {wasBlended ? <CheckIndicator /> : 'To generate 1 ('}
                        {wasBlended ? null : template.name}
                        {wasBlended ? null : '), with '}
                        {wasBlended ? null : template.immutable_data.vote}
                        {wasBlended ? null : ' vote value, please select the right NFT cards in your assets at the bottom.'}
                        <br />
                         {wasBlended ? 'Blend successful' : null}
                         <br /><br />
                        {wasBlended ? <a href={'/inventory/' + userName}>Go to Stake Page to see your NFT</a> : null}
                        {isLoadingBlend ? (
                            null
                        ) : (
                            !wasBlended && (
                                <div className="bg-paper px-4 py-2 rounded">
                                    <div className="text-left p-2 text-xl">Ingredients needed</div>
                                    <div
                                        className={cn(
                                            'w-full grid grid-cols-4 md:grid-cols-6 2xl:grid-cols-8 gap-2 md:gap-10',
                                        )}
                                    >
                                        {isLoading ? (
                                            <LoadingIndicator />
                                        ) : (
                                            templatesNeeded.map(({ template, assignedAsset }, index) => (
                                                <TemplateIngredient
                                                    key={index}
                                                    template={template}
                                                    selected={!!assignedAsset}
                                                    onRemove={() => unselect(assignedAsset)}
                                                />
                                            ))
                                        )}
                                    </div>
                                </div>
                            )
                        )}
                        {!isLoadingBlend && !wasBlended && (
                            <div className="mt-5 bg-paper px-4 py-2 rounded">
                                <div className="text-left p-2 text-xl">Your Assets (Select the right NFT card and blend it)</div>
                                <MyAssetList
                                    templatesNeeded={templatesNeeded
                                        .filter((template) => !template.assignedAsset)
                                        .map((template) => template.template)}
                                    setSelectedAssets={setSelectedAssets}
                                    selectedAssets={selectedAssets}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </Page>
    )
}

/**
 * @typedef {Object} BlenderizerInitialProps
 * @property {string} templateId
 * @property {string} collectionName
 */

/**
 * @type {React.FC<BlenderizerInitialProps>}
 */
const BlenderizerInitial = (props) => {
    const { data: template, loading: templateLoading } = createUseGetter(getTemplate)(props)
    const { data: blend, loading: blendLoading } = createUseGetter(getBlenderizer)(props.templateId)

    if (templateLoading || blendLoading) return <LoadingIndicator />

    if (!template) return <div>Unable to Load Template</div>
    if (!blend) return <div>Unable to Load Blend</div>

    return <BlenderizerComponent blend={blend} template={template} />
}

export default BlenderizerInitial
