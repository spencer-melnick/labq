var app = angular.module('flapperNews', ['ui.router']);

app.factory('posts', [function(){
  var obj = {
    posts: [{title: 'test post, do not reply', link: '', upvotes: 0}]
  };

  return obj;
}]);

app.controller('MainCtrl', [
  '$scope',
  'posts',
  function($scope, posts){
    $scope.test = 'Hello world!';
    $scope.posts = posts.posts;

    console.log(posts);

    $scope.addPost = function(){
      if (!$scope.title || $scope.title === '')
        return;

        $scope.posts.push({
          title: $scope.title,
          link: $scope.link,
          upvotes: 0,
          comments: [
            {author: 'Joe', body: 'Cool post!', upvotes: 0},
            {author: 'Bob', body: 'Great idea but everything is wrong!', upvotes: 0}
          ]
        });
      $scope.title = '';
      $scope.link = '';
    }

    $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
    console.log("upvoted!")
  };
}]);

app.controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'posts',
  function($scope, $stateParams, posts) {
    $scope.post = posts.posts[$stateParams.id];
    $scope.incrementUpvotes = function(comment) {
      comment.upvotes += 1;
    };
  }
]);

app.config([
'$stateProvider',
'$urlRouterProvider',
function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: '/home',
      templateUrl: '/home.html',
      controller: 'MainCtrl'
    });

  $stateProvider
    .state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });

  $urlRouterProvider.otherwise('home');
}]);
