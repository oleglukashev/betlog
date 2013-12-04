Betlog::Application.routes.draw do
  Betlog::Application.routes.draw do
    get "user_sessions/new"

    resources :homes
    resources :sports, :only => [:index, :create, :update, :destroy]
    resources :events, :only => [:index, :create, :update, :destroy]
    resources :coefficients, :only => [:index, :create, :update, :destroy]
    resources :countries, :only => [:index, :create, :update, :destroy]
    resources :championships, :only => [:index, :create, :update, :destroy]
    resources :users, :only => [:new, :create, :edit, :update]
    resource :user_sessions, :only => [:new, :create, :destroy]


    get 'users/user_exists' => 'users#user_exists'


    root to: "homes#index"
  end
end
