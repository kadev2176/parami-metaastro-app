import React, { useState } from 'react';
import style from './style.less';
import { useIntl } from 'umi';
import { Button } from 'antd';
import Geosuggest from 'react-geosuggest';

const Place: React.FC<{
  lat: number;
  lng: number;
  utcOffset: number;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setLat: React.Dispatch<React.SetStateAction<number>>;
  setLng: React.Dispatch<React.SetStateAction<number>>;
  setUTCOffset: React.Dispatch<React.SetStateAction<number>>;
}> = ({ lat, lng, utcOffset, setStep, setLat, setLng, setUTCOffset }) => {
  const [suggestList, setSuggestList] = useState<boolean>(false);
  const [placeholder, setPlaceholder] = useState<string>('Please select your city');

  const intl = useIntl();

  return (
    <div className={style.nftWrapper}>
      <div className={style.nftTitle}>
        {intl.formatMessage({
          id: 'astro.inputCity',
          defaultMessage: 'First, you need to choose the city where you were born',
        })}
      </div>
      <Geosuggest
        onSuggestSelect={(res) => {
          if (!!res?.location) {
            setLat(res.location.lat);
            setLng(res.location.lng);
            setUTCOffset((res.gmaps as any).utc_offset_minutes / 60);
          }
          setSuggestList(false)
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
        suggestsHiddenClassName={suggestList ? style.geoSuggestWrapperShow : style.geoSuggestWrapperHidden}
        maxFixtures={5}
        types={["(cities)"]}
        ignoreTab
        ignoreEnter
      />
      <div
        className={style.buttons}
      >
        <Button
          size='large'
          shape='round'
          type='primary'
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
  )
}

export default Place;
