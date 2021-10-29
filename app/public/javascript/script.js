const SomeApp = {
    data() {
      return {
        book: [],
        bookForm: {},
        selectedbook: null
      
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
        },
        postNewBook(evt) {
           
            
            console.log("Posting!", this.bookForm);
    
            fetch('api/books/create.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.book = json;
                
                // reset the form
                this.bookForm = {};
              });
          },
          postEditBook(evt) {
            this.bookForm.bookNumber = this.selectedbook.bookid;
           
            
            console.log("Updating!", this.bookForm);
    
            fetch('api/books/update.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.book = json;
                
                this.resetBookForm();
              });
          },
          postBook(evt) {
            if (this.selectedbook === null) {
                this.postNewBook(evt);
            } else {
                this.postEditBook(evt);
            }
          },
          postDeleteBook(o) {
            console.log(o);
            if (!confirm("Are you sure you want to delete the book from "+o.companyName+"?")) {
                return;
            }
            
            fetch('api/books/delete.php', {
                method:'POST',
                body: JSON.stringify(o),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.book = json;
                
                this.resetBookForm();
              });
          },
          selectBook(o) {
            console.log(o);
            this.selectedbook = o;
            this.bookForm = Object.assign({}, this.selectedbook);
          },
          resetBookForm() {
            this.selectedbook = null;
            this.bookForm = {};
          }
    },
    created() {
        this.fetchbookData();
    }
  
  }


  
  Vue.createApp(SomeApp).mount('#bookApp');