import React, { useContext } from "react";
import { OrderContext } from "./user/OrderContext";
import PaymentSelect from "./user/PaymentSelect";
import { Checkbox } from "@mui/material";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const { order } = useContext(OrderContext); // useContext로 order 값 가져오기
  const [cookies, setCookie] = useCookies(["accessToken", "refreshToken"]);
  const navigate = useNavigate(); // useNavigate를 사용하여 navigate 함수를 가져옵니다.

  const calculateTotalPrice = item => {
    return item.menu_price * item.quantity; // 각 항목의 총 가격 계산
  };

  const calculateTotalOrderPrice = () => {
    return order.reduce((total, item) => total + calculateTotalPrice(item), 0);
  };

  const handlePayment = async () => {
    const data = {
      order_res_pk: 1,
      order_request: "요청사항",
      payment_method: "결제수단 키",
      order_phone: "전화번호",
      order_address: "배달주소",
      menu_pk: [1],
    };

    try {
      const res = await axios.post("/api/order/", data, {
        headers: {
          Authorization: `Bearer ${cookies.accessToken}`,
        },
      });

      if (res.data.statusCode === 1) {
        alert(res.data.resultMsg);
        navigate(`/orderview/${res.data.resultData}`);
      } else {
        alert("결제에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (error) {
      alert("결제에 실패했습니다. 다시 시도해주세요.");
      console.log(error);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-page__section">
        <h2 className="payment-page__title">결제하기</h2>
        <div className="payment-page__warp-border">
          <form className="payment-page__form">
            <div className="payment-page__input-wrap">
              <h3 className="payment-page__subtitle">배달정보</h3>
              <div className="payment-page__delivery-info">
                <div>
                  <label htmlFor="address">주소</label>
                  <input
                    type="text"
                    id="address"
                    className="payment-page__input"
                  />
                </div>
                <div>
                  <label htmlFor="address"></label>
                  <input
                    type="text"
                    id="address"
                    className="payment-page__input"
                    placeholder="(필수) 상세주소 입력"
                  />
                </div>
                <div>
                  <label htmlFor="phone">휴대전화번호</label>
                  <input
                    type="text"
                    id="phone"
                    className="payment-page__input"
                    placeholder="(필수) 휴대전화 번호 입력"
                  />
                </div>
              </div>
            </div>
            <div className="payment-page__input-wrap">
              <h3 className="payment-page__subtitle">주문시 요청사항</h3>
              <div className="payment-page__request">
                <textarea
                  name="request"
                  id="request"
                  placeholder="요청사항을 남겨주세요."
                  className="payment-page__textarea"
                ></textarea>
              </div>
            </div>
            <PaymentSelect />
            <div className="payment-page__input-wrap none">
              <h3 className="payment-page__subtitle">할인방법 선택</h3>
              <div className="payment-page__coupon ">
                <label htmlFor="coupon">쿠폰</label>
                <div className="payment-page__coupon-wrap">
                  <input
                    type="text"
                    id="coupon"
                    className="payment-page__input"
                  />
                  <button className="payment-page__coupon-btn btn--default">
                    적용
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="payment-page__order-summary">
        <h2 className="payment-page__title">주문내역</h2>
        <div className="payment-page__warp-border">
          <h3 className="payment-page__restaurant-name">
            뉴욕버거앤치킨-대구남산점
          </h3>
          <ul>
            {order.map((item, index) => (
              <li key={index} className="payment-page__order-item">
                <p>
                  {item.menu_name} <span>x {item.quantity}개</span>
                </p>
                <p>{calculateTotalPrice(item)}원</p> {/* 계산된 총 가격 표시 */}
              </li>
            ))}
          </ul>

          {/* 결제 */}
          <div className="payment-page__total-amount">
            <p>총 결제 금액</p>
            <p>{calculateTotalOrderPrice()}원</p>
          </div>
        </div>
        <p className="payment-page__terms">
          <span>
            이용약관, 개인정보 수집 및 이용, 개인정보 제3자 제공 , 전자금융거래
            이용약관, 만 14세 이상 이용자입니다.
          </span>
          <label className="agreement-checkbox">
            결제에 동의합니다.
            <Checkbox sx={{ padding: 0 }} />
          </label>
        </p>
        <button
          className="payment-page__button payment-btn"
          onClick={handlePayment}
        >
          결제하기
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;
