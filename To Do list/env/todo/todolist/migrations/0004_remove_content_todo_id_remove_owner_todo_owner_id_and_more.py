# Generated by Django 4.2.5 on 2023-09-22 11:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todolist', '0003_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='content',
            name='todo_id',
        ),
        migrations.RemoveField(
            model_name='owner_todo',
            name='owner_id',
        ),
        migrations.AlterUniqueTogether(
            name='share',
            unique_together=None,
        ),
        migrations.RemoveField(
            model_name='share',
            name='owner_id',
        ),
        migrations.RemoveField(
            model_name='share',
            name='todo_id',
        ),
        migrations.DeleteModel(
            name='account',
        ),
        migrations.DeleteModel(
            name='content',
        ),
        migrations.DeleteModel(
            name='owner_todo',
        ),
        migrations.DeleteModel(
            name='share',
        ),
    ]
