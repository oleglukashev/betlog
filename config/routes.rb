Betlog::Application.routes.draw do
  Betlog::Application.routes.draw do
    get "user_sessions/new"

    resources :homes
    resources :sports, :only => [:index, :create, :update, :destroy]
    resources :events, :only => [:index, :create, :update, :destroy]
    resources :coefficients, :only => [:index, :create, :update, :destroy]
    resources :countries, :only => [:index, :create, :update, :destroy]
    resources :championships, :only => [:index, :create, :update, :destroy]
    resources :managed_leagues, :only => [:index, :create]
    resources :users, :only => [:new, :create, :edit, :update]
    resources :bookmakers, :only => [:index]
    resource :user_sessions, :only => [:index, :new, :create, :destroy]


    get 'users/user_exists' => 'users#user_exists'
    get 'user_sessions/current_user' => 'user_sessions#get_current_user'


    root to: "homes#index"
  end
end
