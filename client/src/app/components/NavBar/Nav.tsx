import { RootState } from "app/store";
import { getWalletDetails } from "app/store/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "app/store";
import styled from "styled-components/macro";
import { useLocation, useNavigate } from "react-router-dom";

export function Nav() {
  const walletBalance = useSelector(
    (state: RootState) => state.wallet.walletBalance
  );
  const reduxDispatch = useDispatch();
  let navigate = useNavigate();
  const { pathname } = useLocation();

  useEffect(() => {
    const walletId = localStorage.getItem("walletId");
    if (!walletId && pathname!=="/") {
      navigate("/");
    } else if(walletId) {
      reduxDispatch(getWalletDetails(walletId));
    }
  }, []);
  return (
    <Wrapper>
      <Item
        href="/add-transaction"
        title="Documentation Page"
        rel="noopener noreferrer"
      >
        Add Transaction
      </Item>
      <Item href="/transactions" title="Github Page" rel="noopener noreferrer">
        Transaction List (Wallet Balance : ${walletBalance})
      </Item>
    </Wrapper>
  );
}

const Wrapper = styled.nav`
  display: flex;
  margin-right: -1rem;
`;

const Item = styled.a`
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }
`;
