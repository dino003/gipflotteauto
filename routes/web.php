<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// Route::view('/{path?}', 'page')
//      ->where('path', '.*')
//      ->name('react');


//Route::domain('localhost')->group(function () { 
  
     // Landing Page Routes
     Route::get('/', function () {
         return view('welcome');
     });

     Route::get('/gestion_du_parc_automobile/{path?}', function () {
          return view('page');
      })->where('path', '.*');
     
     // Registration Routes...

     Route::get('/register', 'Auth\RegisterController@showRegistrationForm')->name('register');
     Route::post('/register', 'Auth\RegisterController@register');
     Route::get('/ty', 'Auth\RegisterController@gg');


      // Login Routes
      Route::get('/login', 'Auth\LoginController@showLoginForm')->name('login');
      Route::post('/login', 'Auth\LoginController@login');
      Route::post('/logout', 'Auth\LoginController@logout')->name('logout');
     
     // Catch All Route
     Route::any('{any}', function () {
         abort(404, 'Le lien que vous avez suivi est introuvable !');
     })->where('any', '.*');
 
// });
 
//  // Not logged in
//  Route::get('/', function () {
//      return view('welcome');
//  });
 
 // Authentication Routes
// Ensure that the tenant exists with the tenant.exists middleware
// Route::middleware('tenant.exists')->group(function () {
//      // Not Logged In
//      Route::get('/', function () {
//          return view('welcome');
//      });
//      Route::get('/lo', 'Auth\LoginController@text');


//      //  Route::view('/gestion_du_parc_automobile/{path?}', 'page')
//      //  ->where('path', '.*')
//      //  ->name('react');

//       Route::get('/gestion_du_parc_automobile/{path?}', function () {
//           return view('page');
//       })->where('path', '.*')->middleware('auth');
 
//      // Login Routes
//      Route::get('login', 'Auth\LoginController@showLoginForm')->name('login');
//      Route::post('login', 'Auth\LoginController@login');
//      Route::post('logout', 'Auth\LoginController@logout')->name('logout');
     
//      // Password Reset Routes
//      Route::get('password/reset', 'Auth\ForgotPasswordController@showLinkRequestForm')->name('password.request');
//      Route::post('password/email', 'Auth\ForgotPasswordController@sendResetLinkEmail')->name('password.email');
//      Route::get('password/reset/{token}', 'Auth\ResetPasswordController@showResetForm')->name('password.reset');
//      Route::post('password/reset', 'Auth\ResetPasswordController@reset')->name('password.update');
 
//      // Email Verification Routes
//      Route::get('email/verify', 'Auth\VerificationController@show')->name('verification.notice');
//      Route::get('email/verify/{id}', 'Auth\VerificationController@verify')->name('verification.verify');
//      Route::get('email/resend', 'Auth\VerificationController@resend')->name('verification.resend');
 
//      // Register Routes
//      Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
//      Route::post('register', 'Auth\RegisterController@register');
//  }); 
//  // Logged in
 Route::get('/home', 'HomeController@index')->name('home');



