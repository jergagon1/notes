# GET Routes ==================

# show all notes
get '/' do
  @notes = Note.all.order(updated_at: :desc)
  erb :'notes/index'
end

#show form for a new note
get '/notes/new' do
  @content = :'notes/_new'
  @notes = Note.all
  if request.xhr?
    erb @content, :layout => false
  else
    erb :'/notes/index'
  end
end

# show a note
get '/notes/:id' do
  @note = Note.find(params[:id])
  @notes = Note.all.sort.reverse
  if request.xhr?
    erb :'notes/_show', :layout => false
  else
    @content = :'notes/_show'
    erb :'notes/index'
  end
end

# edit a note
get '/notes/:id/edit' do
  @note = Note.find(params[:id])
  if request.xhr?
    erb :'/notes/_edit', :layout => false
  else
    @notes = Note.all.sort.reverse
    @content = :'/notes/_edit'
    erb :'notes/index'
  end
end

# delete confirmation page
get '/notes/:id/delete' do
  @note = Note.find(params[:id])
  @notes = Note.all.sort.reverse
  if request.xhr?
    erb :'notes/_delete', :layout => false
  else
    @content = :'notes/_delete'
    erb :'notes/index'
  end
end

# POST Routes ===================

# create a new note
post '/notes' do
  @note = Note.new(params[:note])
  if @note.save
    if request.xhr?
      erb :'notes/_note', layout: false,
      locals: { note: @note }
    else
      redirect '/'
    end
  else
    response.status = 422
    redirect '/'
  end
end

# PUT Routes ====================

put '/notes/:id' do
  note = Note.find(params[:id])
  note.update_attributes(params[:note])
  if note.save!
    if request.xhr?
      erb :'notes/_note', :layout => false,
      :locals => { note: note }
    else
      redirect "/"
    end
  else
    redirect "/"
  end
end

# DELETE Routes =================

delete '/notes/:id' do
  note = Note.find(params[:id])
  note.destroy
  if request.xhr?
    status 204
  else
    redirect '/'
  end
end