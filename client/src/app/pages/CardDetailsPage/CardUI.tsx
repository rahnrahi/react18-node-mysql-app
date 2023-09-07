import * as React from 'react';
import styled from 'styled-components/macro';
import { Title } from './components/Title';
import {
  CardButton,
  CardForm,
  CardInput,
  CardRow,
  CardRowLast,
} from './components/Card';
import SimpleReactValidator from 'simple-react-validator';

export default function CardUI() {
  const [card, setCard] = React.useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });
  const validator = React.useRef(new SimpleReactValidator());

  const setCardData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setCard(prevState => ({ ...prevState, [e.target.name]: e.target.value }));
  };

  const submitForm = () => {
    if (validator.current.allValid()) {
      console.log('You submitted the form and stuff!');
    } else {
      validator.current.showMessages();
    }
  };

  React.useEffect(() => {
    validator.current.showMessages();
  }, []);

  return (
    <Wrapper>
      <Title>Please enter your card details.</Title>

      <CardForm>
        <CardRow>
          <CardInput
            placeholder="Enter your credit card number"
            value={card.number}
            id="number-input"
            name="number"
            className="text-input"
            maxLength={16}
            onChange={e => setCardData(e)}
          />
          {validator.current.message(
            'CreditCardNumber',
            card.number,
            'required|integer',
          )}
        </CardRow>
        <CardRow>
          <CardInput
            type="text"
            placeholder="Enter card holder name"
            value={card.name}
            name="name"
            onChange={e => setCardData(e)}
            className="text-input"
            maxLength={30}
          />
          {validator.current.message(
            'CardHolderName',
            card.name,
            'required|alpha',
          )}
        </CardRow>
        <CardRow direction="row">
          <CardRowLast>
            {' '}
            <CardInput
              type="month"
              placeholder="Expiration date"
              value={card.expiry}
              name="expiry"
              className="text-input"
              onChange={e => setCardData(e)}
            />
            {validator.current.message(
              'ExpirationDate',
              card.expiry,
              'required|alphanumeric',
            )}
          </CardRowLast>
          <CardRowLast>
            <CardInput
              placeholder="CVC"
              maxLength={4}
              value={card.cvc}
              name="cvc"
              className="text-input"
              onChange={e => setCardData(e)}
              type="number"
            />
            {validator.current.message(
              'CVC',
              card.cvc,
              'required|integer|max:4|min:3',
            )}
          </CardRowLast>
        </CardRow>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <CardButton
            onClick={() => submitForm()}
            type="button"
            className="btn btn-primary"
          >
            <span className="btn-label">Pay</span>
          </CardButton>
          <CardButton type="button" className="btn btn-secondary">
            <span className="btn-label">Cancel</span>
          </CardButton>
        </div>
      </CardForm>
    </Wrapper>
  );
}

const Wrapper = styled.main`
  height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  margin-top: 4rem;
`;
