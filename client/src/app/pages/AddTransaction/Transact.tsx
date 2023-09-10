import * as React from "react";
import styled from "styled-components/macro";
import { Title } from "./components/Title";
import SimpleReactValidator from "simple-react-validator";
import {
  CardButton,
  CardForm,
  CardInput,
  CardRow,
  CardRowLast,
  CardSwitchInput,
  CardSwitchLabel,
  CardSwitchSlide,
} from "./components/Card";
import { RootState, useDispatch, useSelector } from "app/store";
import { addTransaction } from "app/store/actions";

export default function TransactUI() {
  const reduxDispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.wallet.isLoading);

  const [transact, setTransact] = React.useState({
    amount: "",
    description: "",
  });
  const [isDebit, setIsDebit] = React.useState(false);

  const validator = React.useRef(new SimpleReactValidator());

  const setTransactionData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTransact((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = async () => {
    if (validator.current.allValid()) {
      const amount = isDebit
        ? Number(transact.amount) * -1
        : Number(transact.amount);
      const data = {
        amount,
        description: transact.description,
      };
      reduxDispatch(addTransaction(data));
    } else {
      validator.current.showMessages();
    }
  };

  React.useEffect(() => {
    validator.current.showMessages();
  }, []);

  return (
    <Wrapper>
      <Title>Please enter your transaction details.</Title>

      <CardForm>
        <CardRow>
          <CardInput
            placeholder="Enter your amount"
            value={transact.amount}
            id="number-input"
            name="amount"
            className="text-input"
            maxLength={16}
            onChange={(e) => setTransactionData(e)}
          />
          {validator.current.message(
            "TransactionAmount",
            transact.amount,
            "required|numeric|min:0,num|max:100000000000,num"
          )}
        </CardRow>
        <CardRow>
          <CardInput
            type="text"
            placeholder="Enter Description"
            value={transact.description}
            name="description"
            onChange={(e) => setTransactionData(e)}
            className="text-input"
            maxLength={300}
          />
          {validator.current.message(
            "Description",
            transact.description,
            "required"
          )}
        </CardRow>
        <CardRow direction="row">
          <CardRowLast>
            <label>Is Debit?</label>
            <CardSwitchLabel>
              <CardSwitchInput
                type="checkbox"
                onChange={(e) => setIsDebit(e.target.checked)}
              />
              <CardSwitchSlide className="slider round"></CardSwitchSlide>
            </CardSwitchLabel>
          </CardRowLast>
        </CardRow>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <CardButton
            onClick={() => submitForm()}
            type="button"
            className="btn btn-primary"
            disabled={isLoading}
          >
            <span className="btn-label">Add</span>
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
