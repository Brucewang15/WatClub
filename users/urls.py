from django.urls import path
from . import views

urlpatterns = [
    path('confirmationEmail/', views.verify)
]