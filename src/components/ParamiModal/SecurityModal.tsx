import React, { useState, useEffect } from 'react';
import { Alert, Button, Input, Modal, Typography } from 'antd';
import { useIntl } from 'umi';
import styles from './style.less';

const { Title } = Typography;

const SecurityModal: React.FC<{
  visable: boolean;
  setVisable: React.Dispatch<React.SetStateAction<boolean>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  func?: () => Promise<void>;
  changePassword?: boolean;
}> = ({ visable, setVisable, password, setPassword, func, changePassword }) => {
  const [submitting, setSubmitting] = useState(false);
  const [errorState, setErrorState] = useState<API.Error>({});

  const intl = useIntl();

  const stamp = localStorage.getItem('stamp');

  const Message: React.FC<{
    content: string;
  }> = ({ content }) => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  const inputVerify = (e: any) => {
    if (e) {
      setPassword(e.target.value);
    } else {
      setPassword('');
    }
  };

  const handleSubmit = () => {
    setSubmitting(true);
    if (!password || password.length < 6) {
      setErrorState({
        Type: 'empty',
        Message: intl.formatMessage({
          id: 'error.password.empty',
        }),
      });
      setSubmitting(false);
      return;
    }
    if (func) {
      func();
    }
    setVisable(false);
    setSubmitting(false);
  };

  useEffect(() => {
    if (!!stamp && visable && !changePassword) {
      setPassword(stamp);
      handleSubmit();
    };
  }, [stamp, password, visable, changePassword]);

  return (
    <Modal
      title={
        <>
          <Title level={3}>
            {intl.formatMessage({
              id: 'modal.security.title',
            })}
          </Title>
        </>
      }
      closable={false}
      className={styles.modal}
      centered
      visible={visable}
      width={650}
      footer={
        <>
          <div className={styles.buttons}>
            <Button
              block
              type="primary"
              shape="round"
              size="large"
              className={styles.button}
              onClick={() => {
                handleSubmit();
              }}
              disabled={!password || password.length < 6}
              loading={submitting}
            >
              {intl.formatMessage({
                id: 'common.confirm',
              })}
            </Button>
            <Button
              block
              type="text"
              shape="round"
              size="large"
              className={styles.button}
              onClick={() => { setVisable(false) }}
              loading={submitting}
            >
              {intl.formatMessage({
                id: 'common.cancel',
              })}
            </Button>
          </div>
        </>
      }
    >
      <>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {errorState.Message && <Message content={errorState.Message} />}
          <div className={styles.codeInput}>
            <div className={styles.verifyForm}>
              <span className={password.slice(0) && !password.slice(1, 5) && styles.highLight}>
                {password.slice(0, 1).replace(/[^]/, '✱')}
              </span>
              <span className={password.slice(1) && !password.slice(2, 5) && styles.highLight}>
                {password.slice(1, 2).replace(/[^]/, '✱')}
              </span>
              <span className={password.slice(2, 3) && !password.slice(3, 5) && styles.highLight}>
                {password.slice(2, 3).replace(/[^]/, '✱')}
              </span>
              <span className={password.slice(3, 4) && !password.slice(4, 5) && styles.highLight}>
                {password.slice(3, 4).replace(/[^]/, '✱')}
              </span>
              <span className={password.slice(4, 5) && !password.slice(5) && styles.highLight}>
                {password.slice(4, 5).replace(/[^]/, '✱')}
              </span>
              <span className={password.slice(5) && styles.highLight}>{password.slice(5).replace(/[^]/, '✱')}</span>
            </div>
            <Input.Password
              autoFocus
              autoComplete="new-password"
              size="large"
              className={styles.verifyInput}
              onChange={inputVerify}
              value={password}
              disabled={submitting}
              maxLength={6}
              visibilityToggle={false}
            />
          </div>
        </div>
      </>
    </Modal>
  );
};
export default SecurityModal;
