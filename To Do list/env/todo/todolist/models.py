from django.db import models

class account(models.Model) :
    id = models.IntegerField().primary_key
    name = models.CharField(max_length=255) 
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)
    class Meta :
        unique_together = (('id' , 'email'))

class owner_todo(models.Model) : 
    id = models.IntegerField().primary_key
    owner_id = models.ForeignKey(
        account,
        on_delete= models.CASCADE 
    )
    name = models.CharField(max_length=255)

class share(models.Model) :
    owner_id = models.ForeignKey(
        account,
        on_delete= models.CASCADE 
    )
    todo_id = models.ForeignKey(
        owner_todo,
        on_delete= models.CASCADE 
    )
    class Meta :
        unique_together = (('owner_id' , 'todo_id'))

class content(models.Model) :
    id = models.IntegerField().primary_key
    todo_id = models.ForeignKey(
        owner_todo ,
        on_delete= models.CASCADE 
    )
    content = models.CharField(max_length=255)
    checked = models.BooleanField()

# Create your models here.
