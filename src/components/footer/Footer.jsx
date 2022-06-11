import cn from 'classnames'
import React from 'react'
import config from '../../config.json'
import Link from '../common/util/input/Link'
import { DiscordIcon, InstagramIcon, TelegramIcon, TwitterIcon } from '../icons'

const internalLinks = [
    {
        label: 'FreeCityGame',
        href: '/collection/freecitygame',
    },
    {
        label: 'Affiliation',
        href: '/affiliate',
    },
]

const companyLinks = [
    {
        label: 'Wax Cloud Wallet (Create Account)',
        href: 'https://wallet.wax.io',
    },
    {
        label: 'AtomicHub Market - FreeCityGame',
        href: 'https://wax.atomichub.io/market?collection_name=freecitygame&order=desc&sort=created&symbol=WAX',
    },
    {
        label: 'Alcor - RMX Token',
        href: 'https://wax.alcor.exchange/trade/rmx-remixgamingx_wax-eosio.token',
    },
]

const socialLinks = [
    config.instagram_link && {
        href: config.instagram_link,
        Icon: InstagramIcon,
        label: 'Instagram',
    },
    config.twitter_link && {
        href: config.twitter_link,
        Icon: TwitterIcon,
        label: 'Twitter',
    },
    config.telegram_link && {
        href: config.telegram_link,
        Icon: TelegramIcon,
        label: 'Telegram',
    },
    config.discord_link && {
        href: config.discord_link,
        Icon: DiscordIcon,
        label: 'Discord',
    },
].filter(Boolean)

const SocialList = ({ links = socialLinks }) => {
    return (
        <>
            {links.map(({ href, Icon, label }, idx) => (
                <div key={idx}>
                    <a
                        href={href}
                        className={cn('text-neutral hover:text-primary transition-colors flex flex-row gap-4')}
                    >
                        <Icon />
                        <span>{label}</span>
                    </a>
                </div>
            ))}
        </>
    )
}

const LinksList = ({ links = internalLinks }) => {
    return links.map((link, idx) => (
        <div className={cn('mb-3')} key={idx}>
            <Link href={link.href}>{link.label}</Link>
        </div>
    ))
}

function getAllUrlParams(url) {

    // get query string from url (optional) or window
    var queryString = url ? url.split('?')[1] : window.location.search.slice(1);
  
    // we'll store the parameters here
    var obj = {};
  
    // if query string exists
    if (queryString) {
  
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split('#')[0];
  
      // split our query string into its component parts
      var arr = queryString.split('&');
  
      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split('=');
  
        // set parameter name and value (use 'true' if empty)
        var paramName = a[0];
        var paramValue = typeof (a[1]) === 'undefined' ? true : a[1];
  
        // (optional) keep case consistent
        paramName = paramName.toLowerCase();
        if (typeof paramValue === 'string') paramValue = paramValue.toLowerCase();
  
        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
  
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, '');
          if (!obj[key]) obj[key] = [];
  
          // if it's an indexed array e.g. colors[2]
          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === 'string'){
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }
  
    return obj;
  }
  
getAllUrlParams('http://example.com/?affiliate=kkere.wam');
{ "a" }

getAllUrlParams('http://test.com/?a=abc').a; // 'abc'

const Footer = () => {
    return (
        <div className={cn('w-full bg-paper py-5 mt-8')}>
            <div
                className={cn(
                    'container mx-auto',
                    'text-neutral font-bold text-base mb-4',
                    'grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12',
                )}
            >
                <div>
                    <h4 className={cn('text-primary text-xl mt-2')}>Connect with Us</h4>
                    <div className={cn('flex flex-col mt-5 gap-4', 'text-neutral')}>
                        <SocialList />
                    </div>
                </div>
                <div>
                    <h4 className={cn('text-primary text-xl mt-2')}>Internal Links</h4>
                    <div className={cn('flex flex-col mt-5 gap-4', 'text-neutral')}>
                        <LinksList links={internalLinks} />
                    </div>
                </div>
                <div>
                    <h4 className={cn('text-primary text-xl mt-2')}>WAX Market Links</h4>
                    <div className={cn('flex flex-col mt-5 gap-4', 'text-neutral')}>
                        <LinksList links={companyLinks} />
                    </div>
                </div>
            </div><center>
            
            <br />
            Extra Sauce Studio - Quebec enterprise number: (NEQ) 2277160562 - 21 rue de la pointe, saint-alphonse-rodriguez, J0K 1W0, Quebec, Canada<br />
            © <a href="https://remixworlds.com" target="_blank" className="text-neutral bg-paper border-neutral">RemixWorlds.com</a>
            </center>
        </div>
    )
}

export default Footer
