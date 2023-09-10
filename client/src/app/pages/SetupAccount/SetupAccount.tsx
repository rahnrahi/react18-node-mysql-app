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
import { request } from "utils/request";
import { RootState, useDispatch, useSelector } from "app/store";
import { setBalance, setIsLoading } from "app/store/walletStore";
import { useNavigate } from "react-router-dom";

export default function SetupAccount() {
  const reduxDispatch = useDispatch();
  let navigate = useNavigate();

  const isLoading = useSelector((state: RootState) => state.wallet.isLoading);

  const [transact, setTransact] = React.useState({
    balance: "",
    username: "",
  });

  const validator = React.useRef(new SimpleReactValidator());

  const setAccountData = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTransact((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitForm = async () => {
    if (validator.current.allValid()) {
      const balance = Number(transact.balance);
      const payload = {
        balance,
        username: transact.username,
      };
      reduxDispatch(setIsLoading(true));
      await request("setup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      })
        .then((response: any) => {
          reduxDispatch(setIsLoading(false));
          if (response.transactionId) {
            localStorage.setItem("walletId", response.id);
            reduxDispatch(setBalance(response.balance));
            navigate("/transactions");
          }
        })
        .catch((err) => {
          reduxDispatch(setIsLoading(false));
          console.log(err.message);
        });
    } else {
      validator.current.showMessages();
    }
  };

  React.useEffect(() => {
    const walletId = localStorage.getItem("walletId");
    walletId && navigate("/transactions");
    validator.current.showMessages();
  }, []);

  return (
    <Wrapper>
      <Title>Please setup your account.</Title>

      <CardForm>
        <CardRow>
          <CardInput
            placeholder="Enter Initial amount"
            value={transact.balance}
            id="number-input"
            name="balance"
            className="text-input"
            maxLength={16}
            onChange={(e) => setAccountData(e)}
          />
          {validator.current.message(
            "InitialAmount",
            transact.balance,
            "required|numeric|min:0,num|max:100000000000,num"
          )}
        </CardRow>
        <CardRow>
          <CardInput
            type="text"
            placeholder="Enter username"
            value={transact.username}
            name="username"
            onChange={(e) => setAccountData(e)}
            className="text-input"
            maxLength={300}
          />
          {validator.current.message("username", transact.username, "required")}
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
            <span className="btn-label">Set Up</span>
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
