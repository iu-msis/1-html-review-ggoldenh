const SomeApp = {
    data() {
      return {
        book: [],
        bookForm: {}
      }
    },
    computed: {},
    methods: {
        prettyData(d) {
            return dayjs(d)
            .format('D MMM YYYY')
        },
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },
        
        fetchbookData() {
            fetch('/api/books/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.book = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        }
   /*     fetchBookData(s) {


            this.bookForm.studentId = this.book.id;

            console.log("Fetching book data for ", s);
            fetch('/api/books.php' + s.id)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.book = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });
        },
    },*/ },
        created() {
        this.fetchbookData();
    }
  
  }

  
  
  Vue.createApp(SomeApp).mount('#bookApp');