<!-- eslint-disable vue/multi-word-component-names -->
new Vue({
  el: '#app',
  data () {
    return {
      data: null
    }
  },
  mounted () {
    axios
      .get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(response => (this.data = response))
  }
})
