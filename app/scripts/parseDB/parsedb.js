
'use strict';

angular.module('Parsedb', ['oitozero.ngSweetAlert'])
.provider('Parsedbmanager', function() {
  this.$get = function($q, $http, SweetAlert) {

    var provider = this;

    // new Parse constructor
    var ParseHighScore = Parse.Object.extend('ParseHighScore');

    // create new obj 
    var parseHighScore = new ParseHighScore();

    this.parseInit = function() {
        Parse.initialize('pGZExMJgbR0vy3EvyusNzTrybKP8rvRLQ7vQe77Y', 'ZXj4WmTxTHCWD0xD4oURQtnEcGelQCbCOjsYOi05'); 
    };

    this.parseCreateUser = function(user) {
      try {
        this.user = user;
        var user = new Parse.User();
          user.set("username", this.user.name),
          user.set("password", this.user.password),
          user.set("email", this.user.email);
          user.signUp(null, {
            success: function(user) {
              SweetAlert.swal("Good job!", "User created!", "success");
            },
            error: function(user, error) {
              SweetAlert.swal("Error!", error.code + " " + error.message, "error");
            }
        });
      } catch(err) {
        SweetAlert.swal("Error!", err, "error");
      }
    }

    this.parseLogIn = function(user) {
      try {
        this.user = user;
        Parse.User.logIn(this.user.login, this.user.pass, {
          success: function(user) {
            SweetAlert.swal("Good job!", user + "logged.", "success");
          },
          error: function(user, error) {
            SweetAlert.swal("Error!", "This" + user + " has some " + error.message, "error");
          }
        });
      } catch (err) {
        SweetAlert.swal("Error!", err, "error");
      }

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
