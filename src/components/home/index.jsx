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
<div class="text wrap">
<center><br />
      <p><strong>Welcome on FreeCityGame, an easy to play P2E NFT game based on WAX blockchain.</strong></p><br />
<p><strong>How make money ?</strong></p>
    <div>

        <details>
            <summary>Way 1: Blend card to generate higher value cards. (click to expense)</summary>
            <p>Processor:<br />
Intel Xeon E3-1270v6 - 4c/ 8t - 3.8GHz/ 4.2GHz<br />
Private bandwidth: Not included</p>

        </details>

        <details>
            <summary>Way 2: Stake NFT card with high vote value (click to expense)</summary>
            <p>
            Stake any FREECITYGAME nft and you avalaible to claim one time every 24H. <br />Reward depends on the total number of votes you have in your staked nft cards.
            </p>
        </details>

    </div>
</center>
</div>
<br />
<div class="text wrap">
<center>
<p><strong>How to play ?</strong></p>
    <div>

        <details>
            <summary>Way 1: Blend NFT card to generate higher value cards. (click to expense)</summary>
            <p>Processor:<br />
Intel Xeon E3-1270v6 - 4c/ 8t - 3.8GHz/ 4.2GHz<br />
Private bandwidth: Not included</p>

        </details>

        <details>
            <summary>Way 2: Stake NFT card with high vote value (click to expense)</summary>
            <p> Processor:<br />
Intel 2x Xeon E5-2630v3 - 16c/ 32t - 2.4GHz/ 3.2GHz<br />
Memory:
128GB DDR4 ECC 1866MHz<br />
Not included</p>
        </details>

    </div>
</center>
</div>
            <div className={cn('container mx-auto my-20')}>
            <center>
                
                <img src="/freecity-playtoearn-soon2.png" alt="FreeCityGame"/>
                <h4>FreeCityGame</h4>
                
                </center>
            </div>
        </Page>
    )
}

export default Home
