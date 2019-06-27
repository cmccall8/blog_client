var app = new Vue ({
    el: "#app",

    data: {
      page: "home",
      //determining wether navigation drawer is on or off
      drawer: false,
      selected_category: "all",
      new_title: "",
      new_author: "",
      new_category: "",
      new_text: "",
      new_image: "",
      server_url: "https://blog-server8.herokuapp.com",

      categories: [
        "all",
        "clothing",
        "hunting",
        "books",
        "cards",
        "coins",
        "keychains",
        "comic books",
        "misc.",
      ],
      //posts becomes an empty list that when the created function runs it is filled with data
      posts: [],

      // posts: [
      //   {
      //     title: "first-post",
      //     author: "mr. author",
      //     category: "comic books",
      //     date: "today",
      //     image:"https://i.imgur.com/HuwV4CW.jpg",
      //     text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temp",
      //   },
      //   {
      //     title: "first-post",
      //     author: "mr. author",
      //     category: "cards",
      //     date: "today",
      //     image: "https://i.imgur.com/HuwV4CW.jpg",
      //     text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temp",
      //   },
      //   {
      //     title: "first-post",
      //     author: "mr. author",
      //     category: "books",
      //     date: "today",
      //     image: "https://i.imgur.com/HuwV4CW.jpg",
      //     text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temp",
      //   },
      //   {
      //     title: "first-post",
      //     author: "mr. author",
      //     category: "keychains",
      //     date: "today",
      //     image: "https://i.imgur.com/HuwV4CW.jpg",
      //     text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod temp",
      //   },
      // ],
    },

    created: function() {
      this.getPosts();
    },

    methods: {
      //connect back end with front end
      getPosts: function() {
        fetch(this.server_url + "/posts").then(function(res){
          //fetch sends request and .then answered with response
          //converting from a jason string to a javascript object-our data
          res.json().then(function(data) {
            console.log(data);
            //inside a function need app
            app.posts = data.posts;
          });
        });
      },

      addPost: function () {
        var new_post = {
          title: this.new_title,
          author: this.new_author,
          category: this.new_category,
          date: new Date(),
          text: this.new_text,
          image: this.new_image,
        };
        // dont need this anymore this.posts.unshift(new_post);
        fetch(this.server_url + "/posts", {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(new_post)
        }).then(function(){
        app.new_title="";
        app.new_author="";
        app.new_category="";
        app.new_text="";
        app.new_image="";
        app.page="home";
        });
      },
    },

    computed: {
      sorted_posts: function() {
        if(this.selected_category == "all") {
          return this.posts;
        } else {
          var sorted_posts = this.posts.filter(function(post){
            return post.category == app.selected_category;
          });
          return sorted_posts;
        }
      },
    },

});
