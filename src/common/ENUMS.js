const HOME_SECTION_TYPE = {
  BANNER: 1,
  LATEST: 2,
  EXPLORE: 3,
  SOCIAL: 4,
  SUBSCRIBE: 5,
};

const CATEGORY = {
  MEN: { id: "bd3c1445-2c1c-457d-be57-ef1373406da8", title: "Men" },
  WOMEN: { id: "2f6624fc-06a2-4d05-96c4-1bfac2ec88a4", title: "Women" },
  KIDS: { id: "636d6dc6-2798-4a3f-a593-04e792296ffc", title: "Kids" },
};

const ORDER_STATUS = {
  PENDING: { id: "PENDING", title: "Pending" },
  DELIVERING: { id: "DELIVERING", title: "Delivering" },
  SUCCESS: { id: "SUCCESS", title: "Success" },
  FAILED: { id: "FAILED", title: "Failed" },
};

const ENUMS = { HOME_SECTION_TYPE, CATEGORY, ORDER_STATUS };

export default ENUMS;
