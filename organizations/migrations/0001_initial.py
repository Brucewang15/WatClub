# Generated by Django 5.1.2 on 2024-10-16 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Organization',
            fields=[
                ('org_id', models.AutoField(primary_key=True, serialize=False)),
                ('org_name', models.CharField(max_length=100)),
                ('overview', models.TextField()),
                ('star_rating', models.FloatField()),
                ('ranking_num', models.IntegerField()),
                ('org_type', models.CharField(choices=[('club', 'Club'), ('intramural', 'Intramural'), ('design', 'Design'), ('society', 'Society'), ('sportclub', 'SportClub')], max_length=20)),
                ('constitution', models.TextField()),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Tag',
            fields=[
                ('tag_id', models.AutoField(primary_key=True, serialize=False)),
                ('tag_name', models.CharField(max_length=100)),
            ],
        ),
    ]
