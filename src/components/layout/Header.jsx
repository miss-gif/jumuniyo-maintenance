import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="inner">
        <h1>
          <Link to="/">
            <img
              src={process.env.PUBLIC_URL + "/images/logo_1x.png"}
              alt="Logo"
            />
          </Link>
        </h1>
        <nav className="nav">
          <ul className="nav__top">
            <li>
              <Link to="/ceopage">주문이요사장님</Link>
            </li>
            <li>
              <Link to="/">관리자</Link>
            </li>
          </ul>
          <ul className="nav__list">
            <li className="nav__item">
              <Link to="/">홈</Link>
            </li>
            <li className="nav__item">
              <Link to="/restaurants">주문하기</Link>
            </li>
            <li className="nav__item">
              <Link to="/restaurants/:1">음식점 상세(임시)</Link>
            </li>
            <li className="nav__item">
              <Link to="/payment">결제하기(임시)</Link>
            </li>
            <li className="nav__item">
              <Link to="/mypage/order">주문확인(임시)</Link>
            </li>
            <li className="nav__item">
              <Link to="/mypage">마이페이지</Link>
            </li>
            <li className="nav__item">
              <Link to="/login">로그인</Link>
            </li>
            <li className="nav__item btn">
              <Link to="/auth">회원가입</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
