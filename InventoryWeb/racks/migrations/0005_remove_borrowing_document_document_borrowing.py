# Generated by Django 4.1.7 on 2023-05-27 08:57

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('racks', '0004_rack_password'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='borrowing',
            name='document',
        ),
        migrations.AddField(
            model_name='document',
            name='borrowing',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='borrowings', to='racks.borrowing'),
        ),
    ]