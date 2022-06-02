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
  const { PrimeContract } = useModel('astroContracts');
  const { Account } = useModel('web3');

  const [AllowMonth, setAllowMonth] = useState<number[]>([]);
  const [AllowMonthAndDay, setAllowMonthAndDay] = useState<any[]>([]);
  const [AvailableLoading, setAvailableLoading] = useState<boolean>(true);
  const [IsLimited, setIsLimited] = useState<boolean>(false);

  const CurrentDay = new Date().getDate();

  const intl = useIntl();

  const isAvailable = async () => {
    const isLimited = await PrimeContract?.isNoDateLimitMintBegan();
    setIsLimited(isLimited);

    if (!isLimited) {
      const currentDay = new Date().getDate();
      const promises = [];
      for (let month = 0; month < 12; month++) {
        const query = PrimeContract?.getTokenIdByMonthAndDay(month + 1, currentDay);
        promises.push(query);
      }
      const months = [];
      const results = await Promise.all(promises);
      for (let month = 0; month < results.length; month++) {
        if (results[month].toNumber() === 0) {
          months.push(month);
        }
      }
      setAllowMonth(months);
      setAvailableLoading(false);
    } else {
      const monthAndDay = [];
      for (let month = 0; month < 12; month++) {
        for (let day = 0; day < 31; day++) {
          const query = await PrimeContract?.getTokenIdByMonthAndDay(month + 1, day + 1);
          if (query.toNumber() === 0) {
            monthAndDay.push([month, day]);
          }
        }
      }
      setAllowMonthAndDay(monthAndDay);
      setAvailableLoading(false);
    }
  };

  useEffect(() => {
    if (!!yearOfBirth && !!PrimeContract && !!Account) {
      isAvailable();
    }
  }, [yearOfBirth, Account, PrimeContract]);

  return (
    <div className={style.nftWrapper}>
      <div className={style.nftTitle}>
        {intl.formatMessage({
          id: 'astro.inputMonthAndDay',
          defaultMessage: 'Select your birth month',
        })}
      </div>
      {!!yearOfBirth && !AvailableLoading ? (
        <Row
          gutter={[32, 32]}
          style={{
            width: '100%',
          }}
        >
          {!IsLimited && AllowMonth.map((value) => {
            const month = value + 1;
            if (!isLeapYear(Number(yearOfBirth)) && month === 2 && CurrentDay > 28) {
              return null;
            } else if (CurrentDay > 30 && !oddMonth[month]) {
              return null;
            } else
              return (
                <Col
                  key={month}
                  xs={12}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={4}
                  onClick={() => {
                    setMonthOfBirth(month);
                    setDayOfBirth(CurrentDay);
                  }}
                >
                  <div
                    className={classNames(
                      style.nftItem,
                      monthOfBirth === month ? style.active : '',
                    )}
                    onClick={() => setMonthOfBirth(month)}
                  >
                    {month}-{CurrentDay}
                  </div>
                </Col>
              );
          })}
          {IsLimited && AllowMonthAndDay.map((value) => {
            const month = value[0] + 1;
            const day = value[1] + 1;
            if (!isLeapYear(Number(yearOfBirth)) && month === 2 && day > 28) {
              return null;
            } else if (day > 30 && !oddMonth[month]) {
              return null;
            } else
              return (
                <Col
                  key={month}
                  xs={12}
                  sm={12}
                  md={8}
                  lg={6}
                  xl={4}
                  onClick={() => {
                    setMonthOfBirth(month);
                    setDayOfBirth(day);
                  }}
                >
                  <div
                    className={classNames(
                      style.nftItem,
                      monthOfBirth === month ? style.active : '',
                    )}
                    onClick={() => setMonthOfBirth(month)}
                  >
                    {month}-{day}
                  </div>
                </Col>
              );
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
      <div className={style.buttons}>
        <Button
          size="large"
          shape="round"
          type="primary"
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
  );
};

export default MonthAndDay;
