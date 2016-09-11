var app = angular.module('flapperNews', []);

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
        upvotes: 0
      });
      $scope.title = '';
      $scope.link = '';
    }

    $scope.incrementUpvotes = function(post) {
    post.upvotes += 1;
  };
}]);
