import React from 'react';
import styles from '@/style/common.less';
import { Svga } from 'react-svga';
import style from './style.less';

const Loading: React.FC = () => {

    return (
        <>
            <div className={styles.mainContainer}>
                <div className={styles.pageContainer}>
                    <Svga
                        src={'/images/parami.svga'}
                        className={style.loadingContainer}
                    />
                </div>
            </div>
        </>
    )
}

export default Loading;
