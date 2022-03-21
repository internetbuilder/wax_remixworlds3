import cn from 'classnames'
import React from 'react'
import config from '../../config.json'
import Page from '../common/layout/Page'
import Header from '../common/util/Header'

const Home = () => {
    return (
        <Page>
            <Header
                title={config.market_title}
                description={config.market_description}
                image={config.market_image}
            />
            <div className={cn('container mx-auto my-20')}>
                <center>
                <img src="/freecity-playtoearn-soon2.png" alt="FreeCityGame"/><h4>FreeCityGame</h4></center>
            </div>
        </Page>
    )
}

export default Home
