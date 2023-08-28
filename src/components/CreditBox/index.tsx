import { BsCurrencyDollar } from "react-icons/bs";

import "./index.css";

type Props = {
  Creditdata : {sum: number}
}

const CreditBox = (props: Props) => (
    <div className="credit-container">
      <div>
        <h1 className="credit-amount-text">
          <BsCurrencyDollar />
          {props.Creditdata.sum}
        </h1>
        <p className="credit-text">Credit</p>
      </div>
      <img
        src="https://res.cloudinary.com/reddyimgs/image/upload/v1690551063/Group_fnu7wc.png"
        alt="credit"
        className="credit-image"
      />
    </div>
  );

export default CreditBox;
