const getFeePercent = () => {
    const PERCENT = 100;
  
    const FEE_PERCENT = Math.floor(0.2 / PERCENT);
  
    return Promise.resolve(FEE_PERCENT);
  };
  
  const getDepositFiatRate = () => {
    return Promise.resolve(1500);
  };
  
  const getFiatRateAndFee = async () => {
    const rate = await getDepositFiatRate();
  
    const feePercent = await getFeePercent();
  
    return {
      rate,
      feePercent,
    };
  };
  
  const getDepositBankDetails = () => {
    // Todo: return a new/existing virtual account details for the user.
  
    return Promise.resolve({
      accountName: "Eth London Holdings",
      accountNumber: "1234567890",
      bankName: "Wema Bank",
    });
  };
  
  export { getFiatRateAndFee, getDepositBankDetails };