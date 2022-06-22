import React, { useEffect, useState } from 'react';
import style from './style.less';
import { useIntl, useModel } from 'umi';
import { Button, Col, Row, Spin } from 'antd';
import { isLeapYear } from '@/utils/common';
import { oddMonth } from '@/pages/Astro/config';
import classNames from 'classnames';
import { LoadingOutlined } from '@ant-design/icons';

const NoLimitMonthAndDay: React.FC<{
  yearOfBirth: number | undefined;
  monthOfBirth: number | undefined;
  dayOfBirth: number | undefined;
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setMonthOfBirth: React.Dispatch<React.SetStateAction<number | undefined>>;
  setDayOfBirth: React.Dispatch<React.SetStateAction<number | undefined>>;
}> = ({ yearOfBirth, monthOfBirth, dayOfBirth, setStep, setMonthOfBirth, setDayOfBirth }) => {
  const { PrimeContract } = useModel('astroContracts');
  const { Account } = useModel('web3');

  const [CurrentMonth, setCurrentMonth] = useState<number>(0);
  const [AllowDay, setAllowDay] = useState<any[]>([]);
  const [AvailableLoading, setAvailableLoading] = useState<boolean>(true);

  const intl = useIntl();

  const isAvailable = async () => {
    setAvailableLoading(true);
    setAllowDay([]);
    const promises = [];
    for (let day = 0; day < 31; day++) {
      const query = await PrimeContract?.getTokenIdByMonthAndDay(CurrentMonth + 1, day + 1);
      promises.push(query);
    }
    const days = [];
    const results = await Promise.all(promises);
    for (let day = 0; day < 31; day++) {
      if (results[day].toNumber() === 0) {
        days.push(day);
      }
    }
    setAllowDay(days);
    setAvailableLoading(false);
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
          defaultMessage: '3/4, Choose the available date of month?',
        })}
      </div>
      <div
        className={style.buttons}
        style={{
          marginBottom: '2rem',
        }}
      >
        <Row
          gutter={[8, 8]}
          style={{
            width: '100%',
          }}
        >
          <Col span={12}>
            <Button
              block
              size="large"
              shape="round"
              type="primary"
              onClick={async () => {
                setCurrentMonth(CurrentMonth - 1);
                await isAvailable();
              }}
              disabled={CurrentMonth <= 0}
            >
              {intl.formatMessage({
                id: 'astro.previousMonth',
                defaultMessage: 'Previous',
              })}
            </Button>
          </Col>
          <Col span={12}>
            <Button
              block
              size="large"
              shape="round"
              type="primary"
              onClick={async () => {
                setCurrentMonth(CurrentMonth + 1);
                await isAvailable();
              }}
              disabled={CurrentMonth >= 11}
            >
              {intl.formatMessage({
                id: 'astro.nextMonth',
                defaultMessage: 'Next',
              })}
            </Button>
          </Col>
        </Row>
      </div>
      {!!yearOfBirth && !AvailableLoading ? (
        <Row
          gutter={[32, 32]}
          style={{
            width: '100%',
          }}
        >
          {AllowDay.map((value) => {
            const month = CurrentMonth + 1;
            const day = value + 1;
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
              Querying available days...
            </span>
          }
        />
      )}
      <div className={style.buttons}>
        <Button
          size="middle"
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

export default NoLimitMonthAndDay;
