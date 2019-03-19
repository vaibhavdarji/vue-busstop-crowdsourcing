export default {
  busStops: state => state.busStops,
  isLoading: state => state.isLoading,
  selectedBusStop: state => state.selectedBusStop,
  userDonation: state => state.userDonation,
  totalFunds: state => state.busStops.map(busStop => busStop.donationsRaisedInDollars).reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}