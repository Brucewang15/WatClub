# Generated by Django 5.1.2 on 2024-11-12 02:03

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0010_remove_bookmark_bookmarked"),
    ]

    operations = [
        migrations.RenameField(
            model_name="bookmark",
            old_name="org_id",
            new_name="org",
        ),
        migrations.RenameField(
            model_name="bookmark",
            old_name="user_id",
            new_name="user",
        ),
    ]
