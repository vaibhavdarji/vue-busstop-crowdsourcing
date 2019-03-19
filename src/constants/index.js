const APP_TITLE = {
  TITLE: "Bus-stop crowdsourcing web application",
  ELEM_ID: "bsc-app-title",
  TF_ELEM_ID: "bsc-app-total-fund",
  BS_LIST_ID: "bsc-app-bs-list"
};

const APP_BS_ITEMS = {
  BS_CARD_CLS: "bsc-card-item"
};

const MAX_DONATE = 700;
const CURRENCY = 'USD';

const ERROR_TEXT_CLASS = 'error--text title font-weight-bold';

const THEME = {
  BG_COLOR: '#F4F4F4',
  LPB_COLOR: '#2979FF', 
  BTN_TEXT_COLOR: 'white',
  ERROR_TEXT_CLASS
}

const BUTTON = {
  BG_COLOR: THEME.LPB_COLOR,
  COLOR: THEME.BTN_TEXT_COLOR,
  SIZE: 'large'
};

const LINEAR_PROGRESS_BAR = {
  COLOR: THEME.LPB_COLOR,
  BG_COLOR: THEME.BG_COLOR,
};

const DONATE_OPTIONS = [
  2,
  5,
  10,
  15,
  20,
  50
];

const USER_INFO = {
  amount: 0,
  userName: '',
  userEmail: '',
  cardNo: '',
  cardExp: '',
  cardCVC: '',
  cardUserName: ''
};

export default {
  APP_TITLE,
  APP_BS_ITEMS,
  MAX_DONATE,
  DONATE_OPTIONS,
  USER_INFO,
  CURRENCY,
  MAX_DONATE,
  BUTTON,
  LINEAR_PROGRESS_BAR,
  THEME
};