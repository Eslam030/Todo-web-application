# Generated by Django 4.2.5 on 2023-09-22 11:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('todolist', '0002_remove_content_todo_id_remove_owner_todo_owner_id_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='account',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('email', models.CharField(max_length=255)),
                ('password', models.CharField(max_length=255)),
            ],
        ),
        migrations.CreateModel(
            name='owner_todo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('owner_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todolist.account')),
            ],
        ),
        migrations.CreateModel(
            name='content',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.CharField(max_length=255)),
                ('checked', models.BooleanField()),
                ('todo_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todolist.owner_todo')),
            ],
        ),
        migrations.CreateModel(
            name='share',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('owner_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todolist.account')),
                ('todo_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='todolist.owner_todo')),
            ],
            options={
                'unique_together': {('id', 'todo_id')},
            },
        ),
    ]
