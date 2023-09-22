from django.urls import path 
from . import views 

urlpatterns = [
    path('' , views.home , name = 'home') ,
    path('login/' , views.login , name = "login") ,
    path('user/<int:id>/' , views.mainpage , name = "user") ,
    path('register/' , views.register , name = "register") ,
    path('check/' , views.check , name = 'check') ,
    path('add/' , views.add_account , name = 'add') , 
    path('data/' , views.data , name= 'data') , 
    path('add_todo/' , views.add_todo , name = "add_todo") ,
    path('show_todo/<int:id>/' , views.show_todo , name = "show_todo") , 
    path('get_todo_data' , views.get_todo_data , name = "get_todo_data") ,
    path('add_content' , views.add_content , name = "add_content") ,
    path ('delete_content' , views.delete_content , name = "delete_content") , 
    path('share_todo' , views.share_todo , name = 'share_todo') , 
    path('toggle' , views.toggle , name = "toggle") , 
    path('update_content' , views.update_content , name = "update_content")
]