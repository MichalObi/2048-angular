
'use strict';

angular.module('Parsedb', [])
.provider('Parsedbmanager', function() {
  this.$get = function($q, $http) {

    var provider = this;

    // new Parse constructor
    var ParseHighScore = Parse.Object.extend('ParseHighScore');

    // create new obj 
    var parseHighScore = new ParseHighScore();

    this.parseInit = function() {
        Parse.initialize('', ''); 
    };

    this.parseCreateUser = function(user) {
      this.user = user;
      var user = new Parse.User();
          user.set("username", this.user.name),
          user.set("password", this.user.password),
          user.set("email", this.user.email);
          user.signUp(null, {
            success: function(user) {
              console.log('User created');
            },
            error: function(user, error) {
              console.log("Error: " + error.code + " " + error.message);
            }
        });
    }

    this.parseLogIn = function(user) {
        this.user = user;
        console.log(this.user);
        Parse.User.logIn(this.user.login, this.user.pass, {
          success: function(user) {
            console.log(user + 'logged');
          },
          error: function(user, error) {
            console.log('This' + user + ' has some ' + error.message);
          }
        });
    }

    this.setParsedb = function(newScore) {
      // set val
      parseHighScore.set('HighScore', newScore);
      // save score to cloud
      parseHighScore.save(null, {
        success: function (parseHighScore) {
          console.log('New object created with objectId: ' + parseHighScore.id);
        },
        error: function (parseHighScore, error) {
          console.log('Failed to create new object, with error code: ' + error.message);
        }
      });
    };

    this.getParsedb = function() {
      // need q to get this asynch
      var deferred = $q.defer();
      var query = new Parse.Query(ParseHighScore);
      query.limit(5);
      query.descending("HighScore");
      query.find({
         success: function(results) {
          console.log("Successfully retrieved " + results.length + " scores.");
          // resolve, if you have results
          deferred.resolve(results);
        },
        error: function(error) {
           deferred.reject(error.message);
        }
      });

      return deferred.promise;
    };

    return this;
  };

});
