ExceptionLogger::Engine.routes.draw do
  root :to => "logged_exceptions#index"
  match "/query" => "logged_exceptions#query", :as => :query, :via => :get
  match "/destroy_all" => "logged_exceptions#destroy_all", :as => :destroy_all, :via => :post
  match "/feed" => "logged_exceptions#feed", :as => :feed, :via => :get
  match "/:id" => "logged_exceptions#show", :via => :get
  match "/:id" => "logged_exceptions#destroy", :via => :delete
end
