import React from 'react';
import { useIntl } from 'umi';
import style from './style.less';

const About: React.FC = () => {
    const intl = useIntl();

    return (
        <div className={style.aboutContainer}>
            <div className={style.titleContainer}>
                <div className={style.title}>
                    <span>
                        {intl.formatMessage({
                            id: 'astro.about.title.prefix',
                            defaultMessage: 'About',
                        })}
                    </span>
                    <p>
                        {intl.formatMessage({
                            id: 'astro.about.title',
                            defaultMessage: 'Astro Mint',
                        })}
                    </p>
                </div>
            </div>
            <div className={style.contentContainer}>
                <p>
                    {intl.formatMessage({
                        id: 'astro.about.content',
                        defaultMessage: 'Meta Astro, powered by Parami Protocol, is an Astro chart that indicates your Para Meta Identity in metaverse. It snapshots the location of the major planets at your birth time. When a Meta Astro is generated, your journey in parallel metaverses begins.',
                    })}
                </p>
            </div>
        </div>
    )
}

export default About;
