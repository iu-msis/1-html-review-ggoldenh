const SomeApp = {
  data() {
    return {
      result: {},
    }
  },
  computed: {
      prettyBirthday() {
          return dayjs(this.person.dob.date)
          .format('D MMM YYYY');
      }
  },
  methods: {
    fetchUserData() {
        fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then((json) => {
            console.log("Got json back:", json);
            this.result = json.results[0];
            console.log("C");
        })
        .catch( (error) => {
            console.error(error);
        });
    }
},
created() {
    this.fetchUserData();
}

}

Vue.createApp(SomeApp).mount('#someApp');



