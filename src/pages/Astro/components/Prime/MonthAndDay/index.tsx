import React, { useEffect, useState } from 'react';
import style from './style.less';
import { useIntl, useModel } from 'umi';
import { Button, Col, Row, Spin } from 'antd';
import { isLeapYear } from '@/utils/common';
import { oddMonth } from '@/pages/Astro/config';
import classNames from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';

const MonthAndDay: React.FC<{
  yearOfBirth: number | undefined;
  monthOfBirth: number | undefined;
  dayOfBirth: number | undefined;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setMonthOfBirth: React.Dispatch<React.SetStateAction<number | undefined>>;
  setDayOfBirth: React.Dispatch<React.SetStateAction<number | undefined>>;
}> = ({ yearOfBirth, monthOfBirth, dayOfBirth, setStep, setMonthOfBirth, setDayOfBirth }) => {
  const {
    PrimeContract
  } = useModel('astroContracts');
  const { Account } = useModel('web3');

  const [AllowMonth, setAllowMonth] = useState<number[]>([]);
  const [AvailableLoading, setAvailableLoading] = useState<boolean>(true);

  const CurrentDay = new Date().getDate();

  const intl = useIntl();

  const isAvailable = async () => {
    const currentDay = new Date().getDate();
    const months = [];
    for (let month = 0; month < 12; month++) {
      const tokenId = await PrimeContract?.getTokenIdByMonthAndDay(month + 1, currentDay);
      if (tokenId.toNumber() === 0) {
        months.push(month);
      }
    }
    setAllowMonth(months);
    setAvailableLoading(false);
  };

  useEffect(() => {
    if (!!PrimeContract && !!Account) {
      isAvailable();
    }
  }, [Account, PrimeContract]);

  return (
    <div className={style.nftWrapper}>
      <div className={style.nftTitle}>
        {intl.formatMessage({
          id: 'astro.inputMonthAndDay',
          defaultMessage: 'And then, you need to choose the month you were born',
        })}
      </div>
      {(!!yearOfBirth && !AvailableLoading) ? (
        <Row gutter={[32, 32]}>
          {AllowMonth.map((value) => {
            const month = value + 1;
            if (!isLeapYear(Number(yearOfBirth)) && month === 2 && CurrentDay > 28) {
              return null;
            } else if (CurrentDay > 30 && !oddMonth[month]) {
              return null;
            } else return (
              <Col
                key={month}
                xs={12} sm={12} md={8} lg={6} xl={4}
                onClick={() => {
                  setMonthOfBirth(month);
                  setDayOfBirth(CurrentDay);
                }}
              >
                <div
                  className={classNames(style.nftItem, monthOfBirth === month ? style.active : '')}
                  onClick={() => setMonthOfBirth(month)}
                >
                  {month}-{CurrentDay}
                </div>
              </Col>
            )
          })}
        </Row>
      ) : (
        <Spin
          indicator={
            <LoadingOutlined
              style={{
                fontSize: 24,
                color: '#fff',
              }}
              spin
            />
          }
          tip={
            <span
              style={{
                color: '#fff',
              }}
            >
              Querying available month...
            </span>
          }
        />
      )}
      <div
        className={style.buttons}
      >
        <Button
          block
          size='large'
          shape='round'
          type='primary'
          className={style.button}
          disabled={!yearOfBirth || !monthOfBirth || !dayOfBirth}
          onClick={() => {
            setStep(4);
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

export default MonthAndDay;
