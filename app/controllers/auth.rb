get '/' do
    erb :index
end

get '/signup' do
  erb :signup
end

get '/login' do
  erb :login
end

get '/logout' do
  session[:user_id] = nil
  redirect '/'
end

post '/signup' do
  user = User.create(params[:user])
  if user.save
    session[:user_id] = user.id

    redirect '/'
  else
    session[:error] = user.errors.full_messages
    redirect '/signup'
  end
end

post '/login' do
  user = User.find_by(username: params[:username]).try(:authenticate, params[:password])
  if user
    session[:user_id] = user.id
    redirect '/'
  else
    session[:error] = "Incorrect information"
    redirect '/login'
  end
end
