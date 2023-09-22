from django.shortcuts import render
from django.http import HttpResponse , JsonResponse
from django.template import loader
from django.views.decorators.csrf import csrf_exempt
from cryptography.fernet import Fernet
import json 
from . import models


# For encrypt and decrypt password 
def generate_key () :
    key = Fernet.generate_key()
    with open("secret.key", "wb") as key_file:
        key_file.write(key)

def load_key():
    return open("secret.key", "rb").read()

def encrypt_string(text, key):
    fernet = Fernet(key)
    encrypted_text = fernet.encrypt(text.encode())
    return encrypted_text

def decrypt_string(encrypted_text, key):
    fernet = Fernet(key)
    decrypted_text = fernet.decrypt(encrypted_text).decode()
    return decrypted_text

key = load_key() 


# Create your views here.

def login (req) :
    app = loader.get_template('Login.html')
    return HttpResponse(app.render())
def home (req) :
    app = loader.get_template('home.html')
    return HttpResponse(app.render())
def mainpage (req , id) :
    app = loader.get_template('user.html')
    return HttpResponse(app.render())
def register (req) :
    app = loader.get_template('register.html')
    return HttpResponse(app.render())
def show_todo (req , id) :
    app = loader.get_template('show todo.html')
    print(id)
    return HttpResponse(app.render())
def check (req) :
    if (req.method == 'GET') :
        user = req.GET.get('user') 
        password = req.GET.get('password')
        try :
            data = models.account.objects.all().filter(email = user)
            _password = decrypt_string(data[0].password[2:-1].encode('utf-8') , key) 
            if (password == _password) :
                return JsonResponse({'message' : "success" , "id" : data[0].id , "name" : data[0].name}) 
            else :
                return JsonResponse({'message' : "wrong password"})
        except  :
            try :
                data = models.account.objects.all().filter(id = user)
                _password = decrypt_string(data[0].password[2:-1].encode('utf-8') , key) 
                print(_password)
                if (password == _password) :
                    return JsonResponse({'message' : "success" , "id" : data[0].id , "name" : data[0].name}) 
                else :
                    return JsonResponse({'message' : "wrong password"})
            except :
                return JsonResponse({'message' : "mail not found"})
    else :
        return HttpResponse('wrong request')
    

@csrf_exempt
def add_account (req) :
    if (req.method == 'POST') :
        # check if id exist or not
        data = json.loads(req.body)
        if models.account.objects.all().filter(id = int(data['id'])).exists():
            
            return JsonResponse({'message' : 'id exist'})
        else :
            encrypted_password = encrypt_string(data['password'] , key)
            record = models.account(data['id'] , data['user-name'] , data['email'] , encrypted_password ) 
            record.save()
            return JsonResponse({'message' : 'done'})
    else :
        return HttpResponse('wrong request')
    

def data (req) :
    if (req.method == 'GET') :
        id = req.GET.get('id') 
        _name = models.account.objects.all().filter(id = id)[0].name
        lists = models.share.objects.all().filter(owner_id = id) 
        jsonData = {}
        for i in range (len(lists)) :
            content = models.content.objects.all().filter(todo_id = lists[i].todo_id.id)
            data = models.owner_todo.objects.all().filter(id = lists[i].todo_id.id)[0]
            jsonData[data.id] = [data.name]
            for j in range (len(content)) :
                jsonData[data.id].append([content[j].content , content[j].checked])
        return JsonResponse({'name' : _name , 
                'data' : jsonData})
    else :
        return JsonResponse({'message' : 'bad request'})

@csrf_exempt 
def add_todo (req) :
    if (req.method == 'POST') :
        name = req.POST.get('name') 
        id = req.POST.get('id')
        owner_record = models.owner_todo()
        owner_record.name = name 
        owner_record.id = models.owner_todo.objects.all().count() + 1
        owner_record.owner_id = models.account(id = id)
        owner_record.save()
        # share 
        share_record = models.share() 
        share_record.todo_id = models.owner_todo(id = models.owner_todo.objects.all().count()) 
        share_record.owner_id = models.account(id = id) 
        share_record.save()
        print(share_record)
        return JsonResponse({'message' : 'success' , 
                             'id' : models.owner_todo.objects.all().count()})
    else :
        return JsonResponse({'message' : 'bad request'})
    
def get_todo_data (req) :
    if (req.method == 'GET') :
        # get id of the todo
        data = models.owner_todo.objects.all().filter(id = req.GET.get('id')) 
        print(data[0].owner_id )
        owner = models.account.objects.all().filter(id = data[0].owner_id.id)[0].name
        content = models.content.objects.all().filter(todo_id = req.GET.get('id')) 
        JsonContent = []
        for i in range (len(content)) :
            JsonContent.append([content[i].id , content[i].content , content[i].checked])
        
        return JsonResponse ({
            'Name' : data[0].name ,
            'Owner' : owner ,
            'data' : JsonContent 
        })
    else :
        return JsonResponse({'message' : 'bad request'})
    

@csrf_exempt 
def add_content (req) :
    if (req.method == "POST") :
        content_record = models.content()
        content_record.content = req.POST.get('content')
        content_record.todo_id = models.owner_todo(id = req.POST.get('id'))
        content_record.checked = False
        print(content_record)
        content_record.save()
        return JsonResponse({'message' : 'success'})
    else :
        return JsonResponse({'message' : 'bad request'})


def delete_content (req) :
    if (req.method == 'GET') :
        id = req.GET.get('id') 
        models.content.objects.all().filter(id = id)[0].delete()
        return JsonResponse({'message' : 'success'})
    else :
        return JsonResponse({'message' : 'bad request'})





@csrf_exempt 
def share_todo (req) :
    if (req.method == 'POST') :
        if (models.account.objects.all().filter(id = req.POST.get('to_id')).exists()) :
            share_record = models.share()
            share_record.todo_id = models.owner_todo(id = req.POST.get('todo_id')) 
            share_record.owner_id = models.account(id = req.POST.get('to_id'))
            share_record.save()
            return JsonResponse({'message' : 'success'})
        else :
            return JsonResponse({'message' : 'wrong email or id'})
    else :
        return JsonResponse({'message' : 'bad request'})
    


def delete_todo (req) :
    pass

def toggle (req) :
    if (req.method == 'GET') :
        id = req.GET.get('id')
        state = req.GET.get('0-1') 
        data = models.content.objects.all().filter(id = id)[0] ;
        if (state == '1') :
            data.checked = True 
        else :
            data.checked = False
        data.save()
        return JsonResponse({'message' : 'success'})
    else :
        return JsonResponse({'message' : 'bad request'})

@csrf_exempt 
def update_content (req) :
    if (req.method == 'GET') :
        id = req.GET.get('id')
        new_content = req.GET.get('new content') 
        data = models.content.objects.all().filter(id = id)[0]
        data.content = new_content 
        data.save()
        return JsonResponse({'message' : 'success'})
    else :
        return JsonResponse({'message' : 'bad request'})
