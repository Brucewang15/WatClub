# Generated by Django 5.1.2 on 2024-10-30 22:54

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('comments_and_ratings', '0003_usercommentrating_created_at_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usercommentrating',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2001, 9, 11, 8, 46, tzinfo=datetime.timezone.utc)),
        ),
    ]