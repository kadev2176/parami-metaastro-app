/**
 * @ Author: Hikaru
 * @ Create Time: 2022-06-26 03:12:42
 * @ Modified by: Hikaru
 * @ Modified time: 2022-07-22 00:13:46
 * @ Description: i@rua.moe
 */

import React, { useState } from 'react';
import style from '@/style/components.less';
import { useIntl } from 'umi';
import { Button } from 'antd';
import Geosuggest from 'react-geosuggest';
import { DownCircleOutlined } from '@ant-design/icons';

const Place: React.FC<{
  lat: number;
  lng: number;
  utcOffset: number;
  breed?: boolean | false;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setLat: React.Dispatch<React.SetStateAction<number>>;
  setLng: React.Dispatch<React.SetStateAction<number>>;
  setUTCOffset: React.Dispatch<React.SetStateAction<number>>;
}> = ({ lat, lng, utcOffset, breed, setStep, setLat, setLng, setUTCOffset }) => {
  const [suggestList, setSuggestList] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>('Please select your city');

  const intl = useIntl();

  return (
    <div className={style.nftWrapper}>
      <div className={style.nftTitle}>
        {!breed
          ? intl.formatMessage({
              id: 'astro.inputCity',
              defaultMessage: "1/4, Where were you born, dear god's candidate?",
            })
          : intl.formatMessage({
              id: 'astro.inputCity',
              defaultMessage: "1/3, Where were you born, dear god's candidate?",
            })}
      </div>
      <div className={style.inputContainer}>
        <div className={style.prefix}>
          {intl.formatMessage({
            id: 'astro.city.prefix',
            defaultMessage: 'I was born in',
          })}
        </div>
        <Geosuggest
          onSuggestSelect={(res) => {
            if (!!res?.location) {
              setLat(res.location.lat);
              setLng(res.location.lng);
              setUTCOffset((res.gmaps as any).utc_offset_minutes / 60);
            }
            setSuggestList(false);
          }}
          placeholder={placeholder}
          onFocus={() => {
            setPlaceholder('');
          }}
          onBlur={() => {
            setPlaceholder('Please select your city');
          }}
          inputClassName={style.geoInput}
          className={style.geoSuggest}
          suggestsClassName={style.geoSuggestWrapper}
          suggestItemClassName={style.geoSuggestWrapperItem}
          suggestsHiddenClassName={
            suggestList ? style.geoSuggestWrapperShow : style.geoSuggestWrapperHidden
          }
          maxFixtures={5}
          types={['(cities)']}
          ignoreTab
          ignoreEnter
        />
        <DownCircleOutlined />
      </div>
      <div className={style.buttons}>
        <Button
          size="large"
          shape="round"
          type="primary"
          className={style.button}
          disabled={!lat || !lng || !utcOffset}
          onClick={() => {
            setStep(2);
          }}
        >
          {intl.formatMessage({
            id: 'astro.nextStep',
            defaultMessage: 'Next Step',
          })}
        </Button>
      </div>
    </div>
  );
};

export default Place;
