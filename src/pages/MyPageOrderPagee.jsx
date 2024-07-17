import { useEffect, useState } from "react";
import MyPageOrderList from "../components/common/MyPageOrderList";
import Mypage from "../components/join/Mypage";
import MypageReviewWrite from "../components/common/mypage/MypageReviewWrite";
import jwtAxios from "../api/user/jwtUtil";

const MyPageOrderPagee = () => {
  const [reviewOpen, setReviewOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrderPk, setSelectedOrderPk] = useState(null);
  const [doneOrderPk, setDoneOrderPk] = useState("");
  const [resPk, setResPk] = useState("");

  const isOlderThanThreeDays = date => {
    const orderDate = new Date(date);
    const currentDate = new Date();
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(currentDate.getDate() - 3);
    return orderDate < threeDaysAgo;
  };

  const reviewOpenModal = (doneOrderPk, resPk) => {
    setReviewOpen(true);
    setSelectedOrderPk(doneOrderPk);
    setDoneOrderPk(doneOrderPk);
    setResPk(resPk);
  };

  const reviewNo = () => {
    setReviewOpen(false);
    setSelectedOrderPk(null);
  };

  const getOrderList = async () => {
    try {
      const res = await jwtAxios.get("/api/done/user/list");
      if (res.data.statusCode !== -7) {
        setOrders(res.data.resultData);
      } else {
        setOrders(null);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrderList();
  }, []);

  return (
    <div className="mypage-wrap">
      <Mypage />
      <div className="mypage-box">
        {orders ? (
          <>
            {orders.map(order => {
              const isOldOrder = isOlderThanThreeDays(order.createdAt);
              return (
                <div key={order.doneOrderPk}>
                  <MyPageOrderList
                    isOldOrder={isOldOrder}
                    order={order}
                    reviewOpenModal={reviewOpenModal}
                    orders={orders}
                  />
                  {reviewOpen && selectedOrderPk === order.doneOrderPk && (
                    <MypageReviewWrite
                      doneOrderPk={doneOrderPk}
                      setReviewOpen={setReviewOpen}
                      reviewNo={reviewNo}
                      resPk={resPk}
                      setSelectedOrderPk={setSelectedOrderPk}
                    />
                  )}
                </div>
              );
            })}
          </>
        ) : (
          <div className="order-list">주문 내역이 없습니다</div>
        )}
      </div>
    </div>
  );
};

export default MyPageOrderPagee;
