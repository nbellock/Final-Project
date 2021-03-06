Router.configure({
  // layoutTemplate: 'masterLayout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  yieldTemplates: {
    navbar: {to: 'navbar'},
    footer: {to: 'footer'},
    sidebar: {to: 'sidebar'},
    about: {to: 'about'},
    profile:{to: 'profile'}
  }
});

// In the map, we set our routes.
Router.map(function () {
  this.route('home', {
    path: '/home',
    template: 'home',
    layoutTemplate: 'masterLayout'
  });
  this.route('index', {
    path: '/',
    template: 'index',
  });
  this.route('loading', {
    path: '/loading',
    template: 'loading',
    layoutTemplate: 'masterLayout'
  });
  this.route('chat', {
    path: '/chat',
    template: 'chat',
    layoutTemplate: 'masterLayout'
  });
  // User Mgmt Route
  this.route('usermgmt', {
    path: '/usermgmt',
    template: 'userManagement',
    layoutTemplate: 'masterLayout',
    onBeforeAction: function() {
      if (Meteor.loggingIn()) {
          this.render(this.loadingTemplate);
      } else if(!Roles.userIsInRole(Meteor.user(), ['admin'])) {
          this.redirect('/');
      }
      this.next();
    },
    loadingTemplate: 'loading'
  });
     this.route('about', {
     name:'about',
     path:'/about',
     template: 'about',
     layoutTemplate: 'masterLayout'
  });
     this.route('profile',{
      name:'profile',
      path:'/profile',
      template:'profile',
      // layoutTemplate:'masterLayout'
     });
  // Sign In Route
  AccountsTemplates.configureRoute('signIn', {
      name: 'signin',
      path: '/sign-in',
      template: 'signIn',
      layoutTemplate: 'masterLayout',
      redirect: '/home',
  });
  // Sign Up Route
  AccountsTemplates.configureRoute('signUp', {
      name: 'sign-up',
      path: '/sign-up',
      template: 'signUp',
      layoutTemplate: 'masterLayout',
      redirect: '/home',
  });
  // Sign Out Route
  this.route('/sign-out', function(){
      Meteor.logout(function(err) {
          if (err) alert('There was a problem logging you out.');
          Router.go("/");
      });
      Router.go("/");
  });
});
